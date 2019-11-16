## Install

```console
$ npm install @xom9ik/logger
```

## Usage

### Basic logger
```js
const logger = require('@xom9ik/logger');

logger.server.info('Server has been started');
logger.mogodb.info('MongoDB connection established');
logger.mogodb.warning('MongoDB connection established without credentials');
logger.grpc.error('An unsuccessful attempt to start the GRPC server');
```

### Custom logger

It is possible to set your types and levels, the choice of custom colors.
To do this, pass 3 optional parameters to the `setup` method. `loggerConfig`,` activeLogs`, `options`
```js
const logger = require('@xom9ik/logger');
```

## Constructor params

### loggerConfig
Represents an object, with fields, which is an object for representing a type.
The field type includes `color` and` levels`.
`color` - is the color for the type.
`levels` - an object for representing levels, where the value is the color for the level.

### activeTypes
Represents an object, with type fields and an array for levels (if any). When configuring a logger without levels, the value `true` is used.

### options
- `reverseOrder` - Changes the output order for type and level. The default is `false`.
- `timestamp` - Time display in the format `1970/00/00 01: 01: 01.001`. The default is `true`.
- `spaceSymbol` - A symbol that separates type and level. The default is `space`.

## Info

### Basic Types
- `server`
- `mongodb`
- `socket`
- `grpc`

### Basic Levels
- `info`
- `warning`
- `error`

### Basic Colors
- `gray`
- `green`
- `red`
- `orange`
- `blue`
- `yellow`
- `lightGreen`
- `lightBlue`

### Example `loggerConfig`
```js
const loggerConfig = {
  server: {
    color: colors.blue,
  },
  mongodb: {
    color: colors.yellow,
    levels: {
      info: colors.green,
      warning: colors.orange,
      error: colors.red,
    },
  },
  grpc: {
    color: colors.fountainBlue,
    levels: {
      data: colors.lightGreen,
      systemInfo: colors.black,
    },
  },
  beautifulType: {
    color: colors.green,
    levels: {
      yourFirstLevel: "#f7ea98",
      second: "#4387f5",
      third: "#9e4267",
      fourth: "#736408",
    },
  },
};
```

### Example `activeTypes`
```js
const activeLogs = {
    server: true,
    mongodb: ['info', 'warning', 'error'],
    grpc: ['data', 'systemInfo'],
    beautifulType: ['yourFirstLevel', 'fourth'],
};
```

### Example `options`
```js
const options = {
    reverseOrder: false,
    timestamp: true,
    spaceSymbol: ' ',
};
```

### Output 
```js
logger.beautifulType.yourFirstLevel('Please, output this log message'); // 1970/00/00 01:01:01.001 [BEAUTIFULTYPE] [YOURFIRSTLEVEL] Please, output this log message
``` 


```js
logger.beautifulType.second('This level is not activated, messages will not be displayed');
```

```js
logger.server('This type has no levels'); // 1970/00/00 01:01:01.001 [SERVER] This type has no levels
```
