<template>
    <div>
        <a-form-model-item :label="field.label" v-for="(field, key) in fields" :key="key">
            <a-input
                v-if="field.type === 'string'"
                v-model="form [field.field]"
                :placeholder="field.desc">
            </a-input>
            <a-input-number
                v-if="field.type === 'number'"
                v-model="form [field.field]"
                :min="field.min || 0"
                :max="field.max || 10"
                @change="updateForm(field.field, $event)" />
            <a-switch
                v-if="field.type === 'boolean'"
                checked-children="是"
                un-checked-children="否"
                :default-checked="form [field.field]"
                @change="updateForm(field.field, $event)" />

            <a-textarea
                v-if="field.type === 'text'"
                v-model="form [field.field]"
                :placeholder="field.desc"
                :auto-size="{ minRows: 8, maxRows: 20 }" />

            <a-upload
                v-if="field.type === 'upload'"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="field.action"
                :data="{token:getToken()}"
                @change="onChangeUpload(field.field, $event)"
            >
                <img height="90px" v-if="form [field.field]" :src="form [field.field]" />
                <div v-else>
                    <a-font type="iconplus" />
                </div>
            </a-upload>
        </a-form-model-item>


    </div>

</template>
<script>
import {moduleStorageHelpers} from '@/plugins/function'
import { STORE_ADMIN, TOKEN } from '@/plugins/constant'
const {readStorageStr} = moduleStorageHelpers(STORE_ADMIN)

export default {
    name: "DynamicForm",
    components: {},
    props: {
        fields: {
            required: true,
            type: Array,
            default: function() {
                return []
            }
        }

    },
    data() {
        return {
            form: {}
        }
    },
    computed: {},
    watch: {
        fields(fields) {
            this.form = {};
            let form = {};
            fields.forEach(field => {
                form[field.field] = field.value;
            });
            this.form = form;
        },
        form(val) {
            this.$emit("change", val);
        }
    },
    methods: {
        updateForm(field, value){
            if(field){
                this.$set(this.form, field, value);
            }
        },
        onChangeUpload(field, e){

        },
        getToken(){
            return readStorageStr(TOKEN)
        }
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
</style>
