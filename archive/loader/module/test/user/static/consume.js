$module({ name: 'user',
  dependency: ['user/static/static.js']
})

function user() {
  pre.innerHTML = JSON.stringify(static,0,2) 
}