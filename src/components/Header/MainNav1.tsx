import React, { FC, useContext, useEffect, useState } from "react";
import Navigation from "shared/Navigation/Navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import logoImage from "images/logos/navLogo.png";
import userImage from "images/logos/user-icon.jpg";

import LangDropdown from "components/Header/LangDropdown";
import { useTranslation } from "react-i18next";
import { Link, redirect, useLocation } from "react-router-dom";
import { AppContext } from "components/context/AppContext";
import AvatarDropdown from "./AvatarDropdown";
import Avatar from "react-avatar";
import MenuBar from "shared/MenuBar/MenuBar";

export interface MainNav1Props {
	className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
	const { t, i18n } = useTranslation();
	const routes = useLocation();
	const [token, setToken] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		let tokenLocal = localStorage.getItem("token") ?? "";
		const lName: any = localStorage.getItem("name");
		if (!!tokenLocal) setToken(tokenLocal);
		setName(lName);
	}, [localStorage.getItem("token"), localStorage.getItem("name")]);

	return (
		<div className={`  nc-MainNav1 relative  ${className}`}>
			<div className="relative flex h-20 items-center justify-between px-4 py-4 lg:container lg:py-2">
				<div className="flex flex-1 items-center justify-start space-x-4 sm:space-x-10 md:flex">
					<MenuBar />
					<img src={logoImage} alt="logo" className="mr-2 max-sm:mr-[10px]" />
					<Navigation />
				</div>
				<div></div>

				{/* {routes?.pathname !== "/login" &&
					routes?.pathname !== "/otp" &&
					routes?.pathname !== "/signup" && (
						<div className="!mx-auto max-w-lg flex-[3] md:px-3 lg:hidden">
							<HeroSearchForm2MobileFactory />
						</div>
					)} */}

				<div className="flex flex-1 flex-shrink-0 items-center justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
					<div className="flex items-center xl:flex">
						{/* <SwitchDarkMode /> */}
						<div className="px-1" />
						<LangDropdown />

						{!!token ? (
							<AvatarDropdown />
						) : (
							<>
								<div
									className="mr-2 mt-1 flex h-6 w-6 items-center  justify-center gap-1 overflow-hidden rounded-full rtl:ml-2 "
									onClick={() => redirect("/signup")}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="21"
										viewBox="0 0 20 21"
										fill="none"
									>
										<path
											d="M4.18177 16.0102L4.1818 16.0102L4.17658 16.0062C4.05119 15.9114 3.95976 15.7786 3.91592 15.6276C3.87225 15.4772 3.87811 15.3167 3.93261 15.1699C4.4037 13.943 5.23553 12.8877 6.31845 12.143C7.40201 11.3979 8.68602 10.9989 10.001 10.9986C11.3161 10.9983 12.6003 11.3967 13.6841 12.1413C14.768 12.8859 15.6007 13.9417 16.0722 15.1693L16.0726 15.1703C16.1846 15.46 16.0896 15.7996 15.8248 16.0047L15.8241 16.0052C14.2157 17.2555 12.1949 18 9.99995 18L9.9992 18C7.89256 18.0032 5.84516 17.3029 4.18177 16.0102ZM11.7677 7.26777C11.2989 7.73661 10.663 8 9.99995 8C9.33691 8 8.70103 7.73661 8.23219 7.26777C7.76335 6.79893 7.49996 6.16304 7.49996 5.5C7.49996 4.83696 7.76335 4.20107 8.23219 3.73223C8.70103 3.26339 9.33691 3 9.99995 3C10.663 3 11.2989 3.26339 11.7677 3.73223C12.2366 4.20107 12.5 4.83696 12.5 5.5C12.5 6.16304 12.2366 6.79893 11.7677 7.26777Z"
											fill="#B9C4D5"
											stroke="#B9C4D5"
										/>
									</svg>
								</div>{" "}
								<Link className=" text-[#1d4179] sm:block max-sm:text-[14px]" to="/login">
									{t("Login")}
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainNav1;
