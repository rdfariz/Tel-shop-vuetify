<template>
    <div>
        {{params}}
    </div>
</template>
<script>
export default {
    asyncData({$axios, isDev, route, store, env, params, query, req, res, redirect, error}) {
        console.log(query)
        // const products = await $axios.$get('api/products/filter'+params.slug)
    },
}
</script>