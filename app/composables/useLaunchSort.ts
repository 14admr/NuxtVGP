import { ref, computed } from 'vue'

export default function useLaunchSort(launches: any[]) {
    const sortOrder = ref<'Ascending' | 'Descending'>('Ascending')

    // Computed sorted launches based on the selected sort order
    const sortedLaunches = computed(() => {
        return [...launches].sort((a, b) => {
            const dateA = new Date(a.launch_date_utc).getTime()
            const dateB = new Date(b.launch_date_utc).getTime()
            return sortOrder.value === 'Ascending' ? dateA - dateB : dateB - dateA
        })
    })

    return { sortOrder, sortedLaunches }
}