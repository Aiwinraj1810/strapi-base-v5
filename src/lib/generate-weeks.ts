import { startOfWeek, endOfWeek, startOfYear, endOfYear, addWeeks, format } from "date-fns";

/**
 * Generate all week summaries for a given year.
 * Returns array matching Strapi's timesheet-summary structure.
 * Ensures dates are formatted in local time (not UTC).
 */
export function generateYearlyTimesheetSummaries(year: number) {
  const summaries = [];

  let current = startOfWeek(startOfYear(new Date(year, 0, 1)), { weekStartsOn: 1 });
  const last = endOfWeek(endOfYear(new Date(year, 11, 31)), { weekStartsOn: 1 });

  while (current <= last) {
    const weekStart = new Date(current);
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    summaries.push({
      weekStart: format(weekStart, "yyyy-MM-dd"),
      weekEnd: format(weekEnd, "yyyy-MM-dd"),    
      totalHours: 0,
      summaryStatus: "Missing",
    });

    current = addWeeks(current, 1);
  }

  return summaries;
}
