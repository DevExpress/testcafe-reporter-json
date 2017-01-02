export default function () {
    return {
        noColors:       true,
        currentFixture: null,

        report: {
            startTime:  null,
            endTime:    null,
            userAgents: null,
            passed:     0,
            total:      0,
            skipped:    0,
            fixtures:   [],
            warnings:   []
        },

        reportTaskStart (startTime, userAgents, testCount) {
            this.report.startTime  = startTime;
            this.report.userAgents = userAgents;
            this.report.total      = testCount;
        },

        reportFixtureStart (name, path) {
            this.currentFixture = { name, path, tests: [] };
            this.report.fixtures.push(this.currentFixture);
        },

        reportTestDone (name, testRunInfo) {
            var errs = testRunInfo.errs.map(err => this.formatError(err));

            if (testRunInfo.skipped)
                this.report.skipped++;

            this.currentFixture.tests.push({
                name,
                errs,

                durationMs:     testRunInfo.durationMs,
                unstable:       testRunInfo.unstable,
                screenshotPath: testRunInfo.screenshotPath,
                skipped:        testRunInfo.skipped
            });
        },

        reportTaskDone (endTime, passed, warnings) {
            this.report.passed   = passed;
            this.report.endTime  = endTime;
            this.report.warnings = warnings;

            this.write(JSON.stringify(this.report, null, 2));
        }
    };
}
