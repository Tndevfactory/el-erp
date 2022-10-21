import React from "react";
import { store } from "./features/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import App from "./App";
import "./style/index.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
);
