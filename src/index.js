/* eslint-disable no-underscore-dangle */
const Helper = require('./helper');

class Logger {
  constructor() {
    this.loggerConfig = Helper.getDefaultLoggerConfig();
    this.active = Helper.getDefaultActive();
    this.options = Helper.getDefaultOptions();
    this._init();
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
    const { spaceSymbol, reverseOrder } = this.options;

    this.logTypes.forEach((typeName) => {
      const { color: typeColor } = this.loggerConfig[typeName];
      if (!this.loggerConfig[typeName].levels) {
        this[typeName] = (...args) => {
          if (Helper.isActive(this.active, typeName)) {
            const logString = `${Helper.generateLog(typeName, typeColor)}`;
            console.log(`${Helper.logTime()} ${logString}`, ...args);
          }
        };
      } else {
        const levelNames = Object.keys(this.loggerConfig[typeName].levels);
        levelNames.forEach((levelName) => {
          const levelColor = this.loggerConfig[typeName].levels[levelName];
          if (!this[typeName]) {
            this[typeName] = {};
          }
          this[typeName][levelName] = (...args) => {
            if (Helper.isActive(this.active, typeName, levelName)) {
              let logString = `${Helper.generateLog(typeName, typeColor)}${spaceSymbol}${Helper.generateLog(levelName, levelColor)}`;
              if (reverseOrder) {
                logString = logString.split(spaceSymbol).reverse().join(spaceSymbol);
              }
              console.log(`${Helper.logTime()} ${logString}`, ...args);
            }
          };
        });
      }
    });
  }
}

module.exports = {
  colors: Helper.getDefaultColors(),
  logger: new Logger(),
};
