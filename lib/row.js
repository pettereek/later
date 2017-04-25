const chalk = require('chalk')
const sectionize = require('./sectionize')

const colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white'
]

function randomColor(...except) {
  function newRandomColor() { return colors[Math.floor(Math.random()*colors.length)] }

  for (let i = 0; i < 10; i++) {
    const candidate = newRandomColor()
    if (except.indexOf(candidate) === -1) { return candidate }
  }

  return newRandomColor()
}

function colorize(row, fg, bg) {
  return sectionize(null, row)
    .map(({char, n}) => (char === 'x' ? fg : bg)(' '.repeat(n)))
    .join('')
}

function colorFromString(str) {
  const key = 'bg' + str[0].toUpperCase() + str.substr(1)
  return chalk[key]
}

module.exports = function row(fg, bg) {
  fg = fg || randomColor(bg)
  bg = bg || randomColor(fg)

  if (typeof fg === 'string') { fg = colorFromString(fg) }
  if (typeof bg === 'string') { bg = colorFromString(bg) }

  return function(data) {
    data = data || []

    const width = process.stdout.columns
    const height = process.stdout.rows

    data = data.join('  ')

    if (data.length * 2 < width) {
      data = data
        .split('')
        .map(c => c + c)
        .join('')
    }

    const len = data.length

    if (data.length) {
      data = colorize(data, fg, bg)
    }

    const margins = width - len
    const leading = Math.floor((width - len)/2)
    const trailing = margins - leading

    return [
      bg(' ').repeat(leading),
      data,
      bg(' ').repeat(trailing)
    ].join('')
  }
}
