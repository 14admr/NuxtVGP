<template>
	<v-app>
		<v-app-bar color="primary" dark>
			<v-toolbar-title>Nuxt SpaceX App</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn to="/" variant="text">Home</v-btn>
			<v-btn to="/launches" variant="text">Launches</v-btn>
			<v-btn to="/favorites" variant="text">Favorites</v-btn>
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
		<v-footer color="primary" dark>
			<v-col class="text-center">
				© {{ new Date().getFullYear() }} Nuxt SpaceX App
			</v-col>
		</v-footer>
	</v-app>
</template>

<script setup lang="ts"></script>

<style scoped>
v-main {
	padding: 16px;
}
</style>