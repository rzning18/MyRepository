(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{1447:function(t,e,n){"use strict";n.r(e);var o=n("fdf7"),c=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=c.a},6485:function(t,e,n){"use strict";var o=n("8cd1"),c=n.n(o);c.a},6795:function(t,e,n){"use strict";var o,c=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))},"8cd1":function(t,e,n){},dd92:function(t,e,n){"use strict";n.r(e);var o=n("6795"),c=n("1447");for(var a in c)"default"!==a&&function(t){n.d(e,t,(function(){return c[t]}))}(a);n("6485");var i,s=n("f0c5"),u=Object(s["a"])(c["default"],o["b"],o["c"],!1,null,"670ec0af",null,!1,o["a"],i);e["default"]=u.exports},e4d7:function(t,e,n){"use strict";(function(t){n("f6c4");o(n("66fd"));var e=o(n("dd92"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},fdf7:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{encryptedData:"",iv:"",banner:[],url:"",tabBar:["全部职位","正式工","小时工","学生就业"],currentTabIndex:0,jobList:[]}},onLoad:function(){this.url=getApp().globalData.url,console.log("程序启动");this.getbanner(),this.getJobList(),this.getCity()},methods:{getbanner:function(){var t=this;this.$request("https://santong.easy.echosite.cn/api/v1/getBanners","GET",{},(function(e){t.banner=e.data}))},getJobList:function(){var t=this;this.$request("https://santong.easy.echosite.cn/api/v1/getPartrecruits","GET",{},(function(e){t.jobList=e.data.rows}))},tabActive:function(t){this.currentTabIndex=t},go:function(e){t.navigateTo({url:e})},getPhoneNumber:function(t){this.encryptedData=t.detail.encryptedData,this.iv=t.detail.iv,this.getToken(),this.$request("https://santong.easy.echosite.cn/api/v1/tokenTest","POST",{},(function(t){console.log(t)}))},getCity:function(){wx.login({success:function(t){t.code&&wx.getUserInfo({success:function(t){console.log(t.userInfo.city)}})}})},getToken:function(){var e=this;wx.login({success:function(n){n.code&&wx.getUserInfo({success:function(o){t.request({url:"https://santong.easy.echosite.cn/api/v1/getToken",method:"POST",data:{recommenderid:1,code:n.code,iv:e.iv,name:o.userInfo.nickName,encryptedData:e.encryptedData,phoneNumber:0},success:function(e){e&&t.setStorageSync("token",e.data),console.log(t.getStorageSync("token"))}})}})}})}}};e.default=n}).call(this,n("543d")["default"])}},[["e4d7","common/runtime","common/vendor"]]]);