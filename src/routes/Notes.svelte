<script>
	import { notes } from '../shared/store.js';
</script>

<h1>Your notes</h1>

{#each $notes as note}
	<pre>{note}</pre>
{/each}
