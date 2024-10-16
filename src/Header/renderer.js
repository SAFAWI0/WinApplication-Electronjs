import React from "react";
import ReactDOM from "react-dom";
import { Header } from "./header";

function App() {
  return (
    <div>
      <Header />
      <p>Welcome to your Electron application.</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
