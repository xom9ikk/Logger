/* eslint-disable no-underscore-dangle,class-methods-use-this */
const Helper = require('./helper');
const { palettes } = require('./config/palettes');

class Logger {
  constructor() {
    this.loggerConfig = Helper.getDefaultLoggerConfig();
    this.active = Helper.getDefaultActive();
    this.options = Helper.getDefaultOptions();
    this._init();
    this.server = {
      error: (...args) => {
        this._defaultHandler('server', 'error', ...args);
      },
      warning: (...args) => {
        this._defaultHandler('server', 'warning', ...args);
      },
      info: (...args) => {
        this._defaultHandler('server', 'info', ...args);
      },
      trace: (...args) => {
        this._defaultHandler('server', 'trace', ...args);
      },
    };
    this.client = {
      error: (...args) => {
        this._defaultHandler('client', 'error', ...args);
      },
      warning: (...args) => {
        this._defaultHandler('client', 'warning', ...args);
      },
      info: (...args) => {
        this._defaultHandler('client', 'info', ...args);
      },
      trace: (...args) => {
        this._defaultHandler('client', 'trace', ...args);
      },
    };
    this.database = {
      error: (...args) => {
        this._defaultHandler('database', 'error', ...args);
      },
      warning: (...args) => {
        this._defaultHandler('database', 'warning', ...args);
      },
      info: (...args) => {
        this._defaultHandler('database', 'info', ...args);
      },
      trace: (...args) => {
        this._defaultHandler('database', 'trace', ...args);
      },
    };
  }

  getPalettes() {
    return palettes;
  }

  setLoggerConfig(loggerConfig) {
    this.loggerConfig = loggerConfig;
  }

  setActiveLog(active) {
    this.active = active;
  }

  setOptions(options) {
    this.options = options;
  }

  setup(loggerConfig, active, options) {
    this.loggerConfig = loggerConfig || Helper.getDefaultLoggerConfig();
    if (!loggerConfig) {
      this.active = Helper.getDefaultActive();
    } else if (loggerConfig && !active) {
      this.active = Helper.generateActive(this.loggerConfig);
    } else {
      this.active = active;
    }
    this.options = options || Helper.getDefaultOptions();
    this._init();
  }

  _init() {
    this.logTypes = Object.keys(this.loggerConfig);

    this.logTypes.forEach((scopeName) => {
      const { color: scopeColor } = this.loggerConfig[scopeName];
      if (!this.loggerConfig[scopeName].levels) {
        this[scopeName] = (...args) => {
          this._log(scopeName, scopeColor, ...args);
        };
      } else {
        const levelNames = Object.keys(this.loggerConfig[scopeName].levels);
        levelNames.forEach((levelName) => {
          const levelColor = this.loggerConfig[scopeName].levels[levelName];
          if (!this[scopeName]) {
            this[scopeName] = {};
          }
          this[scopeName][levelName] = (...args) => {
            this._logWithLevel(scopeName, scopeColor, levelName, levelColor, ...args);
          };
        });
      }
    });
  }

  _defaultHandler(scopeName, levelName, ...args) {
    const scopeColor = this.loggerConfig[scopeName].color;
    const levelColor = this.loggerConfig[scopeName].levels[levelName];
    this._logWithLevel(scopeName, scopeColor, levelName, levelColor, ...args);
  }

  _logWithLevel(scopeName, scopeColor, levelName, levelColor, ...args) {
    const { spaceSymbol, reverseOrder } = this.options;
    if (Helper.isActive(this.active, scopeName, levelName)) {
      let logString = `${Helper.generateLog(scopeName, scopeColor)}${spaceSymbol}${Helper.generateLog(levelName, levelColor)}`;
      if (reverseOrder) {
        logString = logString.split(spaceSymbol).reverse().join(spaceSymbol);
      }
      console.log(`${Helper.logTime()} ${logString}`, ...args);
    }
  }

  _log(scopeName, scopeColor, ...args) {
    if (Helper.isActive(this.active, scopeName)) {
      const logString = `${Helper.generateLog(scopeName, scopeColor)}`;
      console.log(`${Helper.logTime()} ${logString}`, ...args);
    }
  }
}

module.exports = new Logger();
