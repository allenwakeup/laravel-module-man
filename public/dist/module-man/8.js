(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{Nape:function(e,a,t){"use strict";t.r(a);var r={components:{},props:{},data:function(){return{form:{code:"",name:"",short:"",alias:"",display:"",description:""},rules:{base_id:[{required:!0,trigger:"change",message:"请选择一个生产基地"}],code:[{required:!0,message:"请输入编码",trigger:"blur"},{min:2,max:20,message:"至少两个字，最多20个字",trigger:"blur"}],name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:2,max:20,message:"至少两个字，最多20个字",trigger:"blur"}]},id:0}},watch:{},computed:{},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate((function(a){if(!a)return e.$message.error("请按要求填写表单！"),!1;var t=e.$apiHandle(e.$api.adminFactories,e.id);t.status?e.$put(t.url,e.form).then((function(a){return 200===a.code?(e.$message.success(a.msg),e.$router.back()):e.$message.error(a.msg)})):e.$post(t.url,e.form).then((function(a){return 200===a.code||201===a.code?(e.$message.success(a.msg),e.$router.back()):e.$message.error(a.msg)}))}))},handleBaseSearch:function(e){this.getBaseSelector({data_type:"select",keyword:e})},handleBaseChange:function(e){this.form.base_id=e},getBaseSelector:function(e){var a=this;this.$get(this.$api.adminBases,e).then((function(e){200===e.code&&e.data&&e.data&&(a.bases=e.data)}))},getForm:function(){var e=this;this.$get(this.$api.adminFactories+"/"+this.id).then((function(a){e.form=a.data}))},onload:function(){this.$isEmpty(this.$route.params.id)||(this.id=this.$route.params.id,this.getForm())}},created:function(){this.onload()},mounted:function(){}},s=t("KHd+"),o=Object(s.a)(r,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"admin_table_page_title"},[t("a-button",{staticClass:"float_right",attrs:{icon:"arrow-left"},on:{click:function(a){return e.$router.back()}}},[e._v("返回")]),e._v("\n        工厂编辑\n    ")],1),e._v(" "),t("div",{staticClass:"unline underm"}),e._v(" "),t("div",{staticClass:"admin_form"},[t("a-form-model",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-col":{span:6},"wrapper-col":{span:16}}},[t("a-form-model-item",{attrs:{label:"生产基地",prop:"base_id"}},[t("a-select",{attrs:{"show-search":"",placeholder:e.form.base&&e.form.base_id>0?e.form.base.name:"选择生产基地","filter-option":!1,"not-found-content":"没有更多的生产基地"},on:{search:e.handleBaseSearch,change:e.handleBaseChange}},e._l(e.bases,(function(a){return t("a-select-option",{key:a.id,attrs:{value:a.id}},[e._v("\n                        "+e._s(a.name)+"\n                    ")])})),1)],1),e._v(" "),t("a-form-model-item",{attrs:{label:"编码",prop:"name"}},[t("a-input",{model:{value:e.form.code,callback:function(a){e.$set(e.form,"code",a)},expression:"form.code"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"名称",prop:"name"}},[t("a-input",{model:{value:e.form.name,callback:function(a){e.$set(e.form,"name",a)},expression:"form.name"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"简称"}},[t("a-input",{model:{value:e.form.short,callback:function(a){e.$set(e.form,"short",a)},expression:"form.short"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"别名"}},[t("a-input",{model:{value:e.form.alias,callback:function(a){e.$set(e.form,"alias",a)},expression:"form.alias"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"显示名称"}},[t("a-input",{model:{value:e.form.display,callback:function(a){e.$set(e.form,"display",a)},expression:"form.display"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"描述"}},[t("a-textarea",{attrs:{"auto-size":{minRows:3,maxRows:5}},model:{value:e.form.description,callback:function(a){e.$set(e.form,"description",a)},expression:"form.description"}})],1),e._v(" "),t("a-form-model-item",{attrs:{"wrapper-col":{span:12,offset:5}}},[t("a-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)],1)])}),[],!1,null,"1c1e8a24",null);a.default=o.exports}}]);