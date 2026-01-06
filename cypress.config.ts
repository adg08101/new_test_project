import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "your_project_id_here",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
