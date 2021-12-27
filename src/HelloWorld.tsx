import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
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
					<Title titleText={'Solledad'} titleColor={'tomato'} bottomMargin={100} />
				</Sequence>
			</div>
		</div>
	);
};
