<script lang="ts" setup>
const router = useRouter()

// Automatically redirect to the launches page when the root page is accessed
onMounted(() => {
  router.push('/launches')  // Redirects to /launches page
})
</script>