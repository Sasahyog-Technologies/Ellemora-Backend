// ./config/middleware.js

module.exports = ({ env }) => [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          'img-src': ["'self'", "data:", "blob:", "https://ellemora.s3.amazonaws.com", "https://s3.eu-north-1.amazonaws.com"],
          'media-src': ["'self'", "data:", "blob:", "https://ellemora.s3.amazonaws.com", "https://s3.eu-north-1.amazonaws.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
    settings: {
      cors: {
        origin: ["*"],
        headers: ["*"]
      }
    }
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
