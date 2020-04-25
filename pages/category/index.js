import { getCategoryData } from '../../request/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    rightList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    /**
     * 给小程序加缓存机制，目的是为了减少请求数据的次数，提高用户的体验
     */
    const Cates = wx.getStorageSync("cates");
    // 针对没有数据是做判断，直接请求数据
    if (!Cates) {
      this.getData();
    // 针对有数据是做深层判断
    } else {
      // 判断数据有没有失效，如果超时了，重新请求数据
      if (Date.now() - Cates.time > 300000) {
        this.getData();
      // 如果数据没有失效，重新给data中的变量赋值
      } else {
        this.Cates = Cates.data;
        const leftList = [];
        this.Cates.forEach(val => {
          leftList.push({
            name: val.cat_name,
            id: val.cat_id
          })
        });
        const rightList = this.Cates[0].children;
        this.setData({
          leftList,
          rightList
        })
      }
    }
  },
  // 改变点击的索引和重新传递新数据
  changeIndex(e) {
    const index = e.detail
    const rightList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightList,
      // 重新给scroll-view标签设置距离顶部的值
      scrollTop: 0
    })
  },
  // 请求数据
  getData() {
    getCategoryData().then(res => {
      const leftList = [];
      this.Cates = res;
      wx.setStorageSync("cates", {time: Date.now(), data: this.Cates});
      this.Cates.forEach(val => {
        leftList.push({
          name: val.cat_name,
          id: val.cat_id
        })
      });
      const rightList = this.Cates[0].children;
      this.setData({
        leftList,
        rightList
      })
    })
  }
})