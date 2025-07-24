Object.prototype.getAll = (function() {
  const getProperties = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] !== 'function')
  const getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
  return {
    property: getProperties,
    method: getMethods
  }
})()