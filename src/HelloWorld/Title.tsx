import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import "./font.css";

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
	topMargin?: number;
	bottomMargin?: number;
}> = ({ titleText, titleColor, topMargin, bottomMargin }) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const text = titleText.split(' ').map((t) => ` ${t} `);
	let style = {
		// fontWeight: 'bold',
		fontSize: 80,
		textAlign: 'center',
		position: 'absolute',
		width: '100%',
	} as any;

	if (topMargin) {
		style.top = topMargin
		style.fontFamily = 'SF Pro Text, Helvetica, Arial'
	} else if (bottomMargin) {
		style.bottom = bottomMargin
		style.fontFamily = `Noto Naskh Arabic, serif`
	}
	return (
		<h1
			style={style}
		>
			{text.map((t, i) => {
				return (
					<span
						key={t}
						style={{
							color: titleColor,
							marginLeft: 10,
							marginRight: 10,
							transform: `scale(${spring({
								fps: videoConfig.fps,
								frame: frame - i * 5,
								config: {
									damping: 100,
									stiffness: 200,
									mass: 0.5,
								},
							})})`,
							display: 'inline-block',
						}}
					>
						{t}
					</span>
				);
			})}
		</h1>
	);
};
