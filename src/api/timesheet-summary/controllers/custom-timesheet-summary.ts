import { factories } from "@strapi/strapi";
import { generateYearlyTimesheetSummaries } from "../../../lib/generate-weeks";
import { startOfWeek, endOfWeek } from "date-fns";

export default factories.createCoreController(
  "api::timesheet-summary.timesheet-summary",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const user = ctx.state.user;
        if (!user) {
          strapi.log.warn("❌ No authenticated user found.");
          return ctx.unauthorized("User not authenticated");
        }

        const year = new Date().getFullYear();
        const query = ctx.query as Record<string, any>;

        const page = parseInt(query.page ?? "1", 10);
        const pageSize = parseInt(query.pageSize ?? "10", 10);

        const rawStart = query.filters?.weekStart?.$gte;
        const rawEnd = query.filters?.weekEnd?.$lte;
        const rawStatus = query.filters?.summaryStatus?.$eq;

        const normalizedStart = rawStart
          ? startOfWeek(new Date(rawStart), { weekStartsOn: 1 })
          : null;
        const normalizedEnd = rawEnd
          ? endOfWeek(new Date(rawEnd), { weekStartsOn: 1 })
          : null;

        // 🧩 Generate all weeks for the year
        let allWeeks = generateYearlyTimesheetSummaries(year);

        // Filter by date range if provided
        if (normalizedStart && normalizedEnd) {
          allWeeks = allWeeks.filter((w) => {
            const weekStart = new Date(w.weekStart);
            const weekEnd = new Date(w.weekEnd);
            return weekStart >= normalizedStart && weekEnd <= normalizedEnd;
          });
        }

        // Prepare where filter for Strapi query
        const where: Record<string, any> = { users_permissions_user: user.id };
        if (normalizedStart)
          where.weekStart = { $gte: normalizedStart.toISOString().split("T")[0] };
        if (normalizedEnd)
          where.weekEnd = { $lte: normalizedEnd.toISOString().split("T")[0] };
        if (rawStatus) where.summaryStatus = { $eq: rawStatus };

        // 🟢 Fetch summaries for this user
        const existingSummaries = await strapi.db
          .query("api::timesheet-summary.timesheet-summary")
          .findMany({
            select: ["id", "weekStart", "weekEnd", "totalHours", "summaryStatus"],
            orderBy: { weekStart: "asc" },
            where,
          });

        // 🟢 Merge generated week list with existing DB summaries
        const merged = allWeeks.map((week) => {
          const existing = existingSummaries.find(
            (s) => s.weekStart === week.weekStart
          );
          return existing ? { ...week, ...existing } : { ...week, totalHours: 0, summaryStatus: "Missing" };
        });

        // Apply status filter if needed (redundant but harmless)
        const filtered = rawStatus
          ? merged.filter((item) => item.summaryStatus === rawStatus)
          : merged;

        // Paginate
        const startIndex = (page - 1) * pageSize;
        const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

        // 🟢 Return response
        return {
          data: paginatedData,
          meta: {
            pagination: {
              page,
              pageSize,
              pageCount: Math.ceil(filtered.length / pageSize),
              total: filtered.length,
            },
            normalizedRange: {
              from: normalizedStart?.toISOString().split("T")[0] ?? null,
              to: normalizedEnd?.toISOString().split("T")[0] ?? null,
            },
            appliedStatus: rawStatus || "All",
            generatedForYear: year,
          },
        };
      } catch (err) {
        strapi.log.error("❌ Failed to generate timesheet summaries:", err);
        ctx.throw(500, "Failed to generate timesheet summaries");
      }
    },
  })
);
