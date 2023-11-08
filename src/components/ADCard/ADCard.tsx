import React, { useState } from "react";
import classes from "./ADCard.module.css";
import { useQuery } from "react-query";
import { getAddressList } from "api";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ADCard = () => {
	const navigate = useNavigate();
	const [addressList, setAddressList] = useState<any>([]);
    const {t} = useTranslation()
	const { data: addressListData } = useQuery(
		["addressListData"],
		() => {
			return getAddressList();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setAddressList([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors?.response?.data?.errors)?.length) {
					showApiErrorMessages(errors?.response?.data?.errors);
				} else {
					toast.error(errors?.response?.data?.message);
				}
				if (errors?.response?.status === 401) {
					navigate("/login");
				}
			},
		},
	);
	if (addressList.length > 0) {
		return (
			<div className={` container ${classes.addressCard}`}>
				<div className={classes.title}>
					<span>{t("My adress")}</span>
					{/* <span > Edit </span> */}
				</div>
				{addressList.map((item: any) => (
					<>
						<div className={classes.layout}>
							<div className={classes.input}>
								<label>{t("Phone Number")} *</label>
								<input placeholder={item?.phone} readOnly={true} />
							</div>
							<div className={classes.input}>
								<label>{t("city")} *</label>
								<input placeholder={item?.city?.name} readOnly={true} />
							</div>
						</div>
						<div className={classes.layout}>
							<div className={classes.input}>
								<label>{t("Street Name")} *</label>
								<input placeholder={item?.name} readOnly={true} />
							</div>
							<div className={classes.input}>
								<label>{t("Location")} *</label>
								<input placeholder={item?.name} readOnly={true} />
							</div>
						</div>
						<hr />
					</>
				))}

				<button
					className={classes.Edit}
					onClick={() => navigate("/addaddress")}
				>
					{" "}
					{t("Add another address")}
				</button>
			</div>
		);
	}
	return (
		<div className={` z-0 ${classes.addressCard}`}>
			{" "}
			<p className=""> no Address </p>
			<button
					className={classes.Edit}
					onClick={() => navigate("/addaddress")}
				>
					{" "}
					Add  address
				</button>
		</div>
	);
};

export default ADCard;
