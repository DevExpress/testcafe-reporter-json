export default function () {
    return {
        noColors:       true,
        currentFixture: null,

        report: {
            startTime:  null,
            endTime:    null,
            userAgents: null,
            passed:     0,
            testCount:  0,
            fixtures:   []
        },

        reportTaskStart (startTime, userAgents, testCount) {
            this.report.startTime  = startTime;
            this.report.userAgents = userAgents;
            this.report.testCount  = testCount;
        },

        reportFixtureStart (name, path) {
            this.currentFixture = { name, path, tests: [] };
            this.report.fixtures.push(this.currentFixture);
        },

        reportTestDone (name, errs, durationMs, unstable, screenshotPath) {
            errs = errs.map(err => this.formatError(err));

            this.currentFixture.tests.push({ name, errs, durationMs, unstable, screenshotPath });
        },

        reportTaskDone (endTime, passed) {
            this.report.passed  = passed;
            this.report.endTime = endTime;

            this.write(JSON.stringify(this.report, null, 2));
        }
    };
}
