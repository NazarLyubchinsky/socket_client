
// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { useLocation, useNavigate } from "react-router-dom";
// import EmojiPicker from "emoji-picker-react";

// import icon from "../images/emoji.svg";
// import s from "../styles/Chat.module.scss";
// import Messages from "./Messages";

// const Chat = () => {
// 	const { search } = useLocation();
// 	const navigate = useNavigate();
// 	const [params, setParams] = useState({ room: "", user: "" });
// 	const [state, setState] = useState([]);
// 	const [message, setMessage] = useState("");
// 	const [isOpen, setOpen] = useState(false);
// 	const [users, setUsers] = useState(0);

// 	const socket = io.connect("https://onlinechat-zttn.onrender.com");

// 	useEffect(() => {
// 		const searchParams = Object.fromEntries(new URLSearchParams(search));
// 		setParams(searchParams);
// 		socket.emit("join", searchParams);

// 		const handleMessages = ({ data }) => {
// 			setState(prevState => [...prevState, data]);
// 		};

// 		const handleRoomInfo = ({ data: { users } }) => {
// 			setUsers(users.length);
// 		};

// 		socket.on("message", handleMessages);
// 		socket.on("room", handleRoomInfo);

// 		return () => {
// 			socket.off("message", handleMessages);
// 			socket.off("room", handleRoomInfo);
// 		};
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [search]);

// 	useEffect(() => {
// 		const savedMessages = localStorage.getItem(`chatMessages_${params.room}`);
// 		setState(savedMessages ? JSON.parse(savedMessages) : []);
// 	}, [params.room]);

// 	useEffect(() => {
// 		localStorage.setItem(`chatMessages_${params.room}`, JSON.stringify(state));
// 	}, [state, params.room]);

// 	const leaveRoom = () => {
// 		socket.emit("leftRoom", { params });
// 		navigate("/");
// 	};

// 	const handleChange = (e) => setMessage(e.target.value);

// 	const handleSubmit = (e) => {
// 		e.preventDefault();

// 		if (!message.trim()) return;

// 		socket.emit("sendMessage", { message, params });
// 		setMessage("");
// 	};

// 	const onEmojiClick = ({ emoji }) => setMessage(prevMessage => prevMessage + " " + emoji);



// 	return (
// 		<section className={s.chat}>
// 			<div className={s.wrap}>
// 				<div className={s.header}>
// 					<div className={s.title}>{params.room}</div>
// 					<div className={s.users}>{users} users in this room</div>
// 					<button className={s.left} onClick={leaveRoom}>
// 						Leave the room
// 					</button>
// 				</div>

// 				<div className={`${s.messages} ${s.scrollable}`}>
// 					<Messages messages={state} name={params.name} />
// 				</div>

// 				<form className={s.form} onSubmit={handleSubmit}>
// 					<div className={s.input}>
// 						<input
// 							type="text"
// 							name="message"
// 							placeholder="What do you want to say?"
// 							value={message}
// 							onChange={handleChange}
// 							autoComplete="off"
// 							required
// 						/>
// 					</div>
// 					<div className={s.emoji}>
// 						<img src={icon} alt="Emoji" onClick={() => setOpen(!isOpen)} />
// 						{isOpen && (
// 							<div className={s.emojies}>
// 								<EmojiPicker onEmojiClick={onEmojiClick} />
// 							</div>
// 						)}
// 					</div>
// 					<div className={s.button}>
// 						<button type="submit">Send a message</button>
// 					</div>
// 				</form>
// 			</div>
// 		</section>
// 	);
// };

// export default Chat;




import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

import icon from "../images/emoji.svg";
import s from "../styles/Chat.module.scss";
import Messages from "./Messages";

const Chat = () => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const [params, setParams] = useState({ room: "", user: "" });
	const [state, setState] = useState([]);
	const [message, setMessage] = useState("");
	const [isOpen, setOpen] = useState(false);
	const [users, setUsers] = useState(0);

	const socket = io.connect("https://onlinechat-zttn.onrender.com");

	// Scroll
	const messagesRef = useRef(null);
	useEffect(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight; 
		}
	}, [state]);

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);
		socket.emit("join", searchParams);

		const handleMessages = ({ data }) => {
			setState(prevState => [...prevState, data]);
		};

		const handleRoomInfo = ({ data: { users } }) => {
			setUsers(users.length);
		};

		socket.on("message", handleMessages);
		socket.on("room", handleRoomInfo);

		return () => {
			socket.off("message", handleMessages);
			socket.off("room", handleRoomInfo);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		const savedMessages = localStorage.getItem(`chatMessages_${params.room}`);
		setState(savedMessages ? JSON.parse(savedMessages) : []);
	}, [params.room]);

	useEffect(() => {
		localStorage.setItem(`chatMessages_${params.room}`, JSON.stringify(state));
	}, [state, params.room]);

	const leaveRoom = () => {
		socket.emit("leftRoom", { params });
		navigate("/");
	};

	const handleChange = (e) => setMessage(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!message.trim()) return;

		socket.emit("sendMessage", { message, params });
		setMessage("");
	};

	const onEmojiClick = ({ emoji }) => setMessage(prevMessage => prevMessage + " " + emoji);



	return (
		<section className={s.chat}>
			<div className={s.wrap}>
				<div className={s.header}>
					<div className={s.title}>{params.room}</div>
					<div className={s.users}>{users} users in this room</div>
					<button className={s.left} onClick={leaveRoom}>
						Leave the room
					</button>
				</div>

				<div className={`${s.messages} ${s.scrollable}`} ref={messagesRef}>
					<Messages messages={state} name={params.name} />
				</div>

				<form className={s.form} onSubmit={handleSubmit}>
					<div className={s.input}>
						<input
							type="text"
							name="message"
							placeholder="What do you want to say?"
							value={message}
							onChange={handleChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={s.emoji}>
						<img src={icon} alt="Emoji" onClick={() => setOpen(!isOpen)} />
						{isOpen && (
							<div className={s.emojies}>
								<EmojiPicker onEmojiClick={onEmojiClick} />
							</div>
						)}
					</div>
					<div className={s.button}>
						<button type="submit">Send a message</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Chat;



