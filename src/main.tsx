import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Chat } from "@mui/icons-material";
import { ChatContextProvider } from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChatContextProvider>
    <React.StrictMode>
      {/*the whole App is wrapped in BrowserRouter so we dont need to add it every time*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ChatContextProvider>
);
