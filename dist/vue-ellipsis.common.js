
  /* !

  * vue-ellipsis v1.0.2

  * https://github.com/jypblue/vue-ellipsis

  * Released under the MIT License. 

  * 

  */

'use strict';

/**
 * @author zx.wang(zx.wang1991@gmail.com)
 * @version 1.0.0
 */

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }

  Vue.component('ellipsis', {
    props: {
      data: {
        type: String,
        default: ''
      },
      lineClamp: {
        type: Number,
        default: 1
      },
      lineHeight: {
        type: String,
        default: '22px'
      }
    },
    methods: {
      handleSubstrSentence: function () {

        var stNode = this.$refs.sentence;
        var html = this.data;
        if (html.length === 0) {
          return false;
        }
        stNode.innerHTML = html;

        // 开始及结束位置
        var startPos = 0;
        var endPos = html.length;
        // css 必须设置line-height 不然会报错
        //let stNodeStyles = window.getComputedStyle(stNode, null)
        var stNodeHeight = stNode.getBoundingClientRect().height || 22;
        // let stNodeLineHeight = stNodeStyles.lineHeight
        // stNodeLineHeight = stNodeLineHeight.slice(0, stNodeLineHeight.length - 2)
        // if (!!this.lineHeight) {
        //   stNodeLineHeight = !!this.lineHeight.indexOf('px') ? this.lineHeight.slice(0, this.lineHeight.length - 2) : this.lineHeight
        // }

        var stNodeLineHeight = this.lineHeight.slice(0, this.lineHeight.length - 2);
        var maxHeight = stNodeLineHeight * this.lineClamp;

        if (stNodeHeight <= maxHeight) {
          return false;
        } else {
          while (Math.abs(endPos - startPos) > 1) {
            var half = Math.ceil((endPos + startPos) / 2, 10);
            var _newhtml = html.substring(0, half);
            stNode.innerHTML = _newhtml;
            stNodeHeight = stNode.getBoundingClientRect().height || 22;

            if (stNodeHeight <= maxHeight) {
              startPos = half;
            } else {
              endPos = half;
            }
          }

          while (stNodeHeight > maxHeight) {
            var _newhtml2 = stNode.innerHTML.substring(0, stNode.innerHTML.trimRight().length - 1);
            stNode.innerHTML = _newhtml2;
            stNodeHeight = stNode.getBoundingClientRect().height || 22;
          }

          var newhtml = stNode.innerHTML.substring(0, stNode.innerHTML.trimRight().length - 3) + '...';
          stNode.innerHTML = newhtml;
        }
      }
    },
    watch: {
      data: function () {
        this.handleSubstrSentence();
      }
    },
    mounted: function () {
      this.handleSubstrSentence();
    },

    template: '\n    <div ref="sentence"></div>\n    '
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;
