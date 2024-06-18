import { Strapi } from "@strapi/strapi";

const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const processCartItemsInBatches = async (
    userMobileNumbers: any[],
    batchSize: number,
    delayTime: number
): Promise<void> => {
    for (let i = 0; i < userMobileNumbers.length; i += batchSize) {
        const batch = userMobileNumbers.slice(i, i + batchSize);

        await Promise.all(batch.map(async (mobileNumber) => {
            // Simulating an API request to process the cart item
            console.log(`Processing cart item with Mo: ${mobileNumber}`);
            await sendEllemoraWelcome({ mobile: mobileNumber });
            console.log(`Processed cart item with Mo: ${mobileNumber}`);
        }));

        if (i + batchSize < userMobileNumbers.length) {
            await delay(delayTime);
        }
    }
};


export const sendEllemoraWelcome = async ({ mobile }: { mobile: string }) => {
    await fetch("https://graph.facebook.com/v19.0/277625598767650/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer EAANZAExOOidkBO82ihrLai5SafMn0qlZCj8O9AyfOFPpSozRDYZCIh1yLT0Sfs4DzlaCS17V2R826JFOAvUYerh1ChwlH1sceSBmmoqGsbrhHmwpZBZABrDCc8CnaZBbqNNhMbjIZADvwzpfIxc03cM46SoFZAFgGfhk8KHxXZBk4kiadqJtwnfkAt7mwA3IXcTD4",
        },
        body: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: `${mobile}`,
            type: "template",
            template: {
                name: "welcome_ellemora",
                language: {
                    code: "en",
                },
            },
        }),
    });
};

export default {
    /** 
     * Simple examples.
     */
    '* * 0 * * *': async ({ strapi }: { strapi: Strapi }) => {
        console.log("🚀 ~ file: cron.js ~ executing action ~Every 12AM");

        const cartItems = await strapi.db.query('api::cart.cart').findMany({
            where: {
                createdAt: {
                    $lt: new Date(new Date().getTime() - 60 * 60 * 1000)
                }
            },
            populate: ["user"]
        })

        const userForNotification = [];

        for (const cartItem of cartItems) {
            if (cartItem?.user?.mobileNumber === undefined) return;
            if (userForNotification.includes(cartItem?.user?.mobileNumber)) continue;
            userForNotification.push(cartItem?.user?.mobileNumber)
        }
        console.log("userForNotification", userForNotification)
        // Process cart items in batches
        const batchSize = 5;
        const delayTime = 5000; // 2 seconds delay between batches

        await processCartItemsInBatches(userForNotification, batchSize, delayTime);

    },
    // '*/10 * * * * *': () => {
    //     console.log("🚀 ~ file: cron.js ~ executing action ~Every 10sec");
    // },
    // '* */5 * * * *': () => {
    //     console.log("🚀 ~ file: cron.js ~ executing action ~Every 5min");
    // },
    // '* * */5 * * *': () => {
    //     console.log("🚀 ~ file: cron.js ~ executing action ~Every 5hour");
    // },
}