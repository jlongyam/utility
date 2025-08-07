/**
 * @namespace env 
 * @returns {Object} 
 *
 */
let env = (function () {
  const isBrowser =
    typeof window === "object" && typeof document !== "undefined";
  const isNode =
    typeof process !== "undefined" &&
    process.release &&
    process.release.name === "node";
  const isWorker =
    typeof self === "object" &&
    self.constructor &&
    self.constructor.name &&
    self.constructor.name.endsWith("WorkerGlobalScope");

  return {
    browser: isBrowser,
    node: isNode,
    worker: isWorker,
  };
})();

env.global = (typeof window !== "undefined") ? window
  : (typeof global !== "undefined") ? global
    : (typeof self !== "undefined") ? self
      : (typeof globalThis !== "undefined") ? globalThis
        : this


export default env;