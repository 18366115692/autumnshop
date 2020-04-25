// components/cart/CartPay/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    payData: {
      type: Object,
      value: {}
    },
    key: {
      type: Boolean,
      value: true
    },
    disabled: {
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
    // 点击全选按钮的处理方式
    handleAllChecked() {
      console.log(this.properties.disabled)
      this.triggerEvent('handleAllChecked')
    },
    // 移除购物车操作
    handleRemoveCart() {
      this.triggerEvent('handleRemoveCart')
    }
  }
})
