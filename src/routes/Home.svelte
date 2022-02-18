<script>
	import { onMount } from 'svelte';
	import { notes } from '../shared/store.js';
	import { intersection } from 'lodash';

	let pastedData = {
		type: 'text',
		data: ''
	};

	let error = '';

	const imageTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

	const addToNotes = (val) => {
		if (!val) {
			return;
		}

		pastedData = {
			type: 'text',
			data: ''
		};

		$notes = [...$notes, val];
	};

	onMount(() => {
		document.onpaste = async function () {
			let res;

			try {
				res = await navigator.clipboard.read();
			} catch (e) {
				error = "You don't have any data in clipboard.";
				return;
			}

			const pasted = res[0];

			console.log(pasted);

			const hasImage = intersection(pasted.types, imageTypes).length > 0;

			if (hasImage) {
				const imageType = pasted.types.find((type) => imageTypes.includes(type));

				const blob = await pasted.getType(imageType);

				const extension = imageType.split('/')[1];

				// first display the blob
				pastedData = {
					type: 'image',
					data: URL.createObjectURL(blob)
				};

				// // then save to file system
				// saveImage(blob, extension);
			} else {
				pastedData = {
					type: 'text',
					data: pasted.getData('text/plain')
				};
			}
		};
	});
</script>

{#if pastedData.type === 'text'}
	<textarea placeholder="Ctrl + V anywhere to paste" bind:value={pastedData.data} />
{:else if pastedData.type === 'image'}
	<img id="container" alt="pasted" src={pastedData.data} />
{:else}
	<h1>placeholder="Ctrl + V anywhere to paste</h1>
{/if}

<span>{error}</span>

<button
	title={pastedData.data === '' ? 'Input something first!' : 'Add to notes'}
	disabled={pastedData.data === ''}
	on:click={() => addToNotes(pastedData)}>Add to notes</button
>

<style>
	textarea {
		width: 100%;
		aspect-ratio: 5 / 2;
		resize: none;
	}

	button {
		display: block;
		margin-left: auto;
		margin-top: 1rem;
	}
</style>
