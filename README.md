# vue-ellipsis

[![Version](https://img.shields.io/npm/v/vue-ellipsis.svg)](https://www.npmjs.com/package/vue-ellipsis) [![License](https://img.shields.io/npm/l/vue-ellipsis.svg)](https://www.npmjs.com/package/vue-ellipsis) [![Downloads](https://img.shields.io/npm/dt/vue-ellipsis.svg)](https://www.npmjs.com/package/vue-ellipsis)

a multiline sentence ellipsis component of vue2.js

## Features
- Supports Vue2.js
- Compact size 2KB(1KB gzipped)

## Installation

### NPM
```
$ npm install vue-ellipsis --save
```
### Yarn
```
$ yarn add vue-ellipsis
```

### Bower
```
$ bower install vue-ellipsis
```

## Ellipsis Component Attributes

| 参数        | 说明           | 类型               | 默认值       |
|------------|----------------|--------------------|--------------|
| data | 需要添加省略号的内容 | String | 无   |
| line-clamp  | 显示几行 | Number | 1  |
| line-height | 单行高度  | String/Number | 无   |


## How To Use

```
Import:
import Vue from 'vue'
import VueEllipsis from 'vue-ellipsis'
Vue.use(VueEllipsis)

Component Use:
<ellipsis :data="msg" :line-clamp="2" :line-height="22px/22"></ellipsis>

```

## License

[MIT](http://opensource.org/licenses/MIT)
