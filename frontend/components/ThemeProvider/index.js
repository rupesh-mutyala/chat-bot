/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext } from 'react';
import {
	createTheme,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to consume the theme context
export const useTheme = () => useContext(ThemeContext);

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		// Customize other theme options here
	},
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		// Customize other theme options here
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
