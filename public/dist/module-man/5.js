(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/factories/form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/factories/form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      form: {
        code: '',
        name: '',
        short: '',
        alias: '',
        display: '',
        description: ''
      },
      rules: {
        base_id: [{
          required: true,
          trigger: 'change',
          message: '请选择一个生产基地'
        }],
        code: [{
          required: true,
          message: '请输入编码',
          trigger: 'blur'
        }, {
          min: 2,
          max: 20,
          message: '至少两个字，最多20个字',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }, {
          min: 2,
          max: 20,
          message: '至少两个字，最多20个字',
          trigger: 'blur'
        }]
      },
      id: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit: function handleSubmit() {
      var _this = this;

      this.$refs.form.validate(function (valid) {
        if (valid) {
          var api = _this.$apiHandle(_this.$api.adminFactories, _this.id);

          if (api.status) {
            _this.$put(api.url, _this.form).then(function (res) {
              if (res.code === 200) {
                _this.$message.success(res.msg);

                return _this.$router.back();
              } else {
                return _this.$message.error(res.msg);
              }
            });
          } else {
            _this.$post(api.url, _this.form).then(function (res) {
              if (res.code === 200 || res.code === 201) {
                _this.$message.success(res.msg);

                return _this.$router.back();
              } else {
                return _this.$message.error(res.msg);
              }
            });
          }
        } else {
          _this.$message.error('请按要求填写表单！');

          return false;
        }
      });
    },
    // 生产基地下拉框 --------------------------
    handleBaseSearch: function handleBaseSearch(value) {
      this.getBaseSelector({
        data_type: 'select',
        keyword: value
      });
    },
    handleBaseChange: function handleBaseChange(value) {
      this.form.base_id = value;
    },
    getBaseSelector: function getBaseSelector(params) {
      var _this2 = this;

      this.$get(this.$api.adminBases, params).then(function (res) {
        if (res.code === 200 && res.data && res.data) {
          _this2.bases = res.data;
        }
      });
    },
    // -------------------------- 生产基地下拉框
    getForm: function getForm() {
      var _this3 = this;

      this.$get(this.$api.adminFactories + '/' + this.id).then(function (res) {
        _this3.form = res.data;
      });
    },
    // 获取列表
    onload: function onload() {
      // 判断你是否是编辑
      if (!this.$isEmpty(this.$route.params.id)) {
        this.id = this.$route.params.id;
        this.getForm();
      }
    }
  },
  created: function created() {
    this.onload();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/factories/form.vue?vue&type=template&id=37ec3a2a&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/factories/form.vue?vue&type=template&id=37ec3a2a&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "admin_table_page_title" },
      [
        _c(
          "a-button",
          {
            staticClass: "float_right",
            attrs: { icon: "arrow-left" },
            on: {
              click: function($event) {
                return _vm.$router.back()
              }
            }
          },
          [_vm._v("返回")]
        ),
        _vm._v("\n        工厂编辑\n    ")
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "unline underm" }),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "admin_form" },
      [
        _c(
          "a-form-model",
          {
            ref: "form",
            attrs: {
              model: _vm.form,
              rules: _vm.rules,
              "label-col": { span: 6 },
              "wrapper-col": { span: 16 }
            }
          },
          [
            _c(
              "a-form-model-item",
              { attrs: { label: "生产基地", prop: "base_id" } },
              [
                _c(
                  "a-select",
                  {
                    attrs: {
                      "show-search": "",
                      placeholder:
                        _vm.form.base && _vm.form.base_id > 0
                          ? _vm.form.base.name
                          : "选择生产基地",
                      "filter-option": false,
                      "not-found-content": "没有更多的生产基地"
                    },
                    on: {
                      search: _vm.handleBaseSearch,
                      change: _vm.handleBaseChange
                    }
                  },
                  _vm._l(_vm.bases, function(item) {
                    return _c(
                      "a-select-option",
                      { key: item.id, attrs: { value: item.id } },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(item.name) +
                            "\n                    "
                        )
                      ]
                    )
                  }),
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "编码", prop: "name" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.form.code,
                    callback: function($$v) {
                      _vm.$set(_vm.form, "code", $$v)
                    },
                    expression: "form.code"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "名称", prop: "name" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.form.name,
                    callback: function($$v) {
                      _vm.$set(_vm.form, "name", $$v)
                    },
                    expression: "form.name"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "简称" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.form.short,
                    callback: function($$v) {
                      _vm.$set(_vm.form, "short", $$v)
                    },
                    expression: "form.short"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "别名" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.form.alias,
                    callback: function($$v) {
                      _vm.$set(_vm.form, "alias", $$v)
                    },
                    expression: "form.alias"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "显示名称" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.form.display,
                    callback: function($$v) {
                      _vm.$set(_vm.form, "display", $$v)
                    },
                    expression: "form.display"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "描述" } },
              [
                _c("a-textarea", {
                  attrs: { "auto-size": { minRows: 3, maxRows: 5 } },
                  model: {
                    value: _vm.form.description,
                    callback: function($$v) {
                      _vm.$set(_vm.form, "description", $$v)
                    },
                    expression: "form.description"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { "wrapper-col": { span: 12, offset: 5 } } },
              [
                _c(
                  "a-button",
                  {
                    attrs: { type: "primary" },
                    on: { click: _vm.handleSubmit }
                  },
                  [_vm._v("提交")]
                )
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Admin/factories/form.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/Admin/factories/form.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_37ec3a2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=37ec3a2a&scoped=true& */ "./resources/js/views/Admin/factories/form.vue?vue&type=template&id=37ec3a2a&scoped=true&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/factories/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_37ec3a2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_37ec3a2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "37ec3a2a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/factories/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/factories/form.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Admin/factories/form.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/factories/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/factories/form.vue?vue&type=template&id=37ec3a2a&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/views/Admin/factories/form.vue?vue&type=template&id=37ec3a2a&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_37ec3a2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=37ec3a2a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/factories/form.vue?vue&type=template&id=37ec3a2a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_37ec3a2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_37ec3a2a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);