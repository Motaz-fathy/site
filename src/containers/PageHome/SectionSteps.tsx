import wordImg from "images/wordImg.png";
import rightImgPng from "images/our-features.png";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { searchTripsPrivate } from "api";
import { useEffect, useState } from "react";
import axios from "axios";

const SectionSteps = ({
	className = "",
	rightImg = rightImgPng,
	type = "type1",
}) => {
	const { t, i18n } = useTranslation();
	const inti_tomorrow = moment().add(1, 'days');
		const tomorrow = inti_tomorrow.format('YYYY-MM-DD')
		const navigate = useNavigate()
	const navigateFightTripone = () => {
		sessionStorage.setItem(
			"flightData",
			JSON.stringify({
				cabinClass: "CABIN_CLASS_ECONOMY",
				round: 1,
				origin: "CAI",
				destination: "DXB",
				departureDateTime: tomorrow,
				adults: 1,
			}),

		);
		navigate("/listing-flights-oneRound");
	};

	const navigateFightTriptwo = () => {
		sessionStorage.setItem(
			"flightData",
			JSON.stringify({
				cabinClass: "CABIN_CLASS_ECONOMY",
				round: 1,
				origin: "CAI",
				destination: "JED",
				departureDateTime: tomorrow,
				adults: 1,
			}),

		);
		navigate("/listing-flights-oneRound");
	};

		// Create a date
		
		const handle_to_search = (date:any , from:string , to:string , from_id:number , to_id:number) => {
			navigate(`/listing-bus?${date}/${to_id}/${from_id}/${to}/${from}`)
			
			
		}
	const static_trips_row1 = [
		{
			from_id : 1 ,
			to_id : 9 ,
			from : "Cairo" ,
			to : "Sharm El Sheikh",
			date : tomorrow 
		},
		{
           from_id : 1 ,
           to_id : 2 ,
		   from : "Cairo" ,
		   to : "Alexandria",
		   date : tomorrow 
		} ,
		{
			from_id : 1 ,
			to_id : 4 ,
			from : "Cairo" ,
			to : "Hurghada",
			date : tomorrow 
		},
		{
			from_id : 1 ,
			to_id : 5 ,
			from : "Cairo" ,
			to : "Dahab",
			date : tomorrow 
		},
		
		
		
	]
	

const handle_cairo_marsa_alam = () => {
	axios
	.get(
	  `${process.env.REACT_APP_API_TELE_URL}/api/transports/private/trips?from_location_id=1&to_location_id=34&date=${tomorrow}&page=1`
	)
	.then((res: any) => {
		window.localStorage.setItem("list_private" , JSON.stringify(res?.data?.data))
		console.log("list_private" , res?.data?.data)
	  
	});
}
	
 	return (
		<>
			<div
				className={`pb-10 nc-SectionOurFeatures  mx-0 pt-10 rtl:gap-2 sm:mx-4 lg:flex-row
          ${className} overflow-hidden`}
				data-nc-id="SectionOurFeatures"
			>
				<div className="flex flex-col items-center justify-center pb-8 text-2xl  text-white lg:flex-row">
					<span>{t("stepHeader")}</span>
				</div>

			
				<div className="container w-full m-auto flex flex-col items-center justify-center gap-3  sm:flex-row sm:px-0 ">

			        	<div className="xl:w-[23%]  lg:w-[23%] md:w-[23%] max-md:w-[23%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229] md:text-[12px]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white  pt-4 md:pt-2 sm:pt-12  lg:p-4">
								<div className="container w-[95%] text-gray-500 sm:pt-2">
									<div className="w-full  flex justify-between items-center max-sm:gap-2">
							
									<span className="max-sm:text-[12px] md:text-center text-[12px] ">{t("Marsa Alam")}</span>

									<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_2654_2103)">
									<path d="M4.99998 13C3.622 13 2.5 14.122 2.5 15.5C2.5 16.878 3.622 18 4.99998 18C6.37797 18 7.49997 16.878 7.49997 15.5C7.49997 14.122 6.37797 13 4.99998 13ZM4.99998 17C4.17297 17 3.49998 16.327 3.49998 15.5C3.49998 14.673 4.17297 14 4.99998 14C5.827 14 6.49998 14.673 6.49998 15.5C6.49998 16.327 5.827 17 4.99998 17Z" fill="black"/>
									<path d="M20 13C18.622 13 17.5 14.122 17.5 15.5C17.5 16.878 18.622 18 20 18C21.378 18 22.5 16.878 22.5 15.5C22.5 14.122 21.378 13 20 13ZM20 17C19.173 17 18.5 16.327 18.5 15.5C18.5 14.673 19.173 14 20 14C20.827 14 21.5 14.673 21.5 15.5C21.5 16.327 20.827 17 20 17Z" fill="black"/>
									<path d="M21.5 9.99998H20.654C20.345 9.99998 20.042 9.894 19.8 9.69998L15.86 6.54797C15.418 6.195 14.863 6 14.298 6H7.07C6.23202 6 5.45502 6.41602 4.99002 7.113L4.139 8.391C3.884 8.772 3.458 9 2.99998 9C1.622 9 0.5 10.122 0.5 11.5V13.5C0.5 14.878 1.622 16 2.99998 16C3.27598 16 3.5 15.776 3.5 15.5C3.5 15.224 3.27598 15 2.99998 15C2.17297 15 1.49998 14.327 1.49998 13.5V11.5C1.49998 10.673 2.17297 9.99998 2.99998 9.99998C3.794 9.99998 4.52998 9.606 4.97098 8.94497L5.822 7.66795C6.101 7.24997 6.56802 6.99994 7.07 6.99994H14.298C14.638 6.99994 14.97 7.11694 15.236 7.32895L19.176 10.4799C19.593 10.815 20.119 10.9999 20.655 10.9999H21.5C22.967 10.9999 23.5 12.4949 23.5 13.4999C23.5 14.4849 22.746 14.9999 22 14.9999C21.724 14.9999 21.5 15.2239 21.5 15.4999C21.5 15.7759 21.724 15.9999 22 15.9999C23.425 16 24.5 14.925 24.5 13.5C24.5 11.803 23.449 9.99998 21.5 9.99998Z" fill="black"/>
									<path d="M18 15H7.00002C6.72402 15 6.5 15.224 6.5 15.5C6.5 15.776 6.72402 16 7.00002 16H18C18.276 16 18.5 15.776 18.5 15.5C18.5 15.224 18.276 15 18 15Z" fill="black"/>
									<path d="M17 10H12.5V8.50002C12.5 8.22402 12.276 8 12 8C11.724 8 11.5 8.22402 11.5 8.50002V10.5C11.5 10.776 11.724 11 12 11H17C17.276 11 17.5 10.776 17.5 10.5C17.5 10.224 17.276 10 17 10Z" fill="black"/>
									<path d="M9.99994 9.99978H6.80892L7.44792 8.7238C7.57092 8.47681 7.47094 8.17681 7.22391 8.05278C6.97589 7.92978 6.67692 8.02878 6.55289 8.2768L5.55291 10.2768C5.47491 10.4308 5.48391 10.6158 5.57489 10.7628C5.66588 10.9098 5.82689 10.9998 5.99991 10.9998H9.99989C10.2759 10.9998 10.4999 10.7758 10.4999 10.4998C10.4999 10.2238 10.2759 9.99978 9.99994 9.99978Z" fill="black"/>
									<path d="M14 12H13C12.724 12 12.5 12.224 12.5 12.5C12.5 12.776 12.724 13 13 13H14C14.276 13 14.5 12.776 14.5 12.5C14.5 12.224 14.276 12 14 12Z" fill="black"/>
									</g>
									<defs>
									<clipPath id="clip0_2654_2103">
									<rect width="24" height="24" fill="white" transform="translate(0.5)"/>
									</clipPath>
									</defs>
									</svg>


									<span className="max-sm:text-[12px] ">{t("cairo")}</span>

									</div>

									<div className="flex justify-around items-center py-2">
									<span className="text-[12px]  text-[#1E1E1E] w-[40%]">
										{tomorrow}
									</span>
                                    <button className="btn-hover md:w-[60%] md:h-[30px] max-sm:w-[60%] max-sm:h-[30px] rounded-xl text-white"
									onClick={() => {
										handle_cairo_marsa_alam()
										navigate(`/private-trip?${tomorrow}/34/1/Marsa Alam/Cairo`)
									}}
									>
                                       {t("select")}
									</button>
                                      
									</div>
								</div>
							</div>
						</div>
					
						<div className="xl:w-[23%]  lg:w-[23%] md:w-[23%] max-md:w-[23%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229] md:text-[12px]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white  pt-4 md:pt-2 sm:pt-12  lg:p-4">
								<div className="container w-[95%] text-gray-500 sm:pt-2">
									<div className="w-full  flex justify-between items-center max-sm:gap-2">
							
									<span className="max-sm:text-[12px] md:text-center ">{t("Dubai")}</span>

									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
									<path d="M17.6582 0.843769C17.4758 0.660884 17.255 0.520904 17.0117 0.433988C16.7685 0.347071 16.5089 0.315399 16.2519 0.341269C15.3258 0.43104 14.4599 0.840789 13.8032 1.50002L10.8669 4.43627L3.27694 2.76752C3.05233 2.71891 2.81909 2.72779 2.59883 2.79334C2.37856 2.8589 2.17842 2.979 2.01694 3.14252L1.12819 4.02752C1.01549 4.1386 0.93095 4.27499 0.881598 4.42534C0.832246 4.57569 0.819511 4.73565 0.844455 4.89191C0.869398 5.04818 0.931298 5.19622 1.025 5.32374C1.11871 5.45125 1.24151 5.55454 1.38319 5.62502L6.91069 8.39627L4.75444 10.5525L2.48194 10.7813C2.28297 10.8031 2.09523 10.8845 1.94329 11.0148C1.79135 11.1451 1.6823 11.3182 1.63043 11.5115C1.57855 11.7049 1.58626 11.9094 1.65255 12.0982C1.71884 12.2871 1.84062 12.4515 2.00194 12.57L4.29694 14.1975L5.93194 16.5C6.04939 16.6639 6.21393 16.7883 6.4037 16.8564C6.59348 16.9246 6.79951 16.9335 6.99443 16.8818C7.18935 16.8301 7.36393 16.7204 7.49499 16.5671C7.62605 16.4138 7.70739 16.2243 7.72819 16.0238L7.95694 13.7513L10.1132 11.595L12.8769 17.1188C12.9474 17.2594 13.0502 17.3812 13.1769 17.4744C13.3036 17.5675 13.4506 17.6292 13.6058 17.6545C13.761 17.6798 13.92 17.6678 14.0697 17.6197C14.2194 17.5715 14.3556 17.4885 14.4669 17.3775L15.3632 16.5C15.527 16.3387 15.6473 16.1386 15.7129 15.9183C15.7785 15.698 15.7872 15.4646 15.7382 15.24L14.0732 7.63502L17.0019 4.69877C17.6612 4.04208 18.0709 3.17617 18.1607 2.25002C18.1868 1.993 18.1553 1.73339 18.0684 1.49011C17.9814 1.24683 17.8413 1.02602 17.6582 0.843769ZM16.2144 3.90002L13.2144 6.90002C13.0957 7.01724 13.0087 7.16268 12.9614 7.3227C12.9142 7.48273 12.9084 7.65212 12.9444 7.81502L14.6207 15.4763C14.6301 15.5161 14.6292 15.5577 14.6181 15.5971C14.6069 15.6364 14.5859 15.6723 14.5569 15.7013L13.8069 16.4513L11.0357 10.9238C10.9655 10.7832 10.8629 10.6614 10.7364 10.5682C10.61 10.4749 10.4632 10.413 10.3082 10.3875C10.2558 10.3832 10.2031 10.3832 10.1507 10.3875C9.88743 10.3883 9.63522 10.4935 9.44944 10.68L7.13194 12.9975C6.97016 13.1599 6.86947 13.3732 6.84694 13.6013L6.64819 15.57L5.21194 13.5413C5.14682 13.451 5.06695 13.3724 4.97569 13.3088L2.95069 11.8725L4.91944 11.6738C5.14754 11.6512 5.36083 11.5506 5.52319 11.3888L7.84069 9.07127C7.9517 8.95989 8.0347 8.82375 8.08285 8.67405C8.131 8.52435 8.14294 8.36535 8.11768 8.21014C8.09242 8.05493 8.03069 7.90792 7.93755 7.78121C7.84442 7.6545 7.72254 7.55171 7.58194 7.48127L2.05069 4.69502L2.80069 3.94502C2.83004 3.91667 2.86593 3.89602 2.90519 3.88489C2.94444 3.87377 2.98584 3.87253 3.02569 3.88127L10.6869 5.55752C10.8495 5.59406 11.0187 5.5888 11.1787 5.54224C11.3387 5.49568 11.4843 5.40934 11.6019 5.29127L14.6019 2.29127C15.0769 1.81663 15.7032 1.52339 16.3719 1.46252C16.4621 1.45448 16.5529 1.46632 16.638 1.49722C16.7231 1.52811 16.8004 1.57729 16.8644 1.6413C16.9284 1.70531 16.9776 1.78259 17.0085 1.86768C17.0394 1.95277 17.0512 2.0436 17.0432 2.13377C16.9813 2.80299 16.6867 3.42933 16.2107 3.90377L16.2144 3.90002Z" fill="#1E1E1E"/>
									</svg>

									<span className="max-sm:text-[12px] ">{t("cairo")}</span>

									</div>

									<div className="flex justify-around items-center py-2">
									<span className="text-[12px]  text-[#1E1E1E] w-[40%]">
										{tomorrow}
									</span>
                                    <button className="btn-hover md:w-[60%] md:h-[30px] max-sm:w-[60%] max-sm:h-[30px] rounded-xl text-white"
									onClick={navigateFightTripone}
									>
                                       {t("select")}
									</button>
                                      
									</div>
								</div>
							</div>
						</div>

						<div className="xl:w-[23%]  lg:w-[23%] md:w-[23%] max-md:w-[23%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229] md:text-[12px]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white  pt-4 md:pt-2 sm:pt-12  lg:p-4">
								<div className="container w-[95%] text-gray-500 sm:pt-2">
									<div className="w-full  flex justify-between items-center max-sm:gap-2">
							
									<span className="max-sm:text-[12px] md:text-center ">{t("Jeddah")}</span>

									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
									<path d="M17.6582 0.843769C17.4758 0.660884 17.255 0.520904 17.0117 0.433988C16.7685 0.347071 16.5089 0.315399 16.2519 0.341269C15.3258 0.43104 14.4599 0.840789 13.8032 1.50002L10.8669 4.43627L3.27694 2.76752C3.05233 2.71891 2.81909 2.72779 2.59883 2.79334C2.37856 2.8589 2.17842 2.979 2.01694 3.14252L1.12819 4.02752C1.01549 4.1386 0.93095 4.27499 0.881598 4.42534C0.832246 4.57569 0.819511 4.73565 0.844455 4.89191C0.869398 5.04818 0.931298 5.19622 1.025 5.32374C1.11871 5.45125 1.24151 5.55454 1.38319 5.62502L6.91069 8.39627L4.75444 10.5525L2.48194 10.7813C2.28297 10.8031 2.09523 10.8845 1.94329 11.0148C1.79135 11.1451 1.6823 11.3182 1.63043 11.5115C1.57855 11.7049 1.58626 11.9094 1.65255 12.0982C1.71884 12.2871 1.84062 12.4515 2.00194 12.57L4.29694 14.1975L5.93194 16.5C6.04939 16.6639 6.21393 16.7883 6.4037 16.8564C6.59348 16.9246 6.79951 16.9335 6.99443 16.8818C7.18935 16.8301 7.36393 16.7204 7.49499 16.5671C7.62605 16.4138 7.70739 16.2243 7.72819 16.0238L7.95694 13.7513L10.1132 11.595L12.8769 17.1188C12.9474 17.2594 13.0502 17.3812 13.1769 17.4744C13.3036 17.5675 13.4506 17.6292 13.6058 17.6545C13.761 17.6798 13.92 17.6678 14.0697 17.6197C14.2194 17.5715 14.3556 17.4885 14.4669 17.3775L15.3632 16.5C15.527 16.3387 15.6473 16.1386 15.7129 15.9183C15.7785 15.698 15.7872 15.4646 15.7382 15.24L14.0732 7.63502L17.0019 4.69877C17.6612 4.04208 18.0709 3.17617 18.1607 2.25002C18.1868 1.993 18.1553 1.73339 18.0684 1.49011C17.9814 1.24683 17.8413 1.02602 17.6582 0.843769ZM16.2144 3.90002L13.2144 6.90002C13.0957 7.01724 13.0087 7.16268 12.9614 7.3227C12.9142 7.48273 12.9084 7.65212 12.9444 7.81502L14.6207 15.4763C14.6301 15.5161 14.6292 15.5577 14.6181 15.5971C14.6069 15.6364 14.5859 15.6723 14.5569 15.7013L13.8069 16.4513L11.0357 10.9238C10.9655 10.7832 10.8629 10.6614 10.7364 10.5682C10.61 10.4749 10.4632 10.413 10.3082 10.3875C10.2558 10.3832 10.2031 10.3832 10.1507 10.3875C9.88743 10.3883 9.63522 10.4935 9.44944 10.68L7.13194 12.9975C6.97016 13.1599 6.86947 13.3732 6.84694 13.6013L6.64819 15.57L5.21194 13.5413C5.14682 13.451 5.06695 13.3724 4.97569 13.3088L2.95069 11.8725L4.91944 11.6738C5.14754 11.6512 5.36083 11.5506 5.52319 11.3888L7.84069 9.07127C7.9517 8.95989 8.0347 8.82375 8.08285 8.67405C8.131 8.52435 8.14294 8.36535 8.11768 8.21014C8.09242 8.05493 8.03069 7.90792 7.93755 7.78121C7.84442 7.6545 7.72254 7.55171 7.58194 7.48127L2.05069 4.69502L2.80069 3.94502C2.83004 3.91667 2.86593 3.89602 2.90519 3.88489C2.94444 3.87377 2.98584 3.87253 3.02569 3.88127L10.6869 5.55752C10.8495 5.59406 11.0187 5.5888 11.1787 5.54224C11.3387 5.49568 11.4843 5.40934 11.6019 5.29127L14.6019 2.29127C15.0769 1.81663 15.7032 1.52339 16.3719 1.46252C16.4621 1.45448 16.5529 1.46632 16.638 1.49722C16.7231 1.52811 16.8004 1.57729 16.8644 1.6413C16.9284 1.70531 16.9776 1.78259 17.0085 1.86768C17.0394 1.95277 17.0512 2.0436 17.0432 2.13377C16.9813 2.80299 16.6867 3.42933 16.2107 3.90377L16.2144 3.90002Z" fill="#1E1E1E"/>
									</svg>

									<span className="max-sm:text-[12px] ">{t("cairo")}</span>

									</div>

									<div className="flex justify-around items-center py-2">
									<span className="text-[12px]  text-[#1E1E1E] w-[40%]">
										{tomorrow}
									</span>
                                    <button className="btn-hover md:w-[60%] md:h-[30px] max-sm:w-[60%] max-sm:h-[30px] rounded-xl text-white"
									onClick={navigateFightTriptwo}
									>
                                       {t("select")}
									</button>
                                      
									</div>
								</div>
							</div>
						</div>

						<div className="xl:w-[23%]  lg:w-[23%] md:w-[23%] max-md:w-[23%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229] md:text-[12px]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white  pt-4 md:pt-2 sm:pt-12  lg:p-4">
								<div className="container w-[95%] text-gray-500 sm:pt-2">
									<div className="w-full  flex justify-between items-center max-sm:gap-2">
							
									<span className="max-sm:text-[12px] md:text-center ">{t("Aqaba")}</span>

									<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
									<path d="M23.7969 21.7838C23.0209 21.7838 22.6708 21.6095 22.2275 21.3888C22.0446 21.2977 21.8528 21.2024 21.6313 21.1174L24.0062 14.8698C24.191 14.3835 24.1603 13.8395 23.922 13.3771C23.6836 12.9147 23.2582 12.5741 22.755 12.4426L21.1197 12.0154V7.11098C21.1197 6.0817 20.2823 5.24432 19.253 5.24432H16.0257V3.4296C16.0257 1.98491 14.8503 0.80957 13.4056 0.80957H11.5944C10.1497 0.80957 8.97439 1.98491 8.97439 3.4296V5.24427H5.747C4.71772 5.24427 3.88034 6.08165 3.88034 7.11093V12.0154L2.24506 12.4426C1.74177 12.5741 1.31638 12.9147 1.07806 13.3771C0.83975 13.8395 0.809 14.3835 0.993875 14.8698L3.36875 21.1175C3.14731 21.2024 2.9555 21.2977 2.77264 21.3888C2.32934 21.6095 1.97923 21.7839 1.20312 21.7839C0.814812 21.7839 0.5 22.0987 0.5 22.487C0.5 22.8753 0.814812 23.1901 1.20312 23.1901C2.30994 23.1901 2.88875 22.9019 3.39941 22.6477C3.8427 22.427 4.19281 22.2526 4.96892 22.2526C5.74503 22.2526 6.09514 22.427 6.53844 22.6477C7.04909 22.9019 7.62791 23.1901 8.73472 23.1901C9.84148 23.1901 10.4202 22.9019 10.931 22.6477C11.3742 22.427 11.7243 22.2526 12.5003 22.2526C13.2763 22.2526 13.6264 22.427 14.0697 22.6477C14.5803 22.9019 15.1591 23.1901 16.2658 23.1901C17.3726 23.1901 17.9514 22.9019 18.462 22.6477C18.9053 22.427 19.2554 22.2526 20.0314 22.2526C20.8074 22.2526 21.1575 22.427 21.6007 22.6477C22.1114 22.9019 22.6902 23.1901 23.7969 23.1901C24.1852 23.1901 24.5 22.8753 24.5 22.487C24.5 22.0987 24.1852 21.7838 23.7969 21.7838ZM10.3806 3.4296C10.3806 2.76032 10.9251 2.21582 11.5944 2.21582H13.4056C14.0749 2.21582 14.6194 2.76032 14.6194 3.4296V5.24427H10.3806V3.4296ZM5.28655 7.11098C5.28655 6.8571 5.49308 6.65057 5.74695 6.65057H19.253C19.5069 6.65057 19.7134 6.8571 19.7134 7.11098V11.648L12.6777 9.80962C12.5612 9.77919 12.4387 9.77919 12.3222 9.80962L5.2865 11.648L5.28655 7.11098ZM17.8352 21.3888C17.3919 21.6095 17.0418 21.7838 16.2658 21.7838C15.4899 21.7838 15.1398 21.6095 14.6965 21.3888C14.1859 21.1345 13.6071 20.8463 12.5003 20.8463C11.3936 20.8463 10.8148 21.1345 10.3041 21.3888C9.86084 21.6095 9.51073 21.7838 8.73472 21.7838C7.95866 21.7838 7.6085 21.6095 7.16525 21.3888C6.65459 21.1345 6.07578 20.8463 4.96897 20.8463C4.90114 20.8463 4.83533 20.8475 4.77134 20.8495L2.3083 14.3701C2.24919 14.2146 2.29527 14.0849 2.32798 14.0215C2.3607 13.958 2.43959 13.8453 2.60052 13.8032L12.5 11.2166L22.3995 13.8033C22.5604 13.8453 22.6393 13.958 22.672 14.0215C22.7047 14.0849 22.7508 14.2146 22.6917 14.3701L20.2287 20.8496C20.1648 20.8475 20.0991 20.8464 20.0314 20.8464C18.9246 20.8463 18.3458 21.1346 17.8352 21.3888Z" fill="black"/>
									<path d="M18.9992 14.815L12.6764 13.163C12.5599 13.1325 12.4375 13.1325 12.3209 13.163L5.99821 14.815C5.6225 14.9132 5.3975 15.2974 5.49566 15.6731C5.59382 16.0488 5.978 16.2737 6.35371 16.1756L12.4987 14.57L18.6437 16.1756C18.7033 16.1912 18.7631 16.1986 18.8219 16.1986C19.134 16.1986 19.4191 15.9892 19.5017 15.6731C19.5999 15.2974 19.3749 14.9132 18.9992 14.815Z" fill="black"/>
									</svg>

									<span className="max-sm:text-[12px] ">{t("Nuweibaa")}</span>

									</div>

									<div className="flex justify-around items-center py-2">
									<span className="text-[12px]  text-[#1E1E1E] w-[40%]">
										{tomorrow}
									</span>
                                    <button className="btn-hover md:w-[60%] md:h-[30px] max-sm:w-[60%] max-sm:h-[30px] rounded-xl text-white"
									onClick={() => {
										navigate(`/listing-ships?${tomorrow}/76/75/العقبة/نويبع`)
									}}
									>
                                       {t("select")}
									</button>
                                      
									</div>
								</div>
							</div>
						</div>

				
				</div>

				<div className="container w-full m-auto flex flex-col items-center justify-center gap-3  sm:flex-row sm:px-0 mt-5 ">
					{static_trips_row1.map(i => (
						<div className="xl:w-[23%]  lg:w-[23%] md:w-[23%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229] md:text-[10px]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white  pt-4 md:pt-2 sm:pt-12  lg:p-4">
								<div className="container w-[95%] text-gray-500 sm:pt-2">
									<div className="w-full  flex justify-between items-center max-sm:gap-2">
							
									<span className="max-sm:text-[12px] md:text-center text-[12px]">{i.to}</span>
									
									<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
									<g clip-path="url(#clip0_2649_688)">
									<path d="M24.3203 10.7198L23.0836 7.99424C22.6383 7.0251 21.6705 6.40283 20.6039 6.3999H2.87207C1.5625 6.40127 0.501367 7.4624 0.5 8.77197V14.6999C0.500977 15.4175 1.08242 15.9989 1.8 15.9999H3.74004C3.9293 16.9321 4.74883 17.6019 5.7 17.6019C6.65117 17.6019 7.4707 16.9321 7.65996 15.9999H17.34C17.5293 16.9321 18.3488 17.6019 19.3 17.6019C20.2512 17.6019 21.0707 16.9321 21.26 15.9999H23.3881C24.002 15.9993 24.4994 15.5019 24.5 14.888V11.5479C24.5002 11.2622 24.4389 10.9798 24.3203 10.7198ZM23.4531 10.746L19.7 10.4319V8.75186L22.3969 8.41475L23.4531 10.746ZM5.7 16.7999C5.0373 16.7999 4.5 16.2626 4.5 15.5999C4.5 14.9372 5.0373 14.3999 5.7 14.3999C6.36269 14.3999 6.9 14.9372 6.9 15.5999C6.9 16.2626 6.36269 16.7999 5.7 16.7999ZM19.3 16.7999C18.6373 16.7999 18.1 16.2626 18.1 15.5999C18.1 14.9372 18.6373 14.3999 19.3 14.3999C19.9627 14.3999 20.5 14.9372 20.5 15.5999C20.5 16.2626 19.9627 16.7999 19.3 16.7999ZM23.3881 15.1999H21.26C21.0707 14.2677 20.2512 13.5979 19.3 13.5979C18.3488 13.5979 17.5293 14.2677 17.34 15.1999H7.65996C7.4707 14.2677 6.65117 13.5979 5.7 13.5979C4.74883 13.5979 3.9293 14.2677 3.74004 15.1999H1.8C1.52402 15.1995 1.30039 14.9759 1.3 14.6999V8.77197C1.30098 7.904 2.0041 7.20088 2.87207 7.1999H20.6039C21.0691 7.20088 21.5182 7.37002 21.8684 7.67588L19.2752 7.9999H3.7C3.4791 7.9999 3.3 8.179 3.3 8.3999V10.7999C3.3 11.0208 3.4791 11.1999 3.7 11.1999H19.2832L23.7 11.5679V14.888C23.6998 15.0601 23.5602 15.1997 23.3881 15.1999ZM4.1 10.3999V8.7999H6.9V10.3999H4.1ZM7.7 8.7999H10.9V10.3999H7.7V8.7999ZM11.7 8.7999H14.5V10.3999H11.7V8.7999ZM15.3 8.7999H18.9V10.3999H15.3V8.7999Z" fill="#1E1E1E"/>
									</g>
									<defs>
									<clipPath id="clip0_2649_688">
									<rect width="24" height="24" fill="white" transform="translate(0.5)"/>
									</clipPath>
									</defs>
									</svg>

									<span className="max-sm:text-[12px]  text-[12px]">{i.from}</span>

									</div>

									<div className="flex justify-between items-center py-2">
									<span className="text-[12px]  text-[#1E1E1E] w-[50%]">
										{i.date}
									</span>
                                    <button className="btn-hover md:w-[50%] md:h-[30px] max-sm:w-[60%] max-sm:h-[30px] rounded-xl text-white"
									onClick={() => handle_to_search(i.date , i.from ,i.to ,i.from_id , i.to_id)}
									>
                                       {t("select")}
									</button>
                                      
									</div>
								</div>
							</div>
						</div>
					))}

                

				</div>



				<div className="relative mt-10 flex flex-col justify-center  rtl:gap-2 sm:flex-row   ">

				       <img
							className="absolute top-[0px]  hidden lg:block"
							src={wordImg}
						/>
					<div className="mt-18 relative order-2 max-w-2xl flex-shrink-0 sm:order-1 lg:mt-14 lg:w-2/5">
						
					</div>

					{/* <div
						className={`mt-18 order-1 mx-4  max-w-2xl flex-shrink-0 sm:order-2 sm:m-0 lg:mt-14 lg:w-2/5 ${
							type === "type1" ? "lg:pl-10" : "lg:pr-10"
						}`}
					>
						<h2 className="mt-5 text-4xl font-medium text-white ">
							{t("newsletterHeader")}
						</h2>
						<p className="mt-2 w-2/3 text-base text-white">
							{t("newsletterDesc")}
						</p>
						<label className="relative block pb-0 sm:pb-0 px-3 ">
							<span className="sr-only">Search</span>
							<span className="absolute inset-y-0 left-1 flex items-center pl-2 rtl:inset-x-0 rtl:right-0  rtl:translate-x-[-15px]">
								<svg
								className="mx-1"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_522_3491)">
										<path
											d="M23.6612 4.12929C23.32 3.53838 22.7682 3.11937 22.1072 2.94954C21.4464 2.77966 20.7608 2.88077 20.177 3.23407L15.794 5.88635L10.5753 2.45679L6.24263 4.92607L10.2946 9.21415L6.45474 11.5378L4.11385 10.4797L0.646973 12.4813L5.00958 15.4576L8.14463 15.6L22.6945 7.59438C23.2924 7.26536 23.7226 6.72227 23.906 6.06499C24.0894 5.40771 24.0025 4.72024 23.6612 4.12929ZM22.5515 5.68708C22.4705 5.97733 22.2806 6.21715 22.0166 6.36237L7.81327 14.1773L5.47219 14.071L3.28749 12.5805L4.19208 12.0582L6.54975 13.1239L12.5136 9.51494L8.49418 5.26137L10.5231 4.10505L15.7631 7.54858L20.905 4.43702C21.1628 4.28107 21.4655 4.23649 21.7573 4.3114C22.0492 4.3864 22.2928 4.57137 22.4434 4.83232C22.5941 5.09332 22.6325 5.39688 22.5515 5.68708Z"
											fill="#B9C4D5"
										/>
										<path
											d="M21.3286 20.137H0V21.5432H21.3286V20.137Z"
											fill="#B9C4D5"
										/>
									</g>
									<defs>
										<clipPath id="clip0_522_3491">
											<rect width="24" height="24" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</span>
							<input
								className="border-1 before:content-before mt-5 block rounded-none border border-white bg-transparent bg-white px-8 py-4   text-base text-white placeholder-white placeholder-opacity-50 shadow-sm placeholder:text-slate-400 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:flex before:items-center before:pl-3 focus:border-transparent focus:outline-none focus:ring-1 rtl:before:inset-x-0 sm:w-3/5 sm:text-sm"
								placeholder={t("newsletterPlaceHolder") || "Enter your email"}
								type="email"
								name="search"
							/>
						</label>
					</div> */}
				</div>
			</div>
		</>
	);
};

export default SectionSteps;
