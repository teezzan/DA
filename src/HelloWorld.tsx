import {interpolate, Sequence, useCurrentFrame, useVideoConfig, Audio} from 'remotion';
import {Title} from './HelloWorld/Title';

export const HelloWorld: React.FC<{
	titleTextEn: string;
	titleEnColor: string;
	titleTextAr: string;
	titleArColor: string;
	audioURL: string;
}> = ({titleTextEn, titleEnColor, titleTextAr, titleArColor, audioURL}) => {
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
		<div style={{flex: 1, backgroundColor: '#54aba0'}}>
			<div style={{opacity}}>
				<Sequence from={0} >
					<Title titleText={titleTextEn} titleColor={titleEnColor} bottomMargin={100} />
					<Title titleText={titleTextAr} titleColor={titleArColor} topMargin={100} />
				</Sequence>
				<Audio src={audioURL} />

			</div>
		</div>
	);
};
