export const blobToBinary = async (blob) => {
	const buffer = await blob.arrayBuffer();

	const view = new Uint8Array(buffer);

	return view;
};
