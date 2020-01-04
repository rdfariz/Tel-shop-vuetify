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
                            v-model="email"
                            :error-messages="emailErrors"
                            label="E-mail"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
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
                            ></v-text-field>
                            <p>Belum punya akun? buat akun <nuxt-link to="/register">disini</nuxt-link></p>
                            <v-btn class="mr-2" color="success" @click="login()" tile>Login</v-btn>
                            <!-- <v-btn @click="clear" color="error" tile>Clear</v-btn> -->
                        </form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
        email: { required, email },
        password: {
            required
        }
    },

    data: () => ({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        show1: false,
        loading: null
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Email tidak valid')
        !this.$v.email.required && errors.push('Email tidak boleh kosong')
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
                nama: this.name,
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('setUserLogin', obj)
            this.$router.push('/')
        }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.password = ''
        this.repeatPassword = ''
      },
    },
  }
</script>