<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 md6 v-if="profil != null">
                <v-card
                    class="mx-auto"
                    tile
                >
                    <v-img
                    height="100%"
                    src="https://i.ytimg.com/vi/xwNInJssbPU/maxresdefault.jpg"
                    >
                    <v-row
                        align="end"
                        class="fill-height"
                    >
                        <v-col class="py-0">
                        <v-list-item
                            color="rgba(0, 0, 0, .4)"
                            dark
                        >
                            <v-list-item-content>
                            <v-list-item-title class="title">{{profil.email}}</v-list-item-title>
                            <v-list-item-subtitle>Mahasiswa</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        </v-col>
                    </v-row>
                    </v-img>
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
export default {
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        const userLogin = store.getters.userLogin
        if (userLogin != null && userLogin.level == 'pelapak') {
            return {profil: userLogin}
        }else {
            return {profil: null}
        }
    },
}
</script>