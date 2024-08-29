export default ({ env }) => ({
  "rest-cache": {
    config: {
      provider: {
        name: "memory",
        options: {
          max: 32767,
          maxAge: 3600,
        },
      },
      strategy: {
        contentTypes: [
          // list of Content-Types UID to cache
          "api::product.product",
          "api::product-variant.product-variant",
          "api::collection.collection",
          "api::banner.banner",
          "api::post.post",
          "api::comission.comission",
          "api::conversion.conversion",
          "api::custom.custom"
        ],
      },
    },
  },

  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms: {
        wrapBodyWithDataKey: true,
      },
      hooks: {
        preResponseTransform: (ctx) => { },
        postResponseTransform: (ctx) => { },
      },
      plugins: {
        ids: {
          slugify: true,
        },
      },
    },
  },
  "import-export-entries": {
    enabled: true,
    config: {
      // See `Config` section.
    },
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: "https://aws.ellemora.com",
        rootPath: "ellemora",
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          params: {
            // ACL: env("AWS_ACL", "public-read"),
            signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
      actionOptions: {
        upload: {
          ACL: null
        },
        uploadStream: {
          ACL: null
        },
        delete: {},
      },
    },
  },
});
