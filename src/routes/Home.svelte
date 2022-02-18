<script>
	import { onMount } from 'svelte';
	import { notes } from '../shared/store.js';
	import { intersection } from 'lodash';
	import { saveImage } from '../shared/storage';

	let pastedData = {
		type: 'text',
		data: '',
		notes: ''
	};

	let error = '';

	const addToNotes = (val) => {
		if (!val) {
			return;
		}

		pastedData = {
			type: 'text',
			data: '',
			notes: ''
		};

		$notes = [...$notes, val];
	};

	const getClipboardData = async () => {
		let res;

		try {
			res = await navigator.clipboard.read();
		} catch (e) {
			return;
		}

		return res[0];
	};

	onMount(() => {
		document.onpaste = async function () {
			const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

			const pasted = await getClipboardData();

			if (!pasted) {
				error = "You don't have any data in clipboard.";
				return;
			}

			const isImage = intersection(pasted.types, IMAGE_TYPES).length > 0;

			if (isImage) {
				const imageType = pasted.types.find((type) => IMAGE_TYPES.includes(type));

				const blob = await pasted.getType(imageType);
				// get the image extension
				const fileExtension = imageType.split('/')[1];

				// then save to file system
				const imagePath = await saveImage(blob, fileExtension);

				pastedData = {
					...pastedData,
					type: 'image',
					data: imagePath
				};
			} else {
				const blob = await pasted.getType('text/plain');

				pastedData = {
					...pastedData,
					type: 'text',
					data: await blob.text()
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

<input type="text" bind:value={pastedData.notes} placeholder="Anything you'd like to add?" />

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

	input[type='text'] {
		width: 100%;
		resize: none;
	}
</style>
