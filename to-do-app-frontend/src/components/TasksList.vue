<template>
  <div>
    <span>Todo</span>
    <v-table class="grey lighten-5">
      <template v-slot:default>
        <tbody>
          <tr v-for="task in tasks">
            <td class="v-col-1 align-center">
              <v-checkbox-btn v-model="task.checked" @change="completeTask(task.checked, task)"></v-checkbox-btn>
            </td>
            <td class="v-col-11 align-center"><span :style="task.checked ? 'text-decoration:line-through' : ''">{{
              task.description }}</span>
            </td>
            <td>
              <v-icon @click="deleteTask(task.id)" color="red">mdi-delete-circle</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.getTasks
    }
  },
  mounted() {
    this.$store.dispatch('getTasks')
  },
  methods: {
    completeTask(checked, task) {
      this.$store.dispatch('updateTask', {...task, checked})
    },
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id)
    },
  }
}
</script>