import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';
export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleTextEn: "The Entirely Merciful, the Especially Merciful",
					titleEnColor: "green",
					titleTextAr: "\u0671\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0671\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650",
					titleArColor: 'purple',
					audioURL: 'https://cdn.islamic.network/quran/audio/64/ar.alafasy/3.mp3',
				}}
			/>
		</>
	);
};
