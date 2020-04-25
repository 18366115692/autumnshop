let ajaxTimer = 0;
export const request=(parmas)=> {
  ajaxTimer ++;
  return new Promise((resolve, reject)=> {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const basrUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    wx.request({
      ...parmas,
      url: basrUrl + parmas.url,
      success: (res) => {
        resolve(res.data.message)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimer --;
        if (ajaxTimer === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}