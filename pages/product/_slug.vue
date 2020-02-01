<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <v-alert :type="message.type" v-if="message.text != null">
                    {{message.text}}
                </v-alert>
            </v-flex>
            <template v-if="product.length > 0 && tag == 'filter'">
                <v-flex xs12>
                    <productCard :data="p" v-for="(p, index) in product" :key="p.id"/>
                </v-flex>
            </template>
            <template v-else-if="tag == 'detailProduk'">
                <v-flex xs12>
                    <productCard :data="product"/>
                </v-flex>
            </template>
            <template v-else>
                <v-flex xs12>

                </v-flex>
            </template>
        </v-layout>
    </v-container>
</template>
<script>
import productDetail from '@/components/productDetail'
import productCard from '@/components/productCard'
export default {
    async asyncData({$axios, isDev, route, store, env, params, query, req, res, redirect, error}) {
        store.dispatch('setLoading', true)
        let product = null
        let tag = null
        let message = {text: null, type: null}

        if (params.slug == 'filter') {
            if (query.lokasi == undefined) {
                product = await $axios.$get(`api/products/filter?kategori=${query.kategori}`)
                message.text = `Berikut pencarian produk berdasarkan kategori ${query.kategori}`
            }else if (query.kategori == undefined) {
                product = await $axios.$get(`api/products/filter?lokasi=${query.lokasi}`)
                message.text = `Berikut pencarian produk berdasarkan lokasi ${query.lokasi}`
            }else {
                product = await $axios.$get(`api/products/filter?kategori=${query.kategori}&lokasi=${query.lokasi}`)
                message.text = `Berikut pencarian produk berdasarkan kategori ${query.kategori} dan lokasi ${query.lokasi}`
            }
            tag = 'filter'
            message.type = 'info'
        }else {
            product = await $axios.$get(`api/products/${params.slug}`)
            tag = 'detailProduk'
        }     
        
        if (product.data.length == 0) {
            message.text = 'Maaf, Produk yang anda cari tidak ada'
            message.type = 'error'
        }

        console.log(product)
        return {product: product.data, tag: tag, message: message}
    },
    mounted() {
        this.$store.dispatch('setLoading', false)
    },
    components: {
        productDetail,
        productCard
    }
}
</script>