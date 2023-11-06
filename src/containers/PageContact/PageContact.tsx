import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SocialsList from "shared/SocialsList/SocialsList";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import { useTranslation } from "react-i18next";
import useForm from "hooks/useForm";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendContact } from "api";
import contactPic from "images/contactPic.png";

export interface PageContactProps {
	className?: string;
}

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);

	const [values, setValues] = useForm({
		name:  "",
		email:  "",
		message: "",
		phone:  "",
	});

	const info = [
		{
			title: "🗺 " + t("location"),
			desc: "Cairo, Egypt",
		},
		{
			title: "💌 " + t("emailContact"),
			desc: "info@telefreik.com",
		},
		{
			title:
				"☎ " +
				(i18n.language === "en"
					? t("tel")
					: t("tel") + (201063626268).toLocaleString("ar-u-nu-arab") + "+"),
			desc: "+(20) 10 6362 6268",
		},
	];

	const editAddressData = async (e: any) => {
		
		setLoading(true);

		if (!!values) {
			await sendContact(values)
				.then(res => {
					setLoading(false);
					toast.success(t("successSending"));
					setValues({
							name:  "",
							email:  "",
							message: "",
							phone:  ""
					})
					e.preventDefault();
				})
				.catch((err: any) => {
					// setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
					if (err.response.status === 401) {
						navigate("/login");
					}
				});
		} else {
			toast.error(t("notValidData"));
			setLoading(false);
		}
	};

	return (
		<div
			className={`nc-PageContact overflow-hidden ${className} bg-[#E8ECF2] `}
			data-nc-id="PageContact"
			
		>
			
			<Helmet >
				<title>Contact || Telefreik For Booking</title>
			</Helmet>
			<div className="mb-24  lg:mb-32 z-10 h-[800px] relative">
				
				<div className="container mx-auto max-w-7xl"
				>
					<div className="grid flex-shrink-0 sm:flex grid-cols-1 gap-12 sm:grid-cols-2 ">
						<img
				className="lg:absolute max-md:absolute left-0 top-0  object-cover h-[100vh] w-full max-sm:block max-sm:w-fit max-sm:h-fit "
				src={contactPic}
				alt=""
			/>
						<div className="absolute max-sm:mt-[130px] max-md:absolute max-sm:block w-[578px] h-auto max-sm:h-auto max-sm:w-auto left-[120px] max-sm:m-auto max-sm:left-2 max-sm:right-2 p-[54px] max-sm:py-[24px] max-sm:px-[16px] gap-[10px] top-[200px] max-sm:top-[60px] max-sm:mt-24 rounded-[16px] bg-white"
						
						style={{boxShadow: "0px 4px 4px 0px rgba(217, 217, 217, 0.50)",
						// padding:"54px 54px 81px "
						}}
						>
							<div className="mb-[20px] ">
								<h2 className=" flex items-center ltr:text-left  text-[20px]">
									{t("contact")}
								</h2>
								<h6 className=" flex items-center ltr:text-left  text-[20px] mt-2" style={{color:"#69696A"}}>
									{t("your opinion matters")} 
								</h6>
							</div>
							
							<form
								className="grid grid-cols-1 gap-[10px]"
								
							>
								<label className="block">
									<Label className="text-[16px]">{t("fullName")}</Label>

									<Input
										// placeholder="Ahmed Mohamed"
										type="text"
										className="mt-1 rounded-[4px]"
										id="name"
										name="name"
										onChange={setValues}
										
										required
									/>
								</label>
								<label className="block ">
									<Label className="text-[16px]">{t("email")}</Label>

									<Input
										type="email"
										// placeholder="example@example.com"
										className="mt-1 rounded-[4px]"
										id="email"
										name="email"
										onChange={setValues}
										
										required
									/>
								</label>
								<label className="block">
									<Label className="text-[16px]">{t("phoneNumber")}</Label>
									<div className="flex justify-between align-middle">
									<svg width="71" height="50" className="mr-2" viewBox="0 0 71 36" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clip-path="url(#clip0_593_11682)">
										<path d="M36 27C36 28.0609 35.5786 29.0783 34.8284 29.8284C34.0783 30.5786 33.0609 31 32 31H4C2.93913 31 1.92172 30.5786 1.17157 29.8284C0.421427 29.0783 0 28.0609 0 27V9C0 7.93913 0.421427 6.92172 1.17157 6.17157C1.92172 5.42143 2.93913 5 4 5H32C33.0609 5 34.0783 5.42143 34.8284 6.17157C35.5786 6.92172 36 7.93913 36 9V27Z" fill="#141414"/>
										<path d="M0 13H36V23H0V13Z" fill="#EEEEEE"/>
										<path d="M32 5H4C2.93913 5 1.92172 5.42143 1.17157 6.17157C0.421427 6.92172 0 7.93913 0 9L0 13H36V9C36 7.93913 35.5786 6.92172 34.8284 6.17157C34.0783 5.42143 33.0609 5 32 5Z" fill="#CE1225"/>
										<path d="M14.75 21.5619C14.75 21.5619 14.766 21.8119 14.984 21.9369C14.984 21.9369 14.922 22.1249 15.156 22.2339C15.39 22.3429 16.234 22.5149 17.703 22.5149C19.172 22.5149 20 22.3589 20.219 22.2489C20.438 22.1399 20.453 21.8899 20.453 21.8899C20.453 21.8899 20.687 21.7649 20.672 21.6089C20.656 21.4529 20.344 21.2809 20.344 21.2809C20.344 21.2809 20.266 21.0779 20.047 20.9999C19.828 20.9219 19.125 21.3439 17.781 21.2809C16.437 21.2189 15.672 21.0149 15.422 21.0309C15.172 21.0469 15.063 21.2969 15.063 21.2969C15.063 21.2969 14.781 21.4219 14.75 21.5619Z" fill="#BF9300"/>
										<path d="M14.922 21.5468C14.909 21.6398 15.11 21.8438 15.11 21.8438C15.11 21.8438 15.11 22.0778 15.313 22.1408C15.516 22.2038 16.344 22.3598 17.688 22.3438C19.032 22.3278 19.985 22.2498 20.094 22.1558C20.203 22.0618 20.297 21.8588 20.297 21.8588C20.297 21.8588 20.516 21.7028 20.5 21.5778C20.484 21.4528 20.172 21.3748 20.172 21.3748C20.172 21.3748 20.084 21.1868 19.98 21.1088C19.876 21.0308 19.204 21.4208 17.766 21.4208C16.359 21.4208 15.547 21.0768 15.407 21.0928C15.266 21.1088 15.173 21.3738 15.173 21.3738C15.173 21.3738 14.938 21.4378 14.922 21.5468Z" fill="#EEEEEE"/>
										<path d="M20.8588 15.4842C20.8588 15.4842 20.8278 14.7502 20.1558 14.8432C19.4838 14.9372 19.4368 15.2652 18.7178 15.3432L18.5698 15.3572C18.4498 15.0321 18.3836 14.6896 18.3738 14.3432C18.3738 13.8742 18.5148 13.6712 18.0298 13.4372C17.5458 13.2032 17.4518 13.4212 17.4518 13.4212C17.4518 13.4212 17.0768 13.2332 16.9048 13.3742C16.7328 13.5152 16.8268 13.8742 16.9048 13.7652C16.9828 13.6562 17.2958 13.9682 17.2958 13.9682C17.4018 14.4872 17.1008 15.0492 16.8948 15.3622C16.8238 15.3552 16.7668 15.3522 16.6868 15.3432C15.9678 15.2652 15.9208 14.9372 15.2488 14.8432C14.5768 14.7492 14.5458 15.4842 14.5458 15.4842L14.2798 21.1562L14.8268 20.7342L14.8298 20.6672L15.9678 19.6562L16.1578 19.4662L15.6868 20.8432C15.6868 20.8432 14.9678 20.7962 15.1708 21.3742C15.1708 21.3742 15.2798 21.0462 15.4678 21.1082C15.6558 21.1702 16.2018 21.3112 16.2018 21.3112L16.3898 21.6082L16.6238 21.3892L17.3578 21.3582C17.3578 21.3582 17.5918 21.4202 17.5768 21.6242C17.6198 21.5365 17.6328 21.4371 17.6138 21.3412L17.8348 21.3262C17.8111 21.4268 17.8231 21.5325 17.8688 21.6252C17.8528 21.4222 18.0878 21.3592 18.0878 21.3592L18.8218 21.3902L19.0568 21.6092L19.2448 21.3122C19.2448 21.3122 19.7908 21.1712 19.9778 21.1092C20.1648 21.0472 20.2748 21.3752 20.2748 21.3752C20.4778 20.7972 19.7588 20.8442 19.7588 20.8442L19.3098 19.5312L19.4358 19.6572L20.5738 20.6682L20.5768 20.7352L21.1238 21.1572L20.8588 15.4842ZM17.7518 18.9222C16.6248 18.2262 16.5318 16.4692 16.5318 16.4692C16.5318 16.4692 17.2288 16.4332 17.7348 16.0782C18.1908 16.4832 18.9688 16.4372 18.9688 16.4372C18.9688 16.4372 18.9158 18.2012 17.7518 18.9222ZM20.3278 15.2662L19.3748 16.1722L19.2148 16.2362C19.0508 16.2422 18.2528 16.2442 17.7498 15.7972C17.1248 16.2352 16.2658 16.2662 16.2658 16.2662L16.1328 16.2132L15.0778 15.2662L14.8008 15.3802C14.8128 15.2672 14.8748 15.0132 15.2188 15.0632C15.7828 15.1442 16.0158 15.4542 16.6098 15.5162L16.7778 15.5332L16.7188 15.6092C16.8108 15.6092 16.9468 15.5822 17.0468 15.5602L17.1598 15.5712L17.1088 15.7492C17.1888 15.7252 17.3048 15.6562 17.3998 15.5952L17.6598 15.6202L17.7188 15.7022L17.9168 15.6032L18.0498 15.5902C18.1648 15.6572 18.3288 15.7172 18.3288 15.7172L18.3598 15.5612C18.5008 15.6552 18.7348 15.6552 18.7348 15.6552C18.7078 15.6332 18.6808 15.5772 18.6528 15.5292L18.7968 15.5142C19.3908 15.4522 19.6228 15.1422 20.1878 15.0612C20.5318 15.0122 20.5938 15.2652 20.6058 15.3782L20.3278 15.2662Z" fill="#BF9300"/>
										<path d="M17.375 18.8912L16.812 21.0312L15.875 20.8442L16.844 18.0942L17.375 18.8912ZM18.074 18.8912L18.636 21.0312L19.574 20.8442L18.605 18.0942L18.074 18.8912Z" fill="#EEEEEE"/>
										<path d="M16.7661 16.641C16.7661 16.641 16.8441 17.547 17.2501 18.25V16.438C17.2501 16.438 16.9841 16.594 16.7661 16.641ZM18.7191 16.672C18.7191 16.672 18.6411 17.578 18.2351 18.281V16.469C18.2341 16.469 18.5001 16.625 18.7191 16.672Z" fill="#BF9300"/>
										<path d="M16.9531 13.578C16.9531 13.578 17.0621 13.469 17.3751 13.687C17.5781 13.829 17.7581 13.937 17.7581 13.937C17.7581 13.937 17.8861 13.802 18.0741 13.833C18.2621 13.864 18.1571 14.125 18.1881 14.671C18.2191 15.218 18.4381 15.452 18.4381 15.452L18.1721 15.296L18.1881 15.468L17.8911 15.327L17.7501 15.53L17.6091 15.311L17.3811 15.45L17.3121 15.264L17.0461 15.405C17.0461 15.405 17.4371 14.921 17.4681 14.389C17.4771 14.23 17.4371 13.873 17.4371 13.873C17.4371 13.873 17.1881 13.562 16.9531 13.578Z" fill="#EEEEEE"/>
										<path d="M15.5471 21.6558C15.3681 21.7628 15.4381 21.8278 15.5471 21.8748C15.6561 21.9218 16.3121 22.0008 17.6411 22.0308C19.0001 22.0618 19.844 21.9058 19.9531 21.8428C20.0621 21.7808 20.0781 21.6708 19.8911 21.6398C19.7031 21.6088 18.7661 21.7648 17.6251 21.7648C16.2191 21.7658 15.6251 21.6088 15.5471 21.6558Z" fill="#BF9300"/>
										</g>
										<path d="M47.52 21.776V19.96C47.52 19.7627 47.552 19.5973 47.616 19.464C47.68 19.3253 47.7733 19.2373 47.896 19.2L47.52 18.792V18.024V15.464H48.888V21.776H47.52ZM45.2 19.2V17.944H51.192V19.2H45.2ZM57.1586 24.24C56.3266 24.24 55.6093 24.024 55.0066 23.592C54.404 23.16 53.9373 22.4933 53.6066 21.592C53.2813 20.6853 53.1186 19.5253 53.1186 18.112C53.1186 16.7573 53.2813 15.64 53.6066 14.76C53.9373 13.8747 54.404 13.216 55.0066 12.784C55.6093 12.352 56.3266 12.136 57.1586 12.136C57.9853 12.136 58.6973 12.352 59.2946 12.784C59.8973 13.216 60.3586 13.8747 60.6786 14.76C61.004 15.64 61.1666 16.7573 61.1666 18.112C61.1666 19.5253 61.004 20.6853 60.6786 21.592C60.3586 22.4933 59.8973 23.16 59.2946 23.592C58.6973 24.024 57.9853 24.24 57.1586 24.24ZM57.1586 22.848C57.6546 22.848 58.0866 22.696 58.4546 22.392C58.8226 22.0827 59.108 21.584 59.3106 20.896C59.5186 20.2027 59.6226 19.28 59.6226 18.128C59.6226 17.024 59.5186 16.136 59.3106 15.464C59.108 14.7867 58.8226 14.296 58.4546 13.992C58.0866 13.6827 57.6546 13.528 57.1586 13.528C56.668 13.528 56.2333 13.6827 55.8546 13.992C55.4813 14.296 55.188 14.7867 54.9746 15.464C54.7666 16.136 54.6626 17.024 54.6626 18.128C54.6626 19.28 54.7666 20.2027 54.9746 20.896C55.188 21.584 55.4813 22.0827 55.8546 22.392C56.228 22.696 56.6626 22.848 57.1586 22.848ZM62.2826 24C62.5706 23.648 62.8693 23.2827 63.1786 22.904C63.4933 22.52 63.808 22.1333 64.1226 21.744C64.4426 21.3547 64.7573 20.9733 65.0666 20.6C65.376 20.2213 65.6693 19.8613 65.9466 19.52C66.3626 19.0187 66.7466 18.5493 67.0986 18.112C67.4506 17.6747 67.7333 17.2373 67.9466 16.8C68.1653 16.3573 68.2746 15.8907 68.2746 15.4C68.2746 14.7813 68.1013 14.304 67.7546 13.968C67.408 13.6267 66.9173 13.4587 66.2826 13.464C65.84 13.464 65.4426 13.5467 65.0906 13.712C64.744 13.8773 64.4773 14.1573 64.2906 14.552C64.1093 14.9467 64.0426 15.4907 64.0906 16.184H62.6586C62.5733 15.224 62.6773 14.448 62.9706 13.856C63.264 13.2587 63.704 12.8213 64.2906 12.544C64.8773 12.2667 65.5653 12.128 66.3546 12.128C67.064 12.128 67.672 12.256 68.1786 12.512C68.6906 12.7627 69.0826 13.1253 69.3546 13.6C69.632 14.0747 69.768 14.64 69.7626 15.296C69.7626 15.92 69.6613 16.48 69.4586 16.976C69.256 17.4667 68.9866 17.9387 68.6506 18.392C68.3146 18.84 67.9466 19.312 67.5466 19.808C67.296 20.1173 67.0426 20.4293 66.7866 20.744C66.5306 21.0533 66.2853 21.352 66.0506 21.64C65.816 21.9227 65.6026 22.1787 65.4106 22.408C65.224 22.632 65.0746 22.816 64.9626 22.96C65.1226 22.7893 65.32 22.688 65.5546 22.656C65.7893 22.6187 66.1066 22.6 66.5066 22.6H69.8026V24H62.2826Z" fill="black"/>
										<defs>
										<clipPath id="clip0_593_11682">
										<rect width="36" height="36" fill="white"/>
										</clipPath>
										</defs>
										</svg>
									<Input
										type="text"
										// placeholder="+201054...."
										className="mt-1 rounded-[4px]"
										id="phone"
										name="phone"
										onChange={setValues}
										
										required
										pattern="[0-9]{11}"
									/>
									</div>
									
								</label>
								<label className="block">
									<Label className="text-[16px]">{t("message")}</Label>

									<Textarea
										id="message"
										name="message"
										onChange={setValues}
										
										className="mt-1 rounded-[4px]"
										rows={6}
										required
									/>
								</label>
								<div className="flex justify-end">
									<button  type="submit" onClick={editAddressData} className="btn-hover  w-[139px] h-[55px] rounded-[30px] mt-3 text-white flex justify-center items-center max-sm:w-[50%]">
										{t("send")}
										<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M15.042 22.172L13.684 17.1M13.684 17.1L11.174 19.325L11.743 9.855L16.97 17.772L13.684 17.1ZM12 2.75V5M17.834 5.166L16.243 6.757M20.25 11H18M7.757 15.243L6.167 16.833M6 11H3.75M7.757 6.757L6.167 5.167" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* OTHER SECTIONS */}
			<div className="container max-sm:mt-[100px]">
				<div className="relative py-16">
					{/* <BackgroundSection /> */}
					{/* <SectionClientSay uniqueClassName="Pagecontact_" /> */}
				</div>
				{/* <SectionSubscribe2 className="py-24 lg:py-32" /> */}
			</div>
		</div>
	);
};

export default PageContact;
