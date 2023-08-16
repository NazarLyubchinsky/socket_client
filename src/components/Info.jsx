import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import s from '../styles/Info.module.scss'
import Header from './Header'

// images
import Img from '../images/Header_img.png'
const Info = () => {
	const [isBackgroundVisible, setIsBackgroundVisible] = useState(true);
	const toggleBackground = () => {
		setIsBackgroundVisible(prevVisible => !prevVisible);
	};
	return (
		<>
			<Header toggleBackground={toggleBackground} />
			<section className={isBackgroundVisible ? s.info : s.info2}>
				<div className={s.info__left}>
					<h1 className={s.info__title}>My Chat</h1>
					<h2 className={s.info__subtitle}>Communication,<br /> collaborative work,<br /> and idea implementation</h2>
					<p className={s.info__text}>Collaborate with other users and communicate anytime using Chat.</p>
					<div>
						<Link to='/' className={s.info__btn}>Sign in</Link>

					</div>
				</div>
				<div className={s.info__right}>
					<img className={s.images} src={Img} alt={Img} />
				</div>
			</section>
		</>
	)
}

export default Info