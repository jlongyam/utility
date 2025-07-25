{
  let size_px = [3,5,7,10,15,20]
  let style = `
    ${size_px.map((i)=> {
      return `
        /* -- margin_px */
        .m_${i}px  { margin: ${i}px; }
        .mt_${i}px { margin-top: ${i}px; }
        .mr_${i}px { margin-right: ${i}px; }
        .mb_${i}px { margin-bottom: ${i}px; }
        .ml_${i}px { margin-left: ${i}px; }
        /* -- padding_px */
        .p_${i}px  { padding: ${i}px; }
        .pt_${i}px { padding-top: ${i}px; }
        .pr_${i}px { padding-right: ${i}px; }
        .pb_${i}px { padding-bottom: ${i}px; }
        .pl_${i}px { padding-left: ${i}px; }
      `
    }).join('')}
  `, d = document;
  d.head.appendChild( Object.assign( d.createElement( 'style' ), { textContent: style } ) )
  d.head.removeChild( d.currentScript )
}