(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{FAbG:function(e,a,t){"use strict";t("zKZe"),t("FZtP"),t("tkto"),t("fbCW"),t("sMBO"),t("+2oP"),t("pNMO"),t("4Brf"),t("07d7"),t("0oug"),t("4mDm"),t("PKPk"),t("3bBZ"),t("pjDv");var n=t("wy2R"),s=t.n(n);function r(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,a){if(!e)return;if("string"==typeof e)return i(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return i(e,a)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=new Array(a);t<a;t++)n[t]=e[t];return n}var c={props:{show:{type:Boolean,default:!0},searchConfig:{type:Array,default:[]},autoParams:{type:Object,default:function(){return{}}}},data:function(){return{advanced:!1,searchConfig1:[],searchConfig2:[],params:{},cascader:{},select_remote:{},load_cascader:{}}},watch:{},computed:{},methods:{search:function(){var e=this,a=Object.assign({},this.params);Object.keys(a).forEach((function(t){if(a.hasOwnProperty(t)){var n=e.searchConfig.find((function(e){return e.name===t}));if(n)switch(n.type){case"date_picker":2===a[t].length&&(a[t]=e.dateFormat(a[t][0])+" ~ "+e.dateFormat(a[t][1]))}}})),this.$emit("searchParams",a)},dateFormat:function(e){return s()(e).format("YYYY-MM-DD")},timeFormat:function(e){return s()(e).format("YYYY-MM-DD HH:mm:ss")},cascaderChange:function(e,a,t){this.params[e.name]=a[a.length-1],0===a.length&&(this.params[e.name]=void 0)},initSelect:function(e){var a=this,t=this;e.length>0&&e.forEach((function(e){"cascader"===e.type?(t.cascader[e.name]=[],a.$get(e.data,{data_type:"cascader"}).then((function(a){if(200===a.code){var n={};n[e.name]=a.data,t.cascader=Object.assign({},t.cascader,n)}})),t.$set(t.load_cascader,e.name,(function(a){var n=a[a.length-1];n.loading=!0;var s={pid:n.id,data_type:"cascader"};t.$get(e.data,s).then((function(a){n.loading=!1,n.children=a.data,t.$set(t.cascader,e.name,r(t.cascader[e.name]))}))}))):"select-remote"===e.type&&(t.select_remote[e.name]=[],t.$get(e.data,{data_type:"select"}).then((function(a){t.$set(t.select_remote,e.name,a.data);var n={};n[e.name]=a.data,t.select_remote=Object.assign({},t.select_remote,n)})))}))}},created:function(){var e=this;this.searchConfig.length<=0?this.show=!1:this.searchConfig.length<=2?this.searchConfig1=this.searchConfig:this.searchConfig.length>2&&(this.searchConfig1=this.searchConfig.slice(0,2),this.searchConfig2=this.searchConfig.slice(2));var a=Object.keys(this.autoParams);a.length>0&&a.forEach((function(a){e.params[a]=e.autoParams[a]})),this.initSelect(this.searchConfig)},mounted:function(){}},o=t("KHd+"),l=Object(o.a)(c,(function(){var e=this,a=this,t=a.$createElement,n=a._self._c||t;return a.show?n("div",{staticClass:"admin_table_page_where"},[n("a-form",{attrs:{layout:"inline"}},[n("a-row",{attrs:{gutter:12}},[a._l(a.searchConfig1,(function(e,t){return n("a-col",{key:t,attrs:{md:8,sm:24}},[n("a-form-item",{attrs:{label:e.label}},["text"===e.type?n("a-input",{attrs:{placeholder:e.placeholder||""},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}}):a._e(),a._v(" "),"select"===e.type?n("a-select",{attrs:{placeholder:e.placeholder||""},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}},a._l(e.data,(function(e,t){return n("a-select-option",{key:t,attrs:{value:e.value}},[a._v(a._s(e.label))])})),1):a._e(),a._v(" "),"select-remote"===e.type?n("a-select",{attrs:{placeholder:e.placeholder||""},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}},a._l(a.select_remote[e.name],(function(t,s){return a.select_remote[e.name].length>0?n("a-select-option",{key:s,attrs:{value:t.value}},[a._v(a._s(t.label))]):a._e()})),1):a._e(),a._v(" "),"cascader"===e.type?n("a-cascader",{staticStyle:{width:"100%"},attrs:{"load-data":a.load_cascader[e.name],options:a.cascader[e.name],fieldNames:{label:"name",value:"id",children:"children"},placeholder:"请选择"+e.label,"change-on-select":""},on:{change:function(t){return a.cascaderChange(e,t)}}}):a._e(),a._v(" "),"time_picker"===e.type?n("a-time-picker",{model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}}):a._e(),a._v(" "),"date_picker"===e.type?n("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD","allow-clear":!1},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}}):a._e(),a._v(" "),"datetime_picker"===e.type?n("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD HH:mm:ss","show-time":"","allow-clear":!1},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}}):a._e()],1)],1)})),a._v(" "),a.advanced&&a.searchConfig2.length>0?a._l(a.searchConfig2,(function(e,t){return n("a-col",{key:a.searchConfig1.length+t,attrs:{md:8,sm:24}},[n("a-form-item",{attrs:{label:e.label}},["text"===e.type?n("a-input",{attrs:{placeholder:e.placeholder||""},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}}):a._e(),a._v(" "),"select"===e.type?n("a-select",{attrs:{placeholder:e.placeholder||""},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}},a._l(e.data,(function(e,t){return n("a-select-option",{key:t,attrs:{value:e.value}},[a._v(a._s(e.label))])})),1):a._e(),a._v(" "),"select-remote"===e.type?n("a-select",{attrs:{placeholder:e.placeholder||""},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}},a._l(a.select_remote[e.name],(function(t,s){return a.select_remote[e.name].length>0?n("a-select-option",{key:s,attrs:{value:t.value}},[a._v(a._s(t.label))]):a._e()})),1):a._e(),a._v(" "),"cascader"===e.type?n("a-cascader",{attrs:{"load-data":a.load_cascader[e.name],options:a.cascader[e.name],fieldNames:{label:"name",value:"id",children:"children"},placeholder:"请选择"+e.label,"change-on-select":""},on:{change:function(t){return a.cascaderChange(e,t)}}}):a._e(),a._v(" "),"time_picker"===e.type?n("a-time-picker",{model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}}):a._e(),a._v(" "),"date_picker"===e.type?n("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD","allow-clear":!1},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}}):a._e(),a._v(" "),"datetime_picker"===e.type?n("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD HH:mm:ss","show-time":"","allow-clear":!1},model:{value:a.params[e.name],callback:function(t){a.$set(a.params,e.name,t)},expression:"params[v.name]"}}):a._e()],1)],1)})):a._e(),a._v(" "),n("a-col",{staticStyle:{"padding-top":"3px"},attrs:{md:a.advanced?12:8,sm:12}},[n("span",{staticClass:"table-page-search-submitButtons",style:a.advanced&&{float:"right",overflow:"hidden"}||{}},[n("a-button",{attrs:{icon:"search"},on:{click:function(e){return a.search()}}},[a._v("查询")]),a._v(" "),n("a-button",{staticStyle:{"margin-left":"8px"},on:{click:function(){return e.params={}}}},[a._v("重置")]),a._v(" "),a.searchConfig2.length>0?n("a",{staticStyle:{"margin-left":"8px"},on:{click:function(e){a.advanced=!a.advanced}}},[a._v("\n                    "+a._s(a.advanced?"收起":"展开")+"\n                    "),n("a-icon",{attrs:{type:a.advanced?"up":"down"}})],1):a._e()],1)])],2)],1)],1):a._e()}),[],!1,null,"5408dcec",null);a.a=l.exports},fbCW:function(e,a,t){"use strict";var n=t("I+eb"),s=t("tycR").find,r=t("RNIs"),i=!0;"find"in[]&&Array(1).find((function(){i=!1})),n({target:"Array",proto:!0,forced:i},{find:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}}),r("find")},jodg:function(e,a,t){"use strict";t.r(a);t("oVuX"),t("zKZe");var n={components:{Search:t("FAbG").a},props:{},data:function(){return{params:{page:1,per_page:30},total:0,search:[{label:"生产基地",name:"base_id",type:"select-remote",data:this.$api.adminBases},{label:"编码",name:"code",type:"text"},{label:"名称",name:"name",type:"text"},{label:"简称",name:"short",type:"text"},{label:"别名",name:"alias",type:"text"},{label:"显示名称",name:"display",type:"text"},{label:"描述",name:"description",type:"text"}],list_loading:!1,selectedRowKeys:[],columns:[{title:"#",dataIndex:"id",fixed:"left",width:60},{title:"生产基地",scopedSlots:{customRender:"base"},width:120},{title:"编码",dataIndex:"code",width:120},{title:"名称",dataIndex:"name",width:120},{title:"简称",dataIndex:"short",width:120},{title:"别名",dataIndex:"alias",width:120},{title:"显示名称",dataIndex:"display",width:120},{title:"描述",dataIndex:"description",width:120},{title:"创建时间",dataIndex:"created_at",width:200},{title:"更新时间",dataIndex:"updated_at",width:200},{title:"操作",fixed:"right",scopedSlots:{customRender:"action"}}],list:[]}},watch:{},computed:{},methods:{onSearchParams:function(e){this.getList(e)},onSelectChange:function(e){this.selectedRowKeys=e},onChange:function(e){this.params.page=e},del:function(){var e=this;if(0===this.selectedRowKeys.length)return this.$message.error("未选择数据.");this.$confirm({title:"你确定要删除选择的数据？",content:"确定删除后无法恢复.",okText:"是",okType:"danger",cancelText:"取消",onOk:function(){var a=e.selectedRowKeys.join(",");e.$delete(e.$api.adminFactories+"/"+a).then((function(a){200===a.code?(e.onload(),e.$message.success("删除成功")):e.$message.error(a.msg)}))}})},getList:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.list_loading=!0;var t=Object.assign({},a,this.params);this.$get(this.$api.adminFactories,t).then((function(a){200===a.code&&(e.total=a.data.total,e.list=a.data.data),e.list_loading=!1}),(function(a){e.$message.error("数据加载失败"),e.list_loading=!1}))},onload:function(){this.getList()}},created:function(){this.onload()},mounted:function(){}},s=t("KHd+"),r=Object(s.a)(n,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"admin_table_page_title"},[e._v("工厂列表")]),e._v(" "),t("div",{staticClass:"unline underm"}),e._v(" "),t("div",{staticClass:"admin_table_list"},[t("a-table",{attrs:{columns:e.columns,"data-source":e.list,scroll:{x:1400},loading:e.list_loading,pagination:!1,"row-selection":{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange},"row-key":"id"},scopedSlots:e._u([{key:"title",fn:function(a){return[t("search",{attrs:{"search-config":e.search},on:{searchParams:e.onSearchParams}}),e._v(" "),t("div",{staticClass:"admin_table_handle_btn"},[t("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(a){return e.$router.push("/Admin/factories/form")}}},[e._v("添加")]),e._v(" "),t("a-button",{staticClass:"admin_delete_btn",attrs:{type:"danger",icon:"delete"},on:{click:e.del}},[e._v("批量删除")])],1)]}},{key:"base",fn:function(a){return t("span",{},[e._v("\n                "+e._s(a.base&&a.base.name?a.base.name:"--")+"\n            ")])}},{key:"action",fn:function(a){return t("span",{},[t("a-button",{attrs:{icon:"edit"},on:{click:function(t){return e.$router.push("/Admin/factories/form/"+a.id)}}},[e._v("编辑")])],1)}}])}),e._v(" "),e.total>0?t("div",{staticClass:"admin_pagination"},[t("a-pagination",{attrs:{"page-size":e.params.per_page,total:e.total,"show-less-items":""},on:{"update:pageSize":function(a){return e.$set(e.params,"per_page",a)},"update:page-size":function(a){return e.$set(e.params,"per_page",a)},change:e.onChange},model:{value:e.params.page,callback:function(a){e.$set(e.params,"page",a)},expression:"params.page"}})],1):e._e()],1)])}),[],!1,null,"086e95a0",null);a.default=r.exports}}]);