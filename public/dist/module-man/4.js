(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{gvr9:function(e,a,t){"use strict";t.r(a);var n=t("FAbG"),l={mixins:[t("K49p").a],components:{Search:n.a},props:{},data:function(){return{table:{actions:{list:this.$api.moduleAdminBases,remove:this.$api.moduleAdminBases},columns:[{title:"#",dataIndex:"id",fixed:"left",width:60},{title:"编码",dataIndex:"code"},{title:"名称",dataIndex:"name"},{title:"简称",dataIndex:"short"},{title:"别名",dataIndex:"alias"},{title:"显示名称",dataIndex:"display"},{title:"描述",dataIndex:"description",width:120},{title:"创建时间",dataIndex:"created_at"},{title:"更新时间",dataIndex:"updated_at"},{title:"操作",fixed:"right",scopedSlots:{customRender:"action"}}]},search:{fields:[{label:"编码",name:"code",type:"text"},{label:"名称",name:"name",type:"text"},{label:"简称",name:"short",type:"text"},{label:"别名",name:"alias",type:"text"},{label:"显示名称",name:"display",type:"text"},{label:"描述",name:"description",type:"text"}]},exporting:{url:this.$api.moduleAdminBases,columns:[{label:"编码",name:"code"},{label:"名称",name:"name"},{field:"short",name:"简称"},{field:"display",name:"显示名称"},{field:"description",name:"描述"}]}}},watch:{},computed:{},methods:{onload:function(){this.loadTableData()}},created:function(){this.onload()},mounted:function(){}},i=t("KHd+"),s=Object(i.a)(l,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"admin_table_page_title"},[e._v("生产基地列表")]),e._v(" "),t("div",{staticClass:"unline underm"}),e._v(" "),t("div",{staticClass:"admin_table_list"},[t("a-table",{attrs:{size:"small",columns:e.table.columns,"data-source":e.table.data,scroll:{y:e.sysWindowHeight-400},loading:e.table.loading,pagination:!1,"row-selection":{selectedRowKeys:e.table.selectedRowKeys,onChange:e.handleTableRowKeysChange},"row-key":"id"},scopedSlots:e._u([{key:"title",fn:function(a){return[t("search",{attrs:{"search-config":e.search.fields,"auto-params":e.search.params,"export-config":e.exporting},on:{searchParams:e.handleTableSearchParams,handleExport:e.handleTableExport}}),e._v(" "),t("div",{staticClass:"admin_table_handle_btn"},[t("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(a){return e.$router.push("/Admin/goodcatch/m/man/bases/form")}}},[e._v("添加")]),e._v(" "),t("a-button",{staticClass:"admin_delete_btn",attrs:{type:"danger",icon:"delete"},on:{click:e.handleRemoveTableRows}},[e._v("批量删除")])],1)]}},{key:"action",fn:function(a){return t("span",{},[t("a-button",{attrs:{icon:"edit"},on:{click:function(t){return e.$router.push("/Admin/goodcatch/m/man/bases/form/"+a.id)}}},[e._v("编辑")])],1)}}])}),e._v(" "),e.table.total>0?t("div",{staticClass:"admin_pagination"},[t("a-pagination",{attrs:{"page-size":e.table.params.per_page,total:e.table.total,"show-less-items":""},on:{"update:pageSize":function(a){return e.$set(e.table.params,"per_page",a)},"update:page-size":function(a){return e.$set(e.table.params,"per_page",a)},change:e.handleTablePageChange},model:{value:e.table.params.page,callback:function(a){e.$set(e.table.params,"page",a)},expression:"table.params.page"}})],1):e._e()],1)])}),[],!1,null,"6c35c696",null);a.default=s.exports}}]);