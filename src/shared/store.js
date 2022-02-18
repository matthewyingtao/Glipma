import { writable } from 'svelte/store';
import { getStoredPosts, saveState } from './storage';

export const notes = writable([]);

notes.subscribe((val) => {
	console.log(val);
	saveState(JSON.stringify(val));
});

const storedPosts = getStoredPosts().then((res) => {
	console.log(res);
	notes.set(res);
});
