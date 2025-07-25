{
  let size_px = [1,2,3,4,5,6,8,10,12,14,16,18,20,24,28,32,36,40,48,56,64,72,80]
  let style = `
    ${size_px.map((i)=> {
      return `
        .h_${i}px  { height: ${i}px; }
        .w_${i}px  { width: ${i}px; }
      `
    }).join('')}
  `, d = document;
  d.head.appendChild( Object.assign( d.createElement( 'style' ), { textContent: style } ) )
  d.head.removeChild( d.currentScript )
}