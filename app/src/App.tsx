import React from "react";
import logo from "./logo.svg";
import "./App.css";
// @ts-ignore
import game from "./games/game";

function App() {
  game(390, 500, 10);
  return (
    <div className="App">
      <div style={{ height: "500px", width: "500px" }} id="game"></div>
    </div>
  );
}

export default App;
