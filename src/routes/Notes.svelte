<script>
	import NoteCardImage from './../components/NoteCardImage.svelte';
	import NoteCard from './../components/NoteCard.svelte';
	import { notes } from '../shared/store.js';
</script>

<h1>Your notes</h1>

<section>
	{#each $notes as note}
		{#if note.type === 'text'}
			<NoteCard {note} />
		{:else if note.type === 'image'}
			<NoteCardImage {note} />
		{:else}
			<h1>This note seems to be invalid?</h1>
		{/if}
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
