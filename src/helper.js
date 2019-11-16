const chalk = require('chalk');

const { colors } = require('./config/colors');
const { levelColors } = require('./config/levelColors');

class Helper {
  static getDefaultColors() {
    return colors;
  }

  static getDefaultLoggerConfig() {
    return {
      server: {
        color: colors.blue,
        levels: levelColors,
      },
      mongodb: {
        color: colors.yellow,
        levels: levelColors,
      },
      socket: {
        color: colors.lightGreen,
        levels: levelColors,
      },
      grpc: {
        color: colors.fountainBlue,
        levels: levelColors,
      },
    };
  }

  static getDefaultActive() {
    const defaultActiveLog = Object.keys(levelColors);
    return {
      server: defaultActiveLog,
      mongodb: defaultActiveLog,
      socket: defaultActiveLog,
      grpc: defaultActiveLog,
    };
  }

  static getDefaultOptions() {
    return {
      reverseOrder: false,
      spaceSymbol: ' ',
    };
  }

  static generateActive(loggerConfig) {
    const active = {};
    Object.keys(loggerConfig).forEach((type) => {
      active[type] = [];
      if (loggerConfig[type].levels) {
        Object.keys(loggerConfig[type].levels).forEach((level) => {
          active[type].push(level);
        });
      }
    });
    return active;
  }

  static generateLog(value, color) {
    return `${chalk.bold.hex(color)(`[${value.toUpperCase()}]`)}`;
  }

  static isActive(active, type, level) {
    const isActiveType = Object.keys(active).includes(type);
    if (!isActiveType) {
      return false;
    }
    if (level) {
      const isActiveLevel = active[type].includes(level);
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
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  static normalizeNumber(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    }
    return num;
  }
}

module.exports = Helper;
