## WebpackExtraPlugin

### webpack 打包时，可自定义输出文件到 dist 目录中

install

```shell
yarn add webpack-extra-plugin
# or
npm install webpack-extra-plugin
```

use

```js
const ExtraPlugin = require('webpack-extra-plugin')
// webpack.config.js
{
  plugins: [
    new ExtraPlugin({
      type: 'json', // type: json/other, defatul json
      filename: 'extra.json', // default extra.json, type=other时可自定义后缀
      extra: {
        // json对应object, other对应string
        a: 1,
        b: 2
      },
      log: true // default true, 打包时控制台输出日志
    })
  ]
}
```

### Example

1. `type: 'json'`
   It will produce a extra.json in your dist folder.

webpack.config.js

```js
new ExtraPlugin({
  type: 'json',
  filename: 'extra.json',
  extra: {
    a: 1,
    b: 2
  },
  log: true
})
```

dist/extra.json

```json
{
  "a": 1,
  "b": 2
}
```

2. `type: 'js'`
   it will produce a extra.json in your dist folder.

webpack.config.js

```js
new ExtraPlugin({
  type: 'js',
  filename: 'extra.js',
  extra: `
    export const demo = {
      a: 1,
      b: 2
    }
    `,
  log: true
})
```

dist/extra.js

```js
export const demo = {
  a: 1,
  b: 2
}
```
