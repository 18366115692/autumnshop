/**
 * 给输入框绑定值改变的input事件
 * 1 获取到输入框的值
 * 2 判断值的合法性（是否有空字符串）
 * 3 将检验通过后的值发送到后台
 * 4 返回的数据，打印到页面上
 */
import { getSearchListData } from '../../request/search.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    key: false,
    value: ""
  },
  timer: -1,
  handleClearValue() {
    this.setData({
      searchList: [],
      key: false,
      value: ""
    })
  },
  handleSearch(e) {
    // 获取输入框的值
    const {value} = e.detail
    console.log(value)
    // 校验合法性
    if (!value.trim()) {
      this.setData({
        searchList: [],
        key: false
      })
      // 值不合法
      clearTimeout(this.timer)
      return;
    }
    this.setData({
      key: true
    })
    // 发送数据请求
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getSearch(value)
    }, 800);
  },
  getSearch(query) {
    getSearchListData({query}).then(res => {
      let searchList = res
      this.setData({searchList})
    })
  }
})