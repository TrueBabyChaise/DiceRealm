import React from "react";
import logo from "./logo.svg";
import "./App.css";
import game from "./games/game";

function App() {
  game(500, 500, 1000);
  return (
    <div className="App">
      <div style={{ height: "500px", width: "500px" }} id="game"></div>
    </div>
  );
}

export default App;
