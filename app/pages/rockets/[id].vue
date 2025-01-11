<template>
    <v-container>
        <h1>Rocket Details</h1>
        <!-- Loading and error states -->
        <div v-if="loading">Loading rocket details...</div>
        <div v-if="error">Error loading rocket details: {{ error.message }}</div>
        <!-- Display rocket details -->
        <div v-else-if="rocket">
            <RocketCard :rocket="rocket" @backClicked="goBack" />
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAsyncQuery, gql } from '#imports'
import { computed } from 'vue'
import RocketCard from '~/components/RocketCard.vue'

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