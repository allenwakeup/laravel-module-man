(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/factories/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/factories/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.assign.js */ "./node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_admin_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/admin/search */ "./resources/js/components/admin/search.vue");


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
  components: {
    Search: _components_admin_search__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {},
  data: function data() {
    return {
      params: {
        page: 1,
        per_page: 30
      },
      total: 0,
      //总页数
      search: [{
        label: '生产基地',
        name: 'base_id',
        type: 'select-remote',
        data: this.$api.adminBases
      }, {
        label: '编码',
        name: 'code',
        type: 'text'
      }, {
        label: '名称',
        name: 'name',
        type: 'text'
      }, {
        label: '简称',
        name: 'short',
        type: 'text'
      }, {
        label: '别名',
        name: 'alias',
        type: 'text'
      }, {
        label: '显示名称',
        name: 'display',
        type: 'text'
      }, {
        label: '描述',
        name: 'description',
        type: 'text'
      }],
      list_loading: false,
      selectedRowKeys: [],
      // 被选择的行
      columns: [{
        title: '#',
        dataIndex: 'id',
        fixed: 'left',
        width: 60
      }, {
        title: '生产基地',
        scopedSlots: {
          customRender: 'base'
        },
        width: 120
      }, {
        title: '编码',
        dataIndex: 'code',
        width: 120
      }, {
        title: '名称',
        dataIndex: 'name',
        width: 120
      }, {
        title: '简称',
        dataIndex: 'short',
        width: 120
      }, {
        title: '别名',
        dataIndex: 'alias',
        width: 120
      }, {
        title: '显示名称',
        dataIndex: 'display',
        width: 120
      }, {
        title: '描述',
        dataIndex: 'description',
        width: 120
      }, {
        title: '创建时间',
        dataIndex: 'created_at',
        width: 200
      }, {
        title: '更新时间',
        dataIndex: 'updated_at',
        width: 200
      }, {
        title: '操作',
        fixed: 'right',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      list: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 查询条件
    onSearchParams: function onSearchParams(search) {
      this.getList(search);
    },
    // 选择框被点击
    onSelectChange: function onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 选择分页
    onChange: function onChange(e) {
      this.params.page = e;
    },
    // 删除
    del: function del() {
      var _this = this;

      if (this.selectedRowKeys.length === 0) {
        return this.$message.error('未选择数据.');
      }

      this.$confirm({
        title: '你确定要删除选择的数据？',
        content: '确定删除后无法恢复.',
        okText: '是',
        okType: 'danger',
        cancelText: '取消',
        onOk: function onOk() {
          var ids = _this.selectedRowKeys.join(',');

          _this.$delete(_this.$api.adminFactories + '/' + ids).then(function (res) {
            if (res.code === 200) {
              _this.onload();

              _this.$message.success('删除成功');
            } else {
              _this.$message.error(res.msg);
            }
          });
        }
      });
    },
    getList: function getList() {
      var _this2 = this;

      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.list_loading = true;
      var params = Object.assign({}, search, this.params);
      this.$get(this.$api.adminFactories, params).then(function (res) {
        if (res.code === 200) {
          _this2.total = res.data.total;
          _this2.list = res.data.data;
        }

        _this2.list_loading = false;
      }, function (err) {
        _this2.$message.error('数据加载失败');

        _this2.list_loading = false;
      });
    },
    onload: function onload() {
      this.getList();
    }
  },
  created: function created() {
    this.onload();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/factories/index.vue?vue&type=template&id=2c3b3f5c&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/factories/index.vue?vue&type=template&id=2c3b3f5c&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "admin_table_page_title" }, [_vm._v("工厂列表")]),
    _vm._v(" "),
    _c("div", { staticClass: "unline underm" }),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "admin_table_list" },
      [
        _c("a-table", {
          attrs: {
            columns: _vm.columns,
            "data-source": _vm.list,
            scroll: { x: 1400 },
            loading: _vm.list_loading,
            pagination: false,
            "row-selection": {
              selectedRowKeys: _vm.selectedRowKeys,
              onChange: _vm.onSelectChange
            },
            "row-key": "id"
          },
          scopedSlots: _vm._u([
            {
              key: "title",
              fn: function(currentPageData) {
                return [
                  _c("search", {
                    attrs: { "search-config": _vm.search },
                    on: { searchParams: _vm.onSearchParams }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "admin_table_handle_btn" },
                    [
                      _c(
                        "a-button",
                        {
                          attrs: { type: "primary", icon: "plus" },
                          on: {
                            click: function($event) {
                              return _vm.$router.push("/Admin/factories/form")
                            }
                          }
                        },
                        [_vm._v("添加")]
                      ),
                      _vm._v(" "),
                      _c(
                        "a-button",
                        {
                          staticClass: "admin_delete_btn",
                          attrs: { type: "danger", icon: "delete" },
                          on: { click: _vm.del }
                        },
                        [_vm._v("批量删除")]
                      )
                    ],
                    1
                  )
                ]
              }
            },
            {
              key: "base",
              fn: function(record) {
                return _c("span", {}, [
                  _vm._v(
                    "\n                " +
                      _vm._s(
                        record.base && record.base.name
                          ? record.base.name
                          : "--"
                      ) +
                      "\n            "
                  )
                ])
              }
            },
            {
              key: "action",
              fn: function(rows) {
                return _c(
                  "span",
                  {},
                  [
                    _c(
                      "a-button",
                      {
                        attrs: { icon: "edit" },
                        on: {
                          click: function($event) {
                            return _vm.$router.push(
                              "/Admin/factories/form/" + rows.id
                            )
                          }
                        }
                      },
                      [_vm._v("编辑")]
                    )
                  ],
                  1
                )
              }
            }
          ])
        }),
        _vm._v(" "),
        _vm.total > 0
          ? _c(
              "div",
              { staticClass: "admin_pagination" },
              [
                _c("a-pagination", {
                  attrs: {
                    "page-size": _vm.params.per_page,
                    total: _vm.total,
                    "show-less-items": ""
                  },
                  on: {
                    "update:pageSize": function($event) {
                      return _vm.$set(_vm.params, "per_page", $event)
                    },
                    "update:page-size": function($event) {
                      return _vm.$set(_vm.params, "per_page", $event)
                    },
                    change: _vm.onChange
                  },
                  model: {
                    value: _vm.params.page,
                    callback: function($$v) {
                      _vm.$set(_vm.params, "page", $$v)
                    },
                    expression: "params.page"
                  }
                })
              ],
              1
            )
          : _vm._e()
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Admin/factories/index.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Admin/factories/index.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_2c3b3f5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=2c3b3f5c&scoped=true& */ "./resources/js/views/Admin/factories/index.vue?vue&type=template&id=2c3b3f5c&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/factories/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_2c3b3f5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_2c3b3f5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2c3b3f5c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/factories/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/factories/index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Admin/factories/index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/factories/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/factories/index.vue?vue&type=template&id=2c3b3f5c&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/Admin/factories/index.vue?vue&type=template&id=2c3b3f5c&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2c3b3f5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=2c3b3f5c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/factories/index.vue?vue&type=template&id=2c3b3f5c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2c3b3f5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_2c3b3f5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);