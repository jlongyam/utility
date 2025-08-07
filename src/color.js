import env from './env.js';

const node = env.node
const styleMappings = {
  // Colors
  black: node ? '\x1b[30m' : 'color: #000000',
  red: node ? '\x1b[31m' : 'color: #ff0000',
  green: node ? '\x1b[32m' : 'color: #008000',
  yellow: node ? '\x1b[33m' : 'color: #ffff00',
  blue: node ? '\x1b[34m' : 'color: #0000ff',
  magenta: node ? '\x1b[35m' : 'color: #ff00ff',
  cyan: node ? '\x1b[36m' : 'color: #00ffff',
  white: node ? '\x1b[37m' : 'color: #ffffff',
  gray: node ? '\x1b[90m' : 'color: #808080',
  
  // Bright colors
  brightRed: node ? '\x1b[91m' : 'color: #ff5555',
  brightGreen: node ? '\x1b[92m' : 'color: #55ff55',
  brightYellow: node ? '\x1b[93m' : 'color: #ffff55',
  brightBlue: node ? '\x1b[94m' : 'color: #5555ff',
  brightMagenta: node ? '\x1b[95m' : 'color: #ff55ff',
  brightCyan: node ? '\x1b[96m' : 'color: #55ffff',
  brightWhite: node ? '\x1b[97m' : 'color: #ffffff',
  
  // Backgrounds
  bgBlack: node ? '\x1b[40m' : 'background-color: #000000',
  bgRed: node ? '\x1b[41m' : 'background-color: #ff0000',
  bgGreen: node ? '\x1b[42m' : 'background-color: #008000',
  bgYellow: node ? '\x1b[43m' : 'background-color: #ffff00',
  bgBlue: node ? '\x1b[44m' : 'background-color: #0000ff',
  bgMagenta: node ? '\x1b[45m' : 'background-color: #ff00ff',
  bgCyan: node ? '\x1b[46m' : 'background-color: #00ffff',
  bgWhite: node ? '\x1b[47m' : 'background-color: #ffffff',
  
  // Modifiers
  bold: node ? '\x1b[1m' : 'font-weight: bold',
  dim: node ? '\x1b[2m' : 'opacity: 0.7',
  italic: node ? '\x1b[3m' : 'font-style: italic',
  underline: node ? '\x1b[4m' : 'text-decoration: underline',
  inverse: node ? '\x1b[7m' : 'filter: invert(100%)',
  hidden: node ? '\x1b[8m' : 'visibility: hidden',
  strikethrough: node ? '\x1b[9m' : 'text-decoration: line-through',
  
  // Reset
  reset: node ? '\x1b[0m' : ''
};

function createColorProxy(styles = []) {
  return new Proxy(function(text) {
    return applyStyles(text, styles);
  }, {
    get(target, prop) {
      if (prop in styleMappings) {
        return createColorProxy([...styles, prop]);
      }
      return target[prop];
    }
  });
}

function applyStyles(text, styles) {
  if (env.node) {
    const ansi = styles.map(s => styleMappings[s]).join('');
    return `${ansi}${text}${styleMappings.reset}`;
  }
  const css = styles.map(s => styleMappings[s]).filter(Boolean).join('; ');
  return css ? `<span style="${css}">${text}</span>` : text;
}

// Create main color function with all methods
const color = createColorProxy();

// Add all style methods
Object.keys(styleMappings).forEach(style => {
  color[style] = (text) => applyStyles(text, [style]);
});

export default color;