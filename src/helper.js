const chalk = require('chalk');

const palettes = require('./config/palettes');
const { levelColors } = require('./config/levelColors');

class Helper {
  static getDefaultLoggerConfig() {
    return {
      server: {
        color: palettes.flat.peterRiver,
        levels: levelColors,
      },
      client: {
        color: palettes.flat.sunFlower,
        levels: levelColors,
      },
      database: {
        color: palettes.flat.amethyst,
        levels: levelColors,
      },
    };
  }

  static getDefaultActive() {
    const defaultActiveLog = Object.keys(levelColors);
    return {
      server: defaultActiveLog,
      client: defaultActiveLog,
      database: defaultActiveLog,
    };
  }

  static getDefaultOptions() {
    return {
      reverseOrder: false,
      timestamp: true,
      spaceSymbol: ' ',
    };
  }

  static generateActive(loggerConfig) {
    const active = {};
    Object.keys(loggerConfig).forEach((scope) => {
      active[scope] = [];
      if (loggerConfig[scope].levels) {
        Object.keys(loggerConfig[scope].levels).forEach((level) => {
          active[scope].push(level);
        });
      }
    });
    return active;
  }

  static generateLog(value, color) {
    return `${chalk.bold.hex(color)(`[${value.toUpperCase()}]`)}`;
  }

  static isActive(active, scope, level) {
    const isActiveScope = Object.keys(active).includes(scope);
    if (!isActiveScope) {
      return false;
    }
    if (level) {
      const isActiveLevel = active[scope].includes(level);
      if (!isActiveLevel) {
        return false;
      }
    }
    return true;
  }

  static logTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = this.normalizeNumber(now.getMonth());
    const date = Helper.normalizeNumber(now.getDate());
    const hours = Helper.normalizeNumber(now.getHours());
    const minutes = Helper.normalizeNumber(now.getMinutes());
    const seconds = Helper.normalizeNumber(now.getSeconds());
    const milliseconds = now.getMilliseconds();
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  static normalizeNumber(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    }
    return num;
  }
}

module.exports = Helper;
