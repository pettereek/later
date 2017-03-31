module.exports = function zip(arrs) {
  return arrs[0].map((item, i) => {
    return arrs.map(arr => arr[i])
  })
}
