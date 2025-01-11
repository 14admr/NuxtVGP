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
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
    launch: {
        type: Object,
        required: true
    }
})
</script>