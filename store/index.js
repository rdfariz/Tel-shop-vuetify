export const state = () => ({
   snack: {
      active: false,
      type: null,
      message: null
   },
   userLogin: null,
   loading: null,
   itemsLink: {
      default: [
         {icon: 'mdi-apps',title: 'Beranda',to: '/'}
      ],
      lapak: [
         {icon: 'mdi-apps',title: 'Beranda',to: '/'},
         {icon: 'mdi-store',title: 'Lapak Saya',to: '/lapak'},
         {icon: 'mdi-settings',title: 'Pengaturan',to: '/settings'},
         {icon: 'mdi-logout',title: 'Logout',to: '/logout'},
      ],
      user: [
         {icon: 'mdi-apps',title: 'Beranda',to: '/'},
         {icon: 'mdi-account',title: 'Profil',to: '/profil'},
         {icon: 'mdi-settings',title: 'Pengaturan',to: '/settings'},
         {icon: 'mdi-logout',title: 'Logout',to: '/logout'},
      ],
   },
   dummy: [
      {id: 'barang_1', title: 'Nasi rebus', tag: ['makanan'], description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis tempore facere facilis, suscipit quas, earum repellat aliquid voluptatum placeat magnam reiciendis perspiciatis amet.", rating: 4.5, media: 'https://cdn-brilio-net.akamaized.net/news/2019/11/12/173878/1125844-nasi-goreng-hongkong.jpg', cod: 'FIT'},
      {id: 'barang_2', title: 'Es teh panas', tag: ['minuman'], description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis tempore facere facilis, suscipit quas, earum repellat aliquid voluptatum placeat magnam reiciendis perspiciatis amet.", rating: 3.5, media: 'https://inilahinfo.com/wp-content/uploads/2019/04/Mana-Yang-Lebih-Sehat-Teh-Panas-Atau-Es-Teh-Yang-Dingin.jpg', cod: 'FEB'},
      {id: 'barang_3', title: 'Mouse asli', tag: ['binatang'], description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis tempore facere facilis, suscipit quas, earum repellat aliquid voluptatum placeat magnam reiciendis perspiciatis amet.", rating: 3.5, media: 'https://awsimages.detik.net.id/community/media/visual/2018/12/21/172b5b63-a43f-4ced-852e-e89e7301b13c_43.jpeg?w=700&q=90', cod: 'WDP'}
   ]
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
   async nuxtServerInit({dispatch, commit}, {req}) {
      console.log('---')
   },
   setLoading({commit, state}, newState) {
      // Managing global Loading
      if (state.loading == true) {
         setTimeout(() => {
            commit('setLoading', newState)
         }, 700);
      }else {
         commit('setLoading', newState)
      }
   },
   setUserLogin({ commit }, newState) {
      // Parsing data to state userLogin
      commit('setUserLogin', newState)
   },
   tryLogout({dispatch}) {
      dispatch('setLoading', true)
      dispatch('setUserLogin', null)
      dispatch('setLoading', false)
   },
   async tryLogin({dispatch, commit, state}, req) {
      dispatch('setLoading', true)
      await this.$axios.post('api/authentication/login', req)
      .then((result) => {
         const res = result.data
         if (res.success && res.data) {
            // Parsing data to mutations userLogin
            dispatch('setUserLogin', res.data)
            this.$router.push('/')
         }else {
            // state if not success
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
   async tryRegister({dispatch, commit, state}, req) {
      dispatch('setLoading', true)
      await this.$axios.post('api/authentication/register', req)
      .then((result) => {
         const res = result.data
         if (res.success && res.data) {
            // Parsing data to mutations userLogin
            dispatch('setUserLogin', res.data)
            commit('setSnack', {active: true, message: "Berhasil membuat akun", type: 'success'})
            this.$router.push('/')
         }else {
            // state if not success
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
