import { BackButtom } from "components/BackButtom/BackButtom";
import EditProfile from "components/EditProfile/EditProfile";
import ProfileCard from "components/ProfileCard/ProfileCard";
import classes from "./Profile.module.css";
const Profile = () => {
	return (
		<div className={classes.layout}>
			<div className="container">
				<BackButtom />
				<div className="two mt-5 mb-5 min-h-[80vh] gap-[20px]">
					<ProfileCard />
					<EditProfile />
				</div>
			</div>
		</div>
	);
};

export default Profile;
