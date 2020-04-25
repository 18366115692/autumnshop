//获取应用实例
const app = getApp()

// 引入网络请求
import { getHomeSwiperData,getHomeNavigationData,getHomeFloordata } from '../../request/home.js';

Page({
  /**
   * 存放项目需要的数据
   */
  data: {
    // 存放首页轮播图数据
    swiperList: [],
    // 存放首页导航数据
    navigationList: [],
    // 存放首页楼层数据
    floorList: []
  },
  /**
   * 页面刚加载时，触发的生命周期函数
   */
  onLoad: function () {
    getHomeSwiperData().then(res => {
      this.setData({
        swiperList: res
      })
    })
    getHomeNavigationData().then(res => {
      this.setData({
        navigationList: res
      })
    })
    getHomeFloordata().then(res => {
      let index = res[0].product_list[0].navigator_url.indexOf('?')
      console.log(index)
      res.forEach(val => {
        val.product_list.forEach(res1 => {
          res1.navigator_url = res1.navigator_url.slice(0, index) + '/index' + res1.navigator_url.slice(index)
        })
      });
      this.setData({
        floorList: res
      })
    })
  }
})
