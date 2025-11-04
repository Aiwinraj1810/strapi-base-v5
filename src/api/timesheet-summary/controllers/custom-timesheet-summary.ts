import { factories } from "@strapi/strapi";
import { generateYearlyTimesheetSummaries } from "../../../lib/generate-weeks";

export default factories.createCoreController(
  "api::timesheet-summary.timesheet-summary",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const year = new Date().getFullYear();
        const query = ctx.query as Record<string, any>;

        // Optional: read pagination params from the request
        const page = parseInt(query.page ?? "1", 10);
        const pageSize = parseInt(query.pageSize ?? "10", 10);

        // 1️⃣ Generate all weeks for the year
        const allWeeks = generateYearlyTimesheetSummaries(year);

        // 2️⃣ Fetch existing summaries from Strapi
        const existingSummaries = await strapi.db
          .query("api::timesheet-summary.timesheet-summary")
          .findMany({
            select: [
              "id",
              "weekStart",
              "weekEnd",
              "totalHours",
              "summaryStatus",
            ],
            orderBy: { weekStart: "asc" },
          });

        // 3️⃣ Merge real entries with "Missing" weeks
        const merged = allWeeks.map((week) => {
          const match = existingSummaries.find(
            (e) => e.weekStart === week.weekStart
          );
          return match ? { ...week, ...match } : week;
        });

        // 4️⃣ Apply pagination manually (server-side)
        const startIndex = (page - 1) * pageSize;
        const paginatedData = merged.slice(startIndex, startIndex + pageSize);

        // 5️⃣ Return Strapi-like format with meta pagination
        return {
          data: paginatedData,
          meta: {
            pagination: {
              page,
              pageSize,
              pageCount: Math.ceil(merged.length / pageSize),
              total: merged.length,
            },
            totalWeeks: merged.length,
            generatedForYear: year,
          },
        };
      } catch (err) {
        strapi.log.error("Error generating weekly summaries:", err);
        ctx.throw(500, "Failed to generate timesheet summaries");
      }
    },
  })
);
