import { BackButtom } from "components/BackButtom/BackButtom";
import ProfileCard from "components/ProfileCard/ProfileCard";
import React from "react";
import classes from "./AdressDetail.module.css";
import ADCard from "components/ADCard/ADCard";
const AdressDetail = () => {
	return (
		<div className={classes.layout}>
			<div className="container ">
				<BackButtom />
				<div className="two mt-5 mb-5 min-h-[80vh] gap-[20px] ">
					<ProfileCard />
					<ADCard />
				</div>
			</div>
		</div>
	);
};

export default AdressDetail;
