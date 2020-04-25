// pages/cart/index.js
Page({
  data: {
    address: {},
    cartList: {},
    payData: {},
    key: true,
    disabled: false
  },

  payData: {},

  onShow() {
    // 1 获取本地存储信息
    let address = wx.getStorageSync("address");
    
    /**
     * 获取本地存储购物车信息
     */
    let cartList = wx.getStorageSync("cart") || [];
    this.recalculatePrice(cartList);

    // 2 存到本地变量中
    this.setData({
      address
    })
  },

  onLoad: function() {
    
  },

  /**
   * 获取地址信息
   * 1 确认是否有权限获取
   * 2 通过wx.getSwtting来请求权限
   * 3 针对是否请求权限做判断
   *   1 当用户第一次请求时，直接发送wx.chooseAddress 请求获取地址 authSetting scope.address
   *   2 当用户已经有权限时，直接发送wx.chooseAddress 请求获取地址 authSetting scope.address
   *   3 当用户获取权限点击取消时，需要通过wx.openSetting 重新来请求权限
   * 4 将获取到的地址信息存放到本地存储中
   */
  handleChooseAddress() {
    // 发送权限获取请求
    wx.getSetting({
      success: (res) => {
        console.log(res)
        // 注意，当数据中出现奇怪的名称时，需要用[]括起来用字符串包裹着，不然无法查找有效数据
        const scope = res.authSetting["scope.address"]
        // 判断是哪一种情况
        if (scope === false) {
          wx.openSetting({
            success: (result1) => {}
          });
        }
        wx.chooseAddress({
          success: (address) => {
            address.detail = address.provinceName + address.cityName + address.countyName + address.detailInfo
            wx.setStorageSync("address",address); 
          }
        });
      }
    });
  },

  /**
   * 添加购物车的数量的增加减少按钮功能
   * 1 获取本地存储的数据
   * 2 让对应数据的数量增加或者减少
   * 3 回传至本地数据
   */
  handleChangeCount(e) {
    const {id,val} = e.detail
    let cart = wx.getStorageSync('cart');
    let index = cart.findIndex(res => res.goods_id === id);
    cart[index].num += +val;
    if (cart[index].num === 0) return cart[index].num === 1
    this.recalculatePrice(cart);
  },
  

  /**
   * 添加商品选中按钮功能
   * 1 获取商品id
   * 2 获取本地存储数据
   * 3 找到商品的位置 index
   * 4 将对应数据中的checked值取反
   * 5 重新计算总价格和总数量
   * 6 将数据重新传回本地存储
   */  
  handleChecked(e) {
    // 获取商品id
    const id = e.detail
    // 获取商品数据
    let {cartList} = this.data;
    // 找到商品的位置 index
    let index = cartList.findIndex(res => res.goods_id===id)
    console.log(index)
    // 将对应数据中的checked取反
    cartList[index].checked = !cartList[index].checked
    console.log(cartList)
    // 重新计算总价格和总数量
    this.recalculatePrice(cartList)
  },

  /**
   * 添加点击全选按钮功能
   * 1 获取本地存储的信息
   * 2 将 allChecked 取反
   * 3 改变数据中所有的checked的值
   * 4 调用计算方法 recalculatePrice
   */
  handleAllChecked() {
    let {allChecked} = this.data.payData;
    let {cartList} = this.data;
    allChecked = !allChecked;
    cartList.forEach(res => res.checked = allChecked);
    this.recalculatePrice(cartList);
  },

  recalculatePrice(cartList) {
    /**
     * 获取总价格和总数量，并且将全选按钮添加其中
     * 1 遍历获取到的数据，判断数据是否被勾选
     * 2 将已勾选数据的数量和单价相乘之后相加得到总价格
     * 3 将已勾选数据的数量相加的到总数量
     * 4 如果有一个商品未选中，则将全选按钮设置为 false
     */
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cartList.forEach(res => {
      if (res.checked) {
        totalPrice += res.goods_price * res.num;
        totalNum += res.num
      } else {
        allChecked = false
      }
    })
    if (!cartList.length) {
      allChecked = false
      this.setData({disabled: true})
    } else {
      this.data.disabled = false
    }
    wx.setStorageSync('cart', cartList);
    this.payData = {
      totalPrice,
      totalNum,
      allChecked
    }
    this.setData({
      cartList,
      payData: this.payData,
      disabled: this.data.disabled
    })
  },

  /**
   * 修改右上角管理按钮的开关
   */
  handleChangeKey() {
    this.data.key = !this.data.key

    /**
     * 针对改变右上角管理按钮的开关时所需要做的操作
     * 1 获取存储中的数据信息
     * 2 判断开关值是 true 还是 false
     * 3 为 true 时，表示没有移除购物车操作，这时将所有的checked的属性变成 true
     * 4 为 false 时，表示需要进行移除购物车操作，这时候将所有的checked的属性变成 false
     * 5 将数据重新传回存储中
     */
    let cart = wx.getStorageSync("cart");
  
    this.data.key ? cart.forEach(res=>res.checked=true):cart.forEach(res=>res.checked=false);
    
    this.recalculatePrice(cart)
    this.setData({
      key: this.data.key
    })
  },
  /**
   * 移除购物车操作
   * 1 获取存储中的数据信息
   * 2 判断数据中的 checked 值是 true 还是 false
   * 3 若为 true 表示需要移除
   * 4 若为 false 表示不需要移除
   * 5 将数据重新传回存储中
   */
  handleRemoveCart() {
    let {cartList} = this.data;
    let index = cartList.findIndex(res=>res.checked===true)
    cartList.splice(index,1)
    this.setData({
      cartList
    })
    wx.setStorageSync('cart', cartList);
  }
})