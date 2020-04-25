import { getGoodsSearchData } from '../../request/goods.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TopBar: [{
      id: 1,
      name: "综合"
    },{
      id: 2,
      name: "价格"
    },{
      id: 3,
      name: "销量"
    }],
    currentIndex: 0,
    goodsList: []
  },
  parmas: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.parmas.cid = options.cid||"";
    this.parmas.query = options.query||"";
    
    // 请求列表数据
    this.getGoodsListData();
  },

  getGoodsListData(){
    getGoodsSearchData(this.parmas).then(res => {
      console.log(res)
      this.setData({
        goodsList: [...this.data.goodsList, ...res.goods]
      })

      // 手动关闭下拉刷新等待
      wx.stopPullDownRefresh();
    })
  },
  
  changeIndex(e) {
    const currentIndex = e.detail;
    this.setData({
      currentIndex
    })
  },
  /**
   * 页面的上拉触底事件，当上拉到底部的时候，重新加载数据
   *   1 当上拉到底部时触发该事件
   *   2 判断是否还有更多数据如果有数据重新添加展示，如果没有数据跳出弹框提示没有数据了
   */
  onReachBottom() {
    this.parmas.pagenum ++
    getGoodsSearchData(this.parmas).then(res => {
      const length = res.goods.length
      if (length) {
        this.getGoodsListData();
      } else {
        wx.showToast({
          title: '已经加载到底部了'
        });
      }
    })
  },
  /**
   * 监听下拉刷新事件
   */
  onPullDownRefresh() {
    // 1 重置goodsList数据
    this.setData({goodsList: []})
    // 2 重置当前页码
    this.parmas.pagenum = 1
    // 3 重新请求数据
    this.getGoodsListData()
  }
})