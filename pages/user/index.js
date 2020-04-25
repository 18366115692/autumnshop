// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync('collect');
    let count = collect.length
    this.setData({userInfo,count})
  }

  
})