<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 md6 pa-2>
                 <v-card flat outlined tile>
                    <v-card-title primary-title>
                        Spesifikasi Produk
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        
                        <form @submit="addProduct()">
                            <v-text-field
                              class="mx-4"
                              v-model="nama_produk"
                              :error-messages="namaProdukErrors"
                              label="Nama Produk"
                              required
                              @input="$v.nama_produk.$touch()"
                              @blur="$v.nama_produk.$touch()"
                              @keydown.enter="addProduct()"
                            ></v-text-field>
                            <v-textarea
                                class="mx-4"
                                clearable
                                counter="100"
                                auto-grow
                                rows="1"
                                row-height="15"
                                clear-icon="mdi-close"
                                label="Deskripsi Produk"
                                value=""
                                v-model="detail"
                            ></v-textarea>

                            <v-text-field
                              class="mx-4"
                              label="Harga Produk"
                              type="number"
                              step="1000"
                            ></v-text-field>

                            <v-autocomplete
                                v-model="selectLocation"
                                :items="listLokasi"
                                :search-input.sync="searchLocation"
                                class="mx-4"
                                label="Pilih Tempat COD"
                            ></v-autocomplete>
                            <v-autocomplete
                                v-model="selectCategory"
                                :items="listKategori"
                                :search-input.sync="searchCategory"
                                class="mx-4"
                                label="Pilih Kategori"
                            ></v-autocomplete>

                            <v-divider></v-divider><br>

                            <v-file-input
                                v-model="files"
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                                color="deep-purple accent-4"
                                counter
                                label="File input"
                                multiple 
                                placeholder="Select your files"
                                prepend-icon="mdi-paperclip"
                                outlined
                                :show-size="1000"
                            >
                                <template v-slot:selection="{ index, text }">
                                <v-chip
                                    v-if="index < 2"
                                    color="deep-purple accent-4"
                                    dark
                                    label
                                    small
                                >
                                    {{ text }}
                                </v-chip>

                                <span
                                    v-else-if="index === 2"
                                    class="overline grey--text text--darken-3 mx-2"
                                >
                                    +{{ files.length - 2 }} File(s)
                                </span>
                                </template>
                            </v-file-input>
                            

                            <v-btn class="mx-2" color="success" @click="addProduct()" tile>Publish Barang</v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 pa-2>
                <v-card>
                    <v-card-title primary-title>
                        Produk Preview
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <productPreview :data="produkPreview" :files="imageUrl"/>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import productPreview from '@/components/productPreview'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
    async asyncData({$axios, isDev, route, store, env, params, query, req, res, redirect, error}) {
        if (store.getters.userLogin != null && store.getters.token != null) {
            const states = await $axios.$get('api/products/list')
            return {listLokasi: states.lokasi, listKategori: states.kategori}
        }else {
            redirect('/login')
        }
    },
  head: {
    title: 'Tambah Barang'
  },
  mixins: [validationMixin],
  validations: {
      nama_produk: { required },
      detail: { required },
      harga: { required },
      jumlah_stok: { required },
      kondisi: { required },
      kategori: { required },
    //   gambar: { required },
      lokasi: { required },
      selectCategory: { required },
      selectLocation: { required }
  },
  data: () => ({
      files: [],
      imageName: '',
		imageUrl: '',
		imageFile: '',
      nama_produk: '',
      detail: '',
      harga: null,
      jumlah_stok: 1,
      kondisi: null,
      kategori: null,
      gambar: null,
      lokasi: '',
      itemsLocation: [],
      itemsCategory: [],
      searchLocation: null,
      searchCategory: null,
      selectLocation: null,
      selectCategory: null,
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
    produkPreview() {
        let data = {
            nama_produk: this.nama_produk,
            gambar: this.gambar,
            rating: 0,
            lokasi: this.selectLocation,
            kategori: this.selectCategory,
            detail: this.detail   
        }
        return data
    }
  },
  methods: {
		onFilePicked (e) {
			const files = this.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
      queryLokasi (v) {
        // Simulated ajax query
        this.itemsLocation = this.listLokasi.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
      },
      queryKategori (v) {
        // Simulated ajax query
        this.itemsCategory = this.listKategori.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
      },
    async addProduct () {
        let imageName = this.files[0].name
        if(imageName.lastIndexOf('.') <= 0) {
            return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(this.files[0])
        await fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = this.files[0] // this is an image file that can be sent to server...
        })
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error){
        
      }else {
      }
    }
  },
  components: {
        productPreview
    }
}
</script>