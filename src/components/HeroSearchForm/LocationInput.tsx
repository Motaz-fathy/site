import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";
import ClearDataButton from "./ClearDataButton";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { showApiErrorMessages } from "utils";
import {
	getCities,
	getCitiesMaritime,
	getCitiesPrivate,
	getFlightsTrips,
	getFlightsLocation,
	getFlightsCountries,
} from "api";
import { Cities } from "types";
import { toast } from "react-toastify";
import i18next from "i18next";

export interface LocationInputProps {
	defaultValue: string;
	onChange?: (value: string) => void;
	onInputDone?: (value: any) => void;
	placeHolder?: string;
	desc?: string;
	className?: string;
	autoFocus?: boolean;
	type?: string;
	setDropOffInputValue?: any;
	setPickUpInputValue?: any;
	noPlaceHolder?: boolean;
	typeIcon?: string;
}

const SVGS_ICON: any = {
	flight: {
		from: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_574_6665)">
					<path
						d="M23.6617 4.12923C23.3205 3.53832 22.7687 3.1193 22.1077 2.94948C21.4468 2.7796 20.7613 2.88071 20.1775 3.23401L15.7945 5.88629L10.5758 2.45673L6.24312 4.92601L10.2951 9.21409L6.45523 11.5377L4.11434 10.4796L0.647461 12.4812L5.01007 15.4576L8.14512 15.6L22.695 7.59432C23.2929 7.2653 23.7231 6.72221 23.9065 6.06493C24.0899 5.40765 24.003 4.72018 23.6617 4.12923ZM22.552 5.68702C22.471 5.97727 22.2811 6.21709 22.0171 6.3623L7.81376 14.1773L5.47268 14.0709L3.28798 12.5804L4.19257 12.0581L6.55024 13.1238L12.5141 9.51488L8.49467 5.2613L10.5236 4.10499L15.7636 7.54852L20.9055 4.43696C21.1633 4.28101 21.466 4.23643 21.7578 4.31134C22.0497 4.38634 22.2933 4.5713 22.4439 4.83226C22.5946 5.09326 22.633 5.39682 22.552 5.68702Z"
						fill="#B9C4D5"
					/>
					<path
						d="M21.3286 20.1371H0V21.5433H21.3286V20.1371Z"
						fill="#B9C4D5"
					/>
				</g>
				<defs>
					<clipPath id="clip0_574_6665">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		),
		to: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21.126 12.871C20.8309 12.2547 20.3121 11.7939 19.6653 11.5734L14.8093 9.91832L14.0808 3.70735L9.39769 1.97308L8.71641 7.84168L4.46222 6.39171L3.76712 3.91486L0 2.54378L0.524995 7.80629L2.43382 10.3029L17.9408 16.3113C18.237 16.4261 18.5452 16.4832 18.8529 16.4832C19.2072 16.4832 19.5608 16.4074 19.8939 16.2562C20.5161 15.9738 20.9876 15.4647 21.2212 14.8225C21.4549 14.1804 21.4212 13.4873 21.126 12.871ZM19.8979 14.3409C19.7947 14.6244 19.5866 14.8492 19.3119 14.9739C19.0372 15.0986 18.731 15.1073 18.4495 14.9983L3.31187 9.13298L1.88647 7.26864L1.62359 4.63331L2.60651 4.9911L3.30662 7.48572L9.91397 9.73762L10.5898 3.91617L12.7827 4.72828L13.5141 10.9646L19.2109 12.9062C19.4964 13.0036 19.7255 13.207 19.8558 13.4792C19.9862 13.7513 20.0011 14.0573 19.8979 14.3409Z"
					fill="#B9C4D5"
				/>
				<path
					d="M24.0003 20.6187H2.6416V22.0269H24.0003V20.6187Z"
					fill="#B9C4D5"
				/>
				<path
					d="M3.72598 11.4483C2.7441 11.4483 1.94531 12.2471 1.94531 13.229C1.94531 14.2108 2.74415 15.0096 3.72598 15.0096C4.70782 15.0096 5.50665 14.2109 5.50665 13.229C5.50665 12.2471 4.70786 11.4483 3.72598 11.4483ZM3.72598 13.6015C3.52058 13.6014 3.35347 13.4343 3.35347 13.229C3.35347 13.0236 3.52058 12.8565 3.72598 12.8565C3.93139 12.8565 4.09849 13.0236 4.09849 13.229C4.09849 13.4343 3.93139 13.6015 3.72598 13.6015Z"
					fill="#B9C4D5"
				/>
				<path
					d="M7.22794 12.7182C6.24605 12.7182 5.44727 13.517 5.44727 14.4989C5.44727 15.4808 6.2461 16.2795 7.22794 16.2795C8.20977 16.2795 9.00861 15.4807 9.00861 14.4989C9.00861 13.517 8.20982 12.7182 7.22794 12.7182ZM7.22789 14.8714C7.02248 14.8714 6.85538 14.7043 6.85538 14.4989C6.85538 14.2935 7.02248 14.1264 7.22789 14.1264C7.43329 14.1264 7.6004 14.2935 7.6004 14.4989C7.6004 14.7042 7.43329 14.8714 7.22789 14.8714Z"
					fill="#B9C4D5"
				/>
				<path
					d="M15.0443 15.7466C14.0625 15.7466 13.2637 16.5454 13.2637 17.5273C13.2637 18.5092 14.0625 19.308 15.0443 19.308C16.0262 19.308 16.825 18.5091 16.825 17.5273C16.825 16.5455 16.0262 15.7466 15.0443 15.7466ZM15.0443 17.8998C14.8389 17.8998 14.6718 17.7327 14.6718 17.5273C14.6718 17.3219 14.8389 17.1548 15.0443 17.1548C15.2497 17.1548 15.4169 17.3219 15.4169 17.5273C15.4169 17.7327 15.2497 17.8998 15.0443 17.8998Z"
					fill="#B9C4D5"
				/>
			</svg>
		),
	},
	maritime: {
		from: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_574_11291)">
					<path
						d="M23.2019 17.8113C22.8721 17.5813 22.4206 17.2662 21.5995 17.2662C20.7784 17.2662 20.3268 17.5813 19.997 17.8113C19.8263 17.9304 19.704 18.0155 19.5415 18.0622L22.259 12.185L18.686 10.5902V4.5422H16.0362V0.318298H7.9635V4.5422H5.31369V10.5901L1.74068 12.1849L4.45823 18.0623C4.29543 18.0157 4.17305 17.9305 4.00219 17.8113C3.67247 17.5813 3.22093 17.2662 2.39988 17.2662C1.57887 17.2662 1.12733 17.5813 0.797616 17.8113C0.527619 17.9997 0.378933 18.1034 0 18.1034V19.5097C0.821006 19.5097 1.27255 19.1946 1.60226 18.9646C1.87226 18.7762 2.02095 18.6725 2.39988 18.6725C2.77881 18.6725 2.92754 18.7762 3.19754 18.9646C3.52726 19.1946 3.9788 19.5097 4.79985 19.5097C5.62086 19.5097 6.0724 19.1946 6.40211 18.9646C6.67211 18.7762 6.8208 18.6725 7.19973 18.6725C7.57866 18.6725 7.72739 18.7762 7.99739 18.9646C8.32711 19.1946 8.77865 19.5097 9.5997 19.5097C10.4207 19.5097 10.8722 19.1946 11.202 18.9646C11.4719 18.7762 11.6206 18.6725 11.9995 18.6725C12.3785 18.6725 12.5272 18.7762 12.7971 18.9646C13.1269 19.1946 13.5784 19.5097 14.3994 19.5097C15.2205 19.5097 15.672 19.1946 16.0017 18.9646C16.2717 18.7762 16.4204 18.6725 16.7994 18.6725C17.1783 18.6725 17.327 18.7762 17.597 18.9646C17.9268 19.1946 18.3783 19.5097 19.1993 19.5097C20.0204 19.5097 20.4719 19.1946 20.8017 18.9646C21.0718 18.7762 21.2205 18.6725 21.5996 18.6725C21.9786 18.6725 22.1273 18.7762 22.3974 18.9646C22.7271 19.1946 23.1787 19.5097 23.9998 19.5097V18.1034C23.6207 18.1034 23.4719 17.9997 23.2019 17.8113ZM9.36973 1.72453H14.63V4.5422H9.36973V1.72453ZM6.71992 5.94844H17.2798V9.96248L11.9999 7.60582L6.71992 9.96248V5.94844ZM18.1779 17.6606C17.8681 17.464 17.45 17.2662 16.7993 17.2662C15.9783 17.2662 15.5267 17.5813 15.197 17.8113C14.927 17.9997 14.7783 18.1034 14.3994 18.1034C14.0205 18.1034 13.8717 17.9997 13.6018 17.8113C13.2721 17.5813 12.8205 17.2662 11.9995 17.2662C11.1785 17.2662 10.7269 17.5813 10.3972 17.8113C10.1273 17.9997 9.97854 18.1034 9.59965 18.1034C9.22072 18.1034 9.07199 17.9997 8.80199 17.8113C8.47228 17.5813 8.02073 17.2662 7.19968 17.2662C6.54944 17.2662 6.13141 17.4638 5.82162 17.6603L3.61519 12.8882L11.2967 9.45961V14.6345H12.703V9.45961L20.3845 12.8882L18.1779 17.6606Z"
						fill="#B9C4D5"
					/>
					<path
						d="M23.2021 21.9833C22.8723 21.7533 22.4208 21.4382 21.5997 21.4382C20.7786 21.4382 20.327 21.7533 19.9972 21.9833C19.7272 22.1718 19.5784 22.2755 19.1994 22.2755C18.8205 22.2755 18.6718 22.1717 18.4018 21.9834C18.0721 21.7533 17.6205 21.4382 16.7995 21.4382C15.9784 21.4382 15.5269 21.7533 15.1971 21.9834C14.9271 22.1718 14.7784 22.2755 14.3995 22.2755C14.0206 22.2755 13.8718 22.1717 13.6019 21.9834C13.2722 21.7533 12.8206 21.4382 11.9996 21.4382C11.1786 21.4382 10.727 21.7533 10.3973 21.9834C10.1274 22.1718 9.97863 22.2755 9.59975 22.2755C9.22081 22.2755 9.07208 22.1717 8.80208 21.9834C8.47237 21.7533 8.02083 21.4382 7.19978 21.4382C6.37872 21.4382 5.92718 21.7533 5.59747 21.9834C5.32752 22.1718 5.17878 22.2755 4.7999 22.2755C4.42096 22.2755 4.27228 22.1717 4.00228 21.9834C3.67257 21.7533 3.22102 21.4382 2.39993 21.4382C1.57887 21.4382 1.12733 21.7533 0.797616 21.9834C0.527666 22.1718 0.378933 22.2755 0 22.2755V23.6817C0.821053 23.6817 1.27259 23.3666 1.60231 23.1366C1.87226 22.9482 2.02099 22.8445 2.39993 22.8445C2.77886 22.8445 2.92759 22.9482 3.19759 23.1366C3.5273 23.3666 3.97884 23.6817 4.7999 23.6817C5.6209 23.6817 6.07244 23.3666 6.40216 23.1366C6.67211 22.9482 6.82084 22.8445 7.19978 22.8445C7.57871 22.8445 7.72744 22.9482 7.99739 23.1366C8.32711 23.3666 8.77865 23.6817 9.59975 23.6817C10.4208 23.6817 10.8723 23.3666 11.2021 23.1366C11.472 22.9482 11.6207 22.8445 11.9996 22.8445C12.3785 22.8445 12.5272 22.9482 12.7972 23.1366C13.1269 23.3666 13.5785 23.6817 14.3995 23.6817C15.2205 23.6817 15.6721 23.3666 16.0018 23.1366C16.2718 22.9482 16.4205 22.8445 16.7995 22.8445C17.1784 22.8445 17.3271 22.9482 17.5971 23.1366C17.9268 23.3666 18.3783 23.6817 19.1994 23.6817C20.0205 23.6817 20.4721 23.3666 20.8018 23.1366C21.0718 22.9482 21.2206 22.8445 21.5997 22.8445C21.9787 22.8445 22.1274 22.9482 22.3975 23.1366C22.7272 23.3666 23.1788 23.6817 23.9999 23.6817V22.2755C23.6209 22.2755 23.4721 22.1717 23.2021 21.9833Z"
						fill="#B9C4D5"
					/>
					<path
						d="M9.23339 13.3382C9.62171 13.3382 9.93651 13.0234 9.93651 12.6351C9.93651 12.2468 9.62171 11.932 9.23339 11.932C8.84507 11.932 8.53027 12.2468 8.53027 12.6351C8.53027 13.0234 8.84507 13.3382 9.23339 13.3382Z"
						fill="#B9C4D5"
					/>
				</g>
				<defs>
					<clipPath id="clip0_574_11291">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		),
	},
	Bus: {
		from: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_574_9767)">
					<path
						d="M21.0225 3.50292V0H2.9775V3.50292H0V8.14683H1.40625V4.90917H2.9775V24H8.53097V20.7598H15.4691V24H21.0225V4.90917H22.5938V8.14683H24V3.50292H21.0225ZM4.38375 4.90917H11.2969V12.1726H4.38375V4.90917ZM7.12472 22.5938H4.38375V20.7598H7.12472V22.5938ZM19.6163 22.5938H16.8753V20.7598H19.6163V22.5938ZM19.6163 19.3536H4.38375V13.5789H19.6163V19.3536ZM19.6163 12.1726H12.7031V4.90917H19.6163V12.1726ZM19.6163 3.50292H4.38375V1.40625H19.6163V3.50292Z"
						fill="#B9C4D5"
					/>
					<path
						d="M9.57562 15.15H6.10547V16.5563H9.57562V15.15Z"
						fill="#B9C4D5"
					/>
					<path
						d="M17.895 15.15H14.4248V16.5563H17.895V15.15Z"
						fill="#B9C4D5"
					/>
				</g>
				<defs>
					<clipPath id="clip0_574_9767">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		),
	},
	private: {
		from: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_574_7521)">
					<path
						d="M23.7872 8.68299C23.5085 8.20725 23.0129 7.92319 22.4616 7.92319H20.6093L19.4308 4.64485H16.3218L15.0286 2.10657H8.97143L7.67824 4.64485H4.56926L3.39068 7.92319H1.53846C0.987072 7.92319 0.491557 8.20721 0.212885 8.68299C-0.0657869 9.15877 -0.0711776 9.72994 0.198541 10.2109L0.677651 11.0652V21.8934H5.76673V18.6299H18.2333V21.8934H23.3224V11.0652L23.8015 10.2109C24.0712 9.72994 24.0658 9.15877 23.7872 8.68299ZM9.83318 3.51268H14.1669L14.7437 4.64485H9.25638L9.83318 3.51268ZM5.55804 6.051H18.4421L19.9259 10.1785H4.07417L5.55804 6.051ZM1.42498 9.52308C1.40079 9.47991 1.40117 9.43636 1.4262 9.39366C1.45123 9.35096 1.48896 9.3293 1.53846 9.3293H2.88518L2.57993 10.1784H1.79248L1.42498 9.52308ZM4.36062 20.4873H2.08381V18.6299H4.36062V20.4873ZM21.9162 20.4873H19.6394V18.6299H21.9162V20.4873ZM21.9162 17.2237H2.08381V11.5846H21.9162V17.2237ZM22.575 9.52308L22.2075 10.1784H21.4201L21.1148 9.3293H22.4616C22.5111 9.3293 22.5488 9.35096 22.5739 9.39366C22.5988 9.43641 22.5992 9.47996 22.575 9.52308Z"
						fill="#B9C4D5"
					/>
					<path
						d="M7.3489 13.4861H3.94043V14.8923H7.3489V13.4861Z"
						fill="#B9C4D5"
					/>
					<path
						d="M20.0593 13.4861H16.6509V14.8923H20.0593V13.4861Z"
						fill="#B9C4D5"
					/>
				</g>
				<defs>
					<clipPath id="clip0_574_7521">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		),
	},
};

const LocationInput: FC<LocationInputProps> = ({
	defaultValue,
	autoFocus = false,
	onChange,
	onInputDone,
	placeHolder = "Location",
	desc = "Where are you going?",
	className = "",
	// className = "nc-flex-1.5",
	setDropOffInputValue,
	setPickUpInputValue,
	type,
	noPlaceHolder,
	typeIcon,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { t } = useTranslation();
	const [value, setValue] = useState(defaultValue);
	const [showPopover, setShowPopover] = useState(autoFocus);
	const [cities, setCities] = useState<Cities[]>([]);
	const [citiesWrapper, setCitiesWrapper] = useState<Cities[]>([]);
   
	
	const searchFlightItems = async (value: string) => {
		if (!!value) {
			await getFlightsCountries(value).then((res: any) => {
				if (res?.data?.data) {
					setCities(res?.data?.data);
				}
			});
		}
	};
	// console.log(cities,"cities")
    useEffect(() => {
		if(type === 'flight') {
			searchFlightItems(value)
		}
		else {
			searchItems(value)
		}
	} , [value]) 

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	useEffect(() => {
		setShowPopover(autoFocus);
	}, [autoFocus]);

	useEffect(() => {
		if (eventClickOutsideDiv) {
			document.removeEventListener("click", eventClickOutsideDiv);
		}
		showPopover && document.addEventListener("click", eventClickOutsideDiv);
		return () => {
			document.removeEventListener("click", eventClickOutsideDiv);
		};
	}, [showPopover]);

	useEffect(() => {
		if (showPopover && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showPopover]);
	const searchItems = (value: string) => {
		if (!!cities && !!value) {
			const filteredData = cities.filter((item: any) => {
				return Object.values(item)
					.join("")
					.toLowerCase()
					.includes(value.toLowerCase());
			});
			setCities(filteredData);
		} else {
			setCities(citiesWrapper);
		}
	};
	const eventClickOutsideDiv = (event: MouseEvent) => {
		if (!containerRef.current) return;
		// CLICK IN_SIDE
		if (!showPopover || containerRef.current.contains(event.target as Node)) {
			return;
		}
		// CLICK OUT_SIDE
		setShowPopover(false);
	};

	const { data } = useQuery(
		["getCities"],
		() => {
			if (type === "maritime") {
				return getCitiesMaritime();
			} else if (type === "private") {
				return getCitiesPrivate();
			} else if (type === "flight") {
				return getCities();
			} else {
				return getCities();
			}
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (type === "maritime") {
					const filteredData = response?.data?.data?.filter((item: any) => {
						return Object.values(item).join("").toLowerCase().includes("نويبع");
					});
					const filteredData2 = response?.data?.data?.filter((item: any) => {
						return Object.values(item)
							.join("")
							.toLowerCase()
							.includes("العقبة");
					});
					setDropOffInputValue(filteredData2?.[0]);
					setPickUpInputValue(filteredData?.[0]);
				}
				setCities(response?.data?.data);
				setCitiesWrapper(response?.data?.data);
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
			},
		},
	);
	const handleSelectLocation = (item: any) => {
		const name =
			i18next.language === "en"
				? item?.name_en ?? item?.name
				: item?.name_ar ?? item?.name;
		setValue(name);
		onInputDone && onInputDone(item);
		// onChange && onChange(i9tem.value);
		setShowPopover(false);
	};

	const renderRecentSearches = () => {
		return (
			<>
				<h3 className="mt-2 block px-4 text-base font-semibold text-neutral-800 dark:text-neutral-100 sm:mt-0 sm:px-8 sm:text-lg ">
					{t("availableCities")}
				</h3>
				<div className="mt-2 w-[100%] ">
					{cities?.length! > 0 &&
						cities!.map((item: any) => (
							<span
								onClick={() => handleSelectLocation(item)}
								key={item?.id}
								className="mt-0  flex cursor-pointer items-center space-x-3 bg-white px-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 sm:space-x-4 sm:px-8 sm:py-5 w-[100%]"
							>
								<span className="block text-neutral-400">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 sm:h-6 sm:w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</span>
								<span className="block text-[16px] text-neutral-700 dark:text-neutral-200">
									{i18next.language === "en"
										? item?.name_en ?? item?.name
										: item?.name_ar ?? item?.name}
								</span>
							</span>
						))}
				</div>
			</>
		);
	};

	const renderSearchValue = () => {
		
		return (
			<>
				{cities?.length! > 0 &&
					cities!.map((item: any) => (
						<span
							onClick={() => handleSelectLocation(item)}
							key={item?.code}
							className="flex cursor-pointer items-center  space-x-3 px-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 sm:space-x-4 sm:px-8 sm:py-5"
						>
							<span className="block text-neutral-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 sm:h-6 sm:w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</span>
							<span className="block font-medium text-neutral-700 dark:text-neutral-200 text-[16px]">
								{
								i18next.language === "en"
									? item?.name_en ?? item?.name
									: item?.name_ar ?? item?.name
								}

								<span className="ml-2 rtl:mr-2">
									(
										{
								    i18next.language === "en"
									? item?.name_en ?? item?.id
									: item?.name_ar ?? item?.id
								      }
									)
								</span>

								<span className="ml-2 rtl:mr-2 text-[12px]">
									
										{
								    i18next.language === "en"
									? item?.name_en ?? item?.countryName
									: item?.name_ar ?? item?.countryName
								      }
									
								</span>

                                    
									
							</span>
						</span>
					))}
			</>
		);
	};

	return (
		<div
			className={`relative flex ${className} h-[56px] justify-between  lg:w-[19vw]`}
			ref={containerRef}
		>
			<div
				onClick={() => setShowPopover(true)}
				className={`relative flex flex-1  flex-shrink-0 cursor-pointer items-center  space-x-3 rounded-full border-[1px] border-[#E8ECF2] pl-2 text-left focus:outline-none sm:rounded-[4px]  ${
					showPopover ? "nc-hero-field-focused" : ""
				} md:h-full`}
			>
				<div className="w-fit text-neutral-300 dark:text-neutral-400 rtl:ml-3 rtl:mr-1 max-sm:rtl:mr-4">
					{type && typeIcon ? (
						typeIcon === "from" ? (
							SVGS_ICON[type ?? ""].from
						) : (
							SVGS_ICON[type ?? ""].to
						)
					) : (
						<svg 
							xmlns="http://www.w3.org/2000/svg"
							className="nc-icon-field "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					)}
				</div>
				<div className="flex-grow ">
					<input
						className={`block  w-[70%] truncate border-none bg-transparent bg-white p-0 placeholder-[#B9C4D5] 
						cursor-pointer
						focus:placeholder-neutral-300  focus:outline-none focus:ring-0 xl:text-lg`}
						placeholder={noPlaceHolder ? placeHolder : ""}
						value={value}
						autoFocus={showPopover}
						// onFocus={e=>console.log(cities,55555555555)}
						onChange={e => {
							setValue(e.currentTarget.value);
							onChange && onChange(e.currentTarget.value);

							if (type === "flight") {
								
								searchFlightItems(e.currentTarget.value);
							} else {
								searchItems(e.currentTarget.value);
							}
						}}
						ref={inputRef}
					/>
					{!noPlaceHolder && (
						<span className="mt-0.5 block text-sm font-light text-neutral-400 ">
							<span className="line-clamp-1">
								{!!value ? placeHolder : desc}
							</span>
						</span>
					)}
					{value && showPopover && (
						<ClearDataButton
							onClick={() => {
								setValue(value);
								onChange && onChange("");
								setCities(citiesWrapper);
							}}
						/>
					)}
				</div>
			</div>
			{
				type !== 'flight' && showPopover  ?
				 <div className="absolute    top-full z-50 mt-3 max-h-96 w-[300px] min-w-[300px] overflow-y-auto rounded-3xl bg-white  py-3 shadow-xl ltr:left-0 rtl:right-0   ">
				{ renderRecentSearches()}
			    </div> :
				null
			}

            {
				type === 'flight' && showPopover && value ?
				 <div className="absolute    top-full z-50 mt-3 max-h-96 w-[300px] min-w-[300px] overflow-y-auto rounded-3xl bg-white  py-3 shadow-xl ltr:left-0 rtl:right-0   ">
				{value && renderSearchValue()}
			    </div> :
				null
			}
		</div>
	);
};

export default LocationInput;