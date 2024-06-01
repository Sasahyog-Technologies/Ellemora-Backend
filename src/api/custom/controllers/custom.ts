"use strict";

/**
 * custom controller
 */

// import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::custom.custom');



import { Strapi } from "@strapi/strapi";
import { Context } from "koa";


const filterExpectedType = {
    colors: ["red"],
    sizes: ["small", "large"],
    price: [10, 20] // min, max

}

interface filters {
    colors: string[],
    sizes: string[],
    price: number[]
}

export default ({ strapi }: { strapi: Strapi }) => ({
    async seachProductByFilters(ctx: Context) {

        try {
            const products = await strapi.db.query('api::product.product').findMany({
                populate: {
                    variants: {
                        populate: {
                            media: true
                        }
                    },
                    variations: {
                        populate: {
                            values: true
                        }
                    }
                },
            });


            const PRODUCT = products.map((product) => {

            })



            ctx.send(products);
        } catch (err) {
            ctx.send({ error: 'An error occurred while fetching products.' }, 500);
        }
    }
});


