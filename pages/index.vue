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

      <v-card class="mb-5" flat outlined tile v-for="(p, index) in productFilter" :key="p.id">
        <v-layout row wrap>
        <v-flex xs12 md4 flex-wrap align-self-center>
     
            <v-img
              class="grey lighten-2"
              aspect-ratio="1"
              max-height="400"
              :src="p.media[0]"
              :lazy-src="p.media[0]"
            >
            </v-img>
     
        </v-flex>
        <v-flex xs12 md8 flex-wrap>
            <v-card-title><nuxt-link style="text-decoration: none" :to="`/product/`+p.id">{{p.title}}</nuxt-link></v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="ma-0"
              >
                <v-rating
                  :value="p.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">{{p.rating}}</div>
              </v-row>
              
              <div class="my-4 subtitle-1 black--text">
                 <v-chip small class="mr-2" v-for="(tag, i) in p.tag" :key="i">
                    <v-icon small left>mdi-tag</v-icon>
                    {{tag}}
                  </v-chip>
              </div>

              <div>{{p.description}}</div>
            </v-card-text>
        </v-flex>
        </v-layout>

        <!-- <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            class="white--text"
            tile
            :to="p.id"
          >
            Read More
          </v-btn>
        </v-card-actions> -->
      </v-card>

    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
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
}
</script>
<style lang="scss">
.v-banner--single-line .v-banner__text {
  width: 100% !important;
}
</style>