/**
 * @author zx.wang(zx.wang1991@gmail.com)
 * @version 1.0.0
 */

 function plugin(Vue) {
   if(plugin.installed) {
     return
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
      },
      endChar: {
        type: String,
        default: '...'
      },
      endHtml: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleSubstrSentence () {
        const stNode = this.$refs.sentence;
        const html = this.data;
        if (html.length === 0) {
          console.error('the String is empty');
          return false;
        }
        stNode.innerHTML = html;
        // 开始及结束位置
        let startPos = 0;
        let endPos = html.length;
        // css 必须设置line-height 不然会报错
        //let stNodeStyles = window.getComputedStyle(stNode, null)
        let stNodeHeight = stNode.getBoundingClientRect().height || 22;
        // let stNodeLineHeight = stNodeStyles.lineHeight
        // stNodeLineHeight = stNodeLineHeight.slice(0, stNodeLineHeight.length - 2)
        // if (!!this.lineHeight) {
        //   stNodeLineHeight = !!this.lineHeight.indexOf('px') ? this.lineHeight.slice(0, this.lineHeight.length - 2) : this.lineHeight
        // }

        const stNodeLineHeight = this.lineHeight.slice(0, this.lineHeight.length - 2);
        const maxHeight = stNodeLineHeight * this.lineClamp;

        if (stNodeHeight > maxHeight) {
          while (Math.abs(endPos - startPos) > 1) {
            const half = Math.ceil((endPos + startPos) / 2, 10);
            const newHtml = html.substring(0, half);
            stNode.innerHTML = newHtml;
            stNodeHeight = stNode.getBoundingClientRect().height || 22;

            if (stNodeHeight <= maxHeight) {
              startPos = half;
            } else {
              endPos = half;
            }
          }

          while (stNodeHeight > maxHeight) {
            const newHtml = stNode.innerHTML.substring(0, stNode.innerHTML.trimRight().length - 1);
            stNode.innerHTML = newHtml;
            stNodeHeight = stNode.getBoundingClientRect().height || 22;
          }

          const endStr = !!this.endHtml ? this.endHtml.replace(/<[^>]+>/g,"") : ''
          const endLen = this.endChar === '...' ? 3 : endStr.length + this.endChar.length;
          // 计算被截掉部分的空格
          const stNodeLen = stNode.innerHTML.trimRight().length;
          const stNodeDelStr = stNode.innerHTML.substring(stNodeLen - endLen, stNodeLen);
          const match = stNodeDelStr.match(/\s+/g);
          const extraLen = match && match.length ? match.length : 0;
          const newHtml = stNode.innerHTML.substring(0, stNodeLen - endLen - extraLen) + this.endChar + this.endHtml;
          stNode.innerHTML = newHtml;
        }
      },
      handleClick(e) {
        this.$emit('click', e)
      }
    },
    watch: {
      data: {
        immediate: true,
        deep: true,
        handler(value) {
          window.setTimeout(() => {
            this.handleSubstrSentence();
          }, 300);
        }
      }
    },
    mounted () {
     // this.handleSubstrSentence()
    },
    template: `
    <div ref="sentence" @click="handleClick"></div>
    `
   })

 }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
