import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { useMemo, useState } from 'react';
import store from '../store';
import './styles.css';
import CustomThemeProvider from '../components/ThemeProvider';
import { ValueContext } from '../context';
import Header from '../components/Header';
import useGetConversations from '../hooks/useGetConversations';

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

function MyApp({ Component, pageProps }) {
	const [activeTheme, setActiveTheme] = useState('dark');
	const [loading, setLoading] = useState(true);

	const { data, fetchData } = useGetConversations({ setLoading });

	const contextValues = useMemo(
		() => ({
			activeTheme,
			setActiveTheme,
			loading,
			data,
			fetchData,
		}),
		[activeTheme, setActiveTheme, loading, data, fetchData],
	);

	return (
		<Provider store={store}>
			<ValueContext.Provider value={contextValues}>
				<CustomThemeProvider activeTheme={activeTheme}>
					<Header />

					<Component {...pageProps} />
				</CustomThemeProvider>
			</ValueContext.Provider>
		</Provider>
	);
}

export default wrapper.withRedux(MyApp);
