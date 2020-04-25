// components/detail/title/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsDetailList: {
      type: Object,
      value: {}
    },
    isCollect: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 让字体样式文件生效
   */
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCollectGood(e) {
      const {id} = e.currentTarget.dataset
      this.triggerEvent('collectGood', id)
    }
  }
})
