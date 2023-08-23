<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-btn v-if="isLoggedIn" @click="logout">
        <v-icon icon="mdi-logout" />
        Logout
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
  
</script>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser.hasOwnProperty('id')
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('login')
    }
  }
}
</script>