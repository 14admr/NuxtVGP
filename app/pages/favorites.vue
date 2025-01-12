<template>
    <v-container>
        <h1>Favorite Rockets</h1>
        <div v-if="favorites.length === 0">No favorites yet.</div>
        <v-row v-else>
            <v-col v-for="(rocket, index) in favorites" :key="index" cols="12" md="6" lg="4">
                <RocketCard :rocket="rocket" />
            </v-col>
        </v-row>
        <v-btn v-if="favorites.length" @click="clearAllFavorites" color="red" class="mt-4">
            Clear Favorites
        </v-btn>
    </v-container>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/useFavorites'
import RocketCard from '~/components/RocketCard.vue'

const favoritesStore = useFavoritesStore()
const favorites = computed(() => favoritesStore.favoriteRockets)

const clearAllFavorites = () => {
    favoritesStore.clearFavorites()
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>