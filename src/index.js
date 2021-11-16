import React from "react";
import ReactDOM from "react-dom";
import { AppContextProvider } from "./contexts/AppContext";
import App from "./App";

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>, 
  document.getElementById("root")
);
