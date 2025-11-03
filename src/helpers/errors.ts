import { errors as strapiErrors } from "@strapi/utils";
import { logger } from "./logger";
import * as lodash from "lodash";

/**
 * Context interface for Strapi request context
 */
interface StrapiContext {
  request: {
    query: Record<string, any>;
  };
  locale?: string;
  send: (data: any, status?: number) => void;
}

/**
 * Error details interface
 */
interface ErrorDetails {
  errors?: Array<{
    message: string;
    messageHandle?: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

/**
 * Custom error response format
 */
interface ErrorResponse {
  title: string;
  message: string;
  customMsgId: string;
  details: ErrorDetails;
  status: number;
  name: string;
}

/**
 * API response format
 */
interface ApiResponse {
  data: any;
  success: boolean;
  error?: ErrorResponse;
}

/**
 * System error class for handling Strapi errors
 */
class SystemError extends Error {
  statusCode?: number;
  error: Error;
  message: string;

  constructor(error: Error) {
    super(error.message);
    this.error = error;
    this.message = error.message;
  }

  toJSON(): {
    statusCode?: number;
    error: Error;
    message: string;
    data: Record<string, any>;
    success: boolean;
  } {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
      data: {},
      success: false,
    };
  }
}

/**
 * Format and handle errors with localization support
 */
const formatError = async (
  ctx: StrapiContext | null,
  error: any,
  errMsgID: string = "10001"
): Promise<ApiResponse | void> => {
  logger.error(error);
  //* Uncomment and adjust the following lines if "api::error-log.error-log" is available in your context
  //   try {
  //     const { LOG_STRAPI_ERROR } = ctx?.request?.query;
  //     if (LOG_STRAPI_ERROR) {
  //       await strapi.entityService.create("api::error-log.error-log", {
  //         data: {
  //           error: JSON.stringify(error),
  //           request: JSON.stringify(ctx.request),
  //         },
  //       });
  //     }
  //   } catch (ex) {
  //     logger.error(ex);
  //   }
  // check only added for handling services currently
  const message = await replaceMessage(error.message, ctx?.locale);

  error.title = lodash.isObject(message)
    ? lodash.get(message, "Title", "An internal server error occurred")
    : "Opps! Something went wrong.";
  if (error.message !== "__Signup.UserNotFound") {
    error.message = lodash.isString(message)
      ? message
      : lodash.isObject(message)
      ? lodash.get(message, "Message", "An internal server error occurred")
      : "An internal server error occurred";
  }
  if (error.details && error.details.errors) {
    for (const detailsError of error.details.errors) {
      detailsError.messageHandle = detailsError.message;
      const message = await replaceMessage(error.message, ctx?.locale);

      detailsError.message = lodash.isString(message)
        ? message
        : lodash.isObject(message)
        ? lodash.get(message, "Message", "An internal server error occurred")
        : "An internal server error occurred";
    }
  }

  if (ctx) {
    ctx.send(
      {
        data: null,
        success: false,
        error: checkErrorMsgFormat(error, errMsgID),
      },
      400
    );
  } else {
    return {
      data: null,
      success: false,
      error: checkErrorMsgFormat(error, errMsgID),
    };
  }
};

/**
 * Replace error messages with localized versions
 */
const replaceMessage = async (
  message: string,
  locale: string = "en"
): Promise<string | any> => {
  if (message && typeof message === "string" && message.startsWith("__")) {
    //* Uncomment and adjust the following lines if "api::message.message" is available in your context
    // let newMessage = await strapi.query("api::message.message").findOne({
    //   where: {
    //     type: message,
    //     locale: locale,
    //   },
    // });
    // message = newMessage ? newMessage : message;
  }
  return message;
};

/**
 * Format error message with consistent structure
 */
const checkErrorMsgFormat = (error: any, errMsgID: string): ErrorResponse => {
  let obj: ErrorResponse = {
    title: error.title,
    message: error.message,
    customMsgId: errMsgID,
    details: error.details,
    status: error.status || 400,
    name: "",
  };

  if (!error.title) obj.title = "Not Found";

  if (!error.message) obj.message = "Not Found";

  if (!obj.status) obj.status = 400;

  if (!error.name) obj.name = "NotFoundError";

  if (!error.details) obj.details = {};

  return obj;
};

/**
 * Custom error class for application-specific errors
 */
class CustomError extends Error {
  name: string;
  error?: any;
  message: string;
  details: Record<string, any>;

  constructor(
    message: string,
    name: string = "CustomError",
    details: Record<string, any> = {}
  ) {
    super(message);
    this.name = name;
    this.message = message;
    this.details = details;
  }

  toJSON(): {
    name: string;
    details: Record<string, any>;
    message: string;
  } {
    return {
      name: this.name,
      details: this.details,
      message: this.message,
    };
  }
}

/**
 * Export all error utilities and Strapi error utilities
 */
export {
  SystemError,
  formatError,
  replaceMessage,
  checkErrorMsgFormat,
  CustomError,
  strapiErrors,
};

export default {
  SystemError,
  formatError,
  replaceMessage,
  checkErrorMsgFormat,
  CustomError,
  ...strapiErrors,
};
