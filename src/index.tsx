import React from "react";
import ReactDOM from "react-dom/client";
//
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-slider/assets/index.css";
// STYLE
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import "./i18n/index";
import './fonts/Alkatra-VariableFont_wght.ttf'
import 'react-dates/lib/css/_datepicker.css'

//
import App from "./App";
import reportWebVitals from "./reportWebVitals";


const root = ReactDOM.createRoot(
	
	document.getElementById("root") as HTMLElement,
);

root.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");

reportWebVitals();
