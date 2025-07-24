function drag(o_scope, o_drag, cb = {}) {
  o_scope.addEventListener('dragover', (e) => {
    e.preventDefault()
    if (cb.dragover) cb.dragover(e)
  }, false)
  o_scope.addEventListener('dragenter', (e) => {
    if (cb.dragenter) cb.dragenter(e)
  })
  o_scope.addEventListener('dragleave', (e) => {
    if (cb.dragleave) cb.dragleave(e)
  })
  o_scope.addEventListener('drop', (e) => {
    e.preventDefault()
    if (cb.drop) cb.drop(e)
  })
  o_drag.addEventListener('drag', (e) => {
    o_drag.style.visibility = 'hidden'
    o_drag.style.left = e.clientX + 'px'
    o_drag.style.top = e.clientY + 'px'
    if (cb.drag) cb.drag(e)
  })
  o_drag.addEventListener('dragstart', (e) => {
    if (cb.dragstart) cb.dragstart(e)
  })
  o_drag.addEventListener('dragend', (e) => {
    o_drag.style.visibility = 'unset'
    if (cb.dragend) cb.dragend(e)
  })
}
function dragMove(o_scope, o_drag, sort = false /*'vertical'|'horizontal'*/, cb = {}) {
  let
    posX = 0,
    posY = 0,
    pointX = 0,
    pointY = 0,
    touch = false
    ;
  function dragging(e) {
    if (touch) {
      pointX = touch.clientX - o_scope.offsetLeft
      pointY = touch.clientY - o_scope.offsetTop
    }
    else {
      pointX = e.clientX - posX;
      pointY = e.clientY - posY;
    }
    let max = {
      left: o_scope.offsetLeft,
      top: o_scope.offsetTop,
      right: o_scope.offsetLeft + o_scope.offsetWidth - o_drag.offsetWidth,
      bottom: o_scope.offsetTop + o_scope.offsetHeight - o_drag.offsetHeight
    }
    if (sort === 'vertical') {
      let
        parent = o_drag.parentElement,
        border_parent = parseInt(cssProperty.get('border-width',parent).replace('px','')),
        border_o_drag = parseInt(cssProperty.get('border-width',o_drag).replace('px','')) 
        ;
      pointX = 0
      max.top = 0
      max.bottom = parent.offsetHeight - o_drag.offsetHeight - (border_parent + border_o_drag)
    }
    if (sort === 'horizontal') {
      parent_start = o_scope.children[0]
      parent_last = o_scope.children[o_scope.children.length-1]
      max.left = parent_start.offsetLeft
    }
    if (pointX <= max.left) max.left
    else if (pointX >= max.right) pointX = max.right
    else {
      if (touch) pointX = touch.clientX - o_scope.offsetLeft
      else pointX = e.clientX - posX;
    }
    if (pointY <= max.top) pointY = max.top
    else if (pointY >= max.bottom) pointY = max.bottom
    else {
      if (touch) pointY = touch.clientY - o_scope.offsetTop
      else pointY = e.clientY - posY;
    }
    o_drag.style.left = pointX + 'px'
    o_drag.style.top = pointY + 'px'
    if (cb.drag) cb.dragging(e)
  }
  function mouseDown(e) {
    e.preventDefault();
    posX = e.clientX - o_drag.offsetLeft
    posY = e.clientY - o_drag.offsetTop
    touch = false
    if (sort) {
      o_drag.style.position = 'absolute'
      e.target.style.zIndex = '99'
    }
    o_scope.addEventListener('mousemove', dragging, false)
    if (cb.mouseDown) cb.mouseDown(e)
  }
  function mouseUp(e) {
    o_scope.removeEventListener('mousemove', dragging, false)
    e.target.style.zIndex = 'auto'
    if (cb.mouseUp) cb.mouseUp(e)
  }
  function touchMove(e) {
    e.preventDefault();
    if (e.type === 'touchmove') touch = e.targetTouches[0]
    o_scope.addEventListener('touchmove', dragging, false)
    if (cb.touchmove) cb.touchmove(e)
  }
  function touchEnd(e) {
    o_scope.removeEventListener('touchmove', dragging, false)
    if (cb.touchEnd) cb.touchEnd(e)
  }
  o_drag.addEventListener('mousedown', mouseDown, false)
  o_scope.addEventListener('mouseup', mouseUp, false)
  o_drag.addEventListener('touchmove', touchMove, false)
  o_scope.addEventListener('touchend', touchEnd, false)
}
