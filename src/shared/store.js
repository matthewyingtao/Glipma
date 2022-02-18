import { writable } from 'svelte/store';
import { getStoredPosts, saveState } from './storage';

export const notes = writable([]);

getStoredPosts().then((res) => {
	notes.set(res);
});

notes.subscribe((val) => {
	if (val.length !== 0) {
		saveState(JSON.stringify(val));
	}
});
