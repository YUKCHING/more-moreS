webpackJsonp([13],{"6OHG":function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=a("cShy"),s={props:{info:{require:!0,type:Object,default:function(){return{}}}},methods:{dingAction:function(){this.$emit("ding",this.info)}}},e={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"UserCard"},[a("img",{staticClass:"avatar",attrs:{src:t.info.avatar}}),t._v(" "),a("div",{staticClass:"label"},[a("p",{staticClass:"p1"},[a("span",[t._v(t._s(t.info.nickname))]),t._v(" "),a("span",{staticClass:"tag",style:{color:t.info.has_evaluated?"#B49F4A":"#7F98B2",background:t.info.has_evaluated?"#FAF3E8":"#EEF4FF"}},[t._v(t._s(t.info.has_evaluated?"额度已评估":"额度未评估"))])]),t._v(" "),a("p",{staticClass:"p2"},[t._v("\n      注册时间："+t._s(t.info.created_at)+"\n    ")])]),t._v(" "),a("span",{staticClass:"ding",style:{color:t.info.dinged?"#FFFFFF":"#F8EDD4",background:t.info.dinged?"#D8D8D8":"linear-gradient(to right, #FF7952 0%, #FE3525 100%)"},on:{click:t.dingAction}},[t._v("Ding")])])},staticRenderFns:[]};var c={components:{UserCard:a("C7Lr")(s,e,!1,function(t){a("TR2g")},"data-v-076347c2",null).exports},data:function(){return{active:0,listData:[],total:0}},created:function(){this.getInvited()},methods:{clickTabsAction:function(t,i){this.getInvited()},multipleAction:function(){this.$router.push({path:"/mutiplefans",query:{active:this.active}})},inviteAction:function(){this.$router.push("/invitefans")},getInvited:function(t){var i=this,a={token:this.$store.getters.token,grade:this.active};this.total=0,this.listData=[],Object(n.n)(a).then(function(t){console.log(t),0===t.code&&t.data.list.length>0&&(i.total=t.data.total,i.listData=t.data.list)})},dingAction:function(t){var i=this;if(t.dinged)this.toast("该用户今天已ding过");else{console.log(t);var a={id:[t.id]};Object(n.y)(a).then(function(t){console.log(t),0===t.code&&(i.tSuccess("提醒成功"),i.getInvited())})}}}},o={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"MyUser"},[n("van-tabs",{attrs:{"title-active-color":"#FF4242"},on:{click:t.clickTabsAction},model:{value:t.active,callback:function(i){t.active=i},expression:"active"}},[n("van-tab",{attrs:{title:"已邀粉丝"}}),t._v(" "),n("van-tab",{attrs:{title:"已邀会员"}}),t._v(" "),n("van-tab",{attrs:{title:"高级会员"}})],1),t._v(" "),n("div",{staticClass:"panel"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.listData.length>0,expression:"listData.length > 0"}],staticClass:"list-content"},[n("p",{staticClass:"top"},[n("span",[t._v("共"+t._s(t.total)+"个粉丝")]),t._v(" "),n("span",{on:{click:t.multipleAction}},[t._v("多选")])]),t._v(" "),n("div",{staticClass:"list"},t._l(t.listData,function(i){return n("user-card",{key:i.id,attrs:{info:i},on:{ding:t.dingAction}})}),1)]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:0===t.listData.length,expression:"listData.length === 0"}],staticClass:"no-data"},[n("img",{attrs:{src:a("wtPh")}}),t._v(" "),n("p",{staticClass:"p1"},[t._v("邀请好友加入")]),t._v(" "),n("p",{staticClass:"p2"},[t._v("粉丝越多升级越快,还有收益哦")]),t._v(" "),n("div",{staticClass:"button",on:{click:t.inviteAction}},[t._v("立即邀请")])])])],1)},staticRenderFns:[]};var l=a("C7Lr")(c,o,!1,function(t){a("AXxl")},"data-v-2f129bac",null);i.default=l.exports},AXxl:function(t,i){},TR2g:function(t,i){},wtPh:function(t,i,a){t.exports=a.p+"static/img/img-nodata.f19ec78.png"}});