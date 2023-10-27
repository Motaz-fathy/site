import wordImg from "images/wordImg.png";
import rightImgPng from "images/our-features.png";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";

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
		{
			from_id : 1 ,
			to_id : 9 ,
			from : "Cairo" ,
			to : "Sharm El Sheikh",
			date : tomorrow 
		}
		
		
	]

	
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

				<div className="container w-[95%] flex flex-col items-center justify-center gap-4  sm:flex-row sm:px-0 ">
					{static_trips_row1.map(i => (
						<div className="xl:w-[25%]  lg:w-[25%] md:w-[25%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-1 pt-4 sm:pt-12  lg:p-4">
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

				<div className="container w-[95%] flex flex-col items-center justify-center gap-4  sm:flex-row sm:px-0 mt-5">
					
						<div className="xl:w-[25%]  lg:w-[25%] md:w-[25%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-1 pt-4 sm:pt-12  lg:p-4">
								<div className="container w-[95%] text-gray-500 sm:pt-2">
									<div className="w-full  flex justify-between items-center max-sm:gap-2">
							
									<span className="max-sm:text-[12px] md:text-center ">{t("دبى")}</span>

									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
									<path d="M17.6582 0.843769C17.4758 0.660884 17.255 0.520904 17.0117 0.433988C16.7685 0.347071 16.5089 0.315399 16.2519 0.341269C15.3258 0.43104 14.4599 0.840789 13.8032 1.50002L10.8669 4.43627L3.27694 2.76752C3.05233 2.71891 2.81909 2.72779 2.59883 2.79334C2.37856 2.8589 2.17842 2.979 2.01694 3.14252L1.12819 4.02752C1.01549 4.1386 0.93095 4.27499 0.881598 4.42534C0.832246 4.57569 0.819511 4.73565 0.844455 4.89191C0.869398 5.04818 0.931298 5.19622 1.025 5.32374C1.11871 5.45125 1.24151 5.55454 1.38319 5.62502L6.91069 8.39627L4.75444 10.5525L2.48194 10.7813C2.28297 10.8031 2.09523 10.8845 1.94329 11.0148C1.79135 11.1451 1.6823 11.3182 1.63043 11.5115C1.57855 11.7049 1.58626 11.9094 1.65255 12.0982C1.71884 12.2871 1.84062 12.4515 2.00194 12.57L4.29694 14.1975L5.93194 16.5C6.04939 16.6639 6.21393 16.7883 6.4037 16.8564C6.59348 16.9246 6.79951 16.9335 6.99443 16.8818C7.18935 16.8301 7.36393 16.7204 7.49499 16.5671C7.62605 16.4138 7.70739 16.2243 7.72819 16.0238L7.95694 13.7513L10.1132 11.595L12.8769 17.1188C12.9474 17.2594 13.0502 17.3812 13.1769 17.4744C13.3036 17.5675 13.4506 17.6292 13.6058 17.6545C13.761 17.6798 13.92 17.6678 14.0697 17.6197C14.2194 17.5715 14.3556 17.4885 14.4669 17.3775L15.3632 16.5C15.527 16.3387 15.6473 16.1386 15.7129 15.9183C15.7785 15.698 15.7872 15.4646 15.7382 15.24L14.0732 7.63502L17.0019 4.69877C17.6612 4.04208 18.0709 3.17617 18.1607 2.25002C18.1868 1.993 18.1553 1.73339 18.0684 1.49011C17.9814 1.24683 17.8413 1.02602 17.6582 0.843769ZM16.2144 3.90002L13.2144 6.90002C13.0957 7.01724 13.0087 7.16268 12.9614 7.3227C12.9142 7.48273 12.9084 7.65212 12.9444 7.81502L14.6207 15.4763C14.6301 15.5161 14.6292 15.5577 14.6181 15.5971C14.6069 15.6364 14.5859 15.6723 14.5569 15.7013L13.8069 16.4513L11.0357 10.9238C10.9655 10.7832 10.8629 10.6614 10.7364 10.5682C10.61 10.4749 10.4632 10.413 10.3082 10.3875C10.2558 10.3832 10.2031 10.3832 10.1507 10.3875C9.88743 10.3883 9.63522 10.4935 9.44944 10.68L7.13194 12.9975C6.97016 13.1599 6.86947 13.3732 6.84694 13.6013L6.64819 15.57L5.21194 13.5413C5.14682 13.451 5.06695 13.3724 4.97569 13.3088L2.95069 11.8725L4.91944 11.6738C5.14754 11.6512 5.36083 11.5506 5.52319 11.3888L7.84069 9.07127C7.9517 8.95989 8.0347 8.82375 8.08285 8.67405C8.131 8.52435 8.14294 8.36535 8.11768 8.21014C8.09242 8.05493 8.03069 7.90792 7.93755 7.78121C7.84442 7.6545 7.72254 7.55171 7.58194 7.48127L2.05069 4.69502L2.80069 3.94502C2.83004 3.91667 2.86593 3.89602 2.90519 3.88489C2.94444 3.87377 2.98584 3.87253 3.02569 3.88127L10.6869 5.55752C10.8495 5.59406 11.0187 5.5888 11.1787 5.54224C11.3387 5.49568 11.4843 5.40934 11.6019 5.29127L14.6019 2.29127C15.0769 1.81663 15.7032 1.52339 16.3719 1.46252C16.4621 1.45448 16.5529 1.46632 16.638 1.49722C16.7231 1.52811 16.8004 1.57729 16.8644 1.6413C16.9284 1.70531 16.9776 1.78259 17.0085 1.86768C17.0394 1.95277 17.0512 2.0436 17.0432 2.13377C16.9813 2.80299 16.6867 3.42933 16.2107 3.90377L16.2144 3.90002Z" fill="#1E1E1E"/>
									</svg>

									<span className="max-sm:text-[12px] ">{t("القاهرة")}</span>

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

						<div className="xl:w-[25%]  lg:w-[25%] md:w-[25%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-1 pt-4 sm:pt-12  lg:p-4">
								<div className="container w-[95%] text-gray-500 sm:pt-2">
									<div className="w-full  flex justify-between items-center max-sm:gap-2">
							
									<span className="max-sm:text-[12px] md:text-center ">{t("جدة")}</span>

									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
									<path d="M17.6582 0.843769C17.4758 0.660884 17.255 0.520904 17.0117 0.433988C16.7685 0.347071 16.5089 0.315399 16.2519 0.341269C15.3258 0.43104 14.4599 0.840789 13.8032 1.50002L10.8669 4.43627L3.27694 2.76752C3.05233 2.71891 2.81909 2.72779 2.59883 2.79334C2.37856 2.8589 2.17842 2.979 2.01694 3.14252L1.12819 4.02752C1.01549 4.1386 0.93095 4.27499 0.881598 4.42534C0.832246 4.57569 0.819511 4.73565 0.844455 4.89191C0.869398 5.04818 0.931298 5.19622 1.025 5.32374C1.11871 5.45125 1.24151 5.55454 1.38319 5.62502L6.91069 8.39627L4.75444 10.5525L2.48194 10.7813C2.28297 10.8031 2.09523 10.8845 1.94329 11.0148C1.79135 11.1451 1.6823 11.3182 1.63043 11.5115C1.57855 11.7049 1.58626 11.9094 1.65255 12.0982C1.71884 12.2871 1.84062 12.4515 2.00194 12.57L4.29694 14.1975L5.93194 16.5C6.04939 16.6639 6.21393 16.7883 6.4037 16.8564C6.59348 16.9246 6.79951 16.9335 6.99443 16.8818C7.18935 16.8301 7.36393 16.7204 7.49499 16.5671C7.62605 16.4138 7.70739 16.2243 7.72819 16.0238L7.95694 13.7513L10.1132 11.595L12.8769 17.1188C12.9474 17.2594 13.0502 17.3812 13.1769 17.4744C13.3036 17.5675 13.4506 17.6292 13.6058 17.6545C13.761 17.6798 13.92 17.6678 14.0697 17.6197C14.2194 17.5715 14.3556 17.4885 14.4669 17.3775L15.3632 16.5C15.527 16.3387 15.6473 16.1386 15.7129 15.9183C15.7785 15.698 15.7872 15.4646 15.7382 15.24L14.0732 7.63502L17.0019 4.69877C17.6612 4.04208 18.0709 3.17617 18.1607 2.25002C18.1868 1.993 18.1553 1.73339 18.0684 1.49011C17.9814 1.24683 17.8413 1.02602 17.6582 0.843769ZM16.2144 3.90002L13.2144 6.90002C13.0957 7.01724 13.0087 7.16268 12.9614 7.3227C12.9142 7.48273 12.9084 7.65212 12.9444 7.81502L14.6207 15.4763C14.6301 15.5161 14.6292 15.5577 14.6181 15.5971C14.6069 15.6364 14.5859 15.6723 14.5569 15.7013L13.8069 16.4513L11.0357 10.9238C10.9655 10.7832 10.8629 10.6614 10.7364 10.5682C10.61 10.4749 10.4632 10.413 10.3082 10.3875C10.2558 10.3832 10.2031 10.3832 10.1507 10.3875C9.88743 10.3883 9.63522 10.4935 9.44944 10.68L7.13194 12.9975C6.97016 13.1599 6.86947 13.3732 6.84694 13.6013L6.64819 15.57L5.21194 13.5413C5.14682 13.451 5.06695 13.3724 4.97569 13.3088L2.95069 11.8725L4.91944 11.6738C5.14754 11.6512 5.36083 11.5506 5.52319 11.3888L7.84069 9.07127C7.9517 8.95989 8.0347 8.82375 8.08285 8.67405C8.131 8.52435 8.14294 8.36535 8.11768 8.21014C8.09242 8.05493 8.03069 7.90792 7.93755 7.78121C7.84442 7.6545 7.72254 7.55171 7.58194 7.48127L2.05069 4.69502L2.80069 3.94502C2.83004 3.91667 2.86593 3.89602 2.90519 3.88489C2.94444 3.87377 2.98584 3.87253 3.02569 3.88127L10.6869 5.55752C10.8495 5.59406 11.0187 5.5888 11.1787 5.54224C11.3387 5.49568 11.4843 5.40934 11.6019 5.29127L14.6019 2.29127C15.0769 1.81663 15.7032 1.52339 16.3719 1.46252C16.4621 1.45448 16.5529 1.46632 16.638 1.49722C16.7231 1.52811 16.8004 1.57729 16.8644 1.6413C16.9284 1.70531 16.9776 1.78259 17.0085 1.86768C17.0394 1.95277 17.0512 2.0436 17.0432 2.13377C16.9813 2.80299 16.6867 3.42933 16.2107 3.90377L16.2144 3.90002Z" fill="#1E1E1E"/>
									</svg>

									<span className="max-sm:text-[12px] ">{t("القاهرة")}</span>

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

						<div className="xl:w-[25%]  lg:w-[25%] md:w-[25%] sm:w-full max-sm:w-full rounded-xl border-[1px] border-[#FFB229]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-1 pt-4 sm:pt-12  lg:p-4">
								<div className="container w-[95%] text-gray-500 sm:pt-2">
									<div className="w-full  flex justify-between items-center max-sm:gap-2">
							
									<span className="max-sm:text-[12px] md:text-center ">{t("العقبة")}</span>

									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
									<path d="M17.6582 0.843769C17.4758 0.660884 17.255 0.520904 17.0117 0.433988C16.7685 0.347071 16.5089 0.315399 16.2519 0.341269C15.3258 0.43104 14.4599 0.840789 13.8032 1.50002L10.8669 4.43627L3.27694 2.76752C3.05233 2.71891 2.81909 2.72779 2.59883 2.79334C2.37856 2.8589 2.17842 2.979 2.01694 3.14252L1.12819 4.02752C1.01549 4.1386 0.93095 4.27499 0.881598 4.42534C0.832246 4.57569 0.819511 4.73565 0.844455 4.89191C0.869398 5.04818 0.931298 5.19622 1.025 5.32374C1.11871 5.45125 1.24151 5.55454 1.38319 5.62502L6.91069 8.39627L4.75444 10.5525L2.48194 10.7813C2.28297 10.8031 2.09523 10.8845 1.94329 11.0148C1.79135 11.1451 1.6823 11.3182 1.63043 11.5115C1.57855 11.7049 1.58626 11.9094 1.65255 12.0982C1.71884 12.2871 1.84062 12.4515 2.00194 12.57L4.29694 14.1975L5.93194 16.5C6.04939 16.6639 6.21393 16.7883 6.4037 16.8564C6.59348 16.9246 6.79951 16.9335 6.99443 16.8818C7.18935 16.8301 7.36393 16.7204 7.49499 16.5671C7.62605 16.4138 7.70739 16.2243 7.72819 16.0238L7.95694 13.7513L10.1132 11.595L12.8769 17.1188C12.9474 17.2594 13.0502 17.3812 13.1769 17.4744C13.3036 17.5675 13.4506 17.6292 13.6058 17.6545C13.761 17.6798 13.92 17.6678 14.0697 17.6197C14.2194 17.5715 14.3556 17.4885 14.4669 17.3775L15.3632 16.5C15.527 16.3387 15.6473 16.1386 15.7129 15.9183C15.7785 15.698 15.7872 15.4646 15.7382 15.24L14.0732 7.63502L17.0019 4.69877C17.6612 4.04208 18.0709 3.17617 18.1607 2.25002C18.1868 1.993 18.1553 1.73339 18.0684 1.49011C17.9814 1.24683 17.8413 1.02602 17.6582 0.843769ZM16.2144 3.90002L13.2144 6.90002C13.0957 7.01724 13.0087 7.16268 12.9614 7.3227C12.9142 7.48273 12.9084 7.65212 12.9444 7.81502L14.6207 15.4763C14.6301 15.5161 14.6292 15.5577 14.6181 15.5971C14.6069 15.6364 14.5859 15.6723 14.5569 15.7013L13.8069 16.4513L11.0357 10.9238C10.9655 10.7832 10.8629 10.6614 10.7364 10.5682C10.61 10.4749 10.4632 10.413 10.3082 10.3875C10.2558 10.3832 10.2031 10.3832 10.1507 10.3875C9.88743 10.3883 9.63522 10.4935 9.44944 10.68L7.13194 12.9975C6.97016 13.1599 6.86947 13.3732 6.84694 13.6013L6.64819 15.57L5.21194 13.5413C5.14682 13.451 5.06695 13.3724 4.97569 13.3088L2.95069 11.8725L4.91944 11.6738C5.14754 11.6512 5.36083 11.5506 5.52319 11.3888L7.84069 9.07127C7.9517 8.95989 8.0347 8.82375 8.08285 8.67405C8.131 8.52435 8.14294 8.36535 8.11768 8.21014C8.09242 8.05493 8.03069 7.90792 7.93755 7.78121C7.84442 7.6545 7.72254 7.55171 7.58194 7.48127L2.05069 4.69502L2.80069 3.94502C2.83004 3.91667 2.86593 3.89602 2.90519 3.88489C2.94444 3.87377 2.98584 3.87253 3.02569 3.88127L10.6869 5.55752C10.8495 5.59406 11.0187 5.5888 11.1787 5.54224C11.3387 5.49568 11.4843 5.40934 11.6019 5.29127L14.6019 2.29127C15.0769 1.81663 15.7032 1.52339 16.3719 1.46252C16.4621 1.45448 16.5529 1.46632 16.638 1.49722C16.7231 1.52811 16.8004 1.57729 16.8644 1.6413C16.9284 1.70531 16.9776 1.78259 17.0085 1.86768C17.0394 1.95277 17.0512 2.0436 17.0432 2.13377C16.9813 2.80299 16.6867 3.42933 16.2107 3.90377L16.2144 3.90002Z" fill="#1E1E1E"/>
									</svg>

									<span className="max-sm:text-[12px] ">{t("نويبع")}</span>

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
