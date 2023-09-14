import React from "react";

import Logo from "../../images/Avatar.png";
import Avatar from "react-avatar";
import classes from "./ProfileCard.module.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import ArrowGo from "./ArrowGo";
import { useNavigate } from "react-router-dom";
const ProfileCard = () => {
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
				<h2>Hi, there!</h2>
				<h2>{name}</h2>
			</div>
			<main className={classes.links}>
				<div
					className={path === "/profile" ? classes.active : classes.link}
					onClick={() => navigate("/profile")}
				>
					<p>My account</p>
					<ArrowGo />
				</div>
				<div
					className={path === "/booking" ? classes.active : classes.link}
					onClick={() => navigate("/booking")}
				>
					<p>My bookings</p>
					<ArrowGo />
				</div>
				<div
					className={path === "/address" ? classes.active : classes.link}
					onClick={() => navigate("/address")}
				>
					<p>My address </p>
					<ArrowGo />
				</div>
				<div
					className={path === "/changepassword" ? classes.active : classes.link}
					onClick={() => navigate("/changepassword")}
				>
					<p>Change Password</p>
					<ArrowGo />
				</div>
				<div className={classes.link} onClick={logout}>
					<p>Log out </p>
					<ArrowGo />
				</div>
			</main>
		</div>
	);
};

export default ProfileCard;
