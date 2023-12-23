const JasmineConsoleReporter = require('jasmine-console-reporter')

const reporter = new JasmineConsoleReporter({
    colors: true,
    cleanStack: 1,
    verbosity: 4,
    listStyle: 'indent',
    timeUnit: 'ms',
    timeThreshold: { ok: 500, warn: 1000, ouch: 3000 },
    activity: false,
    emoji: true,
    beep: true
})

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(reporter)
