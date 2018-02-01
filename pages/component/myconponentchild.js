// pages/template/componont/myCon.js
Component({
  behaviors: [],
  /**
   * 组件的属性列表
   */
  properties: {
    childarr: {
      type: Array,
      value: [1]
    },  
    activeIndex:{
      type: Number,
      value:0
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    //arr: [4, 5, 6]
    str1: {},
    activeIndex: 0,
    activeObj: {}
  },
  //章节课接口
  getChapterfn: function () {
    var that = this,
      userName = "ztk_02567647",
      subjectId = "4ca44210-2db1-451f-8b77-8453c57108e2";
    wx.request({
      url: 'https://apimvc.wangxiao.cn/ZhangJieKeService/GetClassHoursCart?username=' + userName + '&subjectId=' + subjectId,
      success: function (res) {
        that.setData({
          str1: res.data
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    openList: function (e) {
      var that = this, dataId = e.currentTarget.dataset.id;
      
      var obj = that.properties.childarr;
      console.log(obj)
      obj.forEach(function (i, v) {
        console.log(i.open);
        if (i.Id == dataId ) {
          //如果是关闭状态，则展开
          if(!i.open){
            i.open = !i.open;            
          }
          //如果是展开状态，则关闭
          else{
            i.open = !i.open;
          }

          that.setData({
            childarr: obj
          })
          
        } 
      })
    }
  }
})
