// components/category/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftList: {
      type: Array,
      value: []
    },
    rightList: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    scrollTop: {
      type: Number,
      value: 0
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
      const index = e.currentTarget.dataset.index
      // 子组件向父组件传值
      this.triggerEvent("changeIndex", index)
    }
  }
})
