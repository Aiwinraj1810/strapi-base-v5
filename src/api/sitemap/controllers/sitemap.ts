/**
 * sitemap controller
 */

import { factories } from "@strapi/strapi";
const model = "api::sitemap.sitemap";
const { formatError } = require("../../../helpers/errors");

export default factories.createCoreController(model, ({ strapi }) => ({
  async getData(ctx) {
    try {
      const result = await strapi.service(model).getData(ctx);
      const sanitizedResults = await this.sanitizeOutput(result, ctx);
      return this.transformResponse(sanitizedResults);
    } catch (error) {
      formatError(ctx, error);
    }
  },
  async getDataDynamic(ctx) {
    try {
      const result = await strapi.service(model).getDataDynamic(ctx);
      const sanitizedResults = await this.sanitizeOutput(result, ctx);
      return this.transformResponse(sanitizedResults);
    } catch (error) {
      formatError(ctx, error);
    }
  },
}));
