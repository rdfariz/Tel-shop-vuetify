<template>
    
</template>
<script>
export default {
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        store.dispatch('tryLogout')
        redirect('/')
    },
}
</script>