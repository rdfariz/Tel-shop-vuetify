<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 md6 v-if="profil != null">
                <userProfil :user="profil"/>
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
    head: {
        title: 'Profil'
    },
    components: {
        userProfil
    }
}
</script>