<template>
    <v-container>
        <h1>SpaceX Launches</h1>
        <!-- Dropdown for filtering by year -->
        <v-select v-model="selectedYear" :items="years" label="Filter by Year" dense class="mb-4"></v-select>
        <!-- Loading and error states -->
        <div v-if="loading">Loading launches...</div>
        <div v-if="error">Error loading launches: {{ error.message }}</div>
        <!-- Display filtered launches -->
        <v-row v-if="filteredLaunches && filteredLaunches.length">
            <v-col v-for="(launch, index) in filteredLaunches" :key="index" cols="12" md="6" lg="4">
                <v-card>
                    <v-card-title>{{ launch.mission_name }}</v-card-title>
                    <v-card-text>
                        <p><strong>Launch Date:</strong> {{ new Date(launch.launch_date_utc).toLocaleDateString() }}</p>
                        <p v-if="launch.launch_site"><strong>Launch Site:</strong> {{ launch.launch_site.site_name_long }}</p>
                        <p><strong>Rocket Name:</strong> {{ launch.rocket.rocket_name }}</p>
                        <p v-if="launch.details"><strong>Details:</strong> {{ launch.details }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- No launches found message -->
        <div v-else>No launches found for the selected year.</div>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAsyncQuery, gql } from '#imports'
import { useLaunchFilter } from '~/composables/useLaunchFilter'

type Launch = {
    mission_name: string
    launch_date_utc: string
    launch_site?: {
        site_name_long: string
    }
    rocket: {
        rocket_name: string
    }
    details?: string
}

type LaunchesQueryResult = {
    launches: Launch[]
}

// GraphQL query to fetch SpaceX launches
const GET_LAUNCHES = gql`
    query GetLaunches {
        launches {
            mission_name
            launch_date_utc
            launch_site {
                site_name_long
            }
            rocket {
                rocket_name
            }
            details
        }
    }
`

// Execute the query using Nuxt's Apollo utilities
const { data: result, pending: loading, error } = await useAsyncQuery<LaunchesQueryResult>(GET_LAUNCHES)

// Extract launches data safely using `computed` and `result.value`
const launches = computed(() => result.value?.launches || [])

// Use the filter composable
const { selectedYear, filteredLaunches } = useLaunchFilter(launches.value)

// Get unique launch years
const years = computed(() =>
    Array.from(
        new Set(launches.value.map((launch) => new Date(launch.launch_date_utc).getFullYear().toString()))
    )
)
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>