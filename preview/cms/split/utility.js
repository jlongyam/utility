function handleTab(el) {
  if(event.keyCode===9) {
    event.preventDefault()
    let
      v=el.value,
      s=el.selectionStart,
      e=el.selectionEnd
    ;
    el.value=v.substring(0, s)+'\t'+v.substring(e)
    el.selectionStart=el.selectionEnd=s+1
    return false
  }
}
function downloadString(text, fileType, fileName) {
  let blob = new Blob([text], { type: fileType })
  let a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}
function html5_str( title= document.title, head_str='', body_str='' ) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  ${head_str}
</head>
<body>
  ${body_str}
</body>
</html>`
}