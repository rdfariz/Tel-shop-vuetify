export const state = () => ({
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
    tryLogin({dispatch}, req) {
        dispatch('setLoading', true)
        return this.$axios({
            method: 'post',
            url: 'http://localhost:3000/api/authentication/register',
            data: req
        }).then((result) => {
            console.log(result);
            const res = result.data
            if (res.succes) {
                const obj = {
                    nama: res.data.name,
                    no_hp: res.data.no_hp,
                    level: res.data.level,
                    email: res.data.email,
                    username: res.data.username
                }
                dispatch('setUserLogin', obj)
                this.$router.push('/')
            }
        }).catch((err) => {
            console.log(err);
        }).finally((end) => {
            dispatch('setLoading', false)
        });
    }
}