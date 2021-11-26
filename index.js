const chalk = require('chalk')
const ExtraPlugin = class {
  constructor(config) {
    this.config = Object.assign(
      {
        type: 'json',
        filename: 'extra.json',
        extra: {},
        log: true
      },
      config
    )
  }
  apply(compiler) {
    let done = false
    compiler.plugin('emit', (compilation, callback) => {
      if (!done) {
        const { type, filename, extra, log } = this.config
        let extraContent = {}
        if (type !== 'json') {
          Object.prototype.toString.call(extra) === '[object String]'
            ? (extraContent = extra)
            : console.log(
                '\n\n',
                chalk.red('Check out whether your [extra] type is a string...')
              )
        } else {
          Object.prototype.toString.call(extra) === '[object Object]'
            ? (extraContent = JSON.stringify(extra, null, 2))
            : console.log(
                '\n\n',
                chalk.red('Check out whether your [extra] type is a object...')
              )
        }
        if (log) {
          console.log(
            chalk.green(
              '\n',
              '-------------ExtraPlugin start----------------',
              '\n\n',
              `[ExtraPlugin] inject [${filename}]`,
              '\n',
              `[ExtraPlugin] content is ${
                type === 'json' ? JSON.stringify(extra, null, 2) : extra
              }`,
              '\n\n',
              '-------------ExtraPlugin end------------------',
              '\n'
            )
          )
        }
        compilation.assets[this.config.filename] = {
          source() {
            return extraContent
          },
          size() {
            return extraContent.length
          }
        }
        done = true
      }
      callback()
    })
  }
}

module.exports = ExtraPlugin
