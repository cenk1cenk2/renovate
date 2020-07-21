import chalk from 'chalk'
import config from 'config'
import figures from 'figures'
import { createLogger, format, transports } from 'winston'

import { logLevels } from './logger.constants'
import { ILogger, ILoggerFormat } from './logger.interface'

export class Logger {
  static readonly levels = {
    [logLevels.silent]: 0,
    [logLevels.direct]: 1,
    [logLevels.critical]: 1,
    [logLevels.fail]: 2,
    [logLevels.warn]: 3,
    [logLevels.success]: 4,
    [logLevels.info]: 5,
    [logLevels.debug]: 6
  }

  public log: ILogger
  public id: string

  constructor (module?: string) {
    this.id = module
    this.log = this.initiateLogger()
  }

  public getInstance (module?: string): ILogger {
    if (!this.log) {
      this.log = this.initiateLogger()
    }

    if (module) {
      this.id = module
    }
    return this.log
  }

  private initiateLogger (): ILogger {
    const loglevel: string = config.get('loglevel')
    const logFormat = format.printf(({ level, message, custom }: ILoggerFormat) => {
      // parse multi line messages
      try {
        let multiLineMessage = message.split('\n')
        multiLineMessage = multiLineMessage.map((msg) => {
          // format messages
          return this.logColoring({
            level,
            message: msg,
            module: this.id,
            custom
          })
        })
        // join back multi line messages
        message = multiLineMessage.join('\n')
        // eslint-disable-next-line no-empty
      } catch {}
      return message
    })

    return createLogger({
      level: loglevel || 'info',
      silent: loglevel === 'silent',
      format: format.combine(logFormat, format.splat()),
      levels: Logger.levels,
      transports: [ new transports.Console() ]
    }) as ILogger
  }

  private logColoring ({ level, message, module, custom }: ILoggerFormat & { module?: string }): string {
    let context: string
    let icon: string

    // parse context from custom or module
    if (custom) {
      context = custom
    } else if (module) {
      context = module
    } else {
      context = level
    }

    // do the coloring
    let coloring = (input: string): string => {
      return input
    }

    switch (level) {
    case logLevels.critical:
      coloring = chalk.bgRed.black
      icon = figures.cross
      break
    case logLevels.fail:
      coloring = chalk.red
      icon = figures.cross
      break
    case logLevels.warn:
      coloring = chalk.yellow
      icon = figures.warning
      break
    case logLevels.success:
      coloring = chalk.green
      icon = figures.tick
      break
    case logLevels.info:
      icon = figures.pointerSmall
      break
    case logLevels.debug:
      coloring = chalk.dim
      icon = figures.play
      break
    default:
      break
    }

    if (level === logLevels.direct) {
      return message
    } else {
      return coloring(`${icon} [${context.toUpperCase()}] ${message}`)
    }
  }
}
