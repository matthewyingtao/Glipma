import { readDir, BaseDirectory, createDir, writeFile, readTextFile } from '@tauri-apps/api/fs';

const dataFileName = 'data.json';
const dir = BaseDirectory.Desktop;

const checkDataFolder = async () => {
	try {
		const files = await readDir('data', {
			dir: dir
		});

		const fileNames = files.map(({ name }) => name);

		return fileNames.includes(dataFileName);
	} catch (e) {
		return false;
	}
};

const createDatabase = async () => {
	try {
		await createDir('data', {
			dir: dir,
			recursive: true
		});

		await writeFile(
			{
				contents: '[]',
				path: `./data/${dataFileName}`
			},
			{
				dir: dir
			}
		);
	} catch (e) {
		console.log(e);
	}
};

export const initStorage = async () => {
	const hasDataFolder = await checkDataFolder();

	if (!hasDataFolder) {
		await createDatabase();
	}
};

export const getStoredPosts = async () => {
	try {
		const res = await readTextFile(`data/${dataFileName}`, {
			dir: dir
		});
		return JSON.parse(res);
	} catch (e) {
		return [];
	}
};

export const saveState = async (data) => {
	await writeFile(
		{
			contents: data,
			path: `./data/${dataFileName}`
		},
		{
			dir: dir
		}
	);
};
