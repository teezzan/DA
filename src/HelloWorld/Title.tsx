import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import "./font.css";

export const Title: React.FC<{
	textEn: string;
	textAr: string;
	surahName: string;
	titleColor: string;
}> = ({ textEn, textAr, surahName, titleColor }) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	let style = {
		color: titleColor,
		fontSize: 70,
		textAlign: 'center',
		position: 'absolute',
		width: '100%'
	} as any;

	return (
		<div className="qa" >
			<div className='mi'>
			<h1>Quran Daily</h1>
			<span>
				{textAr}
			</span>

			</div>
			
			<div className="ei">

			<span>
				{textEn}
			</span>
			<h2>{surahName}</h2>

			</div>

		</div>
	);
};
