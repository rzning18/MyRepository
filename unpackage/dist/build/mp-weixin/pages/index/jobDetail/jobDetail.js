(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/jobDetail/jobDetail"],{"004b":function(t,n,e){"use strict";e.r(n);var u=e("7fc7"),a=e("46ed");for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);e("8c36");var o,r=e("f0c5"),i=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,"7cac685c",null,!1,u["a"],o);n["default"]=i.exports},"46ed":function(t,n,e){"use strict";e.r(n);var u=e("b05a"),a=e.n(u);for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);n["default"]=a.a},"7fc7":function(t,n,e){"use strict";var u,a=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return u}))},"8c36":function(t,n,e){"use strict";var u=e("d2af"),a=e.n(u);a.a},b05a:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{currentId:NaN,url:"",info:{}}},onLoad:function(t){this.currentId=t.id,this.getInfo(),this.url=getApp().globalData.url},methods:{getInfo:function(){var t=this;this.$request("https://santong.easy.echosite.cn/api/v1/getRecruits/"+this.currentId,"GET",{},(function(n){console.log(n),t.info=n.data[0]}))},go:function(n){t.navigateTo({url:n})}}};n.default=e}).call(this,e("543d")["default"])},d2af:function(t,n,e){},da26:function(t,n,e){"use strict";(function(t){e("b67a"),e("921b");u(e("66fd"));var n=u(e("004b"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["da26","common/runtime","common/vendor"]]]);