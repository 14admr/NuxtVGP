<template>
    <v-container>
        <h1>SpaceX Launches</h1>
        <!-- Dropdown for filtering by year -->
        <v-select v-model="selectedYear" :items="years" label="Filter by Year" dense clearable class="mb-4"></v-select>
        <!-- Toggle for sorting by date -->
         <v-btn @click="toggleSortOrder" class="mb-4">
            Sort by Date: {{ sortOrder }}
         </v-btn>
        <!-- Loading and error states -->
        <div v-if="loading">Loading launches...</div>
        <div v-if="error">Error loading launches: {{ error.message }}</div>
        <!-- Display filtered and/or sorted launches -->
        <v-row v-if="displayedLaunches && displayedLaunches.length">
            <v-col v-for="(launch, index) in displayedLaunches" :key="index" cols="12" md="6" lg="4">
                <LaunchCard :launch="launch" />
            </v-col>
        </v-row>
        <!-- No launches found message -->
        <div v-else>No launches found for the selected year.</div>
    </v-container>
</template>

<script setup lang="ts">
import LaunchCard from '~/components/LaunchCard.vue'
import { computed } from 'vue'
import { useAsyncQuery, gql } from '#imports'
import { useLaunchFilter } from '~/composables/useLaunchFilter'
import useLaunchSort from '~/composables/useLaunchSort'

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
                rocket{
                    id
                }
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

// Use the sort composable
const { sortOrder, sortedLaunches } = useLaunchSort(launches.value)

// Combine filter and sort logic for final display
const displayedLaunches = computed(() => {
    // No filter and no sort
    if (!selectedYear.value && sortOrder.value === 'Ascending') {
        return launches.value
    }
    // Filter only
    if (selectedYear.value && sortOrder.value === 'Ascending') {
        return filteredLaunches.value
    }
    // Sort only
    if (!selectedYear.value) {
        return sortedLaunches.value
    }
    // Filter and sort
    return [...filteredLaunches.value].sort((a, b) => {
        const dateA = new Date(a.launch_date_utc).getTime()
        const dateB = new Date(b.launch_date_utc).getTime()
        return sortOrder.value === 'Ascending' ? dateA - dateB : dateB - dateA
    })
})

// Get unique launch years
const years = computed(() =>
    Array.from(
        new Set(launches.value.map((launch) => new Date(launch.launch_date_utc).getFullYear().toString()))
    )
)

// Toggle the sorting ordr
const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'Ascending' ? 'Descending' : 'Ascending'
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>