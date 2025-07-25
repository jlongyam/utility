function initialize(content) {
  // Set default content
  document.getElementById('css-code').value = content.css;
  document.getElementById('html-code').value = content.html;
  // Show CSS tab by default
  switchTab('preview');
}
window.onload = function () {
  var content = {
    css: 'body {\n  font-family: Arial, sans-serif;\n  line-height: 1.5;\n  color: #333;\n  padding: 10px;\n}\n\nh1 {\n  color: #0066cc;\n  border-bottom: 1px solid #ccc;\n}\n\na {\n  color: #cc0000;\n  text-decoration: none;\n}\n\na:hover {\n  text-decoration: underline;\n}',
    html: '<h1>Sample Heading</h1>\n<p>This is a paragraph with a <a href="#">link</a>.</p>\n<ul>\n  <li>List item 1</li>\n  <li>List item 2</li>\n</ul>'
  }
  initialize(content);
}