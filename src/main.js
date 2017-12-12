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
      }
    },
    methods: {
      handleSubstrSentence () {

        const stNode = this.$refs.sentence
        const html = this.data
        if (html.length === 0) {
          return false
        }
        stNode.innerHTML = html

        // 开始及结束位置
        let startPos = 0
        let endPos = html.length
        // css 必须设置line-height 不然会报错
        //let stNodeStyles = window.getComputedStyle(stNode, null)
        let stNodeHeight = stNode.getBoundingClientRect().height || 22
        // let stNodeLineHeight = stNodeStyles.lineHeight
        // stNodeLineHeight = stNodeLineHeight.slice(0, stNodeLineHeight.length - 2)
        // if (!!this.lineHeight) {
        //   stNodeLineHeight = !!this.lineHeight.indexOf('px') ? this.lineHeight.slice(0, this.lineHeight.length - 2) : this.lineHeight
        // }

        const stNodeLineHeight = this.lineHeight.slice(0, this.lineHeight.length - 2)
        const maxHeight = stNodeLineHeight * this.lineClamp

        if (stNodeHeight <= maxHeight) {
          return false
        } else {
          while (Math.abs(endPos - startPos) > 1) {
            const half = Math.ceil((endPos + startPos) / 2, 10)
            const newhtml = html.substring(0, half)
            stNode.innerHTML = newhtml
            stNodeHeight = stNode.getBoundingClientRect().height || 22

            if (stNodeHeight <= maxHeight) {
              startPos = half
            } else {
              endPos = half
            }
          }

          while (stNodeHeight > maxHeight) {
            const newhtml = stNode.innerHTML.substring(0, stNode.innerHTML.trimRight().length - 1)
            stNode.innerHTML = newhtml
            stNodeHeight = stNode.getBoundingClientRect().height || 22
          }

          const newhtml = stNode.innerHTML.substring(0, stNode.innerHTML.trimRight().length - 3) + '...'
          stNode.innerHTML = newhtml
        }
      }
    },
    watch: {
      data () {
        this.handleSubstrSentence()
      }
    },
    mounted () {
      this.handleSubstrSentence()
    },
    template: `
    <div ref="sentence"></div>
    `
   })

 }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;