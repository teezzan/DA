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
	const [handle] = useState(() => delayRender());

	const inputProps = getInputProps();

	const fetchData = async () => {
		const response = await fetch(`http://api.alquran.cloud/v1/ayah/${2}:${getRandomArbitrary(1, 283)}/editions/en.sahih,ar.alafasy`);
		const json = await response.json();

		setData(json.data);
		//@ts-ignore
		const length = await getAudioDuration(`${process.env.NODE_ENV != 'production' ? data[1].audio.replace("https://cdn.islamic.network", "http://localhost:8010/proxy") : data[1].audio}`);
		setAudioLength(length)
	};

	useEffect(() => {
		fetchData().then(() => {
			continueRender(handle);
		})
	}, [handle]);

	return (
		<div>
			{data ? (
				<>
					<Composition
						id="HelloWorld"
						component={HelloWorld}
						durationInFrames={Math.round(inputProps?.duration ?? (audioLength * 25))}
						fps={25}
						width={1232}
						height={2096}
						defaultProps={{
							//@ts-ignore
							titleTextEn: data[0].text,
							//@ts-ignore
							titleTextAr: data[1].text,
							//@ts-ignore
							audioURL: `${process.env.NODE_ENV != 'production' ? data[1].audio.replace("https://cdn.islamic.network", "http://localhost:8010/proxy") : data[1].audio}`,
							titleEnColor: "black",
							titleArColor: 'black',
						}}
					/>
				</>
			) : null}
		</div>
	);

};
