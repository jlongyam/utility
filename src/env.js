/**
 * ## env
 * Detect runtime environment
 * @module utility/env
 * @returns {Object} `browser` or `node` or `worker` or `global`
 */
let env = (function () {
  /**
   * ### env.browser
   * Check if run in browser
   * @module utility/env/browser
   * @returns {Boolean} `true` or `false`
   */
  const isBrowser =
    typeof window === "object" && typeof document !== "undefined";
  /**
   * ### env.node
   * Check if run in node
   * @module utility/env/node
   * @returns {Boolean} `true` or `false`
   */
  const isNode =
    typeof process !== "undefined" &&
    process.release &&
    process.release.name === "node";
  /**
   * ### env.worker
   * Check if run in worker
   * @module utility/env/worker
   * @returns {Boolean} `true` or `false`
   */
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
/**
 * ### env.global
 * Set to global object
 * @module utility/env/global
 * @returns {Object} `window` or `global` or `self` or `globalThis` or `this`
 */
env.global = (typeof window !== "undefined") ? window
  : (typeof global !== "undefined") ? global
    : (typeof self !== "undefined") ? self
      : (typeof globalThis !== "undefined") ? globalThis
        : this


export default env;