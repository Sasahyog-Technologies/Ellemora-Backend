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
    ],
};
