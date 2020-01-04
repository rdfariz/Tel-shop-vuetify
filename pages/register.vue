<template>
    <v-container grid-list-xs>
        <v-layout row wrap justify-center>
            <v-flex xs12 md6>
                <v-card flat outlined tile :loading="loading" :disabled="loading">
                    <v-card-title primary-title>
                        Daftar Akun
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <form>
                            <v-text-field
                            v-model="name"
                            :error-messages="nameErrors"
                            :counter="30"
                            label="Nama Lengkap"
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                            ></v-text-field>

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

                            <v-text-field
                                v-model="repeatPassword"
                                :error-messages="repeatPasswordErrors"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                label="Repeat Password"
                                counter
                                @click:append="show1 = !show1"
                                @input="$v.repeatPassword.$touch()"
                                @blur="$v.repeatPassword.$touch()"
                            ></v-text-field>

                            <!-- <v-checkbox
                            v-model="checkbox"
                            :error-messages="checkboxErrors"
                            label="Do you agree?"
                            required
                            @change="$v.checkbox.$touch()"
                            @blur="$v.checkbox.$touch()"
                            ></v-checkbox> -->
                            <p>Sudah punya akun? Login <nuxt-link to="/login">disini</nuxt-link></p>
                            <v-btn class="mr-2" color="success" @click="regsiter()" tile>Daftar</v-btn>
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
        name: { required, maxLength: maxLength(30) },
        email: { required, email },
        password: {
            required,
            minLength: minLength(8)
        },
        repeatPassword: {
            required,
            minLength: minLength(8),
            sameAsPassword: sameAs('password')
        },
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
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Nama maksimal 30 karakter')
        !this.$v.name.required && errors.push('Nama lengkap tidak boleh kosong')
        return errors
      },
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
        !this.$v.password.minLength && errors.push('Password minimal 8 karakter')
        !this.$v.password.required && errors.push('Password tidak boleh kosong')
        return errors
      },
      repeatPasswordErrors () {
        const errors = []
        if (!this.$v.repeatPassword.$dirty) return errors
        !this.$v.repeatPassword.minLength && errors.push('Password minimal 8 karakter')
        !this.$v.repeatPassword.required && errors.push('Password tidak boleh kosong')
        !this.$v.repeatPassword.sameAsPassword && errors.push('Password harus sama')
        return errors
      }
    },

    methods: {
      regsiter () {
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