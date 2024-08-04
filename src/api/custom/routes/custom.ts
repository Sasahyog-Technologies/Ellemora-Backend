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

    ],
};
