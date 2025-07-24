// require DOM createElement.js, random.int.js, random.word.js
random.table = (o_table, n_row = random.int(15), n_col = random.int(30)) => {
  let
    caption = o_table.createCaption(),
    colgroup = createElement('colgroup'),
    col = createElement('col'),
    col1 = createElement('col', { span: n_row/random.int(5) }),
    col2 = createElement('col', { span: n_row/random.int(3) })
    ;
  caption.textContent = random.word(random.int(), false, true )
  colgroup.appendChild(col)
  colgroup.appendChild(col1)
  colgroup.appendChild(col2)
  o_table.appendChild(colgroup)
  let 
    tb_head = o_table.createTHead(),
    tb_foot = o_table.createTFoot(),
    tb_body = o_table.createTBody(),
    tb_head_row = tb_head.insertRow(),
    tb_foot_row = tb_foot.insertRow()
    ;
  for (let i = 1; i <= n_row; i++) {
    let
      s_head = random.word(random.int(), false, true),
      th_head = createElement('th', { textContent: s_head }),
      th_foot = createElement('th', { textContent: s_head })
      ;
    tb_head_row.appendChild(th_head)
    tb_foot_row.appendChild(th_foot)
    let tb_body_row = undefined
    if (i <= n_col) tb_body_row = tb_body.insertRow()
    if (i > n_col) continue

    for (let n = 1; n <= n_row; n++) {
      let
        s_body = random.word(),
        td_body = tb_body_row.insertCell()
        ;
      if (n === 1) td_body.textContent = i
      else td_body.textContent = s_body
    }
  }
}
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-table]')
    els.forEach(el => {
      let val = el.getAttribute('data-random-table')
      if(val.length > 0 ) {
        let arr = val.split(',')
        random.table(el,arr[0],arr[1])
      }
      else random.table(el)
    })
  })
}