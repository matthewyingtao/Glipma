<script>
	export let note;

	const { data, notes } = note;
</script>

<div class="card">
	<pre>
		{data}
	</pre>
	<h2>{notes}</h2>
</div>

<style>
	.card {
		width: 100%;
		background: var(--surface);
		padding: 1rem;
	}

	pre {
		max-width: 100%;
		overflow: auto;
	}
</style>
