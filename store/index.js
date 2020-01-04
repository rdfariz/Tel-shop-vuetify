export const state = () => ({
    userLogin: null,
    loading: null,
    itemsLink: [
        {
            icon: 'mdi-apps',
            title: 'Beranda',
            to: '/'
        },
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
       
        return state.itemsLink
       
    }
}
export const mutations = {
    setItemsLink(state) {
        if (state.userLogin != null) {
            state.itemsLink.push(
                {
                    icon: 'mdi-account',
                    title: 'Profil',
                    to: '/profil'
                },
                {
                    icon: 'mdi-logout',
                    title: 'Logout',
                    to: '/logout'
                },
            )
        }else {
            state.itemsLink = [
                {
                    icon: 'mdi-apps',
                    title: 'Beranda',
                    to: '/'
                }
            ]
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
  setUserLogin({commit, state, dispatch}, newState) {
      dispatch('setLoading', true)
      commit('setUserLogin', newState)
      commit('setItemsLink')
      dispatch('setLoading', false)
  },
}