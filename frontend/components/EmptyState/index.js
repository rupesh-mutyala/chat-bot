import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

const axios = require('axios');

const useStyles = makeStyles(() => ({
	newChatButton: {
		margin: '12px 0 8px',
		background: 'var(--color-bg-sidebar)',
		border: '1px solid var(--color-text-primary)',
		color: 'var(--color-text-primary)',
	},
}));

function EmptyState({ fetchData = () => {} }) {
	const { push } = useRouter();

	const classes = useStyles();

	const onClickNewChat = async () => {
		try {
			const conv_id = new Date().getTime();

			await axios.post('http://127.0.0.1:4000/api/create_conversation', {
				id: new Date().getTime(),
			});

			await fetchData();

			push(`/chat/${conv_id}`);
		} catch (err) {
			console.error('err', err);
		}
	};

	return (
		<div className={styles.container}>
			<p>
				The chat you are looking for cannot be found. Please either navigate to
				an existing chat or create a new chat.
			</p>

			<Button
				className={classes.newChatButton}
				variant="contained"
				size="large"
				onClick={onClickNewChat}
			>
				+ New Chat
			</Button>
		</div>
	);
}

export default EmptyState;
