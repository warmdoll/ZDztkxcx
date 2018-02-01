var  common = require('../commonjs/common.js');//引入公共代码
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"初级会计职称",
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getLivelist();//获取直播列表
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
    
  },
  /** 
 * 点击tab切换 
 */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 获取直播列表
  getLivelist:function(){
    var that=this,
        requestData={
          SubjectId: "867b9cbd-93b7-4d97-bb82-102b3358c7a2",
          username:"xuewenlan"
        },
        requestObj={
          url: "https://apimvc.wangxiao.cn/api/Course/GetLiveList",
          method: 'POST',
          sysclassId: "e8a38467-6064-4684-be0c-f500b42f8238",
          dataobj: requestData,
          callback1:that. getLivelistcallback1,
          callback2: ""
        };
    app.globalData.wxRequestfn(requestObj);
  },
  // 获取数据成功的函数
  getLivelistcallback1:function(res){
    var that=this;
    var result = res.data;
    if (result.ResultCode == 0) {
      that.setData({
        courseListObj: result.Data
      })
      console.log(that.data.courseListObj)
    }
  }
})