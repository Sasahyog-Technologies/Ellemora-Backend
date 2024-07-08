"use strict";
/**
 * custom controller
 */
import { Context } from "koa";
import { Strapi } from "@strapi/strapi";

interface Body {
    query?: string,
    sort?: string,
    filters?: {
        colors?: string[],
        sizes?: string[],
        prices?: [number, number],
    },
    pagination?: {
        page?: number,
        pageSize?: number
    }
}

interface queryOptions {
    sort?: string,
    query?: string,
    colors?: string,
    sizes?: string,
    prices?: string,
    page?: number,
    pageSize?: number
}

const vQFilter = (query: queryOptions) => {
    return {
        query: query.query || undefined,
        sort: query.sort || undefined,
        filters: {
            colors: query.colors ? query.colors.split(",") : [],
            sizes: query.sizes ? query.sizes.split(",") : [],
            prices: query.prices ? query.prices.split(",").map(Number) : [0, 10000000],
        },
        pagination: {
            page: query.page ? Number(query.page) : 1,
            pageSize: query.pageSize ? Number(query.pageSize) : 25
        },
    } as Body
}

const vQBuilder = (queryFilters: Body) => {

    const { query, filters } = queryFilters

    const queryBasedSearch = query ? [{
        title: {
            $containsi: query,
        },
    }] : []

    const colorOptionQueries = filters?.colors?.map(color => ({
        variants: {
            options: {
                option: "color",
                value: {
                    $eqi: color,
                },
            }
        }
    }))

    const sizeOptionQueries = filters?.sizes?.map(size => ({
        variants: {
            options: {
                option: "size",
                value: {
                    $eqi: size,
                },
            }
        }
    }))

    const priceQueries = filters?.prices ? [{
        variants: {
            price: {
                $gte: filters.prices[0],
                $lte: filters.prices[1]
            }
        }
    }] : []

    const publishedQuery = [
        {
            published_at: {
                $notNull: true,
            },
        },
    ];

    const combinedFilters = [
        ...queryBasedSearch,
        {
            $or: colorOptionQueries,
        },
        {
            $or: sizeOptionQueries,
        },
        ...priceQueries,
        ...publishedQuery,
    ];

    return combinedFilters;
}

export default ({ strapi }: { strapi: Strapi }) => ({

    async seachProductByFilters(ctx: Context) {
        const query = ctx.request.query as queryOptions
        const filters = vQFilter(query)
        const optionQuaries = vQBuilder(filters)

        console.log(filters, optionQuaries)

        try {
            const products = await strapi.query("api::product.product").findMany({
                where: {
                    $and: optionQuaries,
                },
                orderBy: filters.sort ? {
                    variants: {
                        price: filters.sort
                    }
                } : undefined,
                populate: {
                    variants: {
                        populate: {
                            options: true
                        }
                    },
                    media: {
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
                count: true,
                page: filters.pagination.page,
                pageSize: filters.pagination.pageSize,
            })
            ctx.send({ products }, 200);
        } catch (err) {
            console.log(err)
            ctx.send({ error: 'An error occurred while fetching products.' }, 500);
        }
    }
});

