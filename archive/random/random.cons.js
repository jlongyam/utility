random.cons = ()=> {
  var
    v = 'bcdfghjklmnpqrstvwxyz',
    a = v.split(''),
    l = a.length,
    m = Math.floor(Math.random() * l)
    ;
  return v[m]
}