<template>
    <v-card>
        <v-card-title>{{ launch.mission_name }}</v-card-title>
        <v-card-text>
            <p><strong>Launch Date:</strong> {{ new Date(launch.launch_date_utc).toLocaleDateString() }}</p>
            <p v-if="launch.launch_site"><strong>Launch Site:</strong> {{ launch.launch_site.site_name_long }}</p>
            <p><strong>Rocket Name:</strong> {{ launch.rocket.rocket_name }}</p>
            <p v-if="launch.details"><strong>Details:</strong> {{ launch.details }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn :to="`/rockets/${launch.rocket.rocket.id}`" color="primary">View Rocket Details</v-btn>
            <v-btn :color="isFavorite ? 'red' : 'green'" @click="toggleFavorite" class="ml-2">
                {{  isFavorite ? 'Unfavorite' : 'Favorite' }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useFavoritesStore } from '~/stores/useFavorites'

// Define props
const props = defineProps<{
    launch: {
        mission_name: string
        launch_date_utc: string
        launch_site?: { site_name_long: string }
        details?: string
        rocket: {
            rocket_name: string
            rocket: {
                id: string
                description?: string
                first_flight?: string
                height?: { meters: number; feet: number }
                diameter?: { meters: number; feet: number }
                mass?: { kg: number }
                stages?: number
            }
        }
    }
}>()

// Access the favorites store
const favoritesStore = useFavoritesStore()

// Extract the rocket details
const rocket = computed(() => ({
    id: props.launch.rocket.rocket.id,
    name: props.launch.rocket.rocket_name,
    description: props.launch.rocket.rocket.description || 'No description available.',
    first_flight: props.launch.rocket.rocket.first_flight || 'Unknown',
    height: props.launch.rocket.rocket.height || { meters: 0, feet: 0 },
    diameter: props.launch.rocket.rocket.diameter || { meters: 0, feet: 0 },
    mass: props.launch.rocket.rocket.mass || { kg: 0 },
    stages: props.launch.rocket.rocket.stages || 0,
}))

// Check if the rocket is already a favorite
const isFavorite = computed(() =>
    favoritesStore.favoriteRockets.some((r) => r.id === rocket.value.id)
)

// Add or remove the rocket from favorites
const toggleFavorite = () => {
    const rocketDetails = {
        id: props.launch.rocket.rocket.id,
        name: props.launch.rocket.rocket_name,
        description: props.launch.rocket.rocket.description || 'No description available.',
        first_flight: props.launch.rocket.rocket.first_flight || 'Unknown',
        height: props.launch.rocket.rocket.height || { meters: 0, feet: 0 },
        diameter: props.launch.rocket.rocket.diameter || { meters: 0, feet: 0 },
        mass: props.launch.rocket.rocket.mass || { kg: 0 },
        stages: props.launch.rocket.rocket.stages || 0,
    }

    if (isFavorite.value) {
        favoritesStore.removeFromFavorites(rocketDetails.id)
    } else {
        favoritesStore.addToFavorites(rocketDetails)
    }
}
</script>