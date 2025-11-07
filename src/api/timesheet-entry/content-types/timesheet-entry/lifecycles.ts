import { startOfWeek, endOfWeek } from "date-fns";

export default {
  /**
   * Before creating or updating an entry:
   * - Automatically calculate weekStart and weekEnd.
   */
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.date) {
      const date = new Date(data.date);
      data.weekStart = startOfWeek(date, { weekStartsOn: 1 });
      data.weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      strapi.log.info("🟢 [beforeCreate] weekStart/weekEnd set:", data.weekStart, data.weekEnd);
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.date) {
      const date = new Date(data.date);
      data.weekStart = startOfWeek(date, { weekStartsOn: 1 });
      data.weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      strapi.log.info("🟢 [beforeUpdate] weekStart/weekEnd updated:", data.weekStart, data.weekEnd);
    }
  },

  /**
   * After create/update/delete:
   * - Recalculate total hours for the week
   * - Update or create per-user summary record
   */
  async afterCreate(event) {
    const { id } = event.result;
    // Re-fetch the full entry with user relation populated
    const entry = await strapi.db.query("api::timesheet-entry.timesheet-entry").findOne({
      where: { id },
      populate: ["users_permissions_user"],
    });

    if (entry?.users_permissions_user?.id) {
      await updateWeeklySummary(entry.weekStart, entry.weekEnd, entry.users_permissions_user.id);
      strapi.log.info(`✅ [afterCreate] Summary updated for user ${entry.users_permissions_user.id}`);
    } else {
      strapi.log.warn("⚠️ [afterCreate] User relation missing after create:", entry);
    }
  },

  async afterUpdate(event) {
    const { id } = event.result;
    const entry = await strapi.db.query("api::timesheet-entry.timesheet-entry").findOne({
      where: { id },
      populate: ["users_permissions_user"],
    });

    if (entry?.users_permissions_user?.id) {
      await updateWeeklySummary(entry.weekStart, entry.weekEnd, entry.users_permissions_user.id);
      strapi.log.info(`✅ [afterUpdate] Summary updated for user ${entry.users_permissions_user.id}`);
    } else {
      strapi.log.warn("⚠️ [afterUpdate] User relation missing after update:", entry);
    }
  },

  async afterDelete(event) {
    const deleted = event.result || event.params.where;
    const userId = deleted?.users_permissions_user?.id || deleted?.users_permissions_user;
    const { weekStart, weekEnd } = deleted || {};

    if (weekStart && weekEnd && userId) {
      await updateWeeklySummary(weekStart, weekEnd, userId);
      strapi.log.info(`🗑️ [afterDelete] Summary updated after delete for user ${userId}`);
    } else {
      strapi.log.warn("⚠️ [afterDelete] Missing data, skipping summary update.");
    }
  },
};

/**
 * Helper to update or create a per-user weekly summary
 */
async function updateWeeklySummary(weekStart: Date, weekEnd: Date, userId: number) {
  if (!weekStart || !weekEnd || !userId) return;

  try {
    const db = strapi.db.query("api::timesheet-entry.timesheet-entry");
    const summaryDB = strapi.db.query("api::timesheet-summary.timesheet-summary");

    const start = new Date(weekStart).toISOString().split("T")[0];
    const end = new Date(weekEnd).toISOString().split("T")[0];

    // 🟢 Fetch only this user's entries for that week
    const entries = await db.findMany({
      where: {
        weekStart: start,
        weekEnd: end,
        users_permissions_user: userId,
      },
      select: ["hours"],
    });

    const totalHours = entries.reduce((sum, e) => sum + Number(e.hours || 0), 0);

    // Determine status
    let summaryStatus = "Missing";
    if (totalHours === 0) summaryStatus = "Missing";
    else if (totalHours < 40) summaryStatus = "Incomplete";
    else summaryStatus = "Completed";

    // Check for existing summary
    const existing = await summaryDB.findOne({
      where: { weekStart: start, weekEnd: end, users_permissions_user: userId },
    });

    if (existing) {
      await summaryDB.update({
        where: { id: existing.id },
        data: { totalHours, summaryStatus },
      });
      strapi.log.info(`🔄 Updated summary for user ${userId} (${start} - ${end})`);
    } else {
      await summaryDB.create({
        data: {
          weekStart: start,
          weekEnd: end,
          totalHours,
          summaryStatus,
          users_permissions_user: userId,
        },
      });
      strapi.log.info(`🆕 Created summary for user ${userId} (${start} - ${end})`);
    }
  } catch (err) {
    strapi.log.error("❌ [updateWeeklySummary] Error:", err);
  }
}
