(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/jobDetail/jobDetail"],{"3f19":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={data:function(){return{currentId:NaN}},onLoad:function(t){this.currentId=t.id,this.getInfo()},methods:{getInfo:function(){this.$request("https://santong.easy.echosite.cn/api/v1/getRecruits/"+this.currentId,"GET",{},(function(t){console.log(t)}))}}};n.default=u},"4cdd":function(t,n,e){"use strict";var u,c=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return u}))},5534:function(t,n,e){"use strict";e.r(n);var u=e("4cdd"),c=e("5937");for(var o in c)"default"!==o&&function(t){e.d(n,t,(function(){return c[t]}))}(o);e("d943");var r,i=e("f0c5"),a=Object(i["a"])(c["default"],u["b"],u["c"],!1,null,"5332e57e",null,!1,u["a"],r);n["default"]=a.exports},5937:function(t,n,e){"use strict";e.r(n);var u=e("3f19"),c=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);n["default"]=c.a},"61fb":function(t,n,e){},bb23:function(t,n,e){"use strict";(function(t){e("f6c4");u(e("66fd"));var n=u(e("5534"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},d943:function(t,n,e){"use strict";var u=e("61fb"),c=e.n(u);c.a}},[["bb23","common/runtime","common/vendor"]]]);