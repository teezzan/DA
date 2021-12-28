/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */

import { bundle } from '@remotion/bundler';
import axios from 'axios';

import {
	getCompositions,
	renderFrames,
	stitchFramesToVideo,
} from '@remotion/renderer';

const Promise = require('bluebird')
const ffprobe = Promise.promisify(require('fluent-ffmpeg').ffprobe)



import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';

const app = express();
const port = process.env.PORT || 8000;
const compositionId = 'HelloWorld';

const cache = new Map<string, string>();


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

const fetchData = async (surah_no?: number, ayah_no?: number) => {
	const response = await axios.get(`http://api.alquran.cloud/v1/ayah/${2}:${getRandomArbitrary(1, 283)}/editions/en.sahih,ar.alafasy`);
	let data = response.data.data;
	//@ts-ignore
	const metadata = await ffprobe(`${process.env.NODE_ENV != 'production' ? data[1].audio.replace("https://cdn.islamic.network", "http://localhost:8010/proxy") : data[1].audio}`);
	let re = {
		titleTextEn: data[0].text,
		//@ts-ignore
		titleTextAr: data[1].text,
		//@ts-ignore
		audioURL: `${process.env.NODE_ENV != 'production' ? data[1].audio.replace("https://cdn.islamic.network", "http://localhost:8010/proxy") : data[1].audio}`,
		titleEnColor: "black",
		titleArColor: 'black',
		duration: metadata.format.duration*25
	}
	console.log(re);
	return re

};


app.get('/', async (req, res) => {
	const sendFile = (file: string) => {
		fs.createReadStream(file)
			.pipe(res)
			.on('close', () => {
				res.end();
			});
	};
	try {


		// let surah_no = req.query.surah;
		// let ayah_no = req.query.ayah;

		let inputProps = await fetchData();


		const bundled = await bundle(path.join(__dirname, './src/index.tsx'));
		const comps = await getCompositions(bundled, { inputProps: req.query });
		const video = comps.find((c) => c.id === compositionId);
		if (!video) {
			throw new Error(`No video called ${compositionId}`);
		}
		res.set('content-type', 'video/mp4');

		const tmpDir = await fs.promises.mkdtemp(
			path.join(os.tmpdir(), 'remotion-')
		);
		const { assetsInfo } = await renderFrames({
			config: video,
			webpackBundle: bundled,
			onStart: () => console.log('Rendering frames...'),
			onFrameUpdate: (f) => {
				if (f % 10 === 0) {
					console.log(`Rendered frame ${f}`);
				}
			},
			parallelism: null,
			outputDir: tmpDir,
			inputProps: inputProps,
			compositionId,
			imageFormat: 'jpeg',
		});

		const finalOutput = path.join(tmpDir, 'out.mp4');
		await stitchFramesToVideo({
			dir: tmpDir,
			force: true,
			fps: video.fps,
			height: video.height,
			width: video.width,
			outputLocation: finalOutput,
			imageFormat: 'jpeg',
			assetsInfo,
		});
		cache.set(JSON.stringify(req.query), finalOutput);
		sendFile(finalOutput);
		console.log('Video rendered and sent!');
	} catch (err) {
		console.error(err);
		res.json({
			error: err,
		});
	}
});

app.listen(port);

console.log(
	[
		`The server has started on http://localhost:${port}!`,
		'You can render a video by passing props as URL parameters.',
		'',
		'If you are running Hello World, try this:',
		'',
		`http://localhost:${port}?titleText=Hello,+World!&titleColor=red`,
		'',
	].join('\n')
);
