{
  /*
  keyframes: (
    spin: (
      from: (
        transform: rotate(0deg)
      ),
      to: (
        transform: rotate(360deg)
      )
    ),
    ping: (
      0%: (
        transform: scale(1),
        opacity: 1,
      ),
      80%: (
        transform: scale(2.25),
        opacity: 0,
      ),
      100%: (
        transform: scale(2.25),
        opacity: 0,
      )
    ),
    bounce: (
      0%: (
        transform: translateY(-25%),
        animation-timing-function: cubic-bezier(.8,0,1,1)
      ),
      50%: (
        transform: none,
        animation-timing-function: cubic-bezier(0,0,.2,1)
      ),
      100%: (
        transform: translateY(-25%),
        animation-timing-function: cubic-bezier(.8,0,1,1)
      )
    ),
    pulse: (
      0%: (
        opacity: 1,
      ),
      50%: (
        opacity: .5,
      ),
      100%: (
        opacity: 1,
      )
    )
  )
  */
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