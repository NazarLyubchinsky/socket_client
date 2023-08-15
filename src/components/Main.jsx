
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import s from "../styles/Main.module.scss";

// images
import GITHUB from '../images/git.svg'
import FACEBOOK from '../images/face.svg'
import INSTAGRAM from '../images/inst.svg'
import ThemeSwitcher from "./ThemeSwitcher";

const FIELDS = {
	NAME: "name",
	ROOM: "room",
};

const Main = () => {
	const { NAME, ROOM } = FIELDS;

	const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });
	const [isBackgroundVisible, setIsBackgroundVisible] = useState(true);

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleClick = (e) => {
		const isDisabled = Object.values(values).some((v) => !v);

		if (isDisabled) e.preventDefault();
	};

	const toggleBackground = () => {
		setIsBackgroundVisible(prevVisible => !prevVisible);
	};

	return (
		<div>
			<header className={s.header}>
				<nav className={s.nav}>
					<Link to='/'>home</Link>
					<Link to='/'>contact</Link>
				</nav>
				<div>
					<i className={s.fa_solid}>

						<ThemeSwitcher toggleBackground={toggleBackground} />
					</i>
				</div>
			</header>
			{/* Displaying a Background Image */}
			{isBackgroundVisible ? <div className={s.background}></div> : <div className={s.background2}></div>}
			<section className={isBackgroundVisible ? s.home : s.home2}>
				<div className={s.content}>
					<a href="/" className={s.logo}>Chat</a>
					<h2>Welcom</h2>
					<h3>to our new chat</h3>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, molestias!</p>
					<div className={s.icon}>
						<a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className={s.fa_brands}>
							<img src={INSTAGRAM} alt='Instagram' />
						</a>
						<a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className={s.fa_brands}>
							<img src={FACEBOOK} alt={FACEBOOK} />
						</a>
						<a href='https://github.com/NazarLyubchinsky' target='_blank' rel='noopener noreferrer' className={s.fa_brands}>
							<img src={GITHUB} alt={GITHUB} />
						</a>
					</div>
				</div>
				<div className={s.login}>
					<h1 className={s.heading}>Join</h1>
					<form className={s.form}>
						<div className={s.group}>
							<input
								type="text"
								name="name"
								value={values[NAME]}
								placeholder="Username"
								className={s.input}
								onChange={handleChange}
								autoComplete="off"
								required
							/>
						</div>
						<div className={s.group}>
							<input
								type="text"
								name="room"
								placeholder="Room"
								value={values[ROOM]}
								className={s.input}
								onChange={handleChange}
								autoComplete="off"
								required
							/>
						</div>

						<Link
							className={s.group}
							onClick={handleClick}
							to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
						>
							<button type="submit" className={s.button}>
								Sign In
							</button>
						</Link>
					</form>
				</div>
			</section >
		</div >
	);
};

export default Main;

