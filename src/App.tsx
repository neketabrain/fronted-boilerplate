import React from "react";

import logo from "@assets/react.png";

import "./App.scss";

const App: React.FC = () => (
  <div className="container">
    <h1 className="title">React app boilerplate</h1>
    <img className="logo" alt="webpack_logo" src={logo} />
  </div>
);

export default App;
