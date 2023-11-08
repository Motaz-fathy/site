import React, { FC } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import FlightCard from "components/FlightCard/FlightCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import  SelectSortBy  from "components/BusCard/SelectSortBy";

// Define a function component called Dropdown that renders a dropdown menu
function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="w-[220px]">
			<button
				id="dropdownDividerButton"
				data-dropdown-toggle="dropdownDivider"
				className="inline-flex w-full  content-end items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-black "
				style={{
					border: "1px solid black",
					borderRadius: "8px",
					alignItems: "center",
				}}
				type="button"
				onClick={toggleDropdown}
			>
				story by
				<svg
					className="ml-2.5 ml-28 h-2.5 w-2.5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>

			{isOpen && (
				<div
					id="dropdownDivider"
					className="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg  bg-white dark:divide-gray-600 dark:bg-gray-700"
				>
					<ul
						className="py-2 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownDividerButton"
					>
						<li>
							<a
								href="#"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Cheapest
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Fastest
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Departure (Earliest)
							</a>
						</li>
					</ul>
					<div className="py-2">
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Departure (Latest)
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
// Define a props interface for the SectionGridFilterCard component
export interface SectionGridFilterCardProps {
	className?: string;
	city?: string;
	trips: any;
	isLoading: boolean;
	date?: any;
	refavtord_data?: any;
	travelFrom?: any;
	setPage?: any;
	cityFrom?: any;
	travelTo?: any;
	paginationStatus: boolean;
	filterStation: string;
	filterToStation: string;
}

// Define a function component called SectionGridFilterCard that takes in the SectionGridFilterCardProps interface as props
const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
	className = "",
	city,
	trips,
	refavtord_data,
	isLoading,
	travelFrom,
	date,
	setPage,
	cityFrom,
	travelTo,
	paginationStatus,
	filterStation,
	filterToStation,
}) => {
	// Use the useTranslation hook to get the translation function
	const { t } = useTranslation();
	// If the city exists and is not "undefined", use it as the newCity value, otherwise use an empty string
	const newCity = city && city !== "undefined" ? city : "";
	// const tripsCount = trips.reduce((acc: any, trip: any) => {
	// 	const stationsFromLength = trip.stations_from.length;
	// 	const stationsToLength = trip.stations_to.length;
	// 	return acc + stationsFromLength * stationsToLength;
	// }, 0);
	const tripsCount = refavtord_data.length

	function removeDuplicates(travelData: any) {
		const uniqueData = [];
		const keySet: string[] = [];

		for (const item of travelData) {
			const key = `${item.trip_url}`;
			if (!keySet.includes(key)) {
				uniqueData.push(item);
				keySet.push(key);
				
			}
		}

		return uniqueData;
	}
	
	refavtord_data = removeDuplicates(refavtord_data);
	const T_T = parseInt(travelTo)
	const T_F = parseInt(travelFrom)
	const dataUnder = refavtord_data.filter((item: any) => {
		
        if(item.city_from === T_F && item.city_to === T_T ) {
			return item
		} 
		
	})
	return (
		<div
			className={`nc-SectionGridFilterCard ${className} `}
			data-nc-id="SectionGridFilterCard"
		>
				<div className=" lg:flex md:flex max-md:flex sm:hidden max-sm:hidden flex justify-between items-center w-[98%] mb-3 rtl:mr-[3%] ">
                        <div className="flex justify-start items-center">
						<span className="rtl:ml-2">{dataUnder.length} {t("results")} </span>
						</div>
					
				</div>
			<div className="grid grid-cols-1 gap-6 rounded-3xl   lg:dark:bg-black/20 rtl:mr-5">
				{/* The results count and "All tickets" label */}
			
				{/* The flight cards themselves */}
				<FlightCard refactoredData={dataUnder}  />
				{paginationStatus && (
					<div className="mt-12 flex items-center justify-center btn-hover w-[30%] m-auto rounded-xl h-[50px] text-white cursor-pointer">
						<ButtonPrimary onClick={setPage} loading={isLoading}>
							{t("showMore")}
						</ButtonPrimary>
					</div>
				)}
			</div>
		</div>
	);
};

export default SectionGridFilterCard;
