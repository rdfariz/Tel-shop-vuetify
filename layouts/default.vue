<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
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
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
        class="hidden-sm-and-down" 
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template v-if="userLogin != null">
        <v-btn class="mr-3" tile color="primary">{{userLogin.email}}</v-btn>
      </template>
      <v-btn v-else to="/login" outlined tile>
        Login
      </v-btn>

    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-bottom-navigation
      fixed
      color="deep-purple accent-4"
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

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      activeBtn: 1,
      clipped: true,
      drawer: null,
      fixed: false,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Tel-Shop'
    }
  },
  computed: {
    itemsLink() {
      return this.$store.getters.itemsLink
    },
    isLoading() {
      return this.$store.getters.loading
    },
    userLogin() {
      return this.$store.getters.userLogin
    }
  },
}
</script>
<style lang="scss">
.appBar {
  box-shadow: 0 4px 10px rgba(0,0,0,.1) !important;
  -webkit-box-shadow: 0 4px 10px rgba(0,0,0,.1) !important;
}
</style>