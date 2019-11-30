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

| Parameter        | Description           | Type               | Default       |  Required   |
|------------|----------------|--------------------|--------------|----------------|
| data | The string data that need to add ellipsis | String | -   | true |
| line-clamp  | Number of lines to display | Number | 1  | true |
| line-height | Single line height (please calculate the corresponding px value)  | String | '22px'   | true |
| end-char | String at the end of the sentence | String |'...'| false |
| end-html | HTML element at the end of the sentence | String| - | false |
| delayTime | respond to window onresize event delay time | Number | 20 | false |
| click | Click callback function |  Function | - | false |


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
- version 1.2.0 => respond to window onresize event.

- version 1.1.6 => change console.log tips.

- version 1.1.5 => fix a bug about data change error show.

- version 1.1.3 => change build config to fix a bug about vue runtime-only build.

- version 1.1.2 => fix a bug about str length can't get.

- version 1.1.x => add user-defined ending string; add user-defined ending html; add click callback function.

- version 1.0.x => add basic functions: substring multiline sentence and add '...'.



## License

[MIT](http://opensource.org/licenses/MIT)
