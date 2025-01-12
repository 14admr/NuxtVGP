import { defineStore } from 'pinia'

type Rocket = {
    id: string
    name: string
    description: string
    first_flight: string
    height: {
        meters: number;
        feet: number
    }
    diameter: {
        meters: number;
        feet: number
    }
    mass: {
        kg: number
    }
    stages: number
}

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favoriteRockets: [] as Rocket[],
    }),
    actions: {
        addToFavorites(rocket: Rocket) {
            if (!this.favoriteRockets.find((r) => r.id === rocket.id)) {
                this.favoriteRockets.push(rocket)
            }
        },
        removeFromFavorites(rocketId: string) {
        this.favoriteRockets = this.favoriteRockets.filter((rocket) => rocket.id !== rocketId)
        },
        clearFavorites() {
        this.favoriteRockets = []
        },
    },
})