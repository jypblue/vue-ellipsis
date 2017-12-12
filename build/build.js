/**
 * @author zx.wang (zx.wang1991@gmail.com)
 * @date 2017-12-10 13:57:20
 * @version 1.0.0
 */

const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-js');
const babel = require('rollup-plugin-babel');
const package = require('../package.json');

const banner =
  `
  /* !\n
  * vue-ellipsis v${package.version}\n
  * https://github.com/jypblue/vue-ellipsis\n
  * Released under the MIT License. \n
  * \n
  */\n`;

  rollup.rollup({
    entry: 'src/main.js',
    plugins: [
      babel({
        presets: 'es2015-loose-rollup'
      })
    ]
  }).then(function(bundle) {
    return write('dist/vue-ellipsis.js', bundle.generate({
      format: 'umd',
      banner: banner,
      moduleName: 'VueEllipsis'
    }).code, bundle);
  }).then(function(bundle) {
    return write('dist/vue-ellipsis.min.js', banner + '\n' +
    uglify.minify('dist/vue-ellipsis.js').code, bundle);
  }).then(function(bundle) {
    return write('dist/vue-ellipsis.es2015.js', bundle.generate({
      banner: banner
    }).code, bundle);
  }).then(function(bundle) {
    return write('dist/vue-ellipsis.common.js', bundle.generate({
      format: 'cjs',
      banner: banner
    }).code, bundle)
  }).catch(logError);

function logError(e) {
  console.log(e)
}

function write(dest, code, bundle) {
  return new Promise(function(resolve, reject){
    fs.writeFile(dest, code, function(err) {
      if(err) return reject(err);
      console.log(blue(dest) + ' ' + getSize(code));
      resolve(bundle);
    })
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function blue(str) {
  return '\x1b[1m\x1b[34m'+str+'\x1b[39m\x1b[22m';
}