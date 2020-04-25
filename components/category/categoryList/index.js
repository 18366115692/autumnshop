// components/category/categoryList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    TopBar: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    goodsList: {
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
    changeIndex(e) {
      const {index} = e.currentTarget.dataset
      this.triggerEvent("changeIndex", index)
    }
  }
})
