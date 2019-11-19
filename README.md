# @xom9ik/logger

> Logger with scopes

## ✨ Features
- 🧨 possibility of changing scopes;
- 💎 many palettes with amazing colors;
- 💣 fully customizable
- 📎 simple API.


## 🧲 Install

### 📦 Via NPM

```bash
npm install @xom9ik/logger --save
```

### 🧶 Via Yarn

```bash
yarn add @xom9ik/logger
```

## 🔥 Usage

### 💪 Basic logger
```js
const logger = require('@xom9ik/logger');

logger.server.info('Server has been started');
logger.database.trace('MongoDB connection established');
logger.client.error('Connection to wss://server.com/ refused');
```

### ⚙️ Custom logger

It is possible to set your scopes and levels, the choice of custom colors.
To do this, pass 3 optional parameters to the `setup` method. `loggerConfig`,` activeLogs`, `options`
```js
const logger = require('@xom9ik/logger');

logger.setup(loggerConfig, [activeLogs, options]);
```

### Setup params

#### loggerConfig
Represents an object, with fields, which is an object for representing a scope.
The field scope includes `color` and` levels`.
`color` - is the color for the scope.
`levels` - an object for representing levels, where the value is the color for the level.

### activeLogs
Represents an object, with scope fields and an array for levels (if any). When configuring a logger without levels, the value `true` is used.

### options
- `reverseOrder` - Changes the output order for scope and level. The default is `false`.
- `timestamp` - Time display in the format `1970/00/00 01: 01: 01.001`. The default is `true`.
- `spaceSymbol` - A symbol that separates scope and level. The default is `space`.

## 💡 Info

### Basic Scopes
- `server`
- `client`
- `database`

### Basic Levels
- `error`
- `warning`
- `info`
- `trace`

### Basic Palettes
- `flat`
- `american`
- `aussie`
- `british`
- `canadian`
- `chinese`
- `dutch`
- `french`
- `german`
To get an object with all the `palettes`, you can call the `getPalettes` method

### 🧭 Example `loggerConfig`
```js
const loggerConfig = {
  server: {
    color: palettes.flat.turquoise,
  },
  mongodb: {
    color: palettes.flat.emerald,
    levels: {
      info: palettes.flat.peterRiver,
      warning: palettes.flat.amethyst,
      error: palettes.flat.wetAsphalt,
    },
  },
  grpc: {
    color: palettes.flat.greenSea,
    levels: {
      data: palettes.flat.nephritis,
      systemInfo: palettes.flat.belizeHole,
    },
  },
  beautifulType: {
    color: palettes.flat.wisteria,
    levels: {
      yourFirstLevel: "#f7ea98",
      second: palettes.flat.mightBlue,
      third: "#9e4267",
      fourth: "#736408",
    },
  },
};
```

### Example `activeLogs`
```js
const activeLogs = {
    server: ['info', 'error'],
    client: ['info', 'warning', 'error'],
    database: ['warning'],
    beautifulType: ['yourFirstLevel', 'fourth'],
};
```

### Example `options`
```js
const options = {
    reverseOrder: false,
    timestamp: true,
    spaceSymbol: ' - ',
};
```

### Output
```js
logger.beautifulType.yourFirstLevel('Please, output this log message');
// 1970/00/00 01:01:01.001 [BEAUTIFULTYPE] [YOURFIRSTLEVEL] Please, output this log message

logger.server('This scope has no levels');
// 1970/00/00 01:01:01.001 [SERVER] This scope has no levels

logger.beautifulType.second('This level is not activated, messages will not be displayed');
```

