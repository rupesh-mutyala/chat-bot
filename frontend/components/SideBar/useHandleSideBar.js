import { useRouter } from 'next/router';
import { useState } from 'react';

const axios = require('axios');

const useHandleSideBar = ({ fetchData, data = [] }) => {
	const { query = {}, push } = useRouter();

	const { id = '' } = query;

	const [hoveredConversation, setHoveredConversation] = useState(null);

	const handleMouseEnter = (conversationId) => {
		setHoveredConversation(conversationId);
	};

	const handleMouseLeave = () => {
		setHoveredConversation(null);
	};

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

	const onClickDeleteChat = async (convId) => {
		try {
			await axios.post('http://127.0.0.1:4000/api/delete_conversation', {
				id: convId,
			});

			const restConversations = data.filter((item) => item.id !== convId) || [];

			if (convId === parseInt(id, 10) && restConversations.length) {
				push(`/chat/${restConversations[0].id}`);
			}

			if (convId === parseInt(id, 10) && !restConversations.length) {
				onClickNewChat();
				return;
			}

			await fetchData();
		} catch (err) {
			console.error('err', err);
		}
	};

	return {
		onClickDeleteChat,
		handleMouseLeave,
		handleMouseEnter,
		hoveredConversation,
		onClickNewChat,
	};
};

export default useHandleSideBar;
