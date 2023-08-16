import React from 'react'

import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import s from '../styles/Header.module.scss'


const Header = ({ toggleBackground}) => {


	return (
		<div>
			<header className={s.header}>
				<nav className={s.nav}>
					<Link to='/info'>Info</Link>
					<Link to='/'>Chat</Link>
				</nav>
				<div>
					<i className={s.fa_solid}>

						<ThemeSwitcher toggleBackground={toggleBackground} />
					</i>
				</div>
			</header>
		</div>

	)
}

export default Header