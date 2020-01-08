<template>
    <v-card
        class="mx-auto"
        tile
    >
        <v-img
        height="100%"
        src="https://i.ytimg.com/vi/xwNInJssbPU/maxresdefault.jpg"
        >
        <v-row
            align="end"
            class="fill-height"
        >
            <v-col class="py-0">
            <v-list-item
                color="rgba(0, 0, 0, .4)"
                dark
            >
                <v-list-item-content>
                <v-list-item-title class="title">{{user.email}}</v-list-item-title>
                <v-list-item-subtitle>Mahasiswa</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            </v-col>
        </v-row>
        </v-img>
    </v-card>
</template>
<script>
export default {
    props: {
        user: Object
    }
}
</script>