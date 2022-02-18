import App from './routes/App.svelte';
import { initStorage } from './shared/storage';

initStorage();

const app = new App({
	target: document.body
});

export default app;
