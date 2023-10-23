import { useContext } from 'react';
import { ValueContext } from '../../context';
import ThemeToggle from '../ThemeToggle';
import styles from './styles.module.css';

function Header() {
	const { activeTheme = 'dark', setActiveTheme = () => {} } =
		useContext(ValueContext);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Chat Bot</div>

			<ThemeToggle activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
		</div>
	);
}

export default Header;
