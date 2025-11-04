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
      console.log("🟢 [beforeCreate] weekStart/weekEnd set:", data.weekStart, data.weekEnd);
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.date) {
      const date = new Date(data.date);
      data.weekStart = startOfWeek(date, { weekStartsOn: 1 });
      data.weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      console.log("🟢 [beforeUpdate] weekStart/weekEnd updated:", data.weekStart, data.weekEnd);
    }
  },

  /**
   * After create/update/delete:
   * - Recalculate total hours for the week
   * - Update or create summary record
   */
  async afterCreate(event) {
    await updateWeeklySummary(event.result.weekStart, event.result.weekEnd);
  },

  async afterUpdate(event) {
    await updateWeeklySummary(event.result.weekStart, event.result.weekEnd);
  },

  async afterDelete(event) {
    const { weekStart, weekEnd } = event.params.where;
    if (weekStart && weekEnd) {
      await updateWeeklySummary(weekStart, weekEnd);
    }
  },
};

/**
 * Helper to update or create the weekly summary
 */
async function updateWeeklySummary(weekStart: Date, weekEnd: Date) {

  if (!weekStart || !weekEnd) {
    return;
  }

  try {
    const db = strapi.db.query("api::timesheet-entry.timesheet-entry");
    const summaryDB = strapi.db.query("api::timesheet-summary.timesheet-summary");

    // Normalize to ISO date-only strings (Strapi stores dates as YYYY-MM-DD)
    const start = new Date(weekStart).toISOString().split("T")[0];
    const end = new Date(weekEnd).toISOString().split("T")[0];


    const entries = await db.findMany({
      where: { weekStart: start, weekEnd: end },
      select: ["hours", "date"],
    });


    const totalHours = entries.reduce((sum, e) => sum + Number(e.hours || 0), 0);

    // Determine summaryStatus
    let summaryStatus = "Missing";
    if (totalHours === 0) summaryStatus = "Missing";
    else if (totalHours < 40) summaryStatus = "Incomplete";
    else summaryStatus = "Completed";


    // Check if an existing summary exists
    const existingSummary = await summaryDB.findOne({
      where: { weekStart: start, weekEnd: end },
    });

    if (existingSummary) {
      await summaryDB.update({
        where: { id: existingSummary.id },
        data: { totalHours, summaryStatus },
      });
    } else {
      const created = await summaryDB.create({
        data: { weekStart: start, weekEnd: end, totalHours, summaryStatus },
      });
    }
  } catch (err) {
    console.error("❌ [updateWeeklySummary] Error:", err);
  }
}
