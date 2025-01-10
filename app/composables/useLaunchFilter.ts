import { ref, computed } from 'vue'

export function useLaunchFilter(launches: any[]) {
    const selectedYear = ref<string | null>(null)

    // Computed filtered launches based on the selected year
    const filteredLaunches = computed(() =>
        selectedYear.value
            ? launches.filter((launch) => {
                const launchYear = new Date(launch.launch_date_utc).getFullYear().toString()
                return launchYear === selectedYear.value
              })
            : launches
    )

    return { selectedYear, filteredLaunches }
}