import React, { FC, useState } from "react";
import ExperiencesSearchForm from "./BusSearchForm";
import RentalCarSearchForm from "./RentalCarSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import MaritimeTransportForm from "./MaritimeTransportForm";
import { useTranslation } from "react-i18next";
export interface HeroSearchFormProps {
	className?: string;
	currentTab?: SearchTab;
	currentPage?: "Bus" | "Cars" | "Maritime transport" | "Flights";
}

export type SearchTab = "" | "Bus" | "Maritime transport" | "Cars" | "Flights";
const tabs: SearchTab[] = ["Flights", "Maritime transport", "Bus", "Cars"];

const SVGS_ICON: any = {
	Flights: (
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M20.6562 3.84377C20.4738 3.66088 20.253 3.5209 20.0098 3.43399C19.7665 3.34707 19.507 3.3154 19.25 3.34127C18.3238 3.43104 17.4579 3.84079 16.8012 4.50002L13.865 7.43627L6.27499 5.76752C6.05038 5.71891 5.81713 5.72779 5.59687 5.79334C5.37661 5.8589 5.17647 5.979 5.01499 6.14252L4.12624 7.02752C4.01354 7.1386 3.929 7.27499 3.87964 7.42534C3.83029 7.57569 3.81756 7.73565 3.8425 7.89191C3.86745 8.04818 3.92934 8.19622 4.02305 8.32374C4.11676 8.45125 4.23956 8.55454 4.38124 8.62502L9.90874 11.3963L7.75249 13.5525L5.47999 13.7813C5.28102 13.8031 5.09327 13.8845 4.94134 14.0148C4.7894 14.1451 4.68035 14.3182 4.62847 14.5115C4.5766 14.7049 4.58431 14.9094 4.6506 15.0982C4.71689 15.2871 4.83867 15.4515 4.99999 15.57L7.29499 17.1975L8.92999 19.5C9.04744 19.6639 9.21198 19.7883 9.40175 19.8564C9.59153 19.9246 9.79755 19.9335 9.99247 19.8818C10.1874 19.8301 10.362 19.7204 10.493 19.5671C10.6241 19.4138 10.7054 19.2243 10.7262 19.0238L10.955 16.7513L13.1112 14.595L15.875 20.1188C15.9454 20.2594 16.0482 20.3812 16.1749 20.4744C16.3016 20.5675 16.4486 20.6292 16.6039 20.6545C16.7591 20.6798 16.9181 20.6678 17.0678 20.6197C17.2175 20.5715 17.3536 20.4885 17.465 20.3775L18.3612 19.5C18.5251 19.3387 18.6454 19.1386 18.7109 18.9183C18.7765 18.698 18.7852 18.4646 18.7362 18.24L17.0712 10.635L20 7.69877C20.6592 7.04208 21.069 6.17617 21.1587 5.25002C21.1849 4.993 21.1533 4.73339 21.0664 4.49011C20.9795 4.24683 20.8393 4.02602 20.6562 3.84377ZM19.2125 6.90002L16.2125 9.90002C16.0938 10.0172 16.0067 10.1627 15.9595 10.3227C15.9123 10.4827 15.9064 10.6521 15.9425 10.815L17.6187 18.4763C17.6282 18.5161 17.6273 18.5577 17.6161 18.5971C17.605 18.6364 17.5839 18.6723 17.555 18.7013L16.805 19.4513L14.0337 13.9238C13.9635 13.7832 13.8609 13.6614 13.7345 13.5682C13.608 13.4749 13.4613 13.413 13.3062 13.3875C13.2538 13.3832 13.2012 13.3832 13.1487 13.3875C12.8855 13.3883 12.6333 13.4935 12.4475 13.68L10.13 15.9975C9.96821 16.1599 9.86752 16.3732 9.84499 16.6013L9.64624 18.57L8.20999 16.5413C8.14487 16.451 8.065 16.3724 7.97374 16.3088L5.94874 14.8725L7.91749 14.6738C8.14559 14.6512 8.35888 14.5506 8.52124 14.3888L10.8387 12.0713C10.9498 11.9599 11.0327 11.8237 11.0809 11.674C11.129 11.5243 11.141 11.3654 11.1157 11.2101C11.0905 11.0549 11.0287 10.9079 10.9356 10.7812C10.8425 10.6545 10.7206 10.5517 10.58 10.4813L5.04874 7.69502L5.79874 6.94502C5.82808 6.91667 5.86398 6.89602 5.90324 6.88489C5.94249 6.87377 5.98389 6.87253 6.02374 6.88127L13.685 8.55752C13.8476 8.59406 14.0168 8.5888 14.1768 8.54224C14.3368 8.49568 14.4824 8.40934 14.6 8.29127L17.6 5.29127C18.075 4.81663 18.7013 4.52339 19.37 4.46252C19.4602 4.45448 19.551 4.46632 19.6361 4.49722C19.7212 4.52811 19.7984 4.57729 19.8625 4.6413C19.9265 4.70531 19.9757 4.78259 20.0065 4.86768C20.0374 4.95277 20.0493 5.0436 20.0412 5.13377C19.9793 5.80299 19.6848 6.42933 19.2087 6.90377L19.2125 6.90002Z"
				fill="#1E1E1E"
			/>
		</svg>
	),
	"Maritime transport": (
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clip-path="url(#clip0_574_6625)">
				<path
					d="M23.7969 21.784C23.0209 21.784 22.6708 21.6096 22.2275 21.3889C22.0446 21.2978 21.8528 21.2025 21.6313 21.1175L24.0062 14.8699C24.191 14.3836 24.1603 13.8396 23.922 13.3772C23.6836 12.9148 23.2582 12.5742 22.755 12.4428L21.1197 12.0155V7.1111C21.1197 6.08182 20.2823 5.24444 19.253 5.24444H16.0257V3.42972C16.0257 1.98504 14.8503 0.809692 13.4056 0.809692H11.5944C10.1497 0.809692 8.97439 1.98504 8.97439 3.42972V5.2444H5.747C4.71772 5.2444 3.88034 6.08177 3.88034 7.11105V12.0155L2.24506 12.4428C1.74177 12.5742 1.31637 12.9148 1.07806 13.3772C0.83975 13.8396 0.809 14.3836 0.993875 14.8699L3.36875 21.1176C3.14731 21.2026 2.9555 21.2979 2.77264 21.3889C2.32934 21.6096 1.97923 21.784 1.20312 21.784C0.814812 21.784 0.5 22.0988 0.5 22.4871C0.5 22.8754 0.814812 23.1903 1.20312 23.1903C2.30994 23.1903 2.88875 22.9021 3.39941 22.6478C3.8427 22.4271 4.19281 22.2528 4.96892 22.2528C5.74503 22.2528 6.09514 22.4271 6.53844 22.6478C7.04909 22.9021 7.62791 23.1903 8.73472 23.1903C9.84148 23.1903 10.4202 22.9021 10.931 22.6478C11.3742 22.4271 11.7243 22.2528 12.5003 22.2528C13.2763 22.2528 13.6264 22.4271 14.0697 22.6478C14.5803 22.9021 15.1591 23.1903 16.2658 23.1903C17.3726 23.1903 17.9514 22.9021 18.462 22.6478C18.9053 22.4271 19.2554 22.2528 20.0314 22.2528C20.8074 22.2528 21.1575 22.4271 21.6007 22.6478C22.1114 22.9021 22.6902 23.1903 23.7969 23.1903C24.1852 23.1903 24.5 22.8754 24.5 22.4871C24.5 22.0988 24.1852 21.784 23.7969 21.784ZM10.3806 3.42972C10.3806 2.76044 10.9251 2.21594 11.5944 2.21594H13.4056C14.0749 2.21594 14.6194 2.76044 14.6194 3.42972V5.2444H10.3806V3.42972ZM5.28655 7.1111C5.28655 6.85722 5.49308 6.65069 5.74695 6.65069H19.253C19.5069 6.65069 19.7134 6.85722 19.7134 7.1111V11.6481L12.6777 9.80974C12.5612 9.77932 12.4387 9.77932 12.3222 9.80974L5.2865 11.6481L5.28655 7.1111ZM17.8352 21.3889C17.3919 21.6096 17.0418 21.784 16.2658 21.784C15.4899 21.784 15.1398 21.6096 14.6965 21.3889C14.1859 21.1346 13.6071 20.8465 12.5003 20.8465C11.3936 20.8465 10.8148 21.1346 10.3041 21.3889C9.86084 21.6096 9.51073 21.784 8.73472 21.784C7.95866 21.784 7.6085 21.6096 7.16525 21.3889C6.65459 21.1346 6.07578 20.8465 4.96897 20.8465C4.90114 20.8465 4.83533 20.8476 4.77134 20.8496L2.3083 14.3702C2.24919 14.2147 2.29527 14.0851 2.32798 14.0216C2.3607 13.9581 2.43959 13.8454 2.60052 13.8033L12.5 11.2167L22.3995 13.8034C22.5604 13.8454 22.6393 13.9581 22.672 14.0216C22.7047 14.0851 22.7508 14.2147 22.6917 14.3703L20.2287 20.8497C20.1648 20.8476 20.0991 20.8465 20.0314 20.8465C18.9246 20.8465 18.3458 21.1347 17.8352 21.3889Z"
					fill="#1E1E1E"
				/>
				<path
					d="M19.0002 14.815L12.6774 13.163C12.5609 13.1325 12.4384 13.1325 12.3219 13.163L5.99918 14.815C5.62348 14.9132 5.39848 15.2974 5.49664 15.6731C5.59479 16.0488 5.97898 16.2737 6.35468 16.1756L12.4997 14.57L18.6447 16.1756C18.7042 16.1912 18.764 16.1986 18.8229 16.1986C19.135 16.1986 19.4201 15.9892 19.5027 15.6731C19.6009 15.2974 19.3759 14.9132 19.0002 14.815Z"
					fill="#1E1E1E"
				/>
			</g>
			<defs>
				<clipPath id="clip0_574_6625">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	),
	Bus: (
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clip-path="url(#clip0_574_6632)">
				<path
					d="M24.3203 10.7199L23.0836 7.99436C22.6383 7.02522 21.6705 6.40295 20.6039 6.40002H2.87207C1.5625 6.40139 0.501367 7.46252 0.5 8.77209V14.7C0.500977 15.4176 1.08242 15.999 1.8 16H3.74004C3.9293 16.9322 4.74883 17.602 5.7 17.602C6.65117 17.602 7.4707 16.9322 7.65996 16H17.34C17.5293 16.9322 18.3488 17.602 19.3 17.602C20.2512 17.602 21.0707 16.9322 21.26 16H23.3881C24.002 15.9994 24.4994 15.502 24.5 14.8881V11.5481C24.5002 11.2623 24.4389 10.9799 24.3203 10.7199ZM23.4531 10.7461L19.7 10.4321V8.75198L22.3969 8.41487L23.4531 10.7461ZM5.7 16.8C5.0373 16.8 4.5 16.2627 4.5 15.6C4.5 14.9373 5.0373 14.4 5.7 14.4C6.36269 14.4 6.9 14.9373 6.9 15.6C6.9 16.2627 6.36269 16.8 5.7 16.8ZM19.3 16.8C18.6373 16.8 18.1 16.2627 18.1 15.6C18.1 14.9373 18.6373 14.4 19.3 14.4C19.9627 14.4 20.5 14.9373 20.5 15.6C20.5 16.2627 19.9627 16.8 19.3 16.8ZM23.3881 15.2H21.26C21.0707 14.2678 20.2512 13.5981 19.3 13.5981C18.3488 13.5981 17.5293 14.2678 17.34 15.2H7.65996C7.4707 14.2678 6.65117 13.5981 5.7 13.5981C4.74883 13.5981 3.9293 14.2678 3.74004 15.2H1.8C1.52402 15.1996 1.30039 14.976 1.3 14.7V8.77209C1.30098 7.90413 2.0041 7.201 2.87207 7.20002H20.6039C21.0691 7.201 21.5182 7.37014 21.8684 7.676L19.2752 8.00002H3.7C3.4791 8.00002 3.3 8.17913 3.3 8.40002V10.8C3.3 11.0209 3.4791 11.2 3.7 11.2H19.2832L23.7 11.568V14.8881C23.6998 15.0602 23.5602 15.1998 23.3881 15.2ZM4.1 10.4V8.80002H6.9V10.4H4.1ZM7.7 8.80002H10.9V10.4H7.7V8.80002ZM11.7 8.80002H14.5V10.4H11.7V8.80002ZM15.3 8.80002H18.9V10.4H15.3V8.80002Z"
					fill="#1E1E1E"
				/>
			</g>
			<defs>
				<clipPath id="clip0_574_6632">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	),
	Cars: (
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clip-path="url(#clip0_574_6637)">
				<path
					d="M4.99998 13C3.622 13 2.5 14.122 2.5 15.5C2.5 16.878 3.622 18 4.99998 18C6.37797 18 7.49997 16.878 7.49997 15.5C7.49997 14.122 6.37797 13 4.99998 13ZM4.99998 17C4.17297 17 3.49998 16.327 3.49998 15.5C3.49998 14.673 4.17297 14 4.99998 14C5.827 14 6.49998 14.673 6.49998 15.5C6.49998 16.327 5.827 17 4.99998 17Z"
					fill="#1E1E1E"
				/>
				<path
					d="M20 13C18.622 13 17.5 14.122 17.5 15.5C17.5 16.878 18.622 18 20 18C21.378 18 22.5 16.878 22.5 15.5C22.5 14.122 21.378 13 20 13ZM20 17C19.173 17 18.5 16.327 18.5 15.5C18.5 14.673 19.173 14 20 14C20.827 14 21.5 14.673 21.5 15.5C21.5 16.327 20.827 17 20 17Z"
					fill="#1E1E1E"
				/>
				<path
					d="M21.5 9.99998H20.654C20.345 9.99998 20.042 9.894 19.8 9.69998L15.86 6.54797C15.418 6.195 14.863 6 14.298 6H7.07C6.23202 6 5.45502 6.41602 4.99002 7.113L4.139 8.391C3.884 8.772 3.458 9 2.99998 9C1.622 9 0.5 10.122 0.5 11.5V13.5C0.5 14.878 1.622 16 2.99998 16C3.27598 16 3.5 15.776 3.5 15.5C3.5 15.224 3.27598 15 2.99998 15C2.17297 15 1.49998 14.327 1.49998 13.5V11.5C1.49998 10.673 2.17297 9.99998 2.99998 9.99998C3.794 9.99998 4.52998 9.606 4.97098 8.94497L5.822 7.66795C6.101 7.24997 6.56802 6.99994 7.07 6.99994H14.298C14.638 6.99994 14.97 7.11694 15.236 7.32895L19.176 10.4799C19.593 10.815 20.119 10.9999 20.655 10.9999H21.5C22.967 10.9999 23.5 12.4949 23.5 13.4999C23.5 14.4849 22.746 14.9999 22 14.9999C21.724 14.9999 21.5 15.2239 21.5 15.4999C21.5 15.7759 21.724 15.9999 22 15.9999C23.425 16 24.5 14.925 24.5 13.5C24.5 11.803 23.449 9.99998 21.5 9.99998Z"
					fill="#1E1E1E"
				/>
				<path
					d="M18 15H7.00002C6.72402 15 6.5 15.224 6.5 15.5C6.5 15.776 6.72402 16 7.00002 16H18C18.276 16 18.5 15.776 18.5 15.5C18.5 15.224 18.276 15 18 15Z"
					fill="#1E1E1E"
				/>
				<path
					d="M17 10H12.5V8.50002C12.5 8.22402 12.276 8 12 8C11.724 8 11.5 8.22402 11.5 8.50002V10.5C11.5 10.776 11.724 11 12 11H17C17.276 11 17.5 10.776 17.5 10.5C17.5 10.224 17.276 10 17 10Z"
					fill="#1E1E1E"
				/>
				<path
					d="M9.99994 10H6.80892L7.44792 8.72404C7.57092 8.47706 7.47094 8.17706 7.22391 8.05302C6.97589 7.93002 6.67692 8.02902 6.55289 8.27704L5.55291 10.2771C5.47491 10.431 5.48391 10.6161 5.57489 10.7631C5.66588 10.9101 5.82689 11.0001 5.99991 11.0001H9.99989C10.2759 11.0001 10.4999 10.776 10.4999 10.5C10.4999 10.224 10.2759 10 9.99994 10Z"
					fill="#1E1E1E"
				/>
				<path
					d="M14 12H13C12.724 12 12.5 12.224 12.5 12.5C12.5 12.776 12.724 13 13 13H14C14.276 13 14.5 12.776 14.5 12.5C14.5 12.224 14.276 12 14 12Z"
					fill="#1E1E1E"
				/>
			</g>
			<defs>
				<clipPath id="clip0_574_6637">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	),
};
const HeroSearchForm: FC<HeroSearchFormProps> = ({
	className = "",
	currentTab = "",
	currentPage,
}) => {
	const [tabActive, setTabActive] = useState<SearchTab>(currentTab);
	window.removeEventListener("storage", () => {});
	function handleActiveTab() {
		switch (tabActive) {
			case "Flights":
				sessionStorage.setItem("currentActiveTab", "Flights");
				break;
			case "Bus":
				sessionStorage.setItem("currentActiveTab", "Bus");
				break;
			case "Cars":
				sessionStorage.setItem("currentActiveTab", "Cars");
				break;
			case "Maritime transport":
				sessionStorage.setItem("currentActiveTab", "Maritime transport");
				break;
		}
		window.dispatchEvent(new Event("storage"));
	}
	handleActiveTab();
	const { t } = useTranslation();

	const renderTab = () => {
		return (
			<ul className="hiddenScrollbar ml-2  flex w-full overflow-x-auto sm:mt-6 sm:mb-0 sm:justify-around sm:gap-8 sm:pt-0  ">
				{tabs.map((tab: any) => {
					const active = tab === tabActive;
					return (
						<li
							onClick={() => setTabActive(tab)}
							className={`inline-flex min-w-fit cursor-pointer items-center rounded-full  text-sm font-normal text-neutral-700  hover:bg-neutral-100 hover:text-neutral-900 sm:py-2 sm:px-4 xl:px-5 xl:text-base ${
								active
									? "pointer-events-none bg-[#E8ECF2] !text-neutral-900 "
									: ""
							}

								`}
							key={tab}
						>
							<span
								className={`flex min-w-fit  gap-1 ltr:mx-4 ltr:py-2 rtl:ml-2 sm:gap-2  ${
									tab === tabs[1] ? "w-fit" : ""
								}`}
							>
								{SVGS_ICON[tab]}
								<span className="w-full">{t(tab)}</span>
							</span>
						</li>
					);
				})}
			</ul>
		);
	};

	const renderForm = () => {
		const isArchivePage = !!currentPage && !!currentTab;
		switch (tabActive) {
			case "Bus":
				return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
			case "Cars":
				return <RentalCarSearchForm haveDefaultValue={isArchivePage} />;
			case "Flights":
				return <FlightSearchForm haveDefaultValue={isArchivePage} />;
			case "Maritime transport":
				return <MaritimeTransportForm haveDefaultValue={isArchivePage} />;
			default:
				return (
					<FlightSearchForm disabled={true} haveDefaultValue={isArchivePage} />
				);
		}
	};

	return (
		<div
			className={`   w-[80vw] nc-HeroSearchForm max-sm:w-[100%]  max-w-full py-5 max-sm:h-[450px] lg:py-0   ${className} rounded-t-2xl bg-white lg:rounded-b-2xl
			rounded-b-2xl
			`}
			data-nc-id="HeroSearchForm"
		>
			{renderTab()}
			{renderForm()}
		</div>
	);
};

export default HeroSearchForm;