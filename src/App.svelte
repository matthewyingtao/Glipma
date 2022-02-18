<script>
	import Router from 'svelte-spa-router';
	import Header from './components/Header.svelte';
	// routes
	import Home from './routes/Home.svelte';
	import Notes from './routes/Notes.svelte';

	const routes = {
		'/': Home,
		'/notes': Notes
	};
</script>

<Header />
<main>
	<Router {routes} />
</main>

<style>
	main {
		margin: auto;
		padding: 3rem 1rem;
		max-width: 50rem;
	}
</style>
