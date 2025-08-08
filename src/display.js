import env from './env.js';

const display = (function() {
  
  const consoleOutput = (text) => {
    if (env.node || env.browser || env.worker) {
      console.log(text);
    }
  };

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