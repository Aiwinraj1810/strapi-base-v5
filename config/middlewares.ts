export default [
  "strapi::logger",
  "strapi::errors",
  // "strapi::security",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "default-src": ["'self'", "data:", "blob:", "https:", "http:"],
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "https://editor.unlayer.com",
          ],
          "style-src": ["'self'", "'unsafe-inline'", "https:", "http:"],
          "img-src": ["'self'", "data:", "blob:", "https:", "http:"],
          "media-src": ["'self'", "data:", "blob:", "https:", "http:"],
          "connect-src": [
            "'self'",
            "data:",
            "blob:",
            "https:",
            "http:",
            "wss:",
          ],
          "font-src": ["'self'", "https:", "data:"],
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [process.env.FRONTEND_URL],
    },
  },
];
