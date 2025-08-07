import env from './env.js';

/**
 * ## display
 * Environment-aware text output utility
 * @module utility/display
 * @param {String} string to display
 * @returns {Function} String
 */
const display = (function() {
  /**
   * ### display.console
   * Output text to the console
   * @memberof display
   * @param {string} text - The text to display
   */
  const consoleOutput = (text) => {
    if (env.node || env.browser || env.worker) {
      console.log(text);
    }
  };

  /**
   * ### display.html
   * Output text to the HTML document (browser only)
   * @memberof display
   * @param {string} text - The text to display
   * @param {string} [targetId='output'] - ID of the target element
   * @param {boolean} [append=true] - Whether to append or replace content
   */
  const htmlOutput = (text, option = {}) => {
    let target = option.target || document.body;
    let append = option.append || true;
    let tag = option.tag || 'pre';

    if (!env.browser) {
      consoleOutput(`HTML output not available. Text was: ${text}`);
      return;
    }

    if (!target) {
      consoleOutput(`Target element '${String(target)}' not found`);
      return;
    }

    if (append) {
      target.innerHTML += `<${tag}>${text}</${tag}>`;
    } else {
      target.innerHTML = `<${tag}>${text}</${tag}>`;
    }
  };
  
  if(env.browser) return htmlOutput;
  else return consoleOutput;
})();

export default display;