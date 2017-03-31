const later = require('./lib')
const validColors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']

function usage() {
  cmd = process.argv[1].split('/')
  console.log('\nUsage: %s <wait> [--fg color] [--bg color]', cmd[cmd.length - 1])
  console.log()
  console.log('Available colors: %s', validColors.join(', '))
}

/**
 * exit will pass its argument to `console.error` and then exit(1) with usage information.
 */
function exit() {
  console.error.apply(this, arguments)
  usage()
  process.exit(1)
}

const timeReg = new RegExp('^(\\d+h)?(\\d+m)?(\\d+s)?$')

function parseWait(str) {
  const headNum = s => {
    return s ? Number(s.substr(0, s.length - 1)) : 0
  }

  let seconds = 0
  const number = Number(str)

  if (!isNaN(number)) {
    seconds = number
  } else if (timeReg.test(str)) {
    const res = timeReg.exec(str)
    const h = headNum(res[1])
    const m = headNum(res[2])
    const s = headNum(res[3])

    seconds = h * 60 * 60 + m * 60 + s
  }

  return seconds
}

/**
 * getOptions return options passed to `later`
 *
 * @returns {object} the parsed options
 */
function getOptions() {
  const options = {
    wait: parseWait(process.argv[2])
  }

  if (isNaN(options.wait) || options.wait < 1) {
    console.error('error: Invalid `wait` %s. Must be a number or a time format like `1m20s`.', process.argv[2])
    usage()
    process.exit(1)
  }

  for (let i = 3; i < process.argv.length; i += 2) {
    switch (process.argv[i]) {
      case '--fg':
      case '--bg':
        if (validColors.indexOf(process.argv[i+1]) === -1) {
          exit('error: Invalid `%s` %s. Must be a valid color.', process.argv[i], process.argv[i+1])
        }
        options[process.argv[i].substr(2)] = process.argv[i+1]
        break
    }
  }

  return options
}

later(getOptions())
  .then(() => {
    console.log('Done!')
  })
  .catch(err => {
    console.error(err)
  })
