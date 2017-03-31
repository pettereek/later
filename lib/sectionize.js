module.exports = function sectionize(char, str, acc) {
  acc = acc || []
  if (!char) { char = str[0] }

  const other = char === 'x' ? ' ' : 'x'

  const n = str.indexOf(other)
  if (n > -1) {
    acc.push({ char, n })
    return sectionize(other, str.substr(n), acc)
  }

  acc.push({ char, n: str.length })
  return acc
}
