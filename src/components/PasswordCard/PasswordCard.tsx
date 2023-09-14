import React, { useState } from "react";
import classes from "./PasswordCard.module.css";
import OtpInput from "react-otp-input";
import ProfileButtom from "components/ProfileButtom/ProfileButtom";
import { useChangePass } from "hooks/DataSend/useChangePass";
const PasswordCard = () => {
	const [curr, setCurr] = useState<any>("");
	const [password, setPassword] = useState<any>("");
	const [resetPassword, setResetPassword] = useState<any>("");
	const { mutate } = useChangePass();
	const phone = localStorage.getItem("phone");
	const changeHandler = () => {
		const data = new FormData();
		data.append("phonecode", "20");
		data.append("code", "4391");
		data.append("mobile", "1060415852");
		data.append("password", password);
		data.append("password_confirmation", resetPassword);

		mutate(data);
	};
	return (
		<div className={classes.passwordCard}>
			<h2>Change password</h2>
			<div className={classes.passInput}>
				<label>Current password *</label>
				<OtpInput
					value={curr}
					inputStyle={classes.otp}
					onChange={(e: any) => setCurr(e)}
					isInputNum={true}
					numInputs={6}
					separator={<div style={{ marginInline: "0.5rem" }} />}
					containerStyle={{ direction: "ltr" }}
				/>
			</div>
			<div className={classes.passInput}>
				<label>New password *</label>
				<OtpInput
					value={password}
					inputStyle={classes.otp}
					hasErrored={password?.length <= 6}
					onChange={(e: any) => setPassword(e)}
					isInputNum={true}
					isInputSecure={false}
					numInputs={6}
					separator={<div style={{ marginInline: "0.5rem" }} />}
					shouldAutoFocus={true}
					containerStyle={{ direction: "ltr" }}
				/>
			</div>
			<div className={classes.passInput}>
				<label>Confirm new password *</label>
				<OtpInput
					value={resetPassword}
					inputStyle={classes.otp}
					hasErrored={password?.length <= 6}
					onChange={(e: any) => {
						setResetPassword(e);
					}}
					isInputNum={true}
					numInputs={6}
					separator={<div style={{ marginInline: "0.5rem" }} />}
					containerStyle={{ direction: "ltr" }}
				/>
			</div>
			<ProfileButtom title="Done" mt={false} onClick={changeHandler} />
		</div>
	);
};

export default PasswordCard;
