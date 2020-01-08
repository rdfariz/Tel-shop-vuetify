<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>

        <v-list-item
          @click.stop="miniVariant = !miniVariant"
        >
          <v-list-item-action>
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mini Variant</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, i) in itemsLink"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
      class="appBar"
      color="red"
      dark
      height="65"
    >
      <v-app-bar-nav-icon class="hidden-sm-and-down" @click.stop="drawer = !drawer" />

      <v-toolbar-title><nuxt-link to="/" style="text-decoration: none; color: #ffffff">{{title}}</nuxt-link></v-toolbar-title>
      <v-spacer />
      <template v-if="userLogin != null">
        <!-- <v-btn class="mr-3" rounded color="success">{{userLogin.username}}</v-btn> -->
        <v-chip
          class="v-chip--active"
          pill
          to="/profil"
        >
          <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          {{userLogin.username}}
        </v-chip>
        <!-- <v-menu
          v-model="menu"
          bottom
          right
          transition="scale-transition"
          origin="top right"
        >
          <template v-slot:activator="{ on }">
            <v-chip
              pill
              v-on="on"
            >
              <v-avatar left>
                 <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              {{userLogin.username}}
            </v-chip>
          </template>
          <v-card width="300">
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-account-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{userLogin.username}}</v-list-item-title>
                  <v-list-item-subtitle>{{userLogin.email}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu> -->
      </template>
      <v-btn v-else to="/login" outlined tile class="mr-3">
        Login
      </v-btn>

      <!-- <v-menu
        :close-on-content-click="false"
        offset-x
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            fab
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

          <v-list>
            <v-list-item>
              <v-list-item-action>
                 <v-switch
                    v-model="$vuetify.theme.dark"
                    color="primary"
                  ></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable Dark Theme</v-list-item-title>
            </v-list-item>

          </v-list>
      </v-menu> -->

    </v-app-bar>

    <v-content style="margin-bottom: 70px">
      <nuxt />
    </v-content>

    <v-bottom-navigation
      fixed
      class="hidden-md-and-up"
    >
      <v-btn v-for="(item, i) in itemsLink" :key="i" :to="item.to">
        <span>{{item.title}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

     <v-snackbar v-model="snackBar.active" right :color="snackBar.type" :timeout="5000">
       {{snackBar.message}}
      <v-btn text @click="snackBar.active = false">
        Close
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.watch(state => state.snack.active, () => {
      const msg = this.$store.state.snack.message
      if (msg !== null) {
        this.snackBar.type = this.$store.state.snack.type
        this.snackBar.message = this.$store.state.snack.message
        this.snackBar.active = true
        this.$store.commit('setSnack', null)
      }
    })
  },
  data: vm => ({
      snackBar: {
        active: false,
        message: null,
        type: null
      },
      menu: false,
      activeBtn: 1,
      clipped: true,
      drawer: null,
      fixed: false,
      miniVariant: true,
      title: 'Tel-Shop'
  }),
  computed: {
    itemsLink() {
      return this.$store.getters.itemsLink
    },
    isLoading() {
      return this.$store.getters.loading
    },
    userLogin() {
      return this.$store.getters.userLogin
    },
  },
}
</script>
<style lang="scss">
.appBar {
  box-shadow: 0 4px 10px rgba(0,0,0,.1) !important;
  -webkit-box-shadow: 0 4px 10px rgba(0,0,0,.1) !important;
}
</style>