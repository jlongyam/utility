function insertTag(el, tag, attr_value) {
  tag = (typeof tag == "undefined") ? "mark" : tag;
  let
    i_start = el.selectionStart,
    i_end = el.selectionEnd,
    valueBefore = el.value.substring(0, i_start),
    valueAfter = el.value.substring(i_end),
    selectionValue = el.value.substring(i_start, i_end)
    ;
  if (typeof attr_value != 'undefined') {
    el.value = valueBefore + "<" + tag + " " + attr_value + ">" + selectionValue + "</" + tag + ">" + valueAfter;
  } else {
    el.value = valueBefore + "<" + tag + ">" + selectionValue + "</" + tag + ">" + valueAfter;
  }
}