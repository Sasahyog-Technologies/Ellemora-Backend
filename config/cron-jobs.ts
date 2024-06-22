import { Strapi } from "@strapi/strapi";

export default {

    '* * 1 * * *': async ({ strapi }: { strapi: Strapi }) => {
        try {
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");

            const cart_items = await strapi.db.query('api::cart.cart').findMany({
                where: {
                    $and: [
                        {
                            isNotified: {
                                $eq: false,
                            }
                        },
                        {
                            createdAt: {
                                $lt: new Date(new Date().getTime() - 0 * 0 * 1000)
                            }
                        }
                    ]
                },
                populate: ["user"]
            })

            type uinfo = { uids: number, mobileNumber: string }

            const storage = new Map<string, uinfo>()

            for (const cart_item of cart_items) {
                if (cart_item?.user && cart_item?.user?.mobileNumber) {
                    const { mobileNumber, id } = cart_item.user
                    if (!storage.has(mobileNumber)) {
                        storage.set(mobileNumber, { uids: id, mobileNumber })
                    }
                }
            }
            const unique_cart_items_with_user = [...storage.values()]

            console.log(unique_cart_items_with_user)

            const sendMessages = async ({
                mobileNumber, uids
            }: uinfo) => {

                const all_cart_items = await strapi.db.query('api::cart.cart').findMany({
                    where: {
                        $and: [
                            {
                                user: {
                                    $eq: uids
                                }
                            },
                            {
                                isNotified: {
                                    $eq: false
                                }
                            }
                        ]
                    },
                })

                for (const cart_item of all_cart_items) {
                    await strapi.db.query('api::cart.cart').update({
                        where: {
                            id: cart_item.id
                        },
                        data: {
                            isNotified: true
                        }
                    })
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
            }

            for (const mobileNumber of unique_cart_items_with_user) {
                await sendMessages(mobileNumber)
            }
            console.log("**********************************************");
        }
        catch (err) {
            console.log("🚀 ~ file: cron.js ~ executing action ~Every 10sec", err);
        }
    }

}