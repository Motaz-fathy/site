import React, { FC, useContext, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Image404 from "images/404 (2).png";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useTranslation } from "react-i18next";
import useInput from "hooks/useInput";
import { useAddOtb } from "hooks/DataSend/useOtb";
import { AppContext } from "components/context/AppContext";
import OtpInput from "react-otp-input";

export interface OtpPageProps {
	className?: string;
}

const OtpPage: FC<OtpPageProps> = ({ className = "" }) => {
	const { name, phone } = useContext(AppContext);
	const [otp, setOtp] = useState<string>("");
	const { mutate } = useAddOtb();
	const { t } = useTranslation();

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (!otp) {
			return;
		}
		const data = new FormData();
		const mobile = localStorage.getItem("phone");
		const officialPhone = mobile?.substring(1);

		data.append("mobile", officialPhone ?? "");
		data.append("phonecode", "20");
		data.append("code", otp);
		mutate(data);
	};
	return (
		<div className={`nc-PageLogin ${className}  bg-gradient-to-r from-[#242932] to-[#2B356E] h-[80vh]  relative mb-56`} data-nc-id="PageLogin">
			<Helmet>
				<title>Login || Telefreik For Booking</title>
			</Helmet>
			<div className="container absolute top-20  lg:mb-32 transition-[0.5s] bg-white w-[80vw] left-2 rounded-[16px] right-2 h-[80vh]">

			<img
                  className="flex-shrink-0 m-auto"
                  src={Image404}
                  alt={"verification"}
                />

				<span className="my-2 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
				{t("otp")}
				</span>
				<p className="text-center my-2 text-[#828282]">
					{t("Enter the verification code we just sent on your email address.")}
				</p>
				<div className="mx-auto max-w-md space-y-6">
					<form className="grid grid-cols-1 gap-6" onSubmit={submitHandler}>
						
						<div className="flex w-full  justify-center">
							<OtpInput
								value={otp}
								inputStyle={{
									height: "3.5rem",
									width: "3.5rem",
									border: "1px solid rgb(67,56,202)",
									borderRadius: 4,
									color: "text-neutral-800 dark:text-neutral-200",
									fontWight: "bolder",
									fontSize: "1.5rem",
								}}
								hasErrored={otp?.length <= 4}
								onChange={(e: any) => setOtp(e)}
								placeholder="----"
								isInputNum={true}
								isInputSecure={true}
								numInputs={4}
								separator={<div style={{ marginInline: "0.5rem" }} />}
								shouldAutoFocus={true}
								containerStyle={{ direction: "ltr" }}
							/>
						</div>

						<ButtonPrimary type="submit">{t("confirm")}</ButtonPrimary>
					</form>
					{/* ==== */}
				<p className="text-center  text-[#828282] m-0">
				{t("Didn’t received code?")} 
				</p>				
				<div  className="text-[#1d4179] text-center hover:cursor-pointer  m-auto text-center m-0" >{t("Resend")}</div>
				</div>
			</div>
		</div>
	);
};

export default OtpPage;
