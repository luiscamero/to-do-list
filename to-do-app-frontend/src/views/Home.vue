<template>
  <v-container pa-3 class="grey lighten-5">
    <v-row no-gutters justify="center">
      <v-col md="4">
        <AddTask></AddTask>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters justify="center">
      <v-col md="12">
        <TasksList></TasksList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AddTask from '@/components/AddTask'
import TasksList from '@/components/TasksList'
</script>
<script>
export default {
  data() {
    return {
      tasks: [
        { isCompleted: false, description: 'text text' }
      ]
    }
  },
  methods: {
    completeTask() {

    },
    removeTask() {

    }
  }
}
</script>
