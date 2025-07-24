function ajax(o, indicator) {
  indicator.setAttribute('data-loading', '');
  let 
    xhr = new XMLHttpRequest(),
    method = o.method.toUpperCase() || 'GET',
    data = o.data || ''
    ;
  xhr.open(method, o.url + (method === 'GET' && data? '?' + data : ''), true)
  o.headers = o.headers || {}
  if(method !== 'GET' && !o.headers['Content-type'] && !o.headers['Content-Type']) {
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  } 
  for (var header in o.headers) xhr.setRequestHeader(header, o.headers[header])
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
      indicator.removeAttribute('data-loading')      
      o.callback(xhr)
    }
  }  
  xhr.send(method === 'GET'? null : data)
  return xhr
}
