{
  let radius: { // rem
    xxs: 3,xs: 4, sm: 6, md: 8, lg: 12, xl: 16, xxl: 24,
  }
  let shadow = {
    xxs: '0 1px 2px rgba(134, 144, 162, 0.1)',
    xs: '0 2px 4px rgba(134, 144, 162, 0.15)',
    sm: '0 3px 6px rgba(134, 144, 162, 0.2)',
    md: '0 4px 8px rgba(134, 144, 162, 0.25)',
    lg: '0 6px 12px rgba(134, 144, 162, 0.3)',
    xl: '0 12px 24px rgba(134, 144, 162, 0.35)',
    xxl: '0 24px 48px rgba(134, 144, 162, 0.4)'
  }
  let shadow_color = {
    focus: '0 0 0 4px rgba(0, 84, 203, 0.2)',
    success: '0 0 0 4px rgba(18, 181, 57, 0.2)',
    warning: '0 0 0 4px rgba(210, 127, 0, 0.2)',
    danger: '0 0 0 4px rgba(203, 18, 0, 0.2)',
    info: '0 0 0 4px rgba(0, 200, 177, 0.2)'
  }
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