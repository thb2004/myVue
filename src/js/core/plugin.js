export default {

  /**
   * loading框
   */
  loading: {

    /**
     * 显示加载框
     * @param {string} text 加载文字
     */
    show(text = '加载中......') {
      $root.$store.commit('setPluginStatu', {
        name: 'loading',
        config: {
          show: true,
          text: text
        }
      })

    },
    /**
     * 隐藏
     */
    hide() {
      $root.$store.commit('setPluginStatu', {
        name: 'loading',
        config: {
          show: false
        }
      })
    }
  }
}
