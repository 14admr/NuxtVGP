<template>
    <v-container>
        <h1>Rocket Details</h1>
        <!-- Loading and error states -->
        <div v-if="loading">Loading rocket details...</div>
        <div v-if="error">Error loading rocket details: {{ error.message }}</div>
        <!-- Display rocket details -->
        <div v-else-if="rocket">
            <v-card>
                <v-card-title>{{ rocket.name }}</v-card-title>
                <v-card-text>
                    <p><strong>Description:</strong> {{ rocket.description }}</p>
                    <p><strong>First Flight:</strong> {{ new Date(rocket.first_flight).toLocaleDateString() }}</p>
                    <p><strong>Height:</strong> {{ rocket.height.feet }} ft ({{ rocket.height.meters }} m)</p>
                    <p><strong>Diameter:</strong> {{ rocket.diameter.feet }} ft ({{ rocket.diameter.meters }} m)</p>
                    <p><strong>Mass:</strong> {{ rocket.mass.kg }} kg</p>
                    <p><strong>Number of Stages:</strong> {{ rocket.stages }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="goBack" color="primary" class="mt-4">Back</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAsyncQuery, gql } from '#imports'
import { computed } from 'vue'

type Rocket = {
    name: string
    description: string
    first_flight: string
    height: {
        meters: number
        feet: number
    }
    diameter: {
        meters: number
        feet: number
    }
    mass: {
        kg: number
    }
    stages: number
}

// GraphQL query to fetch rocket details by ID
const GET_ROCKET_DETAILS = gql`
    query GetRocketDetails($id: ID!) {
        rocket(id: $id) {
            name
            description
            first_flight
            height {
                meters
                feet
            }
            diameter {
                meters
                feet
            }
            mass {
                kg
            }
            stages
        }
    }
`

// Get the dynamic route ID
const route = useRoute()
const router = useRouter()
const rocketId = route.params.id

// Execute the query using Nuxt's Apollo utilities
const { data: result, pending: loading, error } = await useAsyncQuery<{ rocket: Rocket }>(GET_ROCKET_DETAILS, {
    id: rocketId
})

// Extract rocket data
const rocket = computed(() => result.value?.rocket)

// Function to navigate back to the launches page
const goBack = () => {
    router.push('/launches')
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>