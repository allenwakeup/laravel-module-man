<template>
    <div>
        <div class="admin_table_page_title">
            <a-button type="link" @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            工序编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 6 }"  :wrapper-col="{ span: 16 }">
                <a-form-model-item label="车间" prop="workshop_id">
                    <a-cascader :load-data="loadWorkshop" :options="workshops" placeholder="请选择车间" change-on-select @change="onChangeWorkshop" />
                </a-form-model-item>
                <a-form-model-item label="编码" prop="code">
                    <a-input v-model="form.code"></a-input>
                </a-form-model-item>
                <a-form-model-item label="名称" prop="name">
                    <a-input v-model="form.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="简称">
                    <a-input v-model="form.short"></a-input>
                </a-form-model-item>
                <a-form-model-item label="别名">
                    <a-input v-model="form.alias"></a-input>
                </a-form-model-item>
                <a-form-model-item label="显示名称">
                    <a-input v-model="form.display"></a-input>
                </a-form-model-item>
                <a-form-model-item label="描述">
                    <a-textarea v-model="form.description" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" @click="handleSubmit">提交</a-button>
                </a-form-model-item>
            </a-form-model>

        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
          form:{
              workshop_id: undefined,
              code: '',
              name: '',
              short: '',
              alias: '',
              display: '',
              description: ''
          },
          rules: {
              workshop_id: [
                  {
                      required: true,
                      trigger: 'change',
                      message: '请选择一个车间'
                  }
              ],
              code: [
                  {required: true, message: '请输入编码', trigger: 'blur'},
                  {min: 2, max: 20, message: '至少两个字，最多20个字', trigger: 'blur'},
              ],
              name: [
                  {required: true, message: '请输入名称', trigger: 'blur'},
                  {min: 2, max: 20, message: '至少两个字，最多20个字', trigger: 'blur'},
              ]


          },
          workshops: [],
          workshops_cascader: {
              base: 'factory',
              factory: 'workshop'
          },
          id:0,
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){

            this.$refs.form.validate(valid => {
                if(valid){
                    let api = this.$apiHandle(this.$api.moduleAdminProcesses,this.id);
                    if(api.status){
                        this.$put(api.url,this.form).then(res=>{
                            if(res.code === 200){
                                this.$message.success(res.msg)
                                return this.$router.back();
                            }else{
                                return this.$message.error(res.msg)
                            }
                        })
                    }else{
                        this.$post(api.url,this.form).then(res=>{
                            if(res.code === 200 || res.code === 201){
                                this.$message.success(res.msg)
                                return this.$router.back();
                            }else{
                                return this.$message.error(res.msg)
                            }
                        })
                    }
                } else {
                    this.$message.error('请按要求填写表单！');
                    return false;
                }
            });


        },
        // 车间级联下拉框 --------------------------
        onChangeWorkshop(row) {
            this.form.workshop_id = row[2];
        },
        loadWorkshop(selectedOptions){
            const targetOption = selectedOptions[selectedOptions.length - 1];
            const params = {data_type: 'cascader', cascader: this.workshops_cascader[targetOption.cascader]};
            params[targetOption.cascader + '_id'] = targetOption.value;

            targetOption.loading = true;

            this.$get(this.$api.moduleAdminWorkshops, params).then(res=>{
                targetOption.loading = false;
                targetOption.children = res.data;
                this.workshops = [...this.workshops];
            });
        },
        // -------------------------- 车间级联下拉框
        getForm(){
            this.$get(this.$api.moduleAdminProcesses+'/'+this.id).then(res=>{
                this.form = res.data;
            })
        },
        // 获取列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.getForm();
            }

            this.$get(this.$api.moduleAdminWorkshops, {data_type: 'cascader', cascader: 'base'}).then(res=>{

                if(res.code === 200){
                    this.workshops = res.data;
                }

            });

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
