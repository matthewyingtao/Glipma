import {
	readDir,
	BaseDirectory,
	createDir,
	writeFile,
	readTextFile,
	writeBinaryFile
} from '@tauri-apps/api/fs';
import { nanoid } from 'nanoid';

const dataFileName = 'data.json';
const dir = BaseDirectory.Desktop;

const _checkDataFolder = async () => {
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

const _createDatabase = async () => {
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
	const hasDataFolder = await _checkDataFolder();

	if (!hasDataFolder) {
		await _createDatabase();
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

// export const saveImage = async (blob, extension) => {
// 	const fileType = blob.type;

// 	const bin = await blobToBinary(blob);

// 	await writeBinaryFile(
// 		{
// 			contents: bin,
// 			path: `./data/${nanoid()}.${extension}`
// 		},
// 		{
// 			dir: dir
// 		}
// 	);
// };

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
