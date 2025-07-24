{ // 
  engine = (() => {
    let posibility = {
      browser: typeof window === 'object' && typeof document === 'object',
      node: typeof process !== 'undefined' && process.versions != null && process.versions.node != null,
      gjs: typeof ARGV === 'object',
      qjs: typeof print === 'function' && typeof window !== 'object' && typeof ARGV === 'undefined'
    }, key = ''
    for (key in posibility) {
      if (posibility[key]) return key
    }
  })()
}