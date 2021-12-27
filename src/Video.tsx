import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';
import { continueRender, delayRender } from "remotion";
import { useEffect, useState } from "react";

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
 function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}



export const RemotionVideo: React.FC = () => {
	const [data, setData] = useState(null);
	const [handle] = useState(() => delayRender());

	const fetchData = async () => {
		const response = await fetch(`http://api.alquran.cloud/v1/ayah/${2}:${getRandomArbitrary(1,260)}/editions/en.sahih,ar.alafasy`);
		const json = await response.json();
		setData(json.data);

		continueRender(handle);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			{data ? (
				<>
					<Composition
						id="HelloWorld"
						component={HelloWorld}
						durationInFrames={960}
						fps={25}
						width={1920}
						height={1080}
						defaultProps={{
							//@ts-ignore
							titleTextEn: data[0].text,
							//@ts-ignore
							titleTextAr: data[1].text,
							//@ts-ignore
							audioURL: data[1].audio,
							titleEnColor: "black",
							titleArColor: 'black',
						}}
					/>
				</>
			) : null}
		</div>
	);

};
