export default ({ env }) => ({
  NODE_ENV: env("NODE_ENV", "development"), 
  SEND_CUSTOM_MAIL: "true",
  RECAPTCHA_SECRET: env("RECAPTCHA_SECRET", ""),
  RECAPTCHA_BASE_URL: env(
    "RECAPTCH_BASE_URL",
    "https://www.google.com/recaptcha/api/siteverify"
  ),
});
