import { Strapi } from "@strapi/strapi";

// Type for the API response
interface ExchangeRateResponse {
  result: string;
  conversion_rates: {
    [key: string]: number;
  };
}

const EXCHANGE_RATE_URL = 
  "https://v6.exchangerate-api.com/v6/00b12eb1d19e7c1d7515b383/latest/INR";

  export default {
    cartNotifier: {
      task: async ({ strapi }) => {
        await notifier(strapi);
      },
      options: {
        rule: "58 20 * * *", // Schedule the task to run at 8:58 PM every day
      },
    },
 
  

  currencyFetcher: {
    task: async ({ strapi }) => {
      await fetchAndStoreCurrency(strapi);
    },
    options: {
      rule: "41 18 * * *",
    },
  },

  superCoinTransections: {
    task: async ({ strapi }) => {
      await superCoinTransections(strapi);
    },
    options: {
      rule: "0 0 * * *",
    },
  },
};

const fetchConvertionData = async () => {
  try {
    const response = await fetch(EXCHANGE_RATE_URL);
    const exchangeData = await response.json() as ExchangeRateResponse;

    // Transform to simple object structure
    const formattedData = {
      data: {
        ...exchangeData.conversion_rates,
        INR: 1
      }
    };

    console.log("Formatted currency data:", formattedData);
    return formattedData;
  } catch (error) {
    console.log("ERROR IN FETCH CONVERTION DATA CRON JOB", error);
    throw error;
  }
};

const fetchAndStoreCurrency = async (strapi: Strapi) => {
  try {
    const response = await fetchConvertionData();
    
    if (!response?.data) {
      throw new Error("Invalid currency conversion response");
    }

    await strapi.entityService.update("api::conversion.conversion", 1, {
      data: {
        currencies: JSON.parse(JSON.stringify(response)) // Ensure pure JSON object
      },
    });
    console.log("Currency conversion rates updated successfully.");
  } catch (error) {
    console.error("ERROR IN FETCH AND STORAGE CURRENCY CRON JOB", error);
    
    // Retry logic
    const retryCount = 3;
    for (let i = 0; i < retryCount; i++) {
      try {
        console.log(`Retry attempt ${i + 1} of ${retryCount}`);
        const response = await fetchConvertionData();
        await strapi.entityService.update("api::conversion.conversion", 1, {
          data: {
            currencies: JSON.parse(JSON.stringify(response))
          },
        });
        console.log("Currency conversion rates updated successfully on retry.");
        return;
      } catch (retryError) {
        console.error(`Retry ${i + 1} failed:`, retryError);
        if (i === retryCount - 1) {
          throw retryError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
};

const superCoinTransections = async (strapi: Strapi) => {
  try {
    const transections = await strapi.db
      .query("api::supercoin-transection.supercoin-transection")
      .findMany({
        where: {
          sortDate: {
            $lte: new Date(),
          },
        },
        populate: {
          user: {
            select: ["id", "superCoins"],
          },
        },
      });

    console.log("SUPERCOINTRANSECTIONCRONJOB", transections);

    // process transections
    for (const transection of transections) {
      const { user } = transection;
      if (user) {
        const { superCoins } = user;
        // update user superCoins
        await strapi.db.query("plugin::users-permissions.user").update({
          where: {
            id: user.id,
          },
          data: {
            superCoins: isNaN(superCoins)
              ? transection.amount
              : parseInt(superCoins) + parseInt(transection.amount),
          },
        });
        // dump transection
        await strapi.db
          .query("api::supercoin-transection.supercoin-transection")
          .delete({
            where: {
              id: transection.id,
            },
          });
      }
    }
  } catch (err) {
    console.log("ERROR IN SUPERCOINTRANSECTIONCRONJOB", err);
  }
};


const notifier = async (strapi: Strapi) => {
  try {
    const cart_items = await strapi.db.query("api::cart.cart").findMany({
      where: {
        $and: [
          {
            isNotified: {
              $eq: false,
            },
          },
          {
            createdAt: {
              $lt: new Date(new Date().getTime() - 0 * 0 * 1000),
            },
          },
        ],
      },
      populate: ["user"],
    });

    type uinfo = { uids: number; mobileNumber: string };

    const storage = new Map<string, uinfo>();

    for (const cart_item of cart_items) {
      if (cart_item?.user && cart_item?.user?.mobileNumber) {
        const { mobileNumber, id } = cart_item.user;
        if (!storage.has(mobileNumber)) {
          storage.set(mobileNumber, { uids: id, mobileNumber });
        }
      }
    }
    const unique_cart_items_with_user = [...storage.values()];

    const sendMessages = async ({ mobileNumber, uids }: uinfo) => {
      const all_cart_items = await strapi.db.query("api::cart.cart").findMany({
        where: {
          $and: [
            {
              user: {
                $eq: uids,
              },
            },
            {
              isNotified: {
                $eq: false,
              },
            },
          ],
        },
      });

      for (const cart_item of all_cart_items) {
        await strapi.db.query("api::cart.cart").update({
          where: {
            id: cart_item.id,
          },
          data: {
            isNotified: true,
          },
        });
      }

      await fetch("https://graph.facebook.com/v19.0/277625598767650/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer EAANZAExOOidkBO82ihrLai5SafMn0qlZCj8O9AyfOFPpSozRDYZCIh1yLT0Sfs4DzlaCS17V2R826JFOAvUYerh1ChwlH1sceSBmmoqGsbrhHmwpZBZABrDCc8CnaZBbqNNhMbjIZADvwzpfIxc03cM46SoFZAFgGfhk8KHxXZBk4kiadqJtwnfkAt7mwA3IXcTD4",
        },
        body: JSON.stringify({
          to: `${mobileNumber}`,
          type: "template",
          messaging_product: "whatsapp",
          recipient_type: "individual",
          template: {
            name: "abundance_cart_message",
            language: {
              code: "en",
            },
          },
        }),
      });
    };

    for (const mobileNumber of unique_cart_items_with_user) {
      await sendMessages(mobileNumber);
    }
  } catch (err) {
    console.log("ERRORINNOTIFIERCRONJOB", err);
  }
};
