// import React, { useState } from 'react';
// import s from '../styles/ThemeSwitcher.module.scss'

// const ThemeSwitcher = () => {
// 	const [isDarkTheme, setIsDarkTheme] = useState(false);

// 	const toggleTheme = () => {
// 		setIsDarkTheme(prevTheme => !prevTheme);
// 	};

// 	return (
// 		<div className={`${isDarkTheme ? 's.dark' : 's.background'}`}>
// 			<button onClick={toggleTheme}>Toggle Theme</button>
// 		</div>
// 	);
// };

// export default ThemeSwitcher;



import React, { useState } from 'react';
import s from '../styles/ThemeSwitcher.module.scss';

const ThemeSwitcher = ({ toggleBackground }) => {

	const toggleTheme = () => {
		toggleBackground();
	};

	return (
		<div >
			<button className={s.btn} onClick={toggleTheme}>Toggle Theme</button>
		</div>
	);
};

export default ThemeSwitcher;
