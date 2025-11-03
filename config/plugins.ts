const LOCAL_UPLOAD_PROVIDER = "local";
const AWS_S3_UPLOAD_PROVIDER = "aws-s3";
const SENDMAIL_EMAIL_PROVIDER = "sendmail";
const NODEMAILER_EMAIL_PROVIDER = "nodemailer";
const SENDGRID_EMAIL_PROVIDER = "sendgrid";
const CF_UPLOAD_PROVIDER = "cloudflare-r2";

export default ({ env }) => ({
  // ..other plugins
  upload: getUploadProviderConfig(env),
  email: getEmailProviderConfig(env),  
  "schema-visualizer": {
    enabled: true,
  },
  "strapi-plugin-dashboard": {
    enabled: true,
  },
  "users-permissions": {
    config: {
      jwt: {
        /* the following  parameter will be used to generate:
             - regular tokens with username and password
             - refreshed tokens when using the refreshToken API
            */
        expiresIn: "1m", // This value should be lower than the refreshTokenExpiresIn below.
      },
    },
  },
  "refresh-token": {
    config: {
      refreshTokenExpiresIn: "2m", // this value should be higher than the jwt.expiresIn
      requestRefreshOnAll: false, // automatically send a refresh token in all login requests.
      refreshTokenSecret: env("REFRESH_JWT_SECRET") || "SomethingSecret",
      cookieResponse: false, // if set to true, the refresh token will be sent in a cookie
      refreshTokenRotation: false, // forces a new Refresh token, deleting the previously used one from the db.
    },
  },
});

const getBaseUploadConfig = () => ({
  config: {
    provider: LOCAL_UPLOAD_PROVIDER,
  },
});

const getBaseEmailConfig = () => ({
  config: {
    provider: SENDMAIL_EMAIL_PROVIDER,
    providerOptions: {},
    settings: {},
  },
});

const getAWSProviderOptions = (env) => ({
  baseUrl: env("CDN_URL"),
  rootPath: env("CDN_ROOT_PATH"),
  s3Options: {
    credentials: {
      accessKeyId: env("AWS_ACCESS_KEY_ID"),
      secretAccessKey: env("AWS_ACCESS_SECRET"),
    },
    region: env("AWS_REGION"),
    params: {
      ACL: env("AWS_ACL", "public-read"),
      signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
      Bucket: env("AWS_BUCKET"),
    },
  },
});

const getCFProviderOptions = (env) => ({
  accessKeyId: env("CF_ACCESS_KEY_ID"),
  secretAccessKey: env("CF_ACCESS_SECRET"),
  endpoint: env("CF_ENDPOINT"),
  params: {
    Bucket: env("CF_BUCKET"),
  },
  cloudflarePublicAccessUrl: env("CF_PUBLIC_ACCESS_URL"),
  /**
   * Sets if all assets should be uploaded in the root dir regardless the strapi folder.
   * It is useful because strapi sets folder names with numbers, not by user's input folder name
   * By default it is false
   */
  pool: false,
});

const getUploadProviderConfig = (env) => {
  switch (env("UPLOAD_PROVIDER")) {
    case AWS_S3_UPLOAD_PROVIDER:
      return {
        config: {
          provider: AWS_S3_UPLOAD_PROVIDER,
          providerOptions: getAWSProviderOptions(env),
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      };
    case CF_UPLOAD_PROVIDER:
      return {
        config: {
          breakpoints: {
            large: 2500,
            medium: 1920,
            small: 1440,
            xsmall: 991,
          },
          provider: CF_UPLOAD_PROVIDER,
          providerOptions: getCFProviderOptions(env),
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      };
    default:
      break;
  }
  return getBaseUploadConfig();
};

const getNodemailerOptions = (env) => ({
  host: env("SMTP_HOST", "smtp.example.com"),
  port: env("SMTP_PORT", 587),
  auth: {
    user: env("SMTP_USERNAME"),
    pass: env("SMTP_PASSWORD"),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const getEmailProviderConfig = (env) => {
  const config = getBaseEmailConfig();

  if (env("EMAIL_PROVIDER") === NODEMAILER_EMAIL_PROVIDER) {
    config.config.provider = NODEMAILER_EMAIL_PROVIDER;
    config.config.providerOptions = getNodemailerOptions(env);
  } else if (env("EMAIL_PROVIDER") === SENDGRID_EMAIL_PROVIDER) {
    config.config.provider = SENDGRID_EMAIL_PROVIDER;
    config.config.providerOptions = { apiKey: env("SENDGRID_API_KEY") };
  }

  config.config.settings = {
    defaultFrom: env("EMAIL_DEFAULT_FROM"),
    defaultReplyTo: env("EMAIL_DEFAULT_TO"),
    testAddress: env("EMAIL_DEFAULT_TO"),
  };

  return config;
};
