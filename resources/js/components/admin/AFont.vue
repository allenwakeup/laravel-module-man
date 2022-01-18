<template>
    <svg class="icon"  v-if="!!type"  aria-hidden="true">
        <use :xlink:href="`#${type}`"></use>
    </svg>
</template>

<script>
export default {
    name: "AFont",
    props:{
        type:{
            required: true,
            type: String,
            default: function (){
                return '';
            }
        }
    },
}
</script>

<style scoped>

</style>
