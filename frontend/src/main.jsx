import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { SWRConfig } from "swr";
import { fetcher } from "./utils/fetcher";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SWRConfig value={{fetcher: fetcher}}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
