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
	let style = {
		color: titleColor,
		fontSize: 70,
		textAlign: 'center',
		position: 'absolute',
		width: '100%'
	} as any;

	if (topMargin) {
		style.top = topMargin
		style.fontFamily = `Noto Naskh Arabic, serif`
		style.direction = 'rtl'
	} else if (bottomMargin) {
		style.bottom = bottomMargin
		style.fontFamily = 'SF Pro Text, Helvetica, Arial'
	}
	return (
		<h1
			style={style}
		>
			{titleText}
		</h1>
	);
};
