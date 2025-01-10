<template>
    <v-container>
        <h1>SpaceX Launches</h1>
        <div v-if="loading">Loading launches...</div>
        <div v-if="error">Error loading launches: {{ error.message }}</div>
        <v-row v-if="result && result.launches">
            <v-col v-for="(launch, index) in result.launches" :key="index" cols="12" md="6" lg="4">
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
    </v-container>
</template>

<script setup lang="ts">
import { useAsyncQuery, gql } from '#imports'

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
const { data: result, pending: loading, error } = await useAsyncQuery(GET_LAUNCHES)
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>