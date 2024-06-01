module.exports = {
    routes: [
        {
            method: "POST",
            path: "/custom-filters",
            handler: "custom.seachProductByFilters",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
