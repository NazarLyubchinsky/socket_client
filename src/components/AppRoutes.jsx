import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./Main";
import Chat from "./Chat";
import Info from "./Info";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/info" element={<Info/>} />
  </Routes>
);

export default AppRoutes;
