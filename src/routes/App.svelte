<script>
	import { readText } from '@tauri-apps/api/clipboard';
	import { notes } from '../shared/store.js';

	let clipboardText;

	let pressedKeys = [];

	const handleKeydown = (e) => {
		// only add new keys
		if (pressedKeys.includes(e.key)) {
			return;
		}

		pressedKeys = [...pressedKeys, e.key];

		if (pressedKeys.includes('Control') && pressedKeys.includes('v')) {
			readText().then((text) => {
				clipboardText = text;
			});
		}
	};

	// remove keys when they're released
	const handleKeyup = (e) => {
		pressedKeys = pressedKeys.filter((key) => key !== e.key);
	};

	const addToNotes = (val) => {
		if (!val) {
			return;
		}

		$notes = [...$notes, val];
	};
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<p>You are pressing: {pressedKeys.join(', ')}</p>

<textarea bind:value={clipboardText} />

<button on:click={() => addToNotes(clipboardText)}>add note</button>

<h1>Your notes</h1>

{#each $notes as note}
	<pre>{note}</pre>
{/each}
