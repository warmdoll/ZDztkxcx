Page({

  /**
   * 页面的初始数据
   */
  data: {
    advObj:[],
    courseListObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getAdv();
    that.getCourseList();
  },
  //获取头部广告位
  getAdv:function(){
    var that=this,sign="zc";
    wx.request({
      url: "https://api.wangxiao.cn/app/ad.ashx?AdTypeId=20180130165936810&sign="+sign,
      success: function (res) {
        var result = res;
        if (result.data.State == 1) {
          that.setData({
            advObj: result.data.Data
          })
        }
      }
    });
  },
  // 获取课程列表接口
  getCourseList:function(){
    console.log("a")
    var that=this,
        requestData={
          SubjectId:'867b9cbd-93b7-4d97-bb82-102b3358c7a2',
          ExamID:'e9fd5aa8-48a8-406d-bfc6-5728a9c6a131',
          username:"xuewenlan",
        };
    wx.request({
      url: "https://apimvc.wangxiao.cn/api/Course/Index",
      data: requestData,
      success: function (res) {
        var result = res.data;
        if (result.ResultCode == 0) {
          that.setData({
            courseListObj: result.Data
          })
          console.log(that.data.courseListObj)
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})