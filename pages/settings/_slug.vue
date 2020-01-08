<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 lg8 v-if="profil != null">
                <v-card flat outlined class="mx-auto">

                    <v-toolbar flat>
                        <v-btn icon @click="back()">
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <v-toolbar-title>Akun</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-list two-line subheader>
                    <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        @click="action(item.action)"
                    >
                        <v-list-item-avatar>
                        <v-icon
                            :class="[item.iconClass]"
                            v-text="item.icon"
                        ></v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                        <v-switch
                            v-model="$vuetify.theme.dark"
                            color="primary"
                            v-if="item.title == 'Dark Mode'"
                        ></v-switch>
                        <v-btn v-else icon>
                            <v-icon color="grey lighten-1">mdi-information</v-icon>
                        </v-btn>
                        </v-list-item-action>
                    </v-list-item>

                    </v-list>
                </v-card>
            </v-flex>
            <v-flex xs12 v-else>
                <v-alert type="info" outlined>
                    Anda belum login, silahkan login <nuxt-link to="/login">disini</nuxt-link>
                </v-alert>
            </v-flex>
        </v-layout>    
    </v-container>
</template>
<script>
import userProfil from '@/components/userProfil'
export default {
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        const userLogin = store.getters.userLogin
        if (userLogin != null) {
            return {profil: userLogin}
        }else {
            return {profil: null}
        }
    },
    data: () => ({
      items: [
        { action: 'setName', icon: 'mdi-account', iconClass: 'grey white--text', title: 'Ubah Nama', subtitle: 'Ubah nama akun anda', to: '' },
        { action: 'removeAccount', icon: 'mdi-delete-alert', iconClass: 'red white--text', title: 'Hapus akun', subtitle: 'Menghapus data akun anda', to: '' },
      ]
    }),
    components: {
        userProfil
    },
    methods: {
        action(tag) {
            if (tag == 'setName') {

            }else if (tag == 'removeAccount'){

            }
        },
        back() {
            this.$router.push('/settings')
        }
    }
}
</script>