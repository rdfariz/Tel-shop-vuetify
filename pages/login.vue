<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12 md6>
                <v-card flat outlined tile :loading="loading" :disabled="loading">
                    <v-card-title primary-title>
                        Login Pengguna
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <form>
                            <v-text-field
                              v-model="username"
                              :error-messages="usernameErrors"
                              label="Username"
                              required
                              @input="$v.username.$touch()"
                              @blur="$v.username.$touch()"
                              @keydown.enter="login()"
                            ></v-text-field>

                            <v-text-field
                              v-model="password"
                              :error-messages="passwordErrors"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show1 ? 'text' : 'password'"
                              label="Password"
                              counter
                              @click:append="show1 = !show1"
                              @input="$v.password.$touch()"
                              @blur="$v.password.$touch()"
                              @keydown.enter="login()"
                            ></v-text-field>
                            <p>Belum punya akun? buat akun <nuxt-link to="/register">disini</nuxt-link></p>
                            <v-btn class="mr-2" color="success" @click="login()" tile>Login</v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  head: {
    title: 'Login User'
  },
  mixins: [validationMixin],
  validations: {
      username: { required },
      password: { required }
  },
  data: () => ({
      username: '',
      password: '',
      show1: false,
      loading: null
  }),
  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username tidak boleh kosong')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password tidak boleh kosong')
      return errors
    },
  },
  methods: {
    login () {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error){
        
      }else {
        const obj = {
          username: this.username,
          password: this.password
        }
        this.$store.dispatch('tryLogin', obj)
      }
    }
  },
}
</script>