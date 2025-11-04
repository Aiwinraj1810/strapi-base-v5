import { factories } from "@strapi/strapi";
import { generateYearlyTimesheetSummaries } from "../../../lib/generate-weeks";
import { startOfWeek, endOfWeek } from "date-fns";

export default factories.createCoreController(
  "api::timesheet-summary.timesheet-summary",
  ({ strapi }) => ({
    async find(ctx) {
      try {
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

        let allWeeks = generateYearlyTimesheetSummaries(year);

        if (normalizedStart && normalizedEnd) {
          const beforeCount = allWeeks.length;
          allWeeks = allWeeks.filter((w) => {
            const weekStart = new Date(w.weekStart);
            const weekEnd = new Date(w.weekEnd);
            return weekStart >= normalizedStart && weekEnd <= normalizedEnd;
          });

        }

        const where: Record<string, any> = {};
        if (normalizedStart)
          where.weekStart = {
            $gte: normalizedStart.toISOString().split("T")[0],
          };
        if (normalizedEnd)
          where.weekEnd = { $lte: normalizedEnd.toISOString().split("T")[0] };
        if (rawStatus) where.summaryStatus = { $eq: rawStatus };


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
            where,
          });


        let merged = allWeeks.map((week) => {
          const match = existingSummaries.find(
            (e) => e.weekStart === week.weekStart
          );
          return match ? { ...week, ...match } : week;
        });

        if (rawStatus) {
          merged = merged.filter(
            (item) => item.summaryStatus === rawStatus
          );
        }

        const startIndex = (page - 1) * pageSize;
        const paginatedData = merged.slice(startIndex, startIndex + pageSize);

        return {
          data: paginatedData,
          meta: {
            pagination: {
              page,
              pageSize,
              pageCount: Math.ceil(merged.length / pageSize),
              total: merged.length,
            },
            normalizedRange: {
              from: normalizedStart
                ? normalizedStart.toISOString().split("T")[0]
                : null,
              to: normalizedEnd
                ? normalizedEnd.toISOString().split("T")[0]
                : null,
            },
            appliedStatus: rawStatus || "All",
            totalWeeks: merged.length,
            generatedForYear: year,
          },
        };
      } catch (err) {
        ctx.throw(500, "Failed to generate timesheet summaries");
      }
    },
  })
);
