// This is needed for Create React App (/webapp).
// If you aren't working on the webapp, don't worry about this

import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./webapp/style/Theme";
import App from "./webapp/App";

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
