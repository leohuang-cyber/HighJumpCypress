const { defineConfig } = require("cypress");


module.exports = defineConfig({
  projectId: 'uaxu53',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    video: true,
    videoCompression: 32,
    videoUploadOnPasses: true,
    videosFolder: 'cypress/videos',
    viewportHeight: 720,
    viewportWidth: 1280,
  },
});
