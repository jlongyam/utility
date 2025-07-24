((window)=> {
  // if ("onhashchange" in window) { return }
  var
    location = window.location,
    oldURL = location.href,
    oldHash = location.hash
  ;
  setInterval(function() {
    var
      newURL = location.href,
      newHash = location.hash
    ;
    if (newHash != oldHash && typeof window.onhashchange === "function") {
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      })
      oldURL = newURL
      oldHash = newHash
    }
  }, 100)
})(window)
