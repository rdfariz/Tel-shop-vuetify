<template>
<v-container grid-list-xs>
  <v-layout row wrap >
    <v-flex xs12 lg4 pa-1 pa-lg-2>
      <div  style="position: sticky !important; top: 80px !important;">
        <v-card flat outlined tile>
          <v-card-title primary-title>
            Cari sesuai tempat
          </v-card-title>
          <v-autocomplete
            v-model="selectLocation"
            :loading="loading"
            :items="states"
            :search-input.sync="search"
            class="mx-4"
            label="Pilih Tempat COD"
          ></v-autocomplete>
          <v-card-actions class="mx-2 mb-2">
            <v-btn @click="findProduct()" color="red" class="white--text" tile>Cari Produk</v-btn>
            <v-btn @click="showAllProduct()" v-if="message.text != null" color="primary" class="white--text" tile>Tampilkan semua</v-btn>
          </v-card-actions>
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
import productCard from '@/components/productCard'
export default {
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
      store.dispatch('setLoading', true)
      let data = store.state.dummy
      let cod = ['FIT','FEB','WDP']
      store.dispatch('setLoading', false)
      return {product: data, productFilter: data, states: cod}
    },
    head: {
      title: 'Beranda'
    },
    data: () => ({
      loading: false,
      items: [],
      search: null,
      selectLocation: null,
      message: {
        type: null,
        text: null
      }
    }),
    watch: {
      search (val) {
        val && val !== this.selectLocation && this.querySelections(val)
      },
    },
    computed: {
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      },
      findProduct() {
        if (this.selectLocation != null) {
          this.$store.dispatch('setLoading', true)
          this.message.type = "info"
          this.message.text = "Berikut produk yang tersedia untuk cod wilayah " + this.selectLocation
          this.productFilter = this.product.filter(e=>e.cod == this.selectLocation)
          this.$store.dispatch('setLoading', false)
        }
        // this.product = []
        // this.product.push({id: 'barang_1', title: 'Title Product', subtitle: 'Subtitle Product', description: 'Desc Product', rating: 3.5, cod: 'WDP'})
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