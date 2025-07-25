(function(w,d) {
  if( typeof style === 'undefined' ) style = {};
  style.write = function( s_css, s_id ) {
    d.write('<style id="'+s_id+'">'+s_css+'</sctyle>');
  };
  w.style = style;
}(window,document));