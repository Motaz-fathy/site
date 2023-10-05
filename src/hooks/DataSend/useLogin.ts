import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "i18n";

function addLogin(data: any): Promise<any> {
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/mobile/customer/login`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
			},
		},
	);
}
function addOtpLogin(data: any): Promise<any> {
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/mobile/customer/send-otp`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
			},
		},
	);
}
export const useAddLogin = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const path = sessionStorage.getItem("path");
	return useMutation("addLoginData", addLogin, {
		onSuccess: async data => {
			toast.success(data?.data?.message);
			if (data?.data?.need_verfication === true) {
				navigate("/otp");
			} else if (!!data?.data?.data?.api_token) {
				await localStorage.setItem("token", data?.data?.data?.api_token);
				await localStorage.setItem("email", data?.data?.data?.email);
				await localStorage.setItem("phone", data?.data?.data?.mobile);
				await localStorage.setItem("name", data?.data?.data?.name);
				window.history.back()
				window.history.back()
			}
		},
		onError: (errors: any) => {
			const err = errors.response.data.errors;

			for (const m in err) {
				toast.error(err[m]);
			}
		},
	});
};
