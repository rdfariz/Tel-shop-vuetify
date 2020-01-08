<template>
    <v-card class="mb-5" flat outlined tile>
        <v-layout row wrap>
        <v-flex xs12 md4 flex-wrap align-self-center>
        
            <v-img
                class="grey lighten-2"
                aspect-ratio="1"
                max-height="400"
                :src="data.media"
                :lazy-src="data.media"
            >
            </v-img>
        
        </v-flex>
        <v-flex xs12 md8 flex-wrap>
            <v-card-title>{{data.title}}</v-card-title>

            <v-card-text>
                <v-row
                align="center"
                class="ma-0"
                >
                <v-rating
                    :value="data.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="20"
                ></v-rating>

                <div class="grey--text ml-4">{{data.rating}}</div>
                </v-row>
                
                <div class="my-4 subtitle-1 black--text">
                    <v-chip small class="mr-2" v-for="(tag, i) in data.tag" :key="i">
                    <v-icon small left>mdi-tag</v-icon>
                    {{tag}}
                    </v-chip>
                </div>

                <div>{{data.description}}</div>
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
</template>
<script>
export default {
    props: {
        data: Object
    }
}
</script>