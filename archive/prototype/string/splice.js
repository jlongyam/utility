String.prototype.splice = function (i_pos, n_length, s_add) {
  n_length = +n_length || 0
  s_add = s_add || ''
  return this.slice(0, i_pos) + s_add + this.slice(i_pos + n_length)
}