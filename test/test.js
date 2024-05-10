var assert           = require('assert');
var read             = require('read-file-relative').readSync;
var createReport     = require('./utils/create-report');

it('Should produce report with colors', async function () {
    var report   = createReport(true);
    var expected = read('./data/report-with-colors');

    var normalizeNewline = await import('normalize-newline');

    report   = normalizeNewline.default(report).trim();
    expected = normalizeNewline.default(expected).trim();

    assert.strictEqual(report, expected);
});

it('Should produce report without colors', async function () {
    var report   = createReport(false);
    var expected = read('./data/report-without-colors');

    var normalizeNewline = await import('normalize-newline');

    report   = normalizeNewline.default(report).trim();
    expected = normalizeNewline.default(expected).trim();

    assert.strictEqual(report, expected);
});
