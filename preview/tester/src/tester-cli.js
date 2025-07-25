// Simple test framework for Node.js
var TestRunner = {
    tests: [],
    results: { passed: 0, failed: 0 },

    addTest: function(name, testFn) {
        this.tests.push({ name: name, fn: testFn });
    },

    runTests: function() {
        // Reset results
        this.results = { passed: 0, failed: 0 };
        console.log("Running tests...\n");

        for (var i = 0; i < this.tests.length; i++) {
            var test = this.tests[i];
            try {
                test.fn();
                this.results.passed++;
                // Green checkmark for pass
                console.log("  \u001b[32m✓\u001b[39m " + test.name);
            } catch (e) {
                this.results.failed++;
                // Red X for fail
                console.log("  \u001b[31m✗\u001b[39m " + test.name);
                console.log("    " + e.message);
            }
        }

        // Show summary
        var summary = "\nTests completed: " +
            this.results.passed + " passed, " +
            this.results.failed + " failed";

        console.log("\n===== Summary =====");
        console.log(summary);
        console.log("===================\n");

        // Exit with a non-zero code if any tests failed, useful for CI/automation
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
};

// Assertion function
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

// Helper to add tests
function test(name, testFn) {
    TestRunner.addTest(name, testFn);
}

module.exports = {
  test: test,
  assert: assert,
  TestRunner: TestRunner
};