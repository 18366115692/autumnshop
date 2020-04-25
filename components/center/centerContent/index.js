// components/center/centerContent/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 0
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
    aaaa() {
      console.log(this.properties.count)
    }
  }
})
