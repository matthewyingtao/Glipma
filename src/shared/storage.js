import {
	readDir,
	BaseDirectory,
	createDir,
	writeFile,
	readTextFile,
	writeBinaryFile
} from '@tauri-apps/api/fs';
import { desktopDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { nanoid } from 'nanoid';
import { blobToBinary } from './utils';

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

export const saveImage = async (blob, extension) => {
	const desktopPath = await desktopDir();
	const bin = await blobToBinary(blob);

	const fileName = `${nanoid()}.${extension}`;

	await writeBinaryFile(
		{
			contents: bin,
			path: `./data/${fileName}`
		},
		{
			dir: dir
		}
	);

	return convertFileSrc(await join(desktopPath, 'data', fileName));
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
