import { makeStyles } from '@mui/styles';

const axios = require('axios');

const useStyles = makeStyles(() => ({
	newChatButton: {
		margin: '8px 0',
		background: 'var(--color-bg-primary)',
		border: '1px solid var(--color-text-primary)',
		color: 'var(--color-text-primary)',
		borderRadius: '6px',
		padding: '8px',
		cursor: 'pointer',
	},
}));

function RegenerateResponse({
	fetchData = () => {},
	message_id = '',
	id = '',
	setError = () => {},
}) {
	const classes = useStyles();

	const onClickRegenerateResponse = async () => {
		try {
			await axios.post('http://127.0.0.1:4000/api/regenerate_reponse', {
				message_id,
				id,
			});

			await fetchData(message_id, id);

			setError(false);
		} catch (err) {
			console.log('err::', err);
		}
	};

	return (
		<>
			<p>There is some issue, please regenerate the response to proceed</p>

			<button
				className={classes.newChatButton}
				type="button"
				onClick={onClickRegenerateResponse}
			>
				Regenerate Response
			</button>
		</>
	);
}

export default RegenerateResponse;
