import env from './env.js';
import color from './color.js';
import display from './display.js';

export default class Tester {
  constructor(options = {}) {
    this.tests = [];
    this.results = {
      passed: 0,
      failed: 0,
      skipped: 0
    };
    this.startTime = null;
    this.endTime = null;
    this.options = {
      target: options.target || (env.browser ? document.body : null),
      append: options.append !== false,
      tag: options.tag || 'div',
      verbose: options.verbose || false
    };
  }

  /**
   * Add a test with skip capability
   * @param {string} name - Test name
   * @param {function} fn - Test function
   * @param {boolean|object} [options] - Options object or skip boolean
   */
  test(name, fn, options = {}) {
    const skip = typeof options === 'boolean' ? options : (options.skip || false);
    const reason = options.reason || '';
    this.tests.push({ name, fn, skip, reason });
    return this; // for chaining
  }

  /**
   * Alias for test()
   */
  it(name, fn, options = {}) {
    return this.test(name, fn, options);
  }

  async run() {
    this.startTime = new Date();
    this.output(color.bold(`Running ${this.tests.length} tests...\n`));

    for (const test of this.tests) {
      if (test.skip) {
        this.results.skipped++;
        const statusMsg = test.reason ? `SKIPPED (${test.reason})` : 'SKIPPED';
        this.printResult(test.name, statusMsg, color.yellow);
        continue;
      }

      try {
        const result = test.fn();
        if (result instanceof Promise) {
          await result;
        }
        this.results.passed++;
        this.printResult(test.name, 'PASSED', color.green);
      } catch (err) {
        this.results.failed++;
        this.printResult(test.name, 'FAILED', color.red);
        this.printError(err);
      }
    }

    this.endTime = new Date();
    this.printSummary();
  }

  printResult(name, status, colorFn) {
    this.output(colorFn(`${name}: ${status}`));
  }

  printError(err) {
    this.output(color.red(`  ${err.message}`));
    if (this.options.verbose) {
      this.output(color.gray(`  ${err.stack}`));
    }
  }

  printSummary() {
    const duration = (this.endTime - this.startTime) / 1000;
    const summary = color.bold(`
Test Summary:
  Passed:  ${color.green(this.results.passed)}
  Failed:  ${this.results.failed ? color.red(this.results.failed) : '0'}
  Skipped: ${color.yellow(this.results.skipped)}
  Total:   ${this.tests.length}
  Duration: ${duration.toFixed(2)}s
    `.trim());

    this.output(summary);
  }

  output(content) {
    if (env.browser) {
      display(content, {
        target: this.options.target,
        append: this.options.append,
        tag: this.options.tag
      });
    } else {
      display(content);
    }
  }

  // Assertion methods
  assert(actual, message) {
    if (!actual) throw new Error(message || `Expected truthy, got ${actual}`);
  }

  assertEquals(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${actual} to equal ${expected}`);
    }
  }

  assertNotEquals(actual, expected, message) {
    if (actual === expected) {
      throw new Error(message || `Expected ${actual} not to equal ${expected}`);
    }
  }

  assertThrows(fn, message) {
    let threw = false;
    try { fn(); } catch (e) { threw = true; }
    if (!threw) throw new Error(message || 'Expected function to throw');
  }
}