import type { Core } from "@strapi/strapi";
import { RouteHandler, RouteHandlerDelete } from "./helpers/utils";
import _ from "lodash";
const configModel = "api::remote-config.remote-config";
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      async afterCreate(event) {
        let configData = await strapi.documents(configModel).findFirst();
        const { result, model } = event;
        if (
          result.publishedAt &&
          _.castArray(configData?.RouteModels)?.includes(model.singularName)
        ) {
          await RouteHandler(result, model.singularName);
        }
      },
      async afterUpdate(event) {
        let configData = await strapi.documents(configModel).findFirst();
        const { result, model } = event;
        if (
          result.publishedAt &&
          _.castArray(configData?.RouteModels)?.includes(model.singularName)
        ) {
          await RouteHandler(result, model.singularName);
        }
      },
      async afterDelete(event) {
        let configData = await strapi.documents(configModel).findFirst();
        const { result, model } = event;
        if (
          _.castArray(configData?.RouteModels)?.includes(model.singularName)
        ) {
          await RouteHandlerDelete(result, model.singularName);
        }
      },
    });
  },
};
