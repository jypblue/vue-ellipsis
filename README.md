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

| 参数        | 说明           | 类型               | 默认值       |  必写   |
|------------|----------------|--------------------|--------------|----------------|
| data | 需要添加省略号的内容 | String | -   | true |
| line-clamp  | 显示几行 | Number | 1  | true |
| line-height | 单行高度(设定时与实际单行高度一致，若使用rem请自行计算转换)  | String | '22px'   | true |
| end-char | 句子末尾跟随字符串 | String |'...'| false |
| end-html | 句子末尾跟随HTML片段 | String| - | false |
| click | 点击回调函数 |  Function | - | false |


## How To Use

```
Import:
import Vue from 'vue'
import VueEllipsis from 'vue-ellipsis'
Vue.use(VueEllipsis)

Component Use:

html: HTML String. just like '<span class="read-more">read more</span>'
handleClick: click callback function

<ellipsis
:data="msg"
:line-clamp="2"
:line-height="'24px'"
:end-char="'###'"
:end-html="html"
@click="handleClick"
>
</ellipsis>

```

## Update Log

- version 1.1.1 => fix a bug about str length can't get.

- version 1.1.x => add user-defined ending string; add user-defined ending html; add click callback function.

- version 1.0.x => add basic functions: substring multiline sentence and add '...'.



## License

[MIT](http://opensource.org/licenses/MIT)
