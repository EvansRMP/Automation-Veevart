const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Automation Veevart Report",
    pageTitle: "BookCart App test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
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
            { label: "Project", value: "Book Cart Application" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});