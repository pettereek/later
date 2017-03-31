/*
 * Inspried by 3Dventure by Aaron D. Chand
 */

const zero =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx      x' +
  'xx  xx  x' +
  'xx  xx  x' +
  'xx  xx  x' +
  'xx  xx  x' +
  'xx      x' +
  ' xxxxxxxx'

const one =
  'xxxxxx   ' +
  'xxxxxxx  ' +
  'xx    x  ' +
  ' xxx  x  ' +
  '  xx  x  ' +
  'xxxx  xx ' +
  'xxxx  xxx' +
  'xx      x' +
  ' xxxxxxxx'

const two =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx      x' +
  'xxxxx   x' +
  'xx      x' +
  'xx      x' +
  'xx  xxxxx' +
  'xx      x' +
  ' xxxxxxxx'

const three =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx      x' +
  'xxxxxx  x' +
  'xx      x' +
  'xx      x' +
  'xxxxxx  x' +
  'xx      x' +
  ' xxxxxxxx'

const four =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx  xx  x' +
  'xx  xx  x' +
  'xx      x' +
  ' xxxxx  x' +
  '    xx  x' +
  '    xx  x' +
  '     xxxx'

const five =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx      x' +
  'xx  xxxxx' +
  'xx      x' +
  'xx      x' +
  'xxxxxx  x' +
  'xx      x' +
  ' xxxxxxxx'

const six =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx      x' +
  'xx  xxxxx' +
  'xx      x' +
  'xx  xx  x' +
  'xx  xx  x' +
  'xx      x' +
  ' xxxxxxxx'

const seven =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx      x' +
  ' xxxxx  x' +
  '    xx  x' +
  '    xx  x' +
  '    xx  x' +
  '    xx  x' +
  '     xxxx'

const eight =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx      x' +
  'xx  xx  x' +
  'xx      x' +
  'xx  xx  x' +
  'xx  xx  x' +
  'xx      x' +
  ' xxxxxxxx'

const nine =
  'xxxxxxxx ' +
  'xxxxxxxxx' +
  'xx      x' +
  'xx  xx  x' +
  'xx  xx  x' +
  'xx      x' +
  'xxxxxx  x' +
  'xx      x' +
  ' xxxxxxxx'

const separator =
  '  xxxx   ' +
  '  xxxxx  ' +
  '  xx  x  ' +
  '  xx  x  ' +
  '  xxxxx  ' +
  '  xxxxx  ' +
  '  xx  x  ' +
  '  xx  x  ' +
  '   xxxx  '

const lineSplitter = /.{1,9}/g
const fgMatcher = /\x/g
const bgMatcher = /\ /g

const numbers = [
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  separator
]

module.exports = {
  /**
   * Numbers 0-9 splitted by rows
   *
   * Example:
   * numbers[0] = ['xxx...', 'xxx...', ...]
   */
  numbers: numbers.map(s => s.match(lineSplitter)),

  /**
   * Replace the default characters
   *
   * @param {string} fg - the foreground replacement
   * @param {string} bg - the background replacement
   * @returns {array} like numbers with the provided fb and bg
   */
  replace(fg = 'x', bg = ' ') {
    return numbers
      .map(s => s.replace(fgMatcher, fg))
      .map(s => s.replace(bgMatcher, bg))
      .map(s => s.match(lineSplitter))
  }
}
