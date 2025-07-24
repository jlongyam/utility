config.data = data
pre.innerHTML += 'Added by <b>init.js</b>\n'
loadAsync(['inc/other.js'], ()=> {
  pre.innerHTML += other_string+'\n'
})