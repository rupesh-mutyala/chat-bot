import { createSlice } from '@reduxjs/toolkit';

const conversationSlice = createSlice({
	name: 'conversation',
	initialState: {},
	reducers: {
		addConversation: (_, action) => ({ ...action.payload }),
	},
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
