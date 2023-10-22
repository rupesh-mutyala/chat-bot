import {
	List,
	ListItem,
	ListItemIcon,
	IconButton,
	Button,
} from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import DeleteIcon from '@mui/icons-material/Delete';

import { makeStyles } from '@mui/styles';

import { useRouter } from 'next/router';
import styles from './styles.module.css';
import useHandleSideBar from './useHandleSideBar';

const useStyles = makeStyles(() => ({
	listItem: {
		borderRadius: '8px',
		margin: '12px 0',
		height: '50px',
	},
	selectedListItem: {
		backgroundColor: 'var(--color-bg-hover)',
	},
	listItemtext: {
		maxWidth: '150px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	newChatButton: {
		width: '100%',
		margin: '12px 0 8px',
		background: 'var(--color-bg-sidebar)',
		border: '1px solid var(--color-text-primary)',
		color: 'var(--color-text-primary)',
	},
}));

function SideBar({ data, fetchData = () => {} }) {
	const { query = {}, push } = useRouter();

	const { id = '' } = query;

	const classes = useStyles();

	const {
		onClickDeleteChat,
		handleMouseLeave,
		handleMouseEnter,
		hoveredConversation,
		onClickNewChat,
	} = useHandleSideBar({ fetchData, data });

	return (
		<div className={styles.container}>
			<Button
				className={classes.newChatButton}
				variant="contained"
				size="large"
				onClick={onClickNewChat}
			>
				+ New Chat
			</Button>

			<List>
				{data.map((conversation, index) => {
					const label = conversation.messages?.[0]?.user;

					return (
						<ListItem
							key={conversation.id}
							button
							onMouseEnter={() => handleMouseEnter(conversation.id)}
							onMouseLeave={handleMouseLeave}
							onClick={() => {
								push(`/chat/${conversation.id}`);
							}}
							className={`${classes.listItem} ${
								parseInt(id, 10) === conversation.id
									? classes.selectedListItem
									: ''
							}`}
						>
							<ListItemIcon>
								<ChatBubbleIcon />
							</ListItemIcon>

							<div className={styles.title}>
								{label || `Chat #${index + 1}`}
							</div>
							{hoveredConversation === conversation.id && (
								<IconButton
									edge="end"
									onClick={() => onClickDeleteChat(conversation.id)}
								>
									<DeleteIcon />
								</IconButton>
							)}
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}

export default SideBar;
