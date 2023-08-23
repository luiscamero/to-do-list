<template>
  <v-container>
    <router-view />
  </v-container>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  const store = useStore()
  const router = useRouter()
  const getUser = localStorage.getItem('user')
  if (getUser) {
    try {
      store.commit('auth/LOG_IN', JSON.parse(getUser))
    } catch (error) {
      router.push('/login')
      store.dispatch('logout')
    }
  }
</script>
