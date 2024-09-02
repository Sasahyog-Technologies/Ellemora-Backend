module.exports = {
    routes: [
        {
            method: "GET",
            path: "/product-filters",
            handler: "custom.seachProductByFilters",
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/category-filters",
            handler: "category-based-filters.searchProductByFilters",
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/v2/category-filters",
            handler: "category-based-filters2.searchProductByFilters",
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/v2/update-first-variant",
            handler: "category-based-filters2.updateFirstVariant",
            config: {
                policies: [],
                middlewares: [],
            },
        },


    ],
};
