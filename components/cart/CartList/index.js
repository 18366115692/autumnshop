// components/cart/CartList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartList: {
      type: Array,
      value: []
    },
    key: {
      type: Boolean,
      value: true
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
    /**
     * 添加购物车的数量的增加减少按钮功能
     * 1 获取本地存储的数据
     * 2 让对应数据的数量增加或者减少
     * 3 回传至本地数据
     */
    handleChangeCount(e) {
      const {id,val} = e.currentTarget.dataset
      this.triggerEvent('handleChangeCount', {id,val})
    },
    /**
     * 添加商品选中按钮功能
     * 1 获取本地存储数据
     * 2 判断按钮是否选中
     * 3 修改选中值
     * 4 将数据重新传回本地存储
     */
    handleChecked(e) {
      const {id} = e.currentTarget.dataset
      this.triggerEvent('handleChecked', id)
    },

    handleChangeKey() {
      this.triggerEvent('handleChangeKey')
    }
  }
})
