import { getGoodsDetailData } from '../../request/goods.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailList: [],
    isCollect: false
  },

  GoodsInfo: {},

  parmas: {
    goods_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let {options} = pages[pages.length-1]
    this.parmas.goods_id = options.goods_id
    this.getGoodsDetailList()
  },

  // 获取商品详情数据
  getGoodsDetailList() {
    getGoodsDetailData(this.parmas).then(res => {
      this.GoodsInfo = res;
      // 1 获取缓存中的商品收藏数据
      let collect = wx.getStorageSync('collect')||[];
      // 2 判断当前商品是否收藏
      let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
      this.setData({
        goodsDetailList: {
          goods_id: res.goods_id,
          goods_name: res.goods_name,
          goods_price: res.goods_price,
          pics: res.pics,
          goods_logo: res.goods_small_logo,
          /**
           * 针对图片中的数据做修改，原因是.webp格式的图片，部分iphone手机不支持
           * 1 直接找后端同时在后台修改（主要方法）
           * 2 自行修改（需要后台同时存在.jpg的图片）
           */
          goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg')
        },
        isCollect
      })
    })
  },

  /**
   * 点击轮播图预览大图功能
   */
  handlePreviewImg(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    const current = e.detail
    wx.previewImage({
      current,
      urls
    }); 
  },

  /**
   * 添加购物车功能
   * 1 获取缓存数据
   * 2 判断点击的商品是否在缓存数据中存在
   * 3 存在，让缓存数据的数量++；不存在，重新给缓存数据添加新的数据
   * 4 将新的数据放回缓存中
   * 5 添加提示效果
   */
  handleAddCart() {
    const goods_id = this.GoodsInfo.goods_id
    // 1 获取缓存数据
    const cart = wx.getStorageSync("cart") || [];
    // 2 判断是否存在缓存中
    const index = cart.findIndex(v => v.goods_id===goods_id)
    if (index === -1) {
      // 不存在
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    } else {
      // 存在
      cart[index].num ++;
    }
    // 重新购物车数据添加回缓存中
    wx.setStorageSync("cart", cart);
    // 添加提示效果
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    });
  },
  /**
   * 点击收藏功能
   * 1  
   */
  handleCollectGood(e) {
    let isCollect = false;
    // 1 获取缓存中的数据
    let collect = wx.getStorageSync('collect')||[];
    // 2 查看是否该商品是否被收藏过，此处为什么findIndex查找，原因是为了方便后续删除选项
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    // 3 当index!==-1时，表示该商品被收藏过
    if (index!==-1) {
      collect.splice(index, 1)
      isCollect = false
      // 添加弹框提示
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true
      }); 
    } else {
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 将新的数据存放到缓存中
    wx.setStorageSync('collect', collect);
    // 5 将data中的isCollect值更新一下
    this.setData({isCollect})
  }
})