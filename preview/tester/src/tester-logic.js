var TestRunner = {
  tests: [],
  results: { passed: 0, failed: 0 },

  addTest: function (name, testFn) {
    this.tests.push({ name: name, fn: testFn });
  },

  runTests: function () {
    // Reset results
    this.results = { passed: 0, failed: 0 };
    var resultsDiv = document.getElementById('testResults');
    resultsDiv.innerHTML = '';

    for (var i = 0; i < this.tests.length; i++) {
      var test = this.tests[i];
      var testDiv = document.createElement('div');
      testDiv.className = 'test';

      try {
        test.fn();
        this.results.passed++;
        testDiv.className += ' pass';
        testDiv.innerHTML = '<input type="checkbox" checked disabled> ' + test.name;
      } catch (e) {
        this.results.failed++;
        testDiv.className += ' fail';
        testDiv.innerHTML = '<input type="checkbox" disabled> ' + test.name + ' - ' + e.message;
      }

      resultsDiv.appendChild(testDiv);
    }

    // Show summary
    var summaryDiv = document.createElement('div');
    summaryDiv.className = 'summary';
    summaryDiv.innerHTML = 'Tests completed: ' +
      this.results.passed + ' passed, ' +
      this.results.failed + ' failed';

    resultsDiv.appendChild(summaryDiv);
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

// Defer execution
window.onload = function () {
  TestRunner.runTests();
}