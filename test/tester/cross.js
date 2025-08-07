import env from '../../src/env.js';

(async function () {
  let Test;

  if (env.node) {
    const module = await import('../../src/tester.js');
    Test = module.default;
  } else {
    Test = (await import('../../src/tester.js')).default;
  }

  const test = new Test();

  test.it('universal test', () => {
    test.assert(true, 'This works everywhere');
  });
  test.it('test fail result', () => {
    test.assert(false, 'This should faild');
  });

  test.it('working feature', () => {
    test.assertEquals(1 + 1, 2);
  });

  // Temporarily skipped
  test.it('flaky integration', () => {
    // This fails intermittently - skip while we investigate
  }, true);

  // Environment-specific
  test.it('browser storage', () => {
    // Test localStorage
  }, !env.browser); // Skip in Node.js

  test.it('another skipped test', () => {
    // Won't run
  }, true);

  await test.run();
})();
