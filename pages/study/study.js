var feedbackApi = require('../commonjs/showToast');//引入消息提醒暴露的接口  

var interval;
var varName;
Page({
  data: {
    title: "",
    exameId:"",
    subjectTitle:"",
    subjectId:'',
    signName:"",
    ModulesObj: {},
    getUpGradesObj:{},
    getmodulefn: true,
    practiceObj:{
      Data:{
          date:'2018年1月23日',
          isdoti:true,
          dotititle:"去做题",
          importantLevel:3,
          questionLabel: [{ title: '高频题', color: "#5b95f4" }, { title: '易错题', color: "#e93a3f" },{ title: '必刷题', color: "#83c23d" }],
      },
      Message:'成功',
      isShow:true,
      ResultCode:0
    },
    open:true,
    getChapter: {}

  },
  onLoad: function (options) {
    var that = this;
      that.getMessage();
      that.getmodulefn();//获取模块
      that.getUpGradesfn();//升级服务
      that.getChapterfn();
     
  },
  //获取考试科目名称
  getMessage:function(){
    var that=this;
    try {
      var exameName = wx.getStorageSync('exameName'),
        exameId = wx.getStorageSync('exameId'),
        subjectName = wx.getStorageSync('subjectName'),
        subjectId = wx.getStorageSync('subjectId'),
        signName = wx.getStorageSync('signName');
      if (exameName && exameId && subjectName && subjectId && signName) {
        that.setData({
          title: exameName,
          exameId: exameId,
          subjectTitle: subjectName,
          subjectId: subjectId,
          signName: signName,
        })
        console.log(that.data)
      }
    } catch (e) {
     console.log("获取失败")
    }
  },
  // 获取模块的接口
  getmodulefn:function(){
    //获取classsId
    var that=this,
        classId ="11111111-1111-1111-1111-111111111111",
        url = 'https://appconfig.wangxiao.cn/service/GetAppconfigs?ClassId='+classId+'&DeviceType=0&VersionNo=100';
        //请求每日一练 考点练习 历年真题。。。模块的接口
        wx.request({
          url: url,
          data: {}, 
          success: function (res) {
            
            if (res.data.ResultCode == 0) {
              //请求成功修改moduleArray模块对象
              var index = 0;
              var moduleArray = res.data.Data.Modules;
              var newArray = [];
              while (index < moduleArray.length) {
                newArray.push(moduleArray.slice(index, index += 4));
              }
              that.setData({
                ModulesObj: newArray,
                signName: res.data.Data.sign
              })
            } else {
              //提示框
              that.setData({
                getmodulefn: false
              })
            }
          },
          fail:function(){
            that.setData({
              getmodulefn:false
            })
          }
        });
  },
  //答题数量接口 需要传入Data对象 post请求
  getUpGradesfn:function(){
    
    var that=this;
    var obj={
      Username: "latacat",
      ExamID: that.data.exameId,
      SubjectID: that.data.subjectId
    }
    wx.request({
      url: 'https://tikuapi.wangxiao.cn/api/SysClassEstimate/GetUpGrades',
      data: {
        Data: obj
      },
      method:'POST',
      success: function (res) {
        //请求成功修改getUpGradesObj模块对象
        //截取---免费答题的字符串
        var resObj=res, 
          strContent = resObj.data.Data.Content,
          splitContetn = strContent.substr(strContent.indexOf("已免费体验答题"));
          resObj.data.Data.Content = splitContetn;
          that.setData({
            getUpGradesObj: res.data
          })
      }
    });
  },
  //章节课接口
  getChapterfn:function(){
    var that=this,
      userName ="ztk_02567647",
      subjectId = that.data.subjectId;
    wx.request({
      url: 'https://apimvc.wangxiao.cn/ZhangJieKeService/GetClassHoursCart?username=' + userName + '&subjectId=' + subjectId,
      success:function(res){
          that.setData({
            getChapter: res.data
          })
          that.drawCircle(res.data.Data.StudyProgress);//章节进度绘制
      }
    })
  },
  // 章节课展开关闭
  listopen:function(e){
    console.log(e)
    if(this.data.open){
      this.setData({
        open: 'false'
      })
      console.log(this.data.open)
    }else{
      this.setData({
        open: 'true'
      })
    }
    

  },
  // 章节进度条
  drawCircle: function (data) {
      if(data<25){
        data=-1*data;
      }
    console.log(data)
      var that=this;
      var cxt_arc = wx.createCanvasContext('canvasArcCir');//创建并返回绘图上下文context对象。 
      //绘制背景灰色的圆圈
      cxt_arc.setLineWidth(4);
      cxt_arc.setStrokeStyle('#d2d2d2');
      cxt_arc.setLineCap('round');
      cxt_arc.beginPath();//开始一个新的路径 
      cxt_arc.arc(50, 50, 40, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径 
      cxt_arc.stroke();//对当前路径进行描边 

      //绘制蓝色的圆圈 ----根据进度条的变化
      cxt_arc.setLineWidth(4);
      cxt_arc.setStrokeStyle('#58a6f8');
      cxt_arc.setLineCap('round')
      cxt_arc.beginPath();//开始一个新的路径 
      cxt_arc.arc(50, 50, 40, -Math.PI * 1 / 2, 2 * Math.PI * (data*0.01), false);
      cxt_arc.stroke();//对当前路径进行描边 

      cxt_arc.draw(); 
   

   
  },
  // 提示框
  testToast: function (message) {
    //提示框
    feedbackApi.showToast({
      title: message,
      duration: 10000,
      mask: false
    })
    setTimeout(function () {
      feedbackApi.hideToast();
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //修改NavigationBar标题
    wx.setNavigationBarTitle({ title: this.data.title });
    
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
  onMyEvent:function(e){
    console.log(e.detail)
  },
  //点击选择科目
  gotoSelecsubject:function(){
    var that=this;
    wx.redirectTo({
      url: '../subject/subject?id=' + that.data.exameId + "&frompage=study"
    })
  }
})