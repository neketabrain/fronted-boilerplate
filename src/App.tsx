import React from "react";

import logo from "@assets/webpack.png";

import "./App.scss";

function App() {
  return (
    <div className="container">
      <h1 className="title">Frontend boilerplate</h1>
      <img className="logo" alt="webpack_logo" src={logo} />
    </div>
  );
}

export default App;
