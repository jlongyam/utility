script({ name: 'array.createEvents' });

array.createEvents = function(target) {
  if(object.type(target) !== 'Array') return
  Object.defineProperty(target, 'events', {
    value: {
      'add': [],
      'change': [],
      'remove': []
    },
    configurable: true
  })
};