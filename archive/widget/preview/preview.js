function preview( m_input ) {
  var s_source;
  if( typeof m_input == 'string' ) s_source = m_input;
  else if( typeof m_input == 'object' ) s_source = m_input.join('');//mean array, not real object
  else s_source = m_input.toString();
  function _in_frame( s_id ) {// android bug fix, call object directly failed.
    var o = document.getElementById( s_id );
	var s_content = o.contentDocument || o.contentWindow.document;
    s_content.open();
		s_content.write( s_source );
		s_content.close();
  }
  function _in_window() {
    var f_content = window.open();
    f_content.document.open();
	f_content.document.write( s_source );
	f_content.document.close();
  }
  function _in_element( o ) {
    o.innerHTML = s_source
  }
  return {
    in_frame: _in_frame,
    in_window: _in_window,
    in_element: _in_element
  }
}