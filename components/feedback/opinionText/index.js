// components/feedback/opinionText/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgList: [],
    inputVal: ""
  },
  uploadFile: [],
  /**
   * 组件的方法列表
   */
  methods: {
    handleClearImg(e) {
      const {imgList} = this.data;
      const {index} = e.currentTarget.dataset
      imgList.splice(index,1)
      this.setData({imgList})
    },
    handleChooseImg() {
      wx.chooseImage({
        // 同时选中的最大数量
        count: 9,
        // 图片的格式，原图 和 压缩图
        sizeType: ['original', 'compressed'],
        // 调用照相机 还是 相册
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.setData({
            // 为了方便用户再次选择图片，所以需要将数组进行拼接
            imgList: [...this.data.imgList, ...res.tempFilePaths]
          })
        }
      });
        
    },
    handlePreviewImg(e) {
      const {index} = e.currentTarget.dataset
      const urls = this.data.imgList
      wx.previewImage({
        current: urls[index],
        urls
      });
    },
    // 监听文本框中的值
    handleMonitorText(e) {
      const {value} = e.detail
      this.setData({inputVal:value})
    },
    /**
     * 点击提交按钮实现的操作
     * 1 获取文本框内容
     * 2 判断内容合法性
     * 3 准备上传图片 到专门的图片服务器上
     */
    handleSubmitAdvise() {
      // 获取文本框内容
      const {inputVal,imgList} = this.data;
      // 判断内容合法性
      console.log(inputVal)
      if (!inputVal.trim()) {
        // 不合法
        wx.showToast({
          title: '请输入合法内容',
          icon: "none",
          mask: true
        });
        return;
      }
      // 上传图片 到专门的图片服务器上
      // 上传文件的 api 无法同时支持多个文件同时上传，所以只能利用遍历依次上传
      imgList.forEach((v,i) => {
        wx.uploadFile({
          // 图片上传的地址
          url: 'https://images.ac.cn/',
          // 被上传的文件路径
          filePath: v,
          // 上传文件的名称 后台来获取文件 file
          name: 'file',
          // 上传文件时，需要额外附带的文本信息
          formData: {},
          success: (res) => {
            // const url = JSON.parse(res.data).url;
            // this.uploadFile.push(url)
            // 判断 当所有元素都上传完毕，才触发
            if (i === imgList.length - 1) {
              // 此处省略成功时候提交的数组和照片
              // console.log(this.uploadFile)
              // 清空当前页数据
              this.setData({
                imgList: [],
                inputVal: ""
              })
              wx.showToast({
                title: '提交成功，我们会尽快处理您的问题',
                // icon: 'success',
                mask: true
              });
              return;
            }
          }
        });
      });
      this.setData({
        imgList: [],
        inputVal: ""
      })
      wx.showToast({
        title: '提交成功，我们会尽快处理您的问题',
        // icon: 'success',
        mask: true
      });
    }
  }
})
