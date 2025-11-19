const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "./",
    reportName: "Automation Veevart Report",
    pageTitle: "Regression Report Veevart",
    displayDuration: true,
    metadata: {
        browser: {
            name: "chromium, WebKit, Firefox",
            version: "112",
        },
        device: "Mac M3",
        platform: {
            name: "Machintosh",
            version: "Tahoe",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Veevart Qa automation" },
            { label: "Release", value: "UAT" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});