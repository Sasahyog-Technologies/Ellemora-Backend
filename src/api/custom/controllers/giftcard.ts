"use strict";
import { Context } from "koa";
import { Strapi } from "@strapi/strapi";

interface createGiftCard {
    userId: number,
    amount: number,
    gateway: string
    templateId: number,
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
                // If all operations are successful, commit the transaction
                await trx.commit();
                // return { giftcard, transection }; // Return the created entities

                return ctx.send({
                    giftcard,
                    transection
                })
            } catch (error) {
                // If an error occurs, rollback the transaction
                await trx.rollback();
                console.error(JSON.stringify(error, null, 2));
                ctx.throw(500, 'Internal Server Error')

            }
        });
    }
})
