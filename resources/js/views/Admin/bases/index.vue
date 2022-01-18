<template>
    <div>
        <div class="admin_table_page_title">生产基地列表</div>

        <div class="unline underm"></div>



        <div class="admin_table_list">
            <a-table
                    size="small"
                    :columns="table.columns"
                    :data-source="table.data"
                    :scroll="{ y: sysWindowHeight - 400 }"
                    :loading="table.loading"
                    :pagination="false"
                    :row-selection="{ selectedRowKeys: table.selectedRowKeys, onChange: handleTableRowKeysChange }"
                    row-key="id">

                <template slot="title" slot-scope="currentPageData">
                    <search
                            :search-config="search.fields"
                            :auto-params="search.params"
                            @searchParams="handleTableSearchParams"
                            :export-config="exporting"
                            @handleExport="handleTableExport"/>
                    <div class="admin_table_handle_btn">
                        <a-button @click="$router.push('/Admin/goodcatch/m/man/bases/form')" type="primary" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" icon="delete" @click="handleRemoveTableRows">批量删除</a-button>
                    </div>
                </template>


                <span slot="action" slot-scope="rows">
                    <a-button icon="edit" @click="$router.push('/Admin/goodcatch/m/man/bases/form/'+rows.id)">编辑</a-button>
                </span>
            </a-table>
            <div class="admin_pagination" v-if="table.total > 0">
                <a-pagination v-model="table.params.page" :page-size.sync="table.params.per_page" :total="table.total" @change="handleTablePageChange" show-less-items />
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/admin/search'
import { MixinList } from '@/plugins/mixins/admin'
export default {
    mixins: [ MixinList ],
    components: { Search },
    props: {},
    data() {
      return {
          table: {
              actions: {
                  list: this.$api.moduleAdminBases,
                  remove: this.$api.moduleAdminBases
              },
              columns: [
                  {title:'#',dataIndex:'id',fixed:'left', width: 60},
                  {title:'编码',dataIndex:'code'},
                  {title:'名称',dataIndex:'name'},
                  {title:'简称',dataIndex:'short'},
                  {title:'别名',dataIndex:'alias'},
                  {title:'显示名称',dataIndex:'display'},
                  {title:'描述',dataIndex:'description', width: 120},
                  {title:'创建时间',dataIndex:'created_at'},
                  {title:'更新时间',dataIndex:'updated_at'},
                  {title:'操作',fixed:'right',scopedSlots: { customRender: 'action' }},
              ],
          },
          search: {
              fields: [
                  {
                      label: '编码',
                      name: 'code',
                      type: 'text'
                  },
                  {
                      label: '名称',
                      name: 'name',
                      type: 'text'
                  },
                  {
                      label: '简称',
                      name: 'short',
                      type: 'text'
                  },
                  {
                      label: '别名',
                      name: 'alias',
                      type: 'text'
                  },
                  {
                      label: '显示名称',
                      name: 'display',
                      type: 'text'
                  },
                  {
                      label: '描述',
                      name: 'description',
                      type: 'text'
                  }
              ]
          },
          exporting:{ // 数据导出
              url: this.$api.moduleAdminBases,
              columns: [
                  {
                      label: '编码',
                      name: 'code',
                  },
                  {
                      label: '名称',
                      name: 'name',
                  },
                  {
                      field: 'short',
                      name: '简称',
                  },
                  {
                      field: 'display',
                      name: '显示名称',
                  },
                  {
                      field: 'description',
                      name: '描述',
                  }
              ]
          }

      };
    },
    watch: {},
    computed: {},
    methods: {

        onload(){
            // 加载混入中的表格数据
            this.loadTableData();
        },

    },
    created() {
        this.onload();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>

</style>
