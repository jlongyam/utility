CustomHTML.element( 'my-component', `
  <h3>Welcome, {{this.username}}!</h3>
  <button onclick="alert(9)">{{this.button.text}}</button>
`, class extends CustomHTML {
  constructor() {
    super();
    this.username = 'John Jimmy Junior';
    this.button = {}
    this.button.text = 'Click ME'
  }
  
  select(q) {
    return this.shadowRoot.querySelector(q)
  }
  get btn() { return this.select('button') }
  onRender() {
    console.log(this.btn)
    console.log(this)   
  }
})