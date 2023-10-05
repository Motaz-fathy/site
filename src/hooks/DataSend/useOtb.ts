import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function addOtb(data: any): Promise<any> {
	const lang = localStorage.getItem("i18nextLng");
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/mobile/customer/verify-otp`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": lang,
			},
		},
	);
}
export const useAddOtb = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const path = sessionStorage.getItem("path");

	return useMutation("addLoginData", addOtb, {
		onSuccess: async data => {
			await localStorage.setItem("token", data?.data?.data?.api_token);
			await localStorage.setItem("email", data?.data?.data?.email);
			await localStorage.setItem("phone", data?.data?.data?.mobile);
			await localStorage.setItem("name", data?.data?.data?.name);
			 navigate("/");
		},
		onError: (errors: any) => {
			const err = errors.response.data.errors;

			for (const m in err) {
				toast.error(err[m]);
			}
		},
	});
};
