<template>
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
    </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
    rocket: {
        type: Object,
        required: true
    }
})
</script>