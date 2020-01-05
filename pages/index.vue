<template>
<v-container grid-list-xs>
  <v-layout row wrap >
    <v-flex xs12 lg4 pa-1 pa-lg-2>
      <div  style="position: sticky !important; top: 80px !important;">
        <v-card flat outlined tile>
          <v-card-title primary-title>
            Location
          </v-card-title>
          <v-autocomplete
            v-model="selectLocation"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            class="mx-4"
            flat
            label="What state are you from?"
          ></v-autocomplete>
          <v-card-actions>
            <v-btn @click="findProduct()" color="red" class="white--text" tile style="width: 100% !important">Find Product</v-btn>
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
      let data = []
      const lorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis tempore facere facilis, suscipit quas, earum repellat aliquid voluptatum placeat magnam reiciendis perspiciatis amet."
      data.push({id: 'barang_1', title: 'Nasi rebus', tag: ['makanan'], description: lorem, rating: 4.5, media: ['https://cdn-brilio-net.akamaized.net/news/2019/11/12/173878/1125844-nasi-goreng-hongkong.jpg'], cod: 'FIT'})
      data.push({id: 'barang_2', title: 'Es teh panas', tag: ['minuman'], description: lorem, rating: 3.5, media: ['https://inilahinfo.com/wp-content/uploads/2019/04/Mana-Yang-Lebih-Sehat-Teh-Panas-Atau-Es-Teh-Yang-Dingin.jpg'], cod: 'FEB'})
      data.push({id: 'barang_3', title: 'Mouse asli', tag: ['binatang'], description: lorem, rating: 3.5, media: ['https://awsimages.detik.net.id/community/media/visual/2018/12/21/172b5b63-a43f-4ced-852e-e89e7301b13c_43.jpeg?w=700&q=90'], cod: 'WDP'})
      let cod = ['FIT','FEB','WDP']
      store.dispatch('setLoading', false)
      return {product: data, productFilter: data, states: cod}
      
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