// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      name: "体验问题"
    },{
      id: 1,
      name: "商品、商家投诉"
    }],
    currentIndex: 0,
    sublist: [{
      id: 0,
      name: "功能建议"
    },{
      id: 1,
      name: "购买遇到问题"
    },{
      id: 2,
      name: "性能问题"
    },{
      id: 3,
      name: "其他"
    }]
  },
  changeIndex(e) {
    const currentIndex = e.detail;
    this.setData({
      currentIndex
    })
  }
})