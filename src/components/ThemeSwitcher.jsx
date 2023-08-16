

import React from 'react';
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
