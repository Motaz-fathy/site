import React, { useEffect, useState } from "react";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import MyRouter from "routers/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ChangeLanguageDocumentAttributes } from "utils";
import { AppContext } from "components/context/AppContext";
import { useTranslation } from "react-i18next";

function App() {
	//test
	// ammar test
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [token, setToken] = useState("");
	const { i18n } = useTranslation();
	useEffect(() => {
		const lName: any = localStorage.getItem("name");
		const lPhone: any = localStorage.getItem("phone");
		const lemail: any = localStorage.getItem("email");
		const ltoken: any = localStorage.getItem("token");
		setName(lName);
		setPhone(lPhone);
		setEmail(lemail);
		setToken(ltoken);
	}, []);
	const queryClient = new QueryClient();
	useEffect(() => {
		ChangeLanguageDocumentAttributes();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<AppContext.Provider value={{ name, phone, email, token }}>
				<div className="h-full w-full bg-[#E9EBF8]  text-base text-neutral-900 ltr:font-alkatra rtl:font-messiri dark:bg-neutral-900 dark:text-neutral-200">
					<MyRouter />
				</div>
				<ToastContainer className="toast" />
			</AppContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
