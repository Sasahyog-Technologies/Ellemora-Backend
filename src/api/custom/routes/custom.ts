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
        }, {
            method: "POST",
            path: "/create-gift-card",
            handler: "giftcard.createGiftCard",
            config: {
                policies: [],
                middlewares: []
            }
        },
        {
            method: "POST",
            path: "/redeem-gift-card",
            handler: "giftcard.redeemGiftCard",
            config: {
                policies: [],
                middlewares: []
            }
        },
        {
            method: "POST",
            path: "/add-money-to-wallet",
            handler: "wallet.addMoneyToWallet",
            config: {
                policies: [],
                middlewares: []
            }
        }
    ],
};
