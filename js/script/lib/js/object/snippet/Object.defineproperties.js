// multiple Object.defineProperty
Object.defineProperties( OBJECT_TARGET, {
  NAME: { // not a STRING_NAME
    // same as Object.defineProperty
    value,
    get,
    set,
    enumerable,
    writeable,
    configurable
  },
  NAME2: {
    // Idem
  }
})