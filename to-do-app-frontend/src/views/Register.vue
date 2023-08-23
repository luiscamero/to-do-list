<template>
  <div class="d-flex align-center justify-center flex-column">
    <v-img @click="logout" style="width: 50%;" height="300" src="@/assets/logo.svg" />
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="register">
        <v-text-field hide-details="auto" class="mb-2" variant="outlined" v-model="formValues.name" label="Name"></v-text-field>
        <span class="text-red" v-if="formErrors.name">{{ formErrors.name }}</span>

        <v-text-field hide-details="auto" class="mb-2" variant="outlined" v-model="formValues.email" label="Email"></v-text-field>
        <span class="text-red" v-if="formErrors.email">{{ formErrors.email }}</span>

        <v-text-field type="password" hide-details="auto" class="mb-2" variant="outlined" v-model="formValues.password"
          label="Password"></v-text-field>
        <span class="text-red" v-if="formErrors.password">{{ formErrors.password }}</span>

        <v-text-field type="password" hide-details="auto" class="mb-2" variant="outlined" v-model="formValues.confirmed"
          label="Confirm Password"></v-text-field>
        <span class="text-red" v-if="formErrors.confirmed">{{ formErrors.confirmed }}</span>

        <v-btn type="submit" color="primary" block class="mt-2">Sign up</v-btn>

      </v-form>
      <div class="mt-2">
        <p class="text-body-2">Already have an account? <router-link to="/login">Sign In</router-link></p>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
  data() {
    return {
      formValues: {
        name: '',
        email: '',
        password: '',
        confirmed: '',
      },
      formErrors: {
        name: '',
        email: '',
        password: '',
        confirmed: '',
      }
    }
  },
  methods: {
    async register() {
      this.formErrors = {
        name: '',
        email: '',
        password: '',
        confirmed: '',
      }
      if (this.formValues.confirmed !== this.formValues.password) {
        this.formErrors.confirmed = "Password and confirmation don't match"
      }
      const registerResponse = await this.$store.dispatch('register', {...this.formValues})
      if (registerResponse.success) {
        this.$router.push('/')
      } else {
        const { response, redirectTo } = registerResponse
        const { status, data } = response
        if (redirectTo) {
          this.$router.push(redirectTo)
        }
        if (status === 422 && data.errors) {
          Object.keys(data.errors).forEach(key => {
            this.formErrors[key] = data.errors[key][0]
          })
        }
      }
      // try {
      //     await axios.get(`${process.env.API_URL}/sanctum/csrf-cookie`)
      //     const response = await this.$axios.post(`/register`, {...this.formValues})
      //     if (response.status === 204) {
      //         this.$router.push('/login')
      //     }
      // } catch (error) {
      //     const { response } = error
      //     if (response.status === 400 && response.data.message === "Already logged in!") {
      //         localStorage.setItem('user', JSON.stringify(response.data.user))
      //         this.$router.push('/')
      //     }
      //     if (response.status === 422 && response.data.errors) {
      //         Object.keys(response.data.errors).forEach(key => {
      //             this.formErrors[key] = response.data.errors[key][0]
      //         })
      //     }
      // }
    },
  },
}
</script>