// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TopBar: [{
      id: 0,
      name: '全部订单'
    },{
      id: 1,
      name: '待付款'
    },{
      id: 2,
      name: '待收货'
    },{
      id: 3,
      name: '退货/退款'
    }],
    currentIndex: 0
  },
  onShow() {
    // 由于在onShow中没有options参数，所以需要通过页面栈来获取到传递过来的数据
    // 页面栈 是小程序打开的页面，最多会缓存是个页面，超过十个超过的部分会释放
    let pages = getCurrentPages();//获取页面栈
    let {type} = pages[pages.length-1].options
    this.setData({
      currentIndex: type - 1
    })
  },
  changeIndex(e) {
    const {index} = e.currentTarget.dataset
    this.setData({
      currentIndex: index
    })
  }
})