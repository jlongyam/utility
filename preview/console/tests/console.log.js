document.addEventListener('DOMContentLoaded', function () {
  console.log('Hello world!');
  console.log('This is a string');
  console.log(123);
  console.log(1, 2, 3, 4, 5);
  console.log('Multiple values:', 10, true, { foo: 'bar' });

  const obj = { name: 'Alice', age: 30 };
  console.log('User info:', obj);

  console.log('%cThis is a styled message', 'color: green; font-weight: bold; border: 2px solid green; padding: 4px;');

  // Logging arrays
  console.log([1, 2, 3, 4, 5]);

  // Logging objects
  console.log({ a: 1, b: 2, c: 3 });

  // Logging errors
  console.log('Error:', new Error('Something went wrong'));
});
