/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext } from 'react';
import {
	createTheme,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

// context for the theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function CustomThemeProvider({ children, activeTheme }) {
	const theme = activeTheme === 'dark' ? darkTheme : lightTheme;

	return (
		<MuiThemeProvider theme={theme}>
			<ThemeContext.Provider value={{ isDarkMode: activeTheme === 'dark' }}>
				{children}
			</ThemeContext.Provider>
		</MuiThemeProvider>
	);
}

export default CustomThemeProvider;
