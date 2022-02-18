<script>
	import { link } from 'svelte-spa-router';
</script>

<header>
	<h1>Glipma</h1>
	<nav>
		<a href="/" use:link>Add</a>
		<a href="/notes" use:link>View Notes</a>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: var(--primary);
	}
</style>
