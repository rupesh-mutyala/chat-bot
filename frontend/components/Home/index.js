import { useContext } from 'react';

import { ValueContext } from '../../context';
import SideBar from '../SideBar';
import styles from './styles.module.css';
import ChatContainer from '../ChatComponent';

function Home() {
	const {
		loading = true,
		data,
		fetchData = () => {},
	} = useContext(ValueContext);

	if (loading) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<SideBar data={data} fetchData={fetchData} /> {/* sidebar */}
			</div>

			<div className={styles.chat}>
				<ChatContainer data={data} fetchData={fetchData} />{' '}
				{/* main chat component */}
			</div>
		</div>
	);
}

export default Home;
