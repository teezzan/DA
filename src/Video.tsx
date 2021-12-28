import { Composition, getInputProps } from 'remotion';
import { HelloWorld } from './HelloWorld';
import { continueRender, delayRender } from "remotion";
import { getAudioDuration } from "@remotion/media-utils";
import { useEffect, useState } from "react";

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}



export const RemotionVideo: React.FC = () => {
	const [data, setData] = useState(null);
	const [audioLength, setAudioLength] = useState(5);
	// const [handle] = useState(() => delayRender());

	const inputProps = getInputProps();

	// const fetchData = async () => {
	// 	const response = await fetch(`http://api.alquran.cloud/v1/ayah/${2}:${getRandomArbitrary(1, 283)}/editions/en.sahih,ar.alafasy`);
	// 	const json = await response.json();

	// 	setData(json.data);
	// 	//@ts-ignore
	// 	const length = await getAudioDuration(`${process.env.NODE_ENV != 'production' ? data[1].audio.replace("https://cdn.islamic.network", "http://localhost:8010/proxy") : data[1].audio}`);
	// 	setAudioLength(length)
	// };

	// useEffect(() => {
	// 	fetchData().then(() => {
	// 		continueRender(handle);
	// 	})
	// }, [handle]);

	return (
		<div>
			{(
				<>
					<Composition
						id="HelloWorld"
						component={HelloWorld}
						durationInFrames={inputProps?.duration ?? 30*10}
						fps={10}
						width={1232}
						height={2096}
						defaultProps={{
							titleTextEn: inputProps?.titleTextEn,
							titleTextAr: inputProps?.titleTextAr,
							audioURL: inputProps?.audioURL,
							titleEnColor: "black",
							titleArColor: 'black',
						}}
					/>
				</>
			)}
		</div>
	);

};
