import React from "react";

import Logo from "../../images/Avatar.png";
import Avatar from "react-avatar";
import classes from "./ProfileCard.module.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import ArrowGo from "./ArrowGo";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ProfileCard = () => {
	const {t} = useTranslation()
	const name = localStorage.getItem("name");
	const phone = localStorage.getItem("phone");
	const path = window.location.pathname;
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("email");
		localStorage.removeItem("phone");
		navigate("/");
		window.location.reload();
	};
	return (
		<div className={classes.cardLinks}>
			<div className={classes.avatar}>
				<img src={Logo} alt="logo" />
				<span>{t("Hi, there!")}</span>
				<span>{name}</span>
			</div>
			<main className={classes.links}>
				<div
					className={path === "/profile" ? classes.active : classes.link}
					onClick={() => navigate("/profile")}
				>
					<p>{t("My account")}</p>
					<ArrowGo />
				</div>
				<div
					className={path === "/booking" ? classes.active : classes.link}
					onClick={() => navigate("/booking")}
				>
					<p>{t("My bookings")}</p>
					<ArrowGo />
				</div>
				<div
					className={path === "/address" ? classes.active : classes.link}
					onClick={() => navigate("/address")}
				>
					<p>{t("My address")} </p>
					<ArrowGo />
				</div>
				<div
					className={path === "/changepassword" ? classes.active : classes.link}
					onClick={() => navigate("/changepassword")}
				>
					<p>{t("Change Password")}</p>
					<ArrowGo />
				</div>
				<div className={classes.link} onClick={logout}>
					<p>{t("Log out")} </p>
					<ArrowGo />
				</div>
			</main>
		</div>
	);
};

export default ProfileCard;
