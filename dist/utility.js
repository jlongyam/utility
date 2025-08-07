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
  return { browser: isBrowser, node: isNode, worker: isWorker };
})();
env.global =
  typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
        ? self
        : typeof globalThis !== "undefined"
          ? globalThis
          : undefined;
const display = (function () {
  const consoleOutput = (text) => {
    if (env.node || env.browser || env.worker) {
      console.log(text);
    }
  };
  const htmlOutput = (text, option = {}) => {
    let target = option.target || document.body;
    option.append || true;
    let tag = option.tag || "pre";
    if (!env.browser) {
      consoleOutput(`HTML output not available. Text was: ${text}`);
      return;
    }
    if (!target) {
      consoleOutput(`Target element '${String(target)}' not found`);
      return;
    }
    {
      target.innerHTML += `<${tag}>${text}</${tag}>`;
    }
  };
  if (env.browser) return htmlOutput;
  else return consoleOutput;
})();
const node = env.node;
const styleMappings = {
  black: node ? "[30m" : "color: #000000",
  red: node ? "[31m" : "color: #ff0000",
  green: node ? "[32m" : "color: #008000",
  yellow: node ? "[33m" : "color: #ffff00",
  blue: node ? "[34m" : "color: #0000ff",
  magenta: node ? "[35m" : "color: #ff00ff",
  cyan: node ? "[36m" : "color: #00ffff",
  white: node ? "[37m" : "color: #ffffff",
  gray: node ? "[90m" : "color: #808080",
  brightRed: node ? "[91m" : "color: #ff5555",
  brightGreen: node ? "[92m" : "color: #55ff55",
  brightYellow: node ? "[93m" : "color: #ffff55",
  brightBlue: node ? "[94m" : "color: #5555ff",
  brightMagenta: node ? "[95m" : "color: #ff55ff",
  brightCyan: node ? "[96m" : "color: #55ffff",
  brightWhite: node ? "[97m" : "color: #ffffff",
  bgBlack: node ? "[40m" : "background-color: #000000",
  bgRed: node ? "[41m" : "background-color: #ff0000",
  bgGreen: node ? "[42m" : "background-color: #008000",
  bgYellow: node ? "[43m" : "background-color: #ffff00",
  bgBlue: node ? "[44m" : "background-color: #0000ff",
  bgMagenta: node ? "[45m" : "background-color: #ff00ff",
  bgCyan: node ? "[46m" : "background-color: #00ffff",
  bgWhite: node ? "[47m" : "background-color: #ffffff",
  bold: node ? "[1m" : "font-weight: bold",
  dim: node ? "[2m" : "opacity: 0.7",
  italic: node ? "[3m" : "font-style: italic",
  underline: node ? "[4m" : "text-decoration: underline",
  inverse: node ? "[7m" : "filter: invert(100%)",
  hidden: node ? "[8m" : "visibility: hidden",
  strikethrough: node ? "[9m" : "text-decoration: line-through",
  reset: node ? "[0m" : "",
};
function createColorProxy(styles = []) {
  return new Proxy(
    function (text) {
      return applyStyles(text, styles);
    },
    {
      get(target, prop) {
        if (prop in styleMappings) {
          return createColorProxy([...styles, prop]);
        }
        return target[prop];
      },
    },
  );
}
function applyStyles(text, styles) {
  if (env.node) {
    const ansi = styles.map((s) => styleMappings[s]).join("");
    return `${ansi}${text}${styleMappings.reset}`;
  }
  const css = styles
    .map((s) => styleMappings[s])
    .filter(Boolean)
    .join("; ");
  return css ? `<span style="${css}">${text}</span>` : text;
}
const color = createColorProxy();
Object.keys(styleMappings).forEach((style) => {
  color[style] = (text) => applyStyles(text, [style]);
});
function type(value) {
  if (value === null) return "null";
  if (typeof value === "object") {
    if (env.browser && value instanceof HTMLElement) return "HTMLElement";
    if (env.browser && value instanceof Node) return "Node";
    if (Array.isArray(value)) return "Array";
    if (value instanceof Date) return "Date";
    if (value instanceof RegExp) return "RegExp";
    if (value instanceof Promise) return "Promise";
    if (value instanceof Map) return "Map";
    if (value instanceof Set) return "Set";
    if (value instanceof Error) return "Error";
    if (
      value.constructor &&
      value.constructor.toString().startsWith("class ")
    ) {
      return `Class instance (${value.constructor.name})`;
    }
    return "Object";
  }
  if (typeof value === "function") {
    if (value.constructor.name === "AsyncFunction") return "AsyncFunction";
    if (value.toString().startsWith("class ")) return "Class";
    return "Function";
  }
  return typeof value;
}
export { color, display, env, type };
