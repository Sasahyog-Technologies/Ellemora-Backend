"use strict";
import { Context } from "koa";
import { Strapi } from "@strapi/strapi";

interface addMoneyToWallet {
    userId: number,
    amount: number,
    gateway: string
}

export default ({ strapi }: { strapi: Strapi }) => ({
    addMoneyToWallet: async (ctx: Context) => {
        const {
            gateway, amount, userId
        } = ctx.request.body.data as addMoneyToWallet;

        if (!gateway || !amount || !userId) {
            ctx.throw(400, 'Please provide all required fields')
        }

        const knex = strapi.db.connection; // Get the Knex instance

        return await knex.transaction(async (trx) => {
            try {
                const wallet = await strapi.query("api::wallet.wallet").findOne({
                    where: {
                        user: userId
                    }
                });

                if (wallet) {
                    await strapi.entityService.update("api::wallet.wallet", wallet.id, {
                        data: {
                            balance: wallet.balance + amount
                        }
                    })
                } else {
                    await strapi.entityService.create("api::wallet.wallet", {
                        data: {
                            user: userId,
                            balance: amount,
                            publishedAt: new Date(),
                        }
                    })
                }

                const transection = await strapi.entityService.create("api::transection.transection", {
                    data: {
                        status: "paid",
                        type: "wallet",
                        user: userId,
                        label: "wallet",
                        value: amount,
                        amount: amount,
                        gateway: gateway,
                        wallet: wallet.id,
                        publishedAt: new Date(),
                    }
                })

                const finalWallet = await strapi.query("api::wallet.wallet").findOne({
                    where: {
                        user: userId
                    }
                });

                await trx.commit();
                return ctx.send({
                    data: {
                        wallet: finalWallet,
                        transection
                    },
                    error: null
                }, 200)
            } catch (error) {
                await trx.rollback();
                console.error(JSON.stringify(error, null, 2));
                return ctx.send({
                    error: error,
                    data: null
                }, 500)
            }
        });
    }
})
