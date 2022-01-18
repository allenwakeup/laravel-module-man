(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{rp7n:function(e,r,o){"use strict";o.r(r);o("pNMO"),o("4Brf"),o("07d7"),o("0oug"),o("4mDm"),o("PKPk"),o("3bBZ"),o("pjDv"),o("+2oP"),o("sMBO");function t(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,r){if(!e)return;if("string"==typeof e)return a(e,r);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return a(e,r)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,r){(null==r||r>e.length)&&(r=e.length);for(var o=0,t=new Array(r);o<r;o++)t[o]=e[o];return t}var s={components:{},props:{},data:function(){return{form:{workshop_id:void 0,code:"",name:"",short:"",alias:"",display:"",description:""},rules:{workshop_id:[{required:!0,trigger:"change",message:"请选择一个车间"}],code:[{required:!0,message:"请输入编码",trigger:"blur"},{min:2,max:20,message:"至少两个字，最多20个字",trigger:"blur"}],name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:2,max:20,message:"至少两个字，最多20个字",trigger:"blur"}]},workshops:[],workshops_cascader:{base:"factory",factory:"workshop"},id:0}},watch:{},computed:{},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate((function(r){if(!r)return e.$message.error("请按要求填写表单！"),!1;var o=e.$apiHandle(e.$api.moduleAdminProcesses,e.id);o.status?e.$put(o.url,e.form).then((function(r){return 200===r.code?(e.$message.success(r.msg),e.$router.back()):e.$message.error(r.msg)})):e.$post(o.url,e.form).then((function(r){return 200===r.code||201===r.code?(e.$message.success(r.msg),e.$router.back()):e.$message.error(r.msg)}))}))},onChangeWorkshop:function(e){this.form.workshop_id=e[2]},loadWorkshop:function(e){var r=this,o=e[e.length-1],a={data_type:"cascader",cascader:this.workshops_cascader[o.cascader]};a[o.cascader+"_id"]=o.value,o.loading=!0,this.$get(this.$api.moduleAdminWorkshops,a).then((function(e){o.loading=!1,o.children=e.data,r.workshops=t(r.workshops)}))},getForm:function(){var e=this;this.$get(this.$api.moduleAdminProcesses+"/"+this.id).then((function(r){e.form=r.data}))},onload:function(){var e=this;this.$isEmpty(this.$route.params.id)||(this.id=this.$route.params.id,this.getForm()),this.$get(this.$api.moduleAdminWorkshops,{data_type:"cascader",cascader:"base"}).then((function(r){200===r.code&&(e.workshops=r.data)}))}},created:function(){this.onload()},mounted:function(){}},n=o("KHd+"),i=Object(n.a)(s,(function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("div",[o("div",{staticClass:"admin_table_page_title"},[o("a-button",{staticClass:"float_right",attrs:{type:"link",icon:"arrow-left"},on:{click:function(r){return e.$router.back()}}},[e._v("返回")]),e._v("\n        工序编辑\n    ")],1),e._v(" "),o("div",{staticClass:"unline underm"}),e._v(" "),o("div",{staticClass:"admin_form"},[o("a-form-model",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-col":{span:6},"wrapper-col":{span:16}}},[o("a-form-model-item",{attrs:{label:"车间",prop:"workshop_id"}},[o("a-cascader",{attrs:{"load-data":e.loadWorkshop,options:e.workshops,placeholder:"请选择车间","change-on-select":""},on:{change:e.onChangeWorkshop}})],1),e._v(" "),o("a-form-model-item",{attrs:{label:"编码",prop:"code"}},[o("a-input",{model:{value:e.form.code,callback:function(r){e.$set(e.form,"code",r)},expression:"form.code"}})],1),e._v(" "),o("a-form-model-item",{attrs:{label:"名称",prop:"name"}},[o("a-input",{model:{value:e.form.name,callback:function(r){e.$set(e.form,"name",r)},expression:"form.name"}})],1),e._v(" "),o("a-form-model-item",{attrs:{label:"简称"}},[o("a-input",{model:{value:e.form.short,callback:function(r){e.$set(e.form,"short",r)},expression:"form.short"}})],1),e._v(" "),o("a-form-model-item",{attrs:{label:"别名"}},[o("a-input",{model:{value:e.form.alias,callback:function(r){e.$set(e.form,"alias",r)},expression:"form.alias"}})],1),e._v(" "),o("a-form-model-item",{attrs:{label:"显示名称"}},[o("a-input",{model:{value:e.form.display,callback:function(r){e.$set(e.form,"display",r)},expression:"form.display"}})],1),e._v(" "),o("a-form-model-item",{attrs:{label:"描述"}},[o("a-textarea",{attrs:{"auto-size":{minRows:3,maxRows:5}},model:{value:e.form.description,callback:function(r){e.$set(e.form,"description",r)},expression:"form.description"}})],1),e._v(" "),o("a-form-model-item",{attrs:{"wrapper-col":{span:12,offset:5}}},[o("a-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)],1)])}),[],!1,null,"4824a094",null);r.default=i.exports}}]);