import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from './serviceWorker';
import App from "./views/App";
import configureStore from "./configureStore";

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById("root"));

serviceWorker.unregister();
