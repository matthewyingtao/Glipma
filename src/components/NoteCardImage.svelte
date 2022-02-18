<script>
	export let note;

	const { data, notes } = note;
</script>

<div>
	<img src={data} alt="" />
	<h2>{notes}</h2>
</div>
