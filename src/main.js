/**
 * @author zx.wang(zx.wang1991@gmail.com)
 * @version 1.2.0
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
      },
      delayTime: {
        type: Number,
        default: 20
      },
      debug: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleSubstrSentence () {

        const stNode = this.$refs.sentence;
        const html = this.data;

        if (this.debug && html.length === 0) {
          console.info('vue-ellipsis: Skipping empty string.');
          return false;
        }

        if (this.debug && !stNode) {
          console.warn('vue-ellipsis: Can not get this dom.');
          return false;
        }
        
        stNode.innerHTML = html;

        // Start and end positions
        let startPos = 0;
        let endPos = html.length;

        // CSS must set line-height, otherwise it will report an error
        const stNodeLineHeight =  this.lineHeight.slice(0, this.lineHeight.length - 2);
        let stNodeHeight = stNode.getBoundingClientRect().height || stNodeLineHeight;
        const maxHeight = stNodeLineHeight * this.lineClamp;

        if (stNodeHeight > maxHeight) {
          while (Math.abs(endPos - startPos) > 1) {
            const half = Math.ceil((endPos + startPos) / 2);
            const newhtml = html.substring(0, half);
            stNode.innerHTML = newhtml;
            stNodeHeight = stNode.getBoundingClientRect().height || stNodeLineHeight;
            if (stNodeHeight <= maxHeight) {
              startPos = half;
            } else {
              endPos = half;
            }
          }

          while (stNodeHeight > maxHeight) {
            const newHtml = stNode.innerHTML.substring(0, stNode.innerHTML.trimRight().length - 1);
            stNode.innerHTML = newHtml;
            stNodeHeight = stNode.getBoundingClientRect().height || stNodeLineHeight;
          }

          const endStr = !!this.endHtml ? this.endHtml.replace(/<[^>]+>/g,"") : '';
          const endLen = this.endChar === '...' ? 3 : endStr.length + this.endChar.length;
          // Calculate truncated spaces
          const stNodeLen = stNode.innerHTML.trimRight().length;
          const stNodeDelStr = stNode.innerHTML.substring(stNodeLen - endLen, stNodeLen);
          const match = stNodeDelStr.match(/\s+/g);
          const extraLen = match && match.length ? match.length : 0;
          const newHtml = stNode.innerHTML.substring(0, stNodeLen - endLen - extraLen) + this.endChar + this.endHtml;
          stNode.innerHTML = newHtml;
        }
      },
      handleClick(e) {
        this.$emit('click', e);
      },
      onWindowResize() {
        window.onresize = () => {
          setTimeout(() => {
            this.handleSubstrSentence();
          }, this.delayTime || 0);
        }
      },
    },
    watch: {
      data: {
        immediate: true,
        deep: true,
        handler(value) {
          this.$nextTick(() => {
            this.handleSubstrSentence();
          })
        }
      }
    },
    mounted () {
      this.onWindowResize();
    },
    template: `
    <div ref="sentence" @click="handleClick"></div>
    `
   });
 }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
