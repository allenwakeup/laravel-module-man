<template>
    <div>
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            工厂编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 6 }"  :wrapper-col="{ span: 16 }">
                <a-form-model-item label="生产基地" prop="base_id">

                    <a-select
                            show-search
                            :placeholder="(form.base && form.base_id > 0) ? form.base.name : '选择生产基地'"

                            :filter-option="false"
                            not-found-content="没有更多的生产基地"
                            @search="handleBaseSearch"
                            @change="handleBaseChange" >
                        <a-select-option v-for="item in bases" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>

                </a-form-model-item>
                <a-form-model-item label="编码" prop="name">
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
              code: '',
              name: '',
              short: '',
              alias: '',
              display: '',
              description: ''
          },
          rules: {
              base_id: [
                  {
                      required: true,
                      trigger: 'change',
                      message: '请选择一个生产基地'
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
          id:0,
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){

            this.$refs.form.validate(valid => {
                if(valid){
                    let api = this.$apiHandle(this.$api.adminFactories,this.id);
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
        // 生产基地下拉框 --------------------------
        handleBaseSearch(value) {
            this.getBaseSelector({data_type:'select', keyword: value});
        },
        handleBaseChange(value) {
            this.form.base_id = value;
        },
        getBaseSelector(params){
            this.$get(this.$api.adminBases, params).then(res=>{
                if(res.code === 200 && res.data && res.data){
                    this.bases = res.data;
                }
            });
        },
        // -------------------------- 生产基地下拉框
        getForm(){
            this.$get(this.$api.adminFactories+'/'+this.id).then(res=>{
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
