//src\api\timesheet-summary\routes\custom-timesheet-summary.ts

export default {
  routes: [
    {
      method: "GET",
      path: "/timesheet-summaries/complete", // 👈 custom endpoint
      handler: "custom-timesheet-summary.find",
      config: {},
    },
  ],
};
