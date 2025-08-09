import * as icons from './icons.js';

function icon(name) {
  // Search all icon categories for the requested symbol
  for (const category of Object.values(icons)) {
    if (category[name]) {
      return category[name]; // Return the raw Unicode symbol
    }
  }
  return icons.symbols.check; // Fallback to checkmark if not found
}

export default icon;