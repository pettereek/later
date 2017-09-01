const DraftLog = require('draftlog').into(console)

const zip = require('./zip')
const font = require('./font').chars
const row = require('./row')

/**
 * Holding on to our drafts
 */
const drafts = []

/**
 * This is our counter
 */
let seconds = 0

/**
 * empty draws an empty row the specified number of times
 *
 * @param {functin} rowFn - the drawing function
 * @returns {function}
 *
 * @param {number} n - the number of rows to draw
 * @param {boolean} draft - use `console.draft` (default is `console.log`)
 * @returns {array} the drawn consoles
 */
function emptyFn(rowFn) {
  return (n, draft) => {
    let lines = []

    for (let i = 0; i < n; i++) {
      lines.push(draft ? console.draft(rowFn()) : console.log(rowFn()))
    }

    return lines
  }
}

/**
 * drawFn returns a function drawing the current remaining number
 *
 * @param {function} rowFn - the drawing function
 * @returns {function} the drawing function
 */
function drawFn(rowFn) {
  const str = n => `${n}`
  const pad = n => n < 10 ? `0${n}` : str(n)
  const time = sec => {
    const h = Math.floor(sec / (60 * 60))
    const m = Math.floor((sec - h * 60 * 60) / 60)
    const s = sec - (m * 60 + h * 60 * 60)
    return [
      str(h),
      str(m),
      pad(s)
    ].reduce((acc, pt) => {
      if (pt !== '0' || acc.length > 0) { acc.push(pt) }
      return acc
    }, []).join(':')
  }

  return () => {
    let chars
    if (seconds === 0) {
      chars = [font[11]]
    } else {
      chars = time(seconds)
      .split('')
      .map(s => {
        if (s === ':') { return 10 }
        return Number(s)
      })
      .map(n => font[n])
    }

    zip(chars).forEach((line, i) => {
      drafts[i](rowFn(line))
    })
  }
}

/**
 * later will draw a countdown for the specified number of seconds before fulfilling the Promise
 *
 * @param {object} options - an options hash
 *
 * Available options:
 *   wait {number} - the number of seconds to wait (required)
 *   fg {string} - the foreground color
 *   bg {string} - the background color
 */
module.exports = function later(options) {
  const done = new Date()
  done.setSeconds(done.getSeconds() + options.wait + 1) // Add one to print what the user told us

  const coloredRow = row(options.fg, options.bg)
  const draw = drawFn(coloredRow)
  const empty = emptyFn(coloredRow)

  empty(3)
  empty(9, true).forEach(l => drafts.push(l))
  empty(3)

  // Re-draw when the console size changes
  process.stdout.on('resize', draw)

  return new Promise((resolve) => {
    const interval = setInterval(function () {
      const now = new Date()
      const diffMs = done - now
      seconds = Math.max(Math.ceil(diffMs / 1000), 0)

      draw()

      if (diffMs < 0) {
        clearInterval(interval)
        resolve()
      }
    }, 1000)
  })
}
