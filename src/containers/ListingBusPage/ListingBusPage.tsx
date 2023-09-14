import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import React, { FC, useEffect, useMemo, useState } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation, useRoutes } from "react-router-dom";
import { searchTrip } from "api";
import { useQuery } from "react-query";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import homeBg2 from "images/homeBg3.png";
import { forEach, set, values } from "lodash";
import SeatCard from "components/SeatCard/SeatCard";
import OpratorCard from "components/OpratorCard/OpratorCard";
import DepartureCard from "components/departureCard/DepartureCard";
import PriceCard from "components/PriceCard/PriceCard";
import BusTimeCard from "components/BusTimeCard/BusTimeCard";
// import TripAnalyzer from "./TripAnalys";
import classes from "components/departureCard/DepartureCard.module.css";
import BusResultsFilters from "./BusResultsFilters";
import removeDuplicates from "utils/removeDuplicates";
import changeFromHHmmFormatToDateFormate from "utils/changeFromHHmmFormatToDateFormate";
import { getDuration } from "utils/getDuration";
import refactorData from "utils/refactorData";
import Styled from './page.module.css'

// D:\work\telfric\web site\Telefric\src\components\departureCard\DepartureCard.module.css
export interface RefactoredData { classes: string, travel_from: string, travel_to: string, gateway_id: string, arrival_at: string, travel_at: string }
export interface City {
	id: number;
	name: string;
}
export interface ListingFlightsPageProps {
	className?: string;
}
const ListingBusPage: FC<ListingFlightsPageProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	const { search } = useLocation();
	const [date, setDate] = useState<string>("");

	const [travelTo, setTravelTo] = useState<string>("");
	const [travelFrom, setTravelFrom] = useState<string>("");

	const [trips, setTrips] = useState<any>([]);
	const [refactoredTrips, setRefactoredTrips] = useState<any>([]);
	const [filterdTrips, setFilterdTrips] = useState<any>([]);
	const [stationFrom, setStationFrom] = useState<any>([]);
	const [operators, setOperators] = useState<any>([]);
	const [stationTo, setStationTo] = useState<any>([]);
	const [city, setCity] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [cityFrom, setCityFrom] = useState<any>("");
	const [paginationStatus, setPaginationStatus] = useState<boolean>(true);
	const [filterStation, setFilterStation] = useState<string>("");
	const [filterCompany, setFilterCompany] = useState<string>("");
	const [filterFunction, setFilterFunction] = useState<Function>((item: any) => true)
	const [originalTrips, setOriginalTrips] = useState<any>([])
	const [displayableData, setDisplayableData] = useState<any>([])
	const [first, setFirst] = useState("")
	let counter: any = []
	let allTrips_filtered: any = [];
	const [filterToStation, setFilerToStation] = useState<string>("");
	// after filtration
	const [FinalTrips, SetFinalTrips] = useState<any>([]);
	window.localStorage.setItem("isFirsftTripFinshed" , first)
    
	useEffect(() => {
		if (!!search) {
			const data = search.slice(1).split("/");
			setDate(data?.[0]);
			setTravelTo(data?.[1]);
			setTravelFrom(data?.[2]);
			setCity(data?.[3]);
			setCityFrom(data?.[4]);
			setFirst(data?.[5]);
			setTrips([]);
			setPage(1);
		}
	}, [search]);
	const [loading, setLoading] = useState<boolean>(false);

     

	const getTripsBus = async () => {
		setLoading(true);

		if (
			travelTo !== undefined &&
			travelTo !== "undefined" &&
			travelFrom !== "undefined" &&
			travelFrom !== undefined &&
			!!travelFrom &&
			!!travelTo
		) {

			await searchTrip({ date, city_to: travelTo, city_from: travelFrom }, page)
				.then((res: any) => {
					if (res?.data?.data.length) {
						const data = refactorData([...res?.data?.data])

						setTrips((prev: any) => [...prev, ...res?.data?.data]);
						setDisplayableData((prev: any) => [...prev, ...data])
						setOriginalTrips((prev: any) => [...prev, ...res?.data?.data])
						SetFinalTrips((prev: any) => [...prev, ...res?.data?.data]);



					} else if (page > 1) {
						setPaginationStatus(false);
					}
					setLoading(false);
				})
				.catch((errors: any) => {
					setLoading(false);
					if (Object.keys(errors.response.data.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(errors.response.data.errors);
					} else {
						setLoading(false);
						toast.error(errors.response.data.message);
					}
				});
		}
	};



	useEffect(() => {

		if (
			travelTo !== undefined &&
			travelTo !== "undefined" &&
			travelFrom !== "undefined" &&
			travelFrom !== undefined &&
			!!travelFrom &&
			!!travelTo
		) {
			getTripsBus();
			setRefactoredTrips(travelData)

		}
	}, [travelTo, travelFrom, page, date]);

	let travelData: RefactoredData[] = refactorData(trips)
	let travelDataImmutable: RefactoredData[] = useMemo(() => refactorData(trips), [trips])


	// function removeDuplicates(travelData: any) {
	// 	const uniqueData = [];
	// 	const keySet: string[] = [];

	// 	for (const item of travelData) {
	// 		const key = `${item.trip_url}`;
	// 		//   console.log(88888888888888888);
	// 		//   console.log(key,keySet);


	// 		if (!keySet.includes(key)) {
	// 			uniqueData.push(item);
	// 			keySet.push(key);
	// 		}
	// 	}

	// 	return uniqueData;
	// }
	// useEffect(() => {
	// 	const data = [...travelData]
	// 	const filtered = data.filter((each) => filterFunction(each))
	// 	console.log(filtered)
	// }, [filterFunction])
	travelData = removeDuplicates(travelData, "trip_url");

	const operatorsCompo = (type: any) => {
		let selected_company = '';

		function onChange(e: any, i: any) {
			const company = e.target.value;
			if (selected_company === 'All') {
				setFilterdTrips(travelData);
			} else if (selected_company === company) {
				selected_company = '';
			} else {
				selected_company = company;
			}


			const filteredTrips = [];

			if (filterdTrips.length > 0) {
				for (let k = 0; k < filterdTrips.length; k++) {
					if (type === "operators" && (filterdTrips[k].gateway_id === selected_company || selected_company === 'all')) {
						filteredTrips.push(filterdTrips[k]);
					}
					if (type === "station_from" && (filterdTrips[k].travel_from === selected_company || selected_company === 'all')) {
						filteredTrips.push(filterdTrips[k]);
					}
					if (type === "station_to" && (filterdTrips[k].travel_to === selected_company || selected_company === 'all')) {
						filteredTrips.push(filterdTrips[k]);
					}
					if (type === "classes" && (filterdTrips[k].classes === selected_company || selected_company === 'all')) {
						filteredTrips.push(filterdTrips[k]);
					}
				}
				setFilterdTrips(filteredTrips);
			} else if (travelData.length > 0) {
				const allTripsFiltered = [];
				for (let k = 0; k < travelData.length; k++) {
					if (type === "operators" && (travelData[k].gateway_id === selected_company || selected_company === 'all')) {
						allTripsFiltered.push(travelData[k]);
					}
					if (type === "station_from" && (travelData[k].travel_from === selected_company || selected_company === 'all')) {
						allTripsFiltered.push(travelData[k]);
					}
					if (type === "station_to" && (travelData[k].travel_to === selected_company || selected_company === 'all')) {
						allTripsFiltered.push(travelData[k]);
					}
					if (type === "classes" && (travelData[k].classes === selected_company || selected_company === 'all')) {
						allTripsFiltered.push(travelData[k]);
					}
				}
				setFilterdTrips(allTripsFiltered);
			} else {
				setFilterdTrips(travelData);
			}
		}

		let companies = ['All'];
		const counter = [];

		if (filterdTrips.length > 0) {
			for (let i = 0; i < filterdTrips.length; i++) {
				if (type === "operators" && !companies.includes(filterdTrips[i].gateway_id)) {
					companies.push(filterdTrips[i].gateway_id);
					counter.push({
						name: filterdTrips[i].gateway_id,
						counter: 0
					});
				}
				if (type === "station_from" && !companies.includes(filterdTrips[i].travel_from)) {
					companies.push(filterdTrips[i].travel_from);
					counter.push({
						name: filterdTrips[i].travel_from,
						counter: 0
					});
				}
				if (type === "station_to" && !companies.includes(filterdTrips[i].travel_to)) {
					companies.push(filterdTrips[i].travel_to);
					counter.push({
						name: filterdTrips[i].travel_to,
						counter: 0
					});
				}
				if (type === "classes" && !companies.includes(filterdTrips[i].classes)) {
					companies.push(filterdTrips[i].classes);
					counter.push({
						name: filterdTrips[i].classes,
						counter: 0
					});
				}
			}
		} else if (travelData.length > 0) {
			for (let i = 0; i < travelData.length; i++) {
				if (type === "operators" && !companies.includes(travelData[i].gateway_id)) {
					companies.push(travelData[i].gateway_id);
					counter.push({
						name: travelData[i].gateway_id,
						counter: 0
					});
				}
				if (type === "station_from" && !companies.includes(travelData[i].travel_from)) {
					companies.push(travelData[i].travel_from);
					counter.push({
						name: travelData[i].travel_from,
						counter: 0
					});
				}
				if (type === "station_to" && !companies.includes(travelData[i].travel_to)) {
					companies.push(travelData[i].travel_to);
					counter.push({
						name: travelData[i].travel_to,
						counter: 0
					});
				}
				if (type === "classes" && !companies.includes(travelData[i].classes)) {
					companies.push(travelData[i].classes);
					counter.push({
						name: travelData[i].classes,
						counter: 0
					});
				}
			}
		}

		function is_Checked_true(company: any) {
			return selected_company === company;
		}

		return (
			<div className={classes.card}>
				<header className={classes.cardHeader}>
					<h2>{type === 'operators' ? 'Operator' : type === 'station_from' ? "Departure station" : type === 'classes' ? "Seat classes" : "Arrival station"}</h2>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M11.4708 7.72001C11.6114 7.57956 11.8021 7.50067 12.0008 7.50067C12.1996 7.50067 12.3902 7.57956 12.5308 7.72001L20.0308 15.22C20.1045 15.2887 20.1636 15.3715 20.2046 15.4635C20.2456 15.5555 20.2676 15.6548 20.2694 15.7555C20.2712 15.8562 20.2527 15.9562 20.2149 16.0496C20.1772 16.143 20.1211 16.2278 20.0499 16.299C19.9786 16.3703 19.8938 16.4264 19.8004 16.4641C19.707 16.5019 19.607 16.5204 19.5063 16.5186C19.4056 16.5168 19.3063 16.4948 19.2143 16.4538C19.1223 16.4128 19.0395 16.3537 18.9708 16.28L12.0008 9.31001L5.03082 16.28C4.88865 16.4125 4.7006 16.4846 4.5063 16.4812C4.312 16.4778 4.12661 16.399 3.9892 16.2616C3.85179 16.1242 3.77308 15.9388 3.76965 15.7445C3.76622 15.5502 3.83834 15.3622 3.97082 15.22L11.4708 7.72001Z" fill="#DDE2EB" />
					</svg>
				</header>

				<main className={classes.main}>
					{companies.map((company, i) => (
						<div className={classes.ele} key={company}>
							<input
								type="radio"
								id={company}
								name="company"
								value={company}
								onClick={companyHandler}
								onChange={(e) => onChange(e, i)}
								checked={is_Checked_true(company)}
							/>
							<label htmlFor={company}>{company}</label>
						</div>
					))}
				</main>
			</div>
		);
	}

	const companyHandler = (company: any) => {
		setFilterCompany(company);
	}
	// useEffect(() => {
	// 	const filtered = travelData.filter(filterFunction)
	// 	setRefactoredTrips(filtered)
	// }
	// 	, [filterFunction])
	// const f = () => {

	// }

	return (
		<div
			className={`nc-ListingFlightsPage bg-[#dde2eb] relative overflow-hidden ${className}`}
			data-nc-id="ListingFlightsPage"
		>
			{/* bus back ground for search page  */}
			<div className="m-0 p-0  w-[100vw] h-[30vh] block" style={{
				// backgroundImage: `url(${homeBg2})`,
				objectFit: "contain",
			}}> <img src={homeBg2} className="object-cover w-[100%]  mb-0 mt-0 p-0  h-[30vh] "></img>
			</div>

			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>
			

			<div className="container flex flex-col items-center   mt-10">
				{/* SECTION HERO */}

				{/* <SectionHeroArchivePage
					currentPage="Bus"
					currentTab="Bus"
					isLoading={loading}
					city={city}
					trips={trips}
					listingType={
						<div className="flex items-center">
							<BriefcaseIcon className="h-5 w-5" />

							<span className=" ">
								{trips.length} {t("Bus")}
							</span>
						</div>
					}
					className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
				/> */}

				{/* <div className="w-[84vw]  h-[60px] mt-[-5.8rem]  flex flex-row border-1 justify-evenly  align-middle  triangle-container mb-4 " >
					<div className="w-[30%] h-[100%] m-0 relative flex flex-row  ">
						<div className="absolute left-0 h-[100%] triangle align-middle text-center flex place-content-between bg-[#DDE2EB] "
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_860_1925)">
									<path d="M4.04873 2.86182C3.0795 2.86182 2.29102 3.6503 2.29102 4.61954C2.29102 5.58877 3.0795 6.37725 4.04873 6.37725C5.01797 6.37725 5.80645 5.58877 5.80645 4.61954C5.80645 3.65035 5.01797 2.86182 4.04873 2.86182ZM4.04873 4.97114C3.85486 4.97114 3.69717 4.81346 3.69717 4.61958C3.69717 4.42571 3.85486 4.26802 4.04873 4.26802C4.24261 4.26802 4.4003 4.42571 4.4003 4.61958C4.40025 4.81346 4.24261 4.97114 4.04873 4.97114Z" fill="#1D4179" />
									<path d="M19.9062 14.403C18.9369 14.403 18.1484 15.1914 18.1484 16.1607C18.1484 17.1299 18.9369 17.9184 19.9062 17.9184C20.8754 17.9184 21.6639 17.1299 21.6639 16.1607C21.6639 15.1915 20.8754 14.403 19.9062 14.403ZM19.9062 16.5123C19.7123 16.5123 19.5546 16.3546 19.5546 16.1607C19.5546 15.9668 19.7123 15.8092 19.9062 15.8092C20.1 15.8092 20.2577 15.9668 20.2577 16.1607C20.2577 16.3546 20.1 16.5123 19.9062 16.5123Z" fill="#1D4179" />
									<path d="M22.8135 13.2977C21.2349 11.7191 18.6664 11.7191 17.0878 13.2977C15.7793 14.606 15.5241 16.6317 16.467 18.2238L18.7171 22.023H5.08711C3.88387 22.023 2.90494 21.0441 2.90494 19.8409C2.90494 18.6376 3.88383 17.6587 5.08711 17.6587H11.6894C13.668 17.6587 15.2778 16.0489 15.2778 14.0703C15.2778 12.0916 13.668 10.4819 11.6894 10.4819H5.2829L7.53295 6.68266C8.47584 5.0906 8.22056 3.0649 6.91223 1.75657C6.14751 0.991897 5.1308 0.570679 4.04934 0.570679C2.96789 0.570679 1.95112 0.991851 1.1864 1.75657C-0.121971 3.06494 -0.377205 5.09069 0.565686 6.68271L3.64861 11.8881H11.6894C12.8926 11.8881 13.8716 12.867 13.8716 14.0703C13.8716 15.2735 12.8927 16.2525 11.6894 16.2525H5.08711C3.10851 16.2525 1.49873 17.8623 1.49873 19.8409C1.49873 21.8195 3.10847 23.4292 5.08711 23.4292H20.3515L23.4344 18.2238C24.3772 16.6317 24.1219 14.606 22.8135 13.2977ZM1.77562 5.96618C1.16025 4.92705 1.32679 3.6049 2.18081 2.75098C2.67994 2.2518 3.3435 1.97698 4.0493 1.97698C4.75509 1.97698 5.41875 2.25185 5.91787 2.75098C6.7718 3.6049 6.93839 4.92705 6.32306 5.96618L4.04934 9.80529L1.77562 5.96618ZM22.2244 17.5072L19.9507 21.3463L17.6769 17.5072C17.0616 16.4681 17.2281 15.1459 18.0821 14.292C18.5973 13.7768 19.274 13.5193 19.9507 13.5193C20.6274 13.5193 21.3041 13.7769 21.8192 14.292C22.6732 15.1459 22.8398 16.4681 22.2244 17.5072Z" fill="#1D4179" />
								</g>
								<defs>
									<clipPath id="clip0_860_1925">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>

							<h4 className="ml-1 " style={{ color: "#1D4179" }}>Outbound trip</h4>
						</div>
				

					</div>
					<div className="w-[40%]  h-[100%] m-0  relative  flex justify-center flex-row align-middle " >
						<div className="h-[100%] triangle2 flex	 place-content-between">
							<h4 className="" style={{ fontWeight: "500", fontSize: "20px", color: "#1D4179" }}>Round trip</h4>
						</div>
				
					</div>
					<div className="w-[30%] bg-white h-[100%] m-0 relative flex flex-row align-middle">
						<div className="absolute 	 triangle3 h-[100%] align-middle  text-center flex place-content-between">
							<h4 className="ml-3" style={{ color: "#1D4179" }}>Summary</h4>
						</div>
			

					</div>
				</div> */}

				{loading && page === 1 && (
					<div className="my-4 flex  w-full justify-center">
					<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
					</div>
				)}

				{/* SECTION */}
				<div className={`flex flex-row   w-[85vw] justify-between ${Styled.BusHome_container}`}>

					<div className={`lg:w-[30%] md:w-0 ${Styled.Fillter_component}`} >
						{
							!loading && travelData.length > 0 ?
								<BusResultsFilters className="flex-1 mr-10" refactoredData={travelDataImmutable} isLoading={loading} setData={setDisplayableData}
								// setRefactoredData={setRefactoredTrips} setFilterFunction={setFilterFunction}
								/> : null
						}
						{/* <SeatCard height={true} /> */}
						{/* {operatorsCompo("classes")}
						{operatorsCompo("operators")}
						{operatorsCompo("station_from")}
						{operatorsCompo("station_to")} */}

					</div>
					<div className="lg:w-[70%] md:w-full ">{trips.length > 0 && (
						<SectionGridFilterCard
							trips={trips}
							city={city}
							isLoading={loading}
							className="pb-24 lg:pb-28"
							date={date}
							refavtord_data={displayableData}
							filterStation={filterStation}
							filterToStation={filterToStation}
							travelFrom={travelFrom}
							travelTo={travelTo}
							cityFrom={cityFrom}
							setPage={() => setPage(page + 1)}
							paginationStatus={paginationStatus}
						/>
					)}</div>

				</div>


				{/* SECTION */}
			</div>
		</div>
	);
};

export default ListingBusPage;
