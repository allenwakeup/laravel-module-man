(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{rp7n:function(e,r,t){"use strict";t.r(r);t("pNMO"),t("4Brf"),t("07d7"),t("0oug"),t("4mDm"),t("PKPk"),t("3bBZ"),t("pjDv"),t("+2oP"),t("sMBO");function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,r){if(!e)return;if("string"==typeof e)return a(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return a(e,r)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,o=new Array(r);t<r;t++)o[t]=e[t];return o}var s={components:{},props:{},data:function(){return{form:{code:"",name:"",short:"",alias:"",display:"",description:""},rules:{workshop_id:[{required:!0,trigger:"change",message:"请选择一个车间"}],code:[{required:!0,message:"请输入编码",trigger:"blur"},{min:2,max:20,message:"至少两个字，最多20个字",trigger:"blur"}],name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:2,max:20,message:"至少两个字，最多20个字",trigger:"blur"}]},workshops:[],workshops_cascader:{base:"factory",factory:"workshop"},id:0}},watch:{},computed:{},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate((function(r){if(!r)return e.$message.error("请按要求填写表单！"),!1;var t=e.$apiHandle(e.$api.moduleAdminProcesses,e.id);t.status?e.$put(t.url,e.form).then((function(r){return 200===r.code?(e.$message.success(r.msg),e.$router.back()):e.$message.error(r.msg)})):e.$post(t.url,e.form).then((function(r){return 200===r.code||201===r.code?(e.$message.success(r.msg),e.$router.back()):e.$message.error(r.msg)}))}))},onChangeFactory:function(e){this.form.factory_id=row[1]},loadWorkshop:function(e){var r=this,t=e[e.length-1],a={data_type:"cascader",cascader:this.workshops_cascader[t.cascader]};a[t.cascader+"_id"]=t.value,t.loading=!0,this.$get(this.$api.moduleAdminWorkshops,a).then((function(e){t.loading=!1,t.children=e.data,r.workshops=o(r.workshops)}))},getForm:function(){var e=this;this.$get(this.$api.moduleAdminProcesses+"/"+this.id).then((function(r){e.form=r.data}))},onload:function(){this.$isEmpty(this.$route.params.id)||(this.id=this.$route.params.id,this.getForm())}},created:function(){this.onload()},mounted:function(){}},n=t("KHd+"),i=Object(n.a)(s,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("div",{staticClass:"admin_table_page_title"},[t("a-button",{staticClass:"float_right",attrs:{icon:"arrow-left"},on:{click:function(r){return e.$router.back()}}},[e._v("返回")]),e._v("\n        工序编辑\n    ")],1),e._v(" "),t("div",{staticClass:"unline underm"}),e._v(" "),t("div",{staticClass:"admin_form"},[t("a-form-model",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-col":{span:6},"wrapper-col":{span:16}}},[t("a-form-model-item",{attrs:{label:"车间",prop:"workshop_id"}},[t("a-cascader",{attrs:{"load-data":e.loadWorkshop,options:e.workshops,placeholder:"请选择车间","change-on-select":""},on:{change:e.onChangeWorkshop}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"编码",prop:"name"}},[t("a-input",{model:{value:e.form.code,callback:function(r){e.$set(e.form,"code",r)},expression:"form.code"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"名称",prop:"name"}},[t("a-input",{model:{value:e.form.name,callback:function(r){e.$set(e.form,"name",r)},expression:"form.name"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"简称"}},[t("a-input",{model:{value:e.form.short,callback:function(r){e.$set(e.form,"short",r)},expression:"form.short"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"别名"}},[t("a-input",{model:{value:e.form.alias,callback:function(r){e.$set(e.form,"alias",r)},expression:"form.alias"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"显示名称"}},[t("a-input",{model:{value:e.form.display,callback:function(r){e.$set(e.form,"display",r)},expression:"form.display"}})],1),e._v(" "),t("a-form-model-item",{attrs:{label:"描述"}},[t("a-textarea",{attrs:{"auto-size":{minRows:3,maxRows:5}},model:{value:e.form.description,callback:function(r){e.$set(e.form,"description",r)},expression:"form.description"}})],1),e._v(" "),t("a-form-model-item",{attrs:{"wrapper-col":{span:12,offset:5}}},[t("a-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)],1)])}),[],!1,null,"fb425154",null);r.default=i.exports}}]);