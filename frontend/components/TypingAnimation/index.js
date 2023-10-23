import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	chatText: {
		overflow: 'hidden',
		width: 0,
		animation: 'typing 0.5s steps(40, end) infinite',
	},
	'@keyframes typing': {
		from: { width: 0 },
		to: { width: '100%' },
	},
}));

function TypingAnimation({ text, is_new = false }) {
	const [displayText, setDisplayText] = useState('');
	const classes = useStyles();

	useEffect(() => {
		const typingInterval = setInterval(() => {
			if (displayText.length < text.length) {
				setDisplayText(text.slice(0, displayText.length + 1));
			} else {
				clearInterval(typingInterval);
			}
		}, 12.5);

		return () => clearInterval(typingInterval);
	}, [text, displayText]);

	if (!is_new) {
		return text;
	}

	return <span className={classes.chatText}>{displayText}</span>;
}

export default TypingAnimation;
