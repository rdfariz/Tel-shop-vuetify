<template>
<v-container grid-list-xs>
  <v-layout row wrap >
    <v-flex xs12 lg4 pa-1 pa-lg-2>
      <div  style="position: sticky !important; top: 80px !important;">
        <v-card flat outlined tile>
          <v-card-title primary-title>
            Cari sesuai tempat
          </v-card-title>
          <v-divider></v-divider>
          <v-autocomplete
            v-model="selectLocation"
            :loading="loading"
            :items="lokasi"
            :search-input.sync="searchLocation"
            class="mx-4"
            label="Pilih Tempat COD"
          ></v-autocomplete>
          <v-autocomplete
            v-model="selectCategory"
            :loading="loading"
            :items="kategori"
            :search-input.sync="searchCategory"
            class="mx-4"
            label="Pilih Kategori"
          ></v-autocomplete>
          <v-card-actions class="mx-2 mb-2">
            <v-btn @click="findProduct()" color="red" class="white--text" tile>Cari Produk</v-btn>
            <v-btn @click="showAllProduct()" v-if="message.text != null" color="primary" class="white--text" tile>Tampilkan semua</v-btn>
          </v-card-actions>
        </v-card>

        <v-card flat outlined tile class="mt-3 mb-3">
          <v-card-title primary-title>
            Upload Produk
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>Upload barangmu supaya ada yang beli</p>
            <v-btn to="/product/add" color="primary" class="white--text" tile>Upload</v-btn>
          </v-card-text>
        </v-card>
      </div>
      
    </v-flex>
    <v-flex xs12 lg8 pa-1 pa-lg-2>
      <v-alert :type="message.type" v-if="message.text != null">
        {{message.text}}
      </v-alert>

      <productCard :data="p" v-for="(p, index) in productFilter" :key="p.id"/>

    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import slugify from 'slugify'
import productCard from '@/components/productCard'
export default {
    async asyncData({$axios, isDev, route, store, env, params, query, req, res, redirect, error}) {
      // store.dispatch('setLoading', true)
      const products = await $axios.$get('api/products')
      const states = await $axios.$get('api/products/list')
      console.log(states)
      return {product: products.data, productFilter: products.data, lokasi: states.lokasi, kategori: states.kategori}
      // store.dispatch('setLoading', false)
    },
    head: {
      title: 'Beranda'
    },
    data: () => ({
      loading: false,
      itemsLocation: [],
      itemsCategory: [],
      searchLocation: null,
      searchCategory: null,
      selectLocation: null,
      selectCategory: null,
      message: {
        type: null,
        text: null
      }
    }),
    watch: {
      searchLocation (val) {
        val && val !== this.selectLocation && this.queryLokasi(val)
      },
      searchCategory (val) {
        val && val !== this.selectCategory && this.queryKategori(val)
      },
    },
    computed: {
    },
    methods: {
      queryLokasi (v) {
        this.loading = true
        // Simulated ajax query
        this.itemsLocation = this.lokasi.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      },
      queryKategori (v) {
        this.loading = true
        // Simulated ajax query
        this.itemsCategory = this.kategori.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      },
      findProduct() {
        if (this.selectLocation != null || this.selectCategory != null) {
          let query = '/product/filter?'
          if (this.selectLocation != null && this.selectCategory == null) {
            query += 'lokasi='+slugify(this.selectLocation, {lower: true})
          }else if (this.selectCategory != null && this.selectLocation == null) {
            query += 'kategori='+slugify(this.selectCategory, {lower: true})
          }else {
            query += 'lokasi='+slugify(this.selectLocation, {lower: true})+'&kategori='+slugify(this.selectCategory, {lower: true})
          }
          this.$router.push(query)
        }
      },
      showAllProduct() {
        this.selectLocation = null
        this.productFilter = this.$store.state.dummy
        this.message = {type: null,text: null}
      }
    },
    components: {
      productCard
    }
}
</script>
<style lang="scss">
.v-banner--single-line .v-banner__text {
  width: 100% !important;
}
</style>