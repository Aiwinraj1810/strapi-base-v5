import { factories } from "@strapi/strapi";

/**
 * Timesheet Entry Controller
 * - Limits all find/findOne requests to the logged-in user's entries.
 * - Automatically assigns the user on create.
 */
export default factories.createCoreController(
  "api::timesheet-entry.timesheet-entry",
  ({ strapi }) => ({
    async find(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("You must be logged in");

      const entries = await strapi.db
        .query("api::timesheet-entry.timesheet-entry")
        .findMany({
          where: { users_permissions_user: user.id },
          populate: ["project"],
        });

      return entries;
    },

    async findOne(ctx) {
      const { id } = ctx.params;
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("You must be logged in");

      const entry = await strapi.db
        .query("api::timesheet-entry.timesheet-entry")
        .findOne({
          where: { id: Number(id), users_permissions_user: user.id },
          populate: ["project"],
        });

      if (!entry) return ctx.notFound("Entry not found or not yours");
      return entry;
    },

    async create(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("You must be logged in");

      const data = {
        ...ctx.request.body.data,
        users_permissions_user: user.id,
      };

      const newEntry = await strapi.db
        .query("api::timesheet-entry.timesheet-entry")
        .create({ data });

      return newEntry;
    },
  })
);
