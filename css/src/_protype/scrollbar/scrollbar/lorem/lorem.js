var lorem = (function() {
  var aMarkup = [
    "&lt;div&gt;content&lt;/div&gt;", 
    "&lt;p class=\"first last\"&gt;some content&lt;/p&gt;", 
    "&lt;input type=\"text\" /&gt;", 
    "&lt;div&gt;\n&nbsp;&nbsp;&lt;p&gt;some extra content&lt;/p&gt;\n&lt;/div&gt;"
  ], 
  aWords = [
    "Lorem", "ipsum", "dolor", "sit", "amet", 
    "Sed", "do", "eiusmod", "tempor", "incididunt", 
    "ut", "labore", "et", "dolore", "magna", "aliqua",
    "consectetur"
  ], 
  aSententce = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod",
    "tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam,",
    "quis nostrud exercitation ullamco.\nlaboris nisi ut aliquip ex ea commodo",
    "consequat, Duis aute irure dolor in reprehenderit in voluptate velit esse",
    "cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non",
    "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ], i, 
  fString = function( lWords, vArray, sSep ) {
    var sResult = "";
    for ( i = 0; i < lWords; i++ )
      sResult = sResult + vArray[ Math.floor( Math.random() * vArray.length ) ] + sSep;
    return sResult;
  };
  function lorem_word( _n ) { return fString( _n, aWords, " " ) }
  function lorem_sentence( _n ) { return fString( _n, aSententce, "\n" ) }
  function lorem_markup( _n ) { return fString( _n, aMarkup, "<br />" ) }
  return {
    word: lorem_word,
    sentence: lorem_sentence,
    markup: lorem_markup
  }
})();

/** snippet
  
  function random( min, max ) {
    return Math.floor( Math.random() * ( max - min++ ) ) + min
  }
  
  *
  */