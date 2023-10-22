import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export {
	Provider,
	connect,
	shallowEqual,
	useSelector,
	useDispatch,
	useStore,
} from 'react-redux';

const store = configureStore({
	reducer: rootReducer,
});

export default store;
