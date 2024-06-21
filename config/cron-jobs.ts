import { Strapi } from "@strapi/strapi";

const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const processCartItemsInBatches = async (
    notifications: {
        mobile: string,
        cartId: number
    }[],
    batchSize: number,
    delayTime: number
): Promise<void> => {
    for (let i = 0; i < notifications.length; i += batchSize) {
        const batch = notifications.slice(i, i + batchSize);

        await Promise.all(batch.map(async (notification) => {
            // Simulating an API request to process the cart item
            console.log(`Processing cart item with Mo: ${notification?.mobile}`);
            await sendEllemoraWelcome(notification);
            console.log(`Processed cart item with Mo: ${notification?.mobile}`);
        }));

        if (i + batchSize < notifications.length) {
            await delay(delayTime);
        }
    }
};

export const sendEllemoraWelcome = async ({ mobile, cartId }: { mobile: string, cartId: number }) => {
    await fetch("https://graph.facebook.com/v19.0/277625598767650/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer EAANZAExOOidkBO82ihrLai5SafMn0qlZCj8O9AyfOFPpSozRDYZCIh1yLT0Sfs4DzlaCS17V2R826JFOAvUYerh1ChwlH1sceSBmmoqGsbrhHmwpZBZABrDCc8CnaZBbqNNhMbjIZADvwzpfIxc03cM46SoFZAFgGfhk8KHxXZBk4kiadqJtwnfkAt7mwA3IXcTD4",
        },
        body: JSON.stringify({
            to: `${mobile}`,
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
    // Update the cart item to be notified
    await strapi.db.query('api::cart.cart').update({
        where: { id: cartId },
        data: { isNotified: true }
    });
};

export default {
    /** 
     * Simple examples.
     */
    '* * 1 * * *': async ({ strapi }: { strapi: Strapi }) => {
        console.log("🚀 ~ file: cron.js ~ executing action ~ every hour");
        // Fetch all cart items that have not been notified and were created more than 1 hour ago
        const cartItems = await strapi.db.query('api::cart.cart').findMany({
            where: {
                isNotified: {
                    $ne: true
                },
                createdAt: {
                    $lt: new Date(new Date().getTime() - 0 * 0 * 1000)
                }
            },
            populate: ["user"]
        })

        const userForNotification: {
            mobile: string,
            cartId: number
        }[] = [];

        for (const cartItem of cartItems) {
            if (cartItem?.user?.mobileNumber === undefined) return;
            if (userForNotification.find((user) => user.mobile === cartItem?.user?.mobileNumber)) continue;
            userForNotification.push({
                cartId: cartItem.id,
                mobile: cartItem?.user?.mobileNumber,
            })
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