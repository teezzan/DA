import {interpolate, Sequence, useCurrentFrame, useVideoConfig, Audio} from 'remotion';
import {Title} from './HelloWorld/Title';

export const HelloWorld: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<div style={{opacity}}>
				<Sequence from={0} >
					<Title titleText={titleText} titleColor={titleColor} topMargin={100} />
				</Sequence>
				<Sequence from={0} >
					<Title titleText={"\u0671\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650 \u0671\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650"} titleColor={'blue'} bottomMargin={100} />
				</Sequence>
				<Audio src={'https://cdn.islamic.network/quran/audio/64/ar.alafasy/3.mp3'} />

			</div>
		</div>
	);
};
