export default {
  routes: [
    {
      method: "GET",
      path: "/timesheet-summaries/complete", // 👈 custom endpoint
      handler: "custom-timesheet-summary.find",
      config: {
        auth: false, // or true if you want protected access
      },
    },
  ],
};
