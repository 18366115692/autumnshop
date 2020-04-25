// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    TopBar: [{
      id: 0,
      name: '商品收藏'
    },{
      id: 1,
      name: '店铺收藏'
    },{
      id: 2,
      name: '关注商品'
    },{
      id: 3,
      name: '我的足迹'
    }],
    NavBar: [{
      id: 0,
      name: '全部'
    },{
      id: 1,
      name: '正在热卖'
    },{
      id: 2,
      name: '即将上线'
    }],
    currentIndex: 0,
    currentItem: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let collect = wx.getStorageSync('collect')||[];
    this.setData({collect})
  },
  changeIndex(e) {
    const {index} = e.currentTarget.dataset
    this.setData({
      currentIndex: index
    })
  },
  changeItem(e) {
    const {index} = e.currentTarget.dataset
    this.setData({
      currentItem: index
    })
  }
})