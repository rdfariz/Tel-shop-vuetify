<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <productDetail :data="product"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import productDetail from '@/components/productDetail'
export default {
    async asyncData({$axios, isDev, route, store, env, params, query, req, res, redirect, error}) {
        // const product = await $axios.$get('api/product/'+params.slug)
        // return {product: product}
        store.dispatch('setLoading', true)
        const lorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis tempore facere facilis, suscipit quas, earum repellat aliquid voluptatum placeat magnam reiciendis perspiciatis amet."
        store.dispatch('setLoading', false)
        return {product: {id: 'barang_1', title: 'Nasi rebus', tag: ['makanan'], description: lorem, rating: 4.5, media: 'https://cdn-brilio-net.akamaized.net/news/2019/11/12/173878/1125844-nasi-goreng-hongkong.jpg', cod: 'FIT'}}
    },
    components: {
        productDetail
    }
}
</script>