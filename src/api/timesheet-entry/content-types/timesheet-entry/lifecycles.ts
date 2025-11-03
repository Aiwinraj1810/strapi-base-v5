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
    console.log("📘 [afterCreate] Triggered for entry:", event.result.id);
    await updateWeeklySummary(event.result.weekStart, event.result.weekEnd);
  },

  async afterUpdate(event) {
    console.log("📘 [afterUpdate] Triggered for entry:", event.result.id);
    await updateWeeklySummary(event.result.weekStart, event.result.weekEnd);
  },

  async afterDelete(event) {
    console.log("📕 [afterDelete] Triggered for:", event.params.where);
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
  console.log("🧮 [updateWeeklySummary] Start", { weekStart, weekEnd });

  if (!weekStart || !weekEnd) {
    console.log("❌ [updateWeeklySummary] Missing weekStart/weekEnd. Skipping update.");
    return;
  }

  try {
    const db = strapi.db.query("api::timesheet-entry.timesheet-entry");
    const summaryDB = strapi.db.query("api::timesheet-summary.timesheet-summary");

    // Normalize to ISO date-only strings (Strapi stores dates as YYYY-MM-DD)
    const start = new Date(weekStart).toISOString().split("T")[0];
    const end = new Date(weekEnd).toISOString().split("T")[0];

    console.log("🧩 [updateWeeklySummary] Querying entries where weekStart=", start, "and weekEnd=", end);

    // Find all entries for the given week
    const entries = await db.findMany({
      where: { weekStart: start, weekEnd: end },
      select: ["hours", "date"],
    });

    console.log(`📊 [updateWeeklySummary] Found ${entries.length} entries for that week`);
    if (entries.length > 0) {
      console.log("📋 Entries hours:", entries.map((e) => e.hours));
    }

    const totalHours = entries.reduce((sum, e) => sum + Number(e.hours || 0), 0);
    console.log("🕒 [updateWeeklySummary] Total Hours:", totalHours);

    // Determine summaryStatus
    let summaryStatus = "Missing";
    if (totalHours === 0) summaryStatus = "Missing";
    else if (totalHours < 40) summaryStatus = "Incomplete";
    else summaryStatus = "Completed";

    console.log("📈 [updateWeeklySummary] summaryStatus determined:", summaryStatus);

    // Check if an existing summary exists
    const existingSummary = await summaryDB.findOne({
      where: { weekStart: start, weekEnd: end },
    });

    if (existingSummary) {
      console.log("🟡 [updateWeeklySummary] Found existing summary:", existingSummary.id);
      await summaryDB.update({
        where: { id: existingSummary.id },
        data: { totalHours, summaryStatus },
      });
      console.log("✅ [updateWeeklySummary] Updated existing summary successfully");
    } else {
      console.log("🟢 [updateWeeklySummary] No existing summary found. Creating new one...");
      const created = await summaryDB.create({
        data: { weekStart: start, weekEnd: end, totalHours, summaryStatus },
      });
      console.log("✅ [updateWeeklySummary] Created new summary:", created.id);
    }
  } catch (err) {
    console.error("❌ [updateWeeklySummary] Error:", err);
  }
}
