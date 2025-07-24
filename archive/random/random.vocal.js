random.vocal = () => {
  var
    v = 'aeiou',
    a = v.split(''),
    l = a.length,
    m = Math.floor(Math.random() * l)
    ;
  return v[m]
}