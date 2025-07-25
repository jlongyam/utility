{
  let font_weight = {
    'xx-light': 100,
    'x-light': 200,
    'light': 300,
    'normal': 400,
    'x-normal': 500,
    'xx-normal': 600,
    'bold': 700,
    'x-bold': 800,
    'xx-bold': 900
  }
  let font_sizes = {
    // font-size (rem), line-height (num)
    'xx-small': [10,1.875],
    'x-small': [12,1.875],
    'small': [14,1.75],
    'normal': [16,1.75],
    'large': [18,1.625],
    'x-large': [20,1.625],
    'xx-large': [24,1.5],
    '3x-large': [28,1.375],
    '4x-large': [32,1.25],
    '5x-large': [36,1.25],
    '6x-large': [40,1.25],
    '7x-large': [48,1.25],
    '8x-large': [56,1.25],
    '9x-large': [64,1.125],
    '10x-large': [72,1.125],
    '11x-large': [80,1.125],
    '12x-large': [96,1.125]
  }
  let line_height = {
    'xx-tight': 1.125,
    'x-tight': 1.25,
    'tight': 1.375,
    'normal': 1.5,
    'loose': 1.625,
    'x-loose': 1.75,
    'x-loose': 1.875,
  }
  let letter_spacing =  {
    'xx-tight': '-0.08em',
    'x-tight': '-0.04em',
    'tight': '-0.02em',
    'normal': '0',
    'loose': '0.02em',
    'x-loose': '0.04em',
    'x-loose': '0.08em',
  }
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