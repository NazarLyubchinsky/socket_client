// import React from "react";
// import io from "socket.io-client";
// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import EmojiPicker from "emoji-picker-react";

// import icon from "../images/emoji.svg";
// import s from "../styles/Chat.module.css";
// import Messages from "./Messages";

// const socket = io.connect("https://onlinechat-zttn.onrender.com");

// const Chat = () => {
//   const { search } = useLocation();
//   const navigate = useNavigate();
//   const [params, setParams] = useState({ room: "", user: "" });
//   const [state, setState] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isOpen, setOpen] = useState(false);
//   const [users, setUsers] = useState(0);

//   useEffect(() => {
//     const searchParams = Object.fromEntries(new URLSearchParams(search));
//     setParams(searchParams);
//     socket.emit("join", searchParams);
//   }, [search]);

//   useEffect(() => {
//     socket.on("message", ({ data }) => {
//       setState((_state) => [..._state, data]);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("room", ({ data: { users } }) => {
//       setUsers(users.length);
//     });
//   }, []);

//   const leftRoom = () => {
//     socket.emit("leftRoom", { params });
//     navigate("/");
//   };

//   const handleChange = ({ target: { value } }) => setMessage(value);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!message) return;

//     socket.emit("sendMessage", { message, params });

//     setMessage("");
//   };

//   const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

//   return (
//     <div className={s.wrap}>
//       <div className={s.header}>
//         <div className={s.title}>{params.room}</div>
//         <div className={s.users}>{users} users in this room</div>
//         <button className={s.left} onClick={leftRoom}>
//           Left the room
//         </button>
//       </div>

//       <div className={s.messages}>
//         <Messages messages={state} name={params.name} />
//       </div>

//       <form className={s.form} onSubmit={handleSubmit}>
//         <div className={s.input}>
//           <input
//             type="text"
//             name="message"
//             placeholder="What do you want to say?"
//             value={message}
//             onChange={handleChange}
//             autoComplete="off"
//             required
//           />
//         </div>
//         <div className={s.emoji}>
//           <img src={icon} alt="" onClick={() => setOpen(!isOpen)} />

//           {isOpen && (
//             <div className={s.emojies}>
//               <EmojiPicker onEmojiClick={onEmojiClick} />
//             </div>
//           )}
//         </div>

//         <div className={s.button}>
//           <input type="submit" onSubmit={handleSubmit} value="Send a message" />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Chat;



import React from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

import icon from "../images/emoji.svg";
import s from "../styles/Chat.module.css";
import Messages from "./Messages";

const socket = io.connect("https://onlinechat-zttn.onrender.com");

const Chat = () => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const [params, setParams] = useState({ room: "", user: "" });
	const [state, setState] = useState([]);
	const [message, setMessage] = useState("");
	const [isOpen, setOpen] = useState(false);
	const [users, setUsers] = useState(0);

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);
		socket.emit("join", searchParams);
	}, [search]);

	useEffect(() => {
		const handleMessage = ({ data }) => {
			setState((_state) => [..._state, data]);
		};

		socket.on("message", handleMessage);

		return () => {
			socket.off("message", handleMessage); // Відключення обробника перед виходом з компонента
		};
	}, []);

	useEffect(() => {
		const handleRoom = ({ data: { users } }) => {
			setUsers(users.length);
		};

		socket.on("room", handleRoom);

		return () => {
			socket.off("room", handleRoom); // Відключення обробника перед виходом з компонента
		};
	}, []);

	useEffect(() => {
		const savedMessages = localStorage.getItem("chatMessages");
		if (savedMessages) {
			setState(JSON.parse(savedMessages));
		}
	}, []);
	useEffect(() => {
		localStorage.setItem("chatMessages", JSON.stringify(state));
	}, [state]);


	const leftRoom = () => {
		socket.emit("leftRoom", { params });
		localStorage.removeItem("chatMessages");
		navigate("/");
	};


	const handleChange = ({ target: { value } }) => setMessage(value);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!message) return;

		socket.emit("sendMessage", { message, params });

		setMessage("");
	};

	const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

	return (
		<div className={s.wrap}>
			<div className={s.header}>
				<div className={s.title}>{params.room}</div>
				<div className={s.users}>{users} users in this room</div>
				<button className={s.left} onClick={leftRoom}>
					Left the room
				</button>
			</div>

			<div className={s.messages}>
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
					<img src={icon} alt="" onClick={() => setOpen(!isOpen)} />

					{isOpen && (
						<div className={s.emojies}>
							<EmojiPicker onEmojiClick={onEmojiClick} />
						</div>
					)}
				</div>

				<div className={s.button}>
					<input type="submit" onSubmit={handleSubmit} value="Send a message" />
				</div>
			</form>
		</div>
	);
};

export default Chat;
