script({ name: 'object.createEvents' });

object.createEvents = function(target) {
  Object.defineProperty(target, 'events', {
    value: {
      'add': [],
      'rename': [],
      'update': [],
      'remove': []
    },
    configurable: true
  })
};