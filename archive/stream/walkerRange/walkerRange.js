function walker(start = 0, end = Infinity, step = 1) {
  let nextIndex = start
  let iterationCount = 0
  const rangeIterator = {
    next() {
      let res
      if (nextIndex < end) {
        res = { value: nextIndex, done: false }
        nextIndex += step
        iterationCount++
        return res
      }
      return { value: iterationCount, done: true }
    },
  }
  return rangeIterator
}
function walk(start = 0, step = 1, end = Infinity, cb = false) {
  const it = walker(start, end, step)
  let res = it.next()
  while (!res.done) {
    if (cb) cb(res.value)
    res = it.next()
  }
}