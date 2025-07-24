{
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
  typeClass = (input) => Object.prototype.toString.call(input)
  typeOf = (value) => {
    if (value === null) return "null"
    const baseType = typeof value
    if (!["object", "function"].includes(baseType)) return baseType
    const tag = value[Symbol.toStringTag]
    if (typeof tag === "string") return tag
    if (baseType === "function" && Function.prototype.toString.call(value).startsWith("class")) return "class";
    const className = value.constructor.name
    if (typeof className === "string" && className !== "") return className
    return baseType
  }
  if (engine === 'browser') {
    // require ua-parser
    browser = (() => {
      let
        parser = new UAParser(),
        detect = parser.getResult(),
        specific = {
          engine: detect.engine.name,
          name: detect.browser.name,
          version: detect.browser.major,
          cpu: detect.cpu.architecture,
          os: {
            name: detect.os.name,
            version: detect.os.version
          }
        }
      return specific
    })()
    colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    screen = {
      width: document.documentElement ? document.documentElement.clientWidth : 0,
      height: document.documentElement ? document.documentElement.clientHeight : 0,
    }
    online = window.navigator.onLine
  }
}