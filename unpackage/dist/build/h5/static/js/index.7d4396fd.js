(function(n){function e(e){for(var o,r,u=e[0],c=e[1],s=e[2],f=0,d=[];f<u.length;f++)r=u[f],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(n[o]=c[o]);l&&l(e);while(d.length)d.shift()();return a.push.apply(a,s||[]),t()}function t(){for(var n,e=0;e<a.length;e++){for(var t=a[e],o=!0,u=1;u<t.length;u++){var c=t[u];0!==i[c]&&(o=!1)}o&&(a.splice(e--,1),n=r(r.s=t[0]))}return n}var o={},i={index:0},a=[];function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.e=function(n){var e=[],t=i[n];if(0!==t)if(t)e.push(t[2]);else{var o=new Promise((function(e,o){t=i[n]=[e,o]}));e.push(t[2]=o);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.src=function(n){return r.p+"static/js/"+({"pages-index-index":"pages-index-index","pages-login-login":"pages-login-login","pages-test-test":"pages-test-test"}[n]||n)+"."+{"pages-index-index":"bd1f6948","pages-login-login":"71b4d274","pages-test-test":"be331d96"}[n]+".js"}(n);var c=new Error;a=function(e){u.onerror=u.onload=null,clearTimeout(s);var t=i[n];if(0!==t){if(t){var o=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;c.message="Loading chunk "+n+" failed.\n("+o+": "+a+")",c.name="ChunkLoadError",c.type=o,c.request=a,t[1](c)}i[n]=void 0}};var s=setTimeout((function(){a({type:"timeout",target:u})}),12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(e)},r.m=n,r.c=o,r.d=function(n,e,t){r.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},r.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,e){if(1&e&&(n=r(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)r.d(t,o,function(e){return n[e]}.bind(null,o));return t},r.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.p="/",r.oe=function(n){throw console.error(n),n};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var s=0;s<u.length;s++)e(u[s]);var l=c;a.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("2821")},2821:function(n,e,t){"use strict";var o=t("4ea4").default,i=o(t("5530"));t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("59b8"),t("1c31"),t("a9ff");var a=o(t("6811")),r=o(t("e143"));t("fce0"),r.default.config.productionTip=!1,a.default.mpType="app";var u=new r.default((0,i.default)({},a.default));u.$mount()},3306:function(n,e,t){"use strict";var o=t("6d4d"),i=t.n(o);i.a},"3ada":function(n,e,t){"use strict";(function(n,o){t("7a82");var i=t("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t("d3b7");var a=i(t("c7eb")),r=i(t("1da1")),u={onLaunch:function(){n("log","App Launch"," at App.vue:4")},onShow:function(){n("log","App Show"," at App.vue:7")},onHide:function(){n("log","App Hide"," at App.vue:10")},methods:{GetOpenID:function(){var n=this;return(0,r.default)((0,a.default)().mark((function e(){var t,o,i;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=uni.getStorageSync("_openid"),!(t.length>=20)){e.next=5;break}return e.abrupt("return",t);case 5:return e.next=7,n.GetCode();case 7:return o=e.sent,e.next=10,n.Getserver(o);case 10:return i=e.sent,e.abrupt("return",i);case 12:case"end":return e.stop()}}),e)})))()},GetCode:function(){return(0,r.default)((0,a.default)().mark((function n(){return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.abrupt("return",new Promise((function(n,e){uni.login({provider:"toutiao",success:function(e){n(e.code)}})})));case 1:case"end":return n.stop()}}),n)})))()},Getserver:function(e){return(0,r.default)((0,a.default)().mark((function t(){return(0,a.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,i){o.callFunction({name:"login",data:{code:e},success:function(e){n("log","网络获取"," at App.vue:42"),uni.setStorage({key:"_openid",data:e.result.data.data.openid}),t(e.result.data.data.openid)}})})));case 1:case"end":return t.stop()}}),t)})))()}}};e.default=u}).call(this,t("0de9")["log"],t("a9ff")["default"])},"59b8":function(n,e,t){"use strict";(function(n){var e=t("4ea4").default;t("13d5"),t("d3b7"),t("ddb0"),t("ac1f"),t("5319");var o=e(t("e143")),i={keys:function(){return[]}};n["____D21C0B6____"]=!0,delete n["____D21C0B6____"],n.__uniConfig={globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"uni-app",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8"},uniIdRouter:{}},n.__uniConfig.compilerVersion="3.99",n.__uniConfig.darkmode=!1,n.__uniConfig.themeConfig={},n.__uniConfig.uniPlatform="h5",n.__uniConfig.appId="__UNI__D21C0B6",n.__uniConfig.appName="2024.1.19",n.__uniConfig.appVersion="1.0.0",n.__uniConfig.appVersionCode="100",n.__uniConfig.router={mode:"hash",base:"/"},n.__uniConfig.publicPath="/",n.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},n.__uniConfig.debug=!1,n.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},n.__uniConfig.sdkConfigs={},n.__uniConfig.qqMapKey=void 0,n.__uniConfig.googleMapKey=void 0,n.__uniConfig.aMapKey=void 0,n.__uniConfig.aMapSecurityJsCode=void 0,n.__uniConfig.aMapServiceHost=void 0,n.__uniConfig.locale="",n.__uniConfig.fallbackLocale=void 0,n.__uniConfig.locales=i.keys().reduce((function(n,e){var t=e.replace(/\.\/(uni-app.)?(.*).json/,"$2"),o=i(e);return Object.assign(n[t]||(n[t]={}),o.common||o),n}),{}),n.__uniConfig.nvue={"flex-direction":"column"},n.__uniConfig.__webpack_chunk_load__=t.e,o.default.component("pages-index-index",(function(n){var e={component:t.e("pages-index-index").then(function(){return n(t("cc83"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(n){return n(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(n){return n(__uniConfig["async"]["error"])}}),e})),o.default.component("pages-login-login",(function(n){var e={component:t.e("pages-login-login").then(function(){return n(t("0b64"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(n){return n(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(n){return n(__uniConfig["async"]["error"])}}),e})),o.default.component("pages-test-test",(function(n){var e={component:t.e("pages-test-test").then(function(){return n(t("a166"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(n){return n(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(n){return n(__uniConfig["async"]["error"])}}),e})),n.__uniRoutes=[{path:"/",alias:"/pages/index/index",component:{render:function(n){return n("Page",{props:Object.assign({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{navigationBarTitleText:"Law-Ai"})},[n("pages-index-index",{slot:"page"})])}},meta:{id:1,name:"pages-index-index",isNVue:!1,maxWidth:0,pagePath:"pages/index/index",isQuit:!0,isEntry:!0,windowTop:44}},{path:"/pages/login/login",component:{render:function(n){return n("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"",enablePullDownRefresh:!1})},[n("pages-login-login",{slot:"page"})])}},meta:{name:"pages-login-login",isNVue:!1,maxWidth:0,pagePath:"pages/login/login",windowTop:44}},{path:"/pages/test/test",component:{render:function(n){return n("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"",enablePullDownRefresh:!1})},[n("pages-test-test",{slot:"page"})])}},meta:{name:"pages-test-test",isNVue:!1,maxWidth:0,pagePath:"pages/test/test",windowTop:44}},{path:"/choose-location",component:{render:function(n){return n("Page",{props:{navigationStyle:"custom"}},[n("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(n){return n("Page",{props:{navigationStyle:"custom"}},[n("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}],n.UniApp&&new n.UniApp}).call(this,t("c8ba"))},6811:function(n,e,t){"use strict";t.r(e);var o=t("c719"),i=t("88c3");for(var a in i)["default"].indexOf(a)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(a);t("3306");var r=t("f0c5"),u=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=u.exports},"6d4d":function(n,e,t){var o=t("7554");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);var i=t("4f06").default;i("146bc8d8",o,!0,{sourceMap:!1,shadowMode:!1})},7554:function(n,e,t){var o=t("24fb");e=o(!1),e.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*每个页面公共css */",""]),n.exports=e},"88c3":function(n,e,t){"use strict";t.r(e);var o=t("3ada"),i=t.n(o);for(var a in o)["default"].indexOf(a)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(a);e["default"]=i.a},"8bf8":function(n,e,t){"use strict";t("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={pages:[{path:"pages/index/index",style:{navigationBarTitleText:"Law-Ai"}},{path:"pages/login/login",style:{navigationBarTitleText:"",enablePullDownRefresh:!1}},{path:"pages/test/test",style:{navigationBarTitleText:"",enablePullDownRefresh:!1}}],globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"uni-app",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8"},uniIdRouter:{}}},"8cb3":function(n,e,t){"use strict";t("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={appid:"__UNI__D21C0B6"}},c719:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){}));var o=function(){var n=this.$createElement,e=this._self._c||n;return e("App",{attrs:{keepAliveInclude:this.keepAliveInclude}})},i=[]},fce0:function(n,e,t){var o=t("7037").default;t("d3b7"),uni.addInterceptor({returnValue:function(n){return!n||"object"!==o(n)&&"function"!==typeof n||"function"!==typeof n.then?n:new Promise((function(e,t){n.then((function(n){return n[0]?t(n[0]):e(n[1])}))}))}})}});