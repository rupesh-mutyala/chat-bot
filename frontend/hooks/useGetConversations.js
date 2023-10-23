import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const axios = require('axios');

const useGetConversations = ({ setLoading }) => {
	const router = useRouter();
	const [data, setDate] = useState([]);

	const fetchData = async (message_id, id) => {
		try {
			const { data: apiData = [] } = await axios.get(
				'http://127.0.0.1:4000/api/conversations',
				{
					params: message_id ? { message_id, id } : undefined,
				},
			);

			setDate(apiData);

			if (router.pathname === '/chat/[id]') {
				setLoading(false);
				return;
			}

			const unSavedConversation = apiData.find((item) => !item.is_saved);

			if (unSavedConversation) {
				router.push(`/chat/${unSavedConversation.id}`);
			} else {
				await axios.post('http://127.0.0.1:4000/api/create_conversation', {
					id: new Date().getTime(),
				});

				fetchData();
			}

			setLoading(false);
		} catch (error) {
			console.error('Error while setting up the request:', error.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, fetchData };
};

export default useGetConversations;
