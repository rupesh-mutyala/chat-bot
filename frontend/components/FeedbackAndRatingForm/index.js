import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles.module.css';

const axios = require('axios');

function FeedbackAndRatingForm({
	feedback: defaultFeedack = '',
	rating: defaultRating = 0,
	fetchData = () => {},
	id,
	setShowFeedback = () => {},
}) {
	const [rating, setRating] = useState(defaultRating);
	const [feedback, setFeedback] = useState(defaultFeedack);

	const handleRatingChange = (event, newValue) => {
		setRating(newValue);
	};

	const handleFeedbackChange = (event) => {
		setFeedback(event.target.value);
	};

	const handleSubmit = async () => {
		try {
			await axios.post('http://127.0.0.1:4000/api/save_conversation_feedback', {
				id,
				rating,
				feedback,
			});

			await fetchData();

			setShowFeedback(false);
		} catch (err) {
			console.log('err::', err);
		}
	};

	return (
		<div className={styles.container}>
			<h2>Please provide rating and feedback:</h2>

			<div style={{ marginBottom: '20px' }}>
				<Rating name="rating" value={rating} onChange={handleRatingChange} />
			</div>

			<TextField
				style={{ width: '300px' }}
				multiline
				rows={2}
				variant="outlined"
				value={feedback}
				onChange={handleFeedbackChange}
			/>

			<Button
				style={{ marginTop: '16px' }}
				variant="contained"
				color="primary"
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</div>
	);
}

export default FeedbackAndRatingForm;
