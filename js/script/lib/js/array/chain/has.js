script({ name: 'array.chain.has' });

array.chain.extend({
  has: function(i) {
    return this.args.indexOf(i) >= 0
  }
});