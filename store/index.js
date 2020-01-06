export const state = () => ({
   _bash: "http://localhost:3000",
   snack: {
      active: false,
      type: null,
      message: null
   },
   userLogin: null,
   loading: null,
   itemsLink: {
      default: [
         {icon: 'mdi-apps',title: 'Beranda',to: '/'},
      ],
      lapak: [
         {icon: 'mdi-apps',title: 'Beranda',to: '/'},
         {icon: 'mdi-store',title: 'Lapak Saya',to: '/lapak'},
         {icon: 'mdi-logout',title: 'Logout',to: '/logout'},
      ],
      user: [
         {icon: 'mdi-apps',title: 'Beranda',to: '/'},
         {icon: 'mdi-account',title: 'Profil',to: '/profil'},
         {icon: 'mdi-logout',title: 'Logout',to: '/logout'},
      ],
   }
})
export const getters = {
   userLogin: state => {
      if (state.userLogin == null) {
         return null
      }else {
         return state.userLogin
      }
   },
   loading: state => {
      return state.loading
   },
   itemsLink: state => {
      if (state.userLogin != null) {
         if (state.userLogin.level == 'pelapak') {
            return state.itemsLink.lapak
         }else {
            return state.itemsLink.user
         }
      }else {
         return state.itemsLink.default
      }        
   }
}
export const mutations = {
   setSnack (state, payload) {
      if (payload == null) {
         state.snack.message = null
         state.snack.type = null
         state.snack.active = false
      }else {
         state.snack.message = payload.message
         state.snack.type = payload.type
         state.snack.active = payload.active
      }
   },
   setLoading(state, newState) {
      state.loading = newState
   },
   setUserLogin(state, newState) {
      state.userLogin = newState
   }
}
export const actions = {
   setLoading({commit, state}, newState) {
      if (state.loading == true) {
         setTimeout(() => {
            commit('setLoading', newState)  
         }, 700);
      }else {
         commit('setLoading', newState)
      }
   },
   setUserLogin({ commit }, newState) {
      commit('setUserLogin', newState)
   },
   tryLogout({dispatch}) {
      dispatch('setLoading', true)
      dispatch('setUserLogin', null)
      dispatch('setLoading', false)
   },
   tryLogin({dispatch, commit, state}, req) {
      dispatch('setLoading', true)
      return this.$axios({
         method: 'post',
         url: state._bash+'/api/authentication/login',
         data: {
            username: req.username,
            password: req.password
         }
      }).then((result) => {
         const res = result.data
         if (res.success && res.data) {
            const obj = {
               nama: res.data.name,
               no_hp: res.data.no_hp,
               level: res.data.level,
               email: res.data.email,
               username: res.data.username
            }
            dispatch('setUserLogin', obj)
            this.$router.push('/')
         }else {
            return commit('setSnack', {active: true, message: "Ada kesalahan server", type: 'error'})
         }
      }).catch((err) => {
         const res = err.response
         // Error state
         if (!res.success && res) return commit('setSnack', {active: true, message: res.data.error, type: 'error'})
         // Error else state
         return commit('setSnack', {active: true, message: "Ada kesalahan server", type: 'error'})
      }).finally((end) => {
         dispatch('setLoading', false)
      })
   },
   tryRegister({dispatch, commit, state}, req) {
      dispatch('setLoading', true)
      return this.$axios({
         method: 'post',
         url: state._bash+'/api/authentication/register',
         data: req
      }).then((result) => {
         const res = result.data
         if (res.success && res.data) {
            const obj = {
               nama: res.data.name,
               no_hp: res.data.no_hp,
               level: res.data.level,
               email: res.data.email,
               username: res.data.username
            }
            commit('setSnack', {active: true, message: "Berhasil membuat akun", type: 'success'})
            dispatch('setUserLogin', obj)
            this.$router.push('/')
         }else {
            return commit('setSnack', {active: true, message: "Ada kesalahan server", type: 'error'})
         }
      }).catch((err) => {
         const res = err.response
         // Error state
         if (!res.success && res) return commit('setSnack', {active: true, message: res.data.error, type: 'error'})
         // Error else state
         return commit('setSnack', {active: true, message: "Ada kesalahan server", type: 'error'})
      }).finally((end) => {
         dispatch('setLoading', false)
      });
   }
}