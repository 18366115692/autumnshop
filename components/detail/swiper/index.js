// components/detail/swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList: {
      type: Array,
      value: []
    }
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
    handleShowImg(e) {
      const {url} = e.currentTarget.dataset 
      this.triggerEvent('changeUrl', url)
    }
  }
})
