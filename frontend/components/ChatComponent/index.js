import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton, Grid, Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import TypingAnimation from '../TypingAnimation';
import EmptyState from '../EmptyState';
import RegenerateResponse from './RegenerateResponse';

const axios = require('axios');

const useStyles = makeStyles(() => ({
	chatContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		height: '100%',
	},
	chatList: {
		flex: 1,
		overflowY: 'auto',
	},
	chatItem: {
		maxWidth: '70%',
		padding: '8px',
		borderRadius: '8px',
		marginBottom: '8px',
	},
	inputField: {
		width: '100%',
	},
	thumbsIcon: {
		display: 'none',
	},
	chatItemHovered: {
		'&:hover $thumbsIcon': {
			display: 'inline',
		},
	},
	button: {
		minWidth: 'auto',
		marginTop: '4px',
	},
	grid: {
		marginBottom: '16px',
		marginLeft: '12px',
	},
	avatar: {
		marginRight: '20px',
	},
	likeDislikeContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	thumbsUp: {
		color: 'green',
	},
	thumbsDown: {
		color: 'red',
	},
	likeDislike: {
		maxWidth: '100px',
		marginLeft: 'auto',
	},
}));

function ChatContainer({ data = [], fetchData = () => {} }) {
	const { query = {} } = useRouter();

	const conversation =
		data.find((item) => item.id === parseInt(query.id, 10)) || {};

	const isErrorPresent =
		Object.keys(conversation).length &&
		(conversation.messages || []).some((item) => !item.bot);

	const [hoveredChatItem, setHoveredChatItem] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState(() => Boolean(isErrorPresent));
	const classes = useStyles();

	const { messages = [] } = conversation;

	const handleMouseEnter = (chatItemId) => {
		setHoveredChatItem(chatItemId);
	};

	const handleMouseLeave = () => {
		setHoveredChatItem(null);
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSendClick = async () => {
		setInputValue('');

		try {
			const { data: responseData } = await axios.post(
				'http://127.0.0.1:4000/api/send_question',
				{
					message_id: new Date().getTime(),
					id: query.id,
					question: inputValue,
				},
			);

			const { message_id } = responseData;

			fetchData(message_id, parseInt(query.id, 10));
		} catch (err) {
			await fetchData();
			setError(true);
		}
	};

	const onClickMessageReaction = async (reaction, message_id) => {
		try {
			await axios.post('http://127.0.0.1:4000/api/create_message_reaction', {
				message_id,
				id: query.id,
				reaction,
			});

			fetchData();
		} catch (err) {
			console.log('err::', err);
		}
	};

	useEffect(() => {
		setError(Boolean(isErrorPresent));
	}, [isErrorPresent]);

	if (!Object.keys(conversation).length && Object.keys(conversation).length) {
		return <EmptyState fetchData={fetchData} />;
	}

	return (
		<Box className={classes.chatContainer}>
			<div className={styles.list_container}>
				{messages.map((item) => {
					const {
						user = '',
						bot = '',
						message_id,
						is_new = false,
						reaction = '',
					} = item;

					return (
						<div key={message_id} className={styles.container}>
							<div className={styles.user_text_container}>
								<div className={styles.user_text}>
									<Avatar className={classes.avatar}>U</Avatar>
									{user}
								</div>
							</div>

							<div
								onMouseEnter={() => handleMouseEnter(message_id)}
								onMouseLeave={handleMouseLeave}
								className={styles.bot_text_container}
							>
								<div className={styles.bot_text}>
									<Avatar className={classes.avatar}>B</Avatar>
									<div className={styles.text}>
										{bot ? (
											<TypingAnimation text={bot} is_new={is_new} />
										) : (
											<RegenerateResponse
												message_id={message_id}
												id={query.id}
												fetchData={fetchData}
												setError={setError}
											/>
										)}
									</div>

									{hoveredChatItem === message_id || reaction ? (
										<Grid container spacing={2} className={classes.likeDislike}>
											<Grid
												item
												xs={6}
												className={classes.likeDislikeContainer}
											>
												<IconButton
													className={
														reaction === 'like' ? classes.thumbsUp : ''
													}
													onClick={() =>
														onClickMessageReaction('like', message_id)
													}
												>
													<ThumbUpIcon />
												</IconButton>
											</Grid>
											<Grid
												item
												xs={6}
												className={classes.likeDislikeContainer}
											>
												<IconButton
													className={
														reaction === 'dislike' ? classes.thumbsDown : {}
													}
													onClick={() =>
														onClickMessageReaction('dislike', message_id)
													}
												>
													<ThumbDownIcon />
												</IconButton>
											</Grid>
										</Grid>
									) : null}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{!error ? (
				<Grid className={classes.grid} container spacing={2}>
					<Grid item xs={10}>
						<TextField
							className={classes.inputField}
							multiline
							maxRows={6}
							variant="outlined"
							placeholder="Type your message..."
							value={inputValue}
							onChange={handleInputChange}
						/>
					</Grid>

					<Grid item xs={2}>
						<IconButton
							color="primary"
							className={classes.button}
							disabled={!inputValue}
							onClick={handleSendClick}
						>
							<SendIcon />
						</IconButton>
					</Grid>
				</Grid>
			) : null}
		</Box>
	);
}

export default ChatContainer;
