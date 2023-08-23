<template>
  <div class="d-flex align-center justify-center flex-column">
    <v-img @click="logout" style="width: 50%;" height="300" src="@/assets/logo.svg" />
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field class="mb-2" hide-details="auto" variant="outlined" v-model="formValues.email"
          label="Email"></v-text-field>
        <span class="text-red" v-if="formErrors.email">{{ formErrors.email }}</span>

        <v-text-field type="password" class="mb-2" hide-details="auto" variant="outlined" v-model="formValues.password"
          label="Password"></v-text-field>
        <span class="text-red" v-if="formErrors.password">{{ formErrors.password }}</span>

        <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>

      </v-form>
      <div class="mt-2">
        <p class="text-body-2">Don't have an account? <router-link to="/register">Sign Up</router-link></p>
      </div>
    </v-sheet>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValues: {
        email: '',
        password: '',
      },
      formErrors: {
        email: '',
        password: ''
      },
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length >= 8 || 'Passwords should have at least 8 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
    };
  },
  methods: {
    async login() {
      this.formErrors = {
        email: '',
        password: ''
      }
      const loginResponse = await this.$store.dispatch('login', {...this.formValues})
      if (loginResponse.success) {
        this.$router.push('/')
      } else {
        const { response, redirectTo } = loginResponse
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
    },
  },
}
</script>
<style>
.error-text {
  color: #F44336;
}
</style>