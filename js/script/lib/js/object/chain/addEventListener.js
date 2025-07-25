script({ name: 'object.chain.addEventListener' });

object.chain.extend({
  addEventListener: function(s_event, f_cb) {
    if(!f_cb || !this.args['events']) return;
    this.args['events'][s_event].push(f_cb)
  }
});