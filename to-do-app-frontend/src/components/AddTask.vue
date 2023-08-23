<template>
    <v-text-field v-model="formValues.description"
    label="Create New Task"
    variant="outlined"
    append-icon="mdi-plus-circle"
    @click:append="addNewTask"
    @keyup.enter="addNewTask"></v-text-field>
</template>
<script>
export default {
    data() {
        return {
            formValues: {
                description: ''
            }
        }
    },
    methods: {
        addNewTask() {
            if (this.formValues.description.length) {
                this.$store.dispatch('addTask', {...this.formValues})
            }
        }
    }
}
</script>