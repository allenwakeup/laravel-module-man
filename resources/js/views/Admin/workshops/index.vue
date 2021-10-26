<template>
    <div>
        <div class="admin_table_page_title">车间列表</div>

        <div class="unline underm"></div>



        <div class="admin_table_list">
            <a-table
                    :columns="columns"
                    :data-source="list"
                    :scroll="{ x: 1400 }"
                    :loading="list_loading"
                    :pagination="false"
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    row-key="id">

                <template slot="title" slot-scope="currentPageData">
                    <search :search-config="search" @searchParams="onSearchParams"/>
                    <div class="admin_table_handle_btn">
                        <a-button @click="$router.push('/Admin/goodcatch/m/man/workshops/form')" type="primary" icon="plus">添加</a-button>
                        <a-button class="admin_delete_btn" type="danger" icon="delete" @click="del">批量删除</a-button>
                    </div>
                </template>

                <span slot="factory" slot-scope="record" >
                    {{ (record.factory && record.factory.base && record.factory.base.name) ? (record.factory.base.name + record.factory.name) : '--' }}
                </span>


                <span slot="action" slot-scope="rows">
                    <a-button icon="edit" @click="$router.push('/Admin/goodcatch/m/man/workshops/form/'+rows.id)">编辑</a-button>
                </span>
            </a-table>
            <div class="admin_pagination" v-if="total>0">
                <a-pagination v-model="params.page" :page-size.sync="params.per_page" :total="total" @change="onChange" show-less-items />
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/admin/search'
export default {
    components: { Search },
    props: {},
    data() {
      return {
          params:{
              page:1,
              per_page:30,
          },
          total:0, //总页数
          search: [
              {
                  label: '工厂',
                  name: 'factory_id',
                  type: 'select-remote',
                  data: this.$api.moduleAdminFactories
              },
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
          ],
          list_loading: false,
          selectedRowKeys:[], // 被选择的行
          columns:[
              {title:'#',dataIndex:'id',fixed:'left', width: 60},
              {title:'工厂',scopedSlots: { customRender: 'factory' }, width: 120},
              {title:'编码',dataIndex:'code', width: 120},
              {title:'名称',dataIndex:'name', width: 120},
              {title:'简称',dataIndex:'short', width: 120},
              {title:'别名',dataIndex:'alias', width: 120},
              {title:'显示名称',dataIndex:'display', width: 120},
              {title:'描述',dataIndex:'description', width: 120},
              {title:'创建时间',dataIndex:'created_at', width: 200},
              {title:'更新时间',dataIndex:'updated_at', width: 200},
              {title:'操作',fixed:'right',scopedSlots: { customRender: 'action' }},
          ],
          list:[]

      };
    },
    watch: {},
    computed: {},
    methods: {
        // 查询条件
        onSearchParams(search){
            this.getList(search);
        },
        // 选择框被点击
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        // 选择分页
        onChange(e){
            this.params.page = e;
        },
        // 删除
        del(){
            if(this.selectedRowKeys.length===0){
                return this.$message.error('未选择数据.');
            }
            this.$confirm({
                title: '你确定要删除选择的数据？',
                content: '确定删除后无法恢复.',
                okText: '是',
                okType: 'danger',
                cancelText: '取消',
                onOk:()=> {
                    let ids = this.selectedRowKeys.join(',');
                    this.$delete(this.$api.moduleAdminWorkshops+'/'+ids).then(res=>{
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
        getList(search = {}){
            this.list_loading = true;
            const params = Object.assign({}, search, this.params);
            this.$get(this.$api.moduleAdminWorkshops, params).then(res=>{
                if (res.code === 200){
                    this.total = res.data.total;
                    this.list = res.data.data;
                }
                this.list_loading = false;
            }, err=>{
                this.$message.error('数据加载失败');
                this.list_loading = false;
            });
        },
        onload(){
            this.getList();
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
