<script>

    // ************************************************************
    //
    //   参考使用案例 resources/js/views/Admin/admins/index-mixin.vue
    //
    // ************************************************************

    import moment from 'moment'
    import { exportXls } from '@/plugins/function'
    import { createNamespacedHelpers } from 'vuex'
    import { STORE_ADMIN_COMMON, STORE_ADMIN_LOGIN, APPEND_DATE_TIME_FORMAT } from '@/plugins/constant'

    const adminLoginStore = createNamespacedHelpers(STORE_ADMIN_LOGIN)
    const adminCommonStore = createNamespacedHelpers(STORE_ADMIN_COMMON)

    export default {
        data() {
            return {
                table: {
                    actions: {
                        list: '', // 列表数据请求地址
                        remove: '' // 删除数据请求地址
                    },
                    params: { // 分页参数
                        page: 1, // 默认首页
                        per_page: 30, // 每页数据量
                    },
                    total: 0, // 总页数
                    loading: false, // 是否加载数据
                    // 在a-table组件加入属性 :expanded-row-keys.sync="table.expandedRowKeys"
                    // 可选，加入 :defaultExpandAllRows="true"
                    expand: false, // 是否展开当前页的行
                    selectedRowKeys: [], // 被选择的行
                    expandedRowKeys: [], // 被展开的行
                    columns: [
                        {title: '名称', dataIndex: 'name', width: 120},
                    ],
                    data: [],
                    transform(data) {
                        return data;
                    },
                    getRowClassName(record, index) {
                        return '';
                    }
                },

                search: {
                    fields: [
                        {
                            label: '名称',
                            name: 'name',
                            type: 'text'
                        }
                    ],
                    params: {}


                },

                // 数据导出
                exporting: {
                    show: true, // 默认显示导出按钮
                    url: '', // 服务端数据源
                    perPage: 100, // 每次请求数据量
                    fileName: '数据导出',
                    sheetName: 'New Sheet',
                    columns: [],
                    transform(data) {
                        return data;
                    },
                    // 可选方法，当 exporting.columns 为空时，使用自定义动态列
                    // data 根据前台查询条件查询的后台数据
                    // search 当前查询条件
                    transformColumns(data, search = {}) {
                        return [];
                    }
                }
            }

        },
        computed: {
            ...adminLoginStore.mapGetters([
                'isLogin',
                'userInfo',
                'token'
            ]),
            ...adminCommonStore.mapGetters({
                sysWindowHeight: 'height',
                sysIsBusy: 'isBusy',
                userPref: 'pref',
            }),
        },
        methods: {
            ...adminCommonStore.mapActions({
                setSysBusy: 'gettingBusy',
            }),
            /**
             * 查询条件触发表格查询
             * @param search
             */
            handleTableSearchParams(search) {
                this.search.params = search;
                this.loadTableData ();
            },
            // 选择框被点击
            handleTableRowKeysChange(selectedRowKeys) {
                this.table.selectedRowKeys = selectedRowKeys;
            },
            // 选择分页
            handleTablePageChange(e){
                this.table.params.page = e;
                this.loadTableData ();
            },

            // 删除选择的数据
            handleRemoveTableRows(){
                if(this.table.selectedRowKeys.length === 0) {
                    return this.$message.error('未选择数据.');
                }
                if(this.$isEmpty(this.table.actions.remove)) {
                    return this.$message.error('未定义接口.');
                }
                this.$confirm({
                    title: '你确定要删除选择的数据？',
                    content: '确定删除后无法恢复.',
                    okText: '是',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk:()=> {
                        let ids = this.table.selectedRowKeys.join(',');
                        this.$delete(this.table.actions.remove + '/' + ids).then(res=>{
                            if(res.code === 200){
                                this.onload();
                                this.$message.success('删除成功');
                            }else{
                                this.$message.error(res.msg)
                            }
                        });

                    },
                });
            },

            // 导出
            handleTableExport({ data, params }){
                if(data && data.length > 0){

                    data = this.exporting.transform(data);

                    if(!data || data.length === 0){
                        return this.$message.error('没有找到更多数据');
                    }

                    const columns = (!!this.exporting.columns && this.exporting.columns.length > 0)
                        ? this.exporting.columns
                        : this.exporting.transformColumns(data.concat([]), Object.assign({}, this.search.params, params));

                    if(!columns || columns.length === 0){
                        return this.$message.error('没有找到列的配置');
                    }

                    exportXls(
                        {
                            data,
                            columns,
                            fileName: moment().format(APPEND_DATE_TIME_FORMAT) + '_' + this.exporting.fileName,
                            sheetName: this.exporting.sheetName
                        }
                    )
                }
            },

            // 返回值同步当前数据列表
            syncTableData(list){
                if(!!list && list.length > 0){
                    this.table.data.forEach(d => {
                        const updated = list.find(updated => updated.id === d.id);
                        if(!!updated){
                            Object.keys(updated).forEach(k => {
                                if(updated.hasOwnProperty(k)){
                                    d[k] = updated[k];
                                }
                            });
                        }
                    })
                }
            },
            /**
             * 加载表格数据
             */
            loadTableData (){
                if(! this.$isEmpty(this.table.actions.list)){ // 组建需设置好请求地址
                    this.table.loading = true; // 更改表格加载状态
                    this.$get(this.table.actions.list, Object.assign({}, this.search.params, this.table.params)).then(res=>{
                        this.table.data = [];
                        // 展开当前页
                        let expanded_row_keys = this.table.expandedRowKeys;
                        if(this.table.expand){
                            this.table.expandedRowKeys = [];
                        }
                        if (res.code === 200){

                            if(!! res.data){
                                this.table.total = res.data.total;
                                this.table.data = this.table.transform(res.data.data);
                                if(this.table.expand && !! this.table.data && this.table.data.length > 0){
                                    const curr_expand_keys = this.table.data.map(d => d.id);
                                    this.$nextTick(() => { // 处理展开
                                        if(!!curr_expand_keys && curr_expand_keys.length > 0){
                                            this.table.expandedRowKeys = curr_expand_keys;
                                        } else {
                                            this.table.expandedRowKeys = expanded_row_keys;
                                        }
                                    });
                                } else {
                                    // 还原展开
                                    this.table.expandedRowKeys = expanded_row_keys;
                                }
                            }

                        } else {
                            this.$message.error(res.msg);
                        }
                        this.table.loading = false;
                    }, err=>{
                        this.$message.error(err);
                        this.table.loading = false;
                    });
                } else {
                    this.$message.error('未定义数据源.');
                }

            }
        }
    };
</script>
