"use strict";
import { Context } from "koa";
import { Strapi } from "@strapi/strapi";

interface createGiftCard {
    userId: string,
    amount: string,
    gateway: string
    templateId: string,
}
export default ({ strapi }: { strapi: Strapi }) => ({
    createGiftCard: async (ctx: Context) => {
        const {
            gateway, amount, templateId, userId
        } = ctx.request.body as createGiftCard
        const code = Math.random().toString(36).substring(16);
        const knex = strapi.db.connection; // Get the Knex instance

        return await knex.transaction(async (trx) => {
            try {
                const giftcard = await strapi.entityService.create("api::giftcard.giftcard", {
                    data: {
                        code,
                        isActive: true,
                        isRedeemed: false,
                        balance: amount,
                        template: templateId,
                        createdByUserId: userId,
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
