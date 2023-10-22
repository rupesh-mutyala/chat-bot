import { useEffect } from 'react';
import { Button } from '@mui/material';
import styles from './styles.module.css';

function ThemeToggle({ activeTheme = '', setActiveTheme = () => {} }) {
	const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

	useEffect(() => {
		// eslint-disable-next-line no-undef
		document.body.dataset.theme = activeTheme;
		// eslint-disable-next-line no-undef
		window.localStorage.setItem('theme', activeTheme);
	}, [activeTheme]);

	return (
		<Button
			className={`${styles.toggle_button} ${styles[activeTheme]}`}
			aria-label={`Change to ${inactiveTheme} mode`}
			title={`Change to ${inactiveTheme} mode`}
			type="button"
			onClick={() => setActiveTheme(inactiveTheme)}
			variant="contained"
		>
			<span
				className={styles.toggle_thumb}
				style={{
					transform:
						activeTheme === 'dark'
							? 'translate3d(calc(var(--toggle-width) - var(--toggle-height)), 0, 0)'
							: 'none',
					backgroundColor: activeTheme === 'dark' ? '#fff' : '#000',
				}}
			/>
			<span className={styles.icons}>🌙</span>
			<span className={styles.icons}>☀️</span>
		</Button>
	);
}

export default ThemeToggle;
