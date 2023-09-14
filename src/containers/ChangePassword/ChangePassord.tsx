import React from "react";
import classes from "./ChangePassword.module.css";
import { BackButtom } from "components/BackButtom/BackButtom";
import ProfileCard from "components/ProfileCard/ProfileCard";
import PasswordCard from "components/PasswordCard/PasswordCard";
const ChangePassord = () => {
	return (
		<div className={classes.layout}>
			<div className="container  min-h-[100vh]">
				<BackButtom />
				<div className="two mt-5 mb-5 min-h-[80vh] gap-[20px]">
					<ProfileCard />
					<PasswordCard />
				</div>
			</div>
		</div>
	);
};

export default ChangePassord;
