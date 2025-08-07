import env from "./env.js";
/**
 * ## type
 * Detect type of any value
 * @module utility/type
 * @param {any} value
 * @returns {string} name of type
 */
function type(value) {
  // Handle null first (typeof null is 'object')
  if (value === null) return 'null';
  
  // Handle objects and their specific types
  if (typeof value === 'object') {
    if (env.browser && value instanceof HTMLElement) return 'HTMLElement';
    if (env.browser && value instanceof Node) return 'Node';
    if (Array.isArray(value)) return 'Array';
    if (value instanceof Date) return 'Date';
    if (value instanceof RegExp) return 'RegExp';
    if (value instanceof Promise) return 'Promise';
    if (value instanceof Map) return 'Map';
    if (value instanceof Set) return 'Set';
    if (value instanceof Error) return 'Error';
    
    // Check for class instances
    if (value.constructor && value.constructor.toString().startsWith('class ')) {
      return `Class instance (${value.constructor.name})`;
    }
    
    return 'Object';
  }
  
  // Handle functions
  if (typeof value === 'function') {
    if (value.constructor.name === 'AsyncFunction') return 'AsyncFunction';
    if (value.toString().startsWith('class ')) return 'Class';
    return 'Function';
  }
  
  // Primitive types
  return typeof value;
}

export default type;