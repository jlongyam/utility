script({ name: 'object.chain.createEvents' });

object.chain.extend({
  createEvents: function() {
    Object.defineProperty(this.args, 'events', {
      value: {
        'create': [],
        'rename': [],
        'update': [],
        'delete': []
      },
      configurable: true
    })
  }
});