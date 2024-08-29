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
          'img-src': ["'self'", "data:", "blob:", "https://aws.ellemora.com", "https://aws.ellemora.com"],
          'media-src': ["'self'", "data:", "blob:", "https://aws.ellemora.com", "https://aws.ellemora.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
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
