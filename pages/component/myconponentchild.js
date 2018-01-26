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
    activeIndex: 0
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
      var that = this;
      if (that.data.activeIndex == 0) {
        this.setData({
          activeIndex: e.currentTarget.id
        })
      } else {
        this.setData({
          activeIndex: 0
        })
      }
    }
  }
})
