import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import s from "../styles/Main.module.css";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;

  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);

    if (isDisabled) e.preventDefault();
  };

  return (
    <div className={s.wrap}>
      <div className={s.container}>
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
    </div>
  );
};

export default Main;
