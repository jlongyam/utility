{
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
}