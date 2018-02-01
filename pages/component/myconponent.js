// pages/template/componont/myCon.js
Component({
  behaviors: [],
  /**
   * 组件的属性列表
   */
  properties: {
      str: {            // 属性名
      type: Object,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value:{}
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
    //arr: [4, 5, 6]
    str1:{},
    activeIndex:0,
    activeObj:{}
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    //章节课接口
    getChapterfn: function () {
      var that = this,
        userName = "ztk_02567647",
        subjectId = "4ca44210-2db1-451f-8b77-8453c57108e2";
      wx.request({
        url: 'https://apimvc.wangxiao.cn/ZhangJieKeService/GetClassHoursCart?username=' + userName + '&subjectId=' + subjectId,
        success: function (res) {
          var obj = res.data;
          //第一级添加open状态 第一级的第一个列表添加open为false

          obj.Data.ClassHoursList.forEach(function(i,v){
            if(v==0){
              i.open=true;
            }else{
              i.open = false;
            }
            //第二级、三级。。。递归循环添加open标记
            eachOpen(i)
          })
          that.setData({           str:obj         });
       
        }
      });
      //递归调用 数据添加open标记
      function eachOpen(a) {
        a.Children.forEach(function (i, v) {
            i.open = false;
          if (i.Children !== null && i.Children.length > 0) {
            eachOpen(i)
          }
        })
      }
    },
   
    openList:function(e){
      var that = this, dataId = e.currentTarget.dataset.id;
      var obj = that.properties.str;
      var firstObj = obj.Data.ClassHoursList;


      firstObj.forEach(function (i, v) {
        if (i.Id == dataId){
          i.open=!i.open;
          that.setData({
            str: obj
          })
        }
      })
    }
  },
  ready:function(){
    this.getChapterfn();
  }
})
