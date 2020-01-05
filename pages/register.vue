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
                            maxlength="30"
                            label="Nama Lengkap"
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                            ></v-text-field>

                            <v-text-field
                            v-model="no_hp"
                            :error-messages="noHpErrors"
                            label="No HP"
                            type="number"
                            required
                            maxlength="20"
                            @input="$v.no_hp.$touch()"
                            @blur="$v.no_hp.$touch()"
                            ></v-text-field>

                            <v-text-field
                            v-model="email"
                            :error-messages="emailErrors"
                            label="E-mail"
                            required
                            maxlength="50"
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                            ></v-text-field>

                            <v-text-field
                            v-model="username"
                            :error-messages="usernameErrors"
                            :counter="20"
                            maxlength="20"
                            label="Username"
                            required
                            @input="$v.username.$touch()"
                            @blur="$v.username.$touch()"
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                :error-messages="passwordErrors"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                label="Password"
                                counter
                                required
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
                                required
                                @click:append="show1 = !show1"
                                @input="$v.repeatPassword.$touch()"
                                @blur="$v.repeatPassword.$touch()"
                            ></v-text-field>

                            <p>Daftar sebagai</p>
                            <v-radio-group v-model="level" row required>
                              <v-radio label="User" color="primary" value="user"></v-radio>
                              <v-radio label="Pelapak" color="primary" value="pelapak"></v-radio>
                            </v-radio-group>
                            <v-divider></v-divider><br>
                            <p>Sudah punya akun? Login <nuxt-link to="/login">disini</nuxt-link></p>
                            <v-btn class="mr-2" color="success" @click="regsiter()" tile>Daftar</v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-snackbar
          v-model="snackbar"
          :timeout="2000"
        >
          {{ message }}
          <v-btn
            color="blue"
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, numeric, sameAs, minLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    validations: {
        name: { required, maxLength: maxLength(30) },
        no_hp: { required, numeric, minLength: minLength(7) },
        level: { required },
        email: { required, email },
        username: { required, maxLength: maxLength(20) },
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
        no_hp: '',
        level: 'user',
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
        show1: false,
        loading: null,
        snackbar: false,
        message: ''
    }),
    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Nama maksimal 30 karakter')
        !this.$v.name.required && errors.push('Nama lengkap tidak boleh kosong')
        return errors
      },
      noHpErrors () {
        const errors = []
        if (!this.$v.no_hp.$dirty) return errors
        !this.$v.no_hp.minLength && errors.push('')
        !this.$v.no_hp.numeric && errors.push('No HP tidak valid')
        !this.$v.no_hp.required && errors.push('No HP tidak boleh kosong')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Email tidak valid')
        !this.$v.email.required && errors.push('Email tidak boleh kosong')
        return errors
      },
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.maxLength && errors.push('Username maksimal 20 karakter')
        !this.$v.username.required && errors.push('Username tidak boleh kosong')
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
          // Error State
          this.message = "Ada Kesalahan, Periksa kembali input yang ada"
          this.snackbar = true
        }else {
          // Starting Register State
          const obj = {
            nama: this.name,
            no_hp: this.no_hp,
            level: this.level,
            email: this.email,
            username: this.username,
            password: this.password,
            passwordConfirm: this.repeatPassword
          }
          this.clear()
          this.$store.dispatch('tryLogin', obj)
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