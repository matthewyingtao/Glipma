<script>
	export let note;

	const { data, notes } = note;
</script>

<div class="card">
	<img src={data} alt="" />
	<h2>{notes}</h2>
</div>

<style>
	.card {
		width: 100%;
		background: var(--surface);
		padding: 1rem;
	}

	img {
		width: 100%;
	}
</style>
