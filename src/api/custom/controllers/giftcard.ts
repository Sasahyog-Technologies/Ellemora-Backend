"use strict";
import { Context } from "koa";
import { Strapi } from "@strapi/strapi";

interface createGiftCard {
    userId: number,
    amount: number,
    gateway: string
    templateId: number,
}

interface redeemGiftCard {
    userId: number,
    giftcardCode: string,
}

export default ({ strapi }: { strapi: Strapi }) => ({
    createGiftCard: async (ctx: Context) => {
        const {
            gateway, amount, templateId, userId
        } = ctx.request.body.data as createGiftCard;

        if (!gateway || !amount || !templateId || !userId) {
            ctx.throw(400, 'Please provide all required fields')
        }
        const knex = strapi.db.connection; // Get the Knex instance
        return await knex.transaction(async (trx) => {
            try {
                const giftcard = await strapi.entityService.create("api::giftcard.giftcard", {
                    data: {
                        isActive: true,
                        isRedeemed: false,
                        balance: amount,
                        template: templateId,
                        createdByUser: userId,
                        publishedAt: new Date(),
                    }
                })
                const transection = await strapi.entityService.create("api::transection.transection", {
                    data: {
                        status: "paid",
                        type: "giftcard",
                        user: userId,
                        label: "Gift Card",
                        value: amount,
                        amount: amount,
                        gateway: gateway,
                        giftcard: giftcard.id,
                        publishedAt: new Date(),

                    }
                })
                await trx.commit();
                return ctx.send({
                    data: {
                        giftcard,
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
    },
    redeemGiftCard: async (ctx: Context) => {
        const {
            userId, giftcardCode
        } = ctx.request.body.data as redeemGiftCard;

        if (!userId || !giftcardCode) {
            ctx.throw(400, 'Please provide all required fields')
        }
        const knex = strapi.db.connection; // Get the Knex instance

        return await knex.transaction(async (trx) => {
            try {
                const giftcard = await strapi.query("api::giftcard.giftcard").findOne({
                    where: {
                        code: giftcardCode
                    }
                })

                if (!giftcard || !giftcard.isActive || giftcard.isRedeemed || giftcard.balance <= 0) {
                    return ctx.send({
                        error: "Giftcard not redeemable",
                        data: null
                    }, 500)
                }

                const wallet = await strapi.query("api::wallet.wallet").findOne({
                    where: {
                        user: userId
                    }
                });

                if (wallet) {
                    await strapi.entityService.update("api::wallet.wallet", wallet.id, {
                        data: {
                            balance: wallet.balance + giftcard.balance
                        }
                    })
                } else {
                    await strapi.entityService.create("api::wallet.wallet", {
                        data: {
                            user: userId,
                            balance: giftcard.balance,
                            publishedAt: new Date(),
                        }
                    })
                }

                const updatedGiftcard = await strapi.entityService.update("api::giftcard.giftcard", giftcard.id, {
                    data: {
                        balance: 0,
                        isRedeemed: true,
                    }
                })

                const giftcardTransection = await strapi.entityService.create("api::transection.transection", {
                    data: {
                        amount: 0,
                        user: userId,
                        status: "paid",
                        type: "giftcard",
                        label: "Gift Card",
                        value: -giftcard.balance,
                        giftcard: giftcard.id,
                        publishedAt: new Date(),
                    }
                })

                const walletTransection = await strapi.entityService.create("api::transection.transection", {
                    data: {
                        amount: 0,
                        user: userId,
                        status: "paid",
                        type: "wallet",
                        label: "Wallet",
                        wallet: wallet.id,
                        value: giftcard.balance,
                        publishedAt: new Date(),
                    }
                })

                await trx.commit();
                return ctx.send({
                    data: {
                        giftcard: updatedGiftcard,
                        transections: [
                            giftcardTransection,
                            walletTransection
                        ]
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
