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
export interface RefactoredData { classes: string, travel_from: string, travel_to: string, 
	gateway_id: string, arrival_at: string, travel_at: string , prices_start_with: number }

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
					if (res?.data?.data?.length) {
						
						const data = refactorData([...res?.data?.data] )

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
     
	let travelData: any[] = refactorData(trips )
	let travelDataImmutable: any[] = useMemo(() => refactorData(trips), [trips] )

    const T_T = parseInt(travelTo)
	const T_F = parseInt(travelFrom)



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
	// travelData = removeDuplicates(travelData, "trip_url");

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
			className={` bg-[#E8ECF2] relative overflow-hidden ${className}`}
			data-nc-id="ListingFlightsPage"
		>
			
			



			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>

			
			{
				!loading && travelData.length > 0 ? <div>
				<div className="m-0 p-0  w-[100%]  block" style={{
					
					objectFit: "contain",
				}}> 
				<img src={homeBg2} className="object-cover w-[100%]  mb-0 mt-0 p-0  lg:h-[30vh] max-sm:h-[150px]  max-sm:w-[100%]"></img>
				</div>
				
				<div className=" flex flex-col items-center  mt-10 ">
					
					
					{loading && page === 1 && (
						<div className="my-4 flex  w-full justify-center">
						<svg width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"  fill="#000000">
							<animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
						</div>
					)}
					<div className={`flex flex-row max-sm:hidden  w-[85vw] justify-between  ${Styled.BusHome_container}`}>
			
					
							<div className={` lg:w-[30%] max-md:w-[40%]    ${Styled.Fillter_component}  lg:block xl:block md:block  max-md:hidden sm:hidden max-sm:hidden`} >
							<div className=" max-sm:hidden flex justify-between items-center w-[85%] mb-3 rtl:mr-10">
									<div className="flex justify-start items-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M10.5 6H20.25M10.5 6C10.5 6.39782 10.342 6.77936 10.0607 7.06066C9.77936 7.34196 9.39782 7.5 9 7.5C8.60218 7.5 8.22064 7.34196 7.93934 7.06066C7.65804 6.77936 7.5 6.39782 7.5 6M10.5 6C10.5 5.60218 10.342 5.22064 10.0607 4.93934C9.77936 4.65804 9.39782 4.5 9 4.5C8.60218 4.5 8.22064 4.65804 7.93934 4.93934C7.65804 5.22064 7.5 5.60218 7.5 6M7.5 6H3.75M10.5 18H20.25M10.5 18C10.5 18.3978 10.342 18.7794 10.0607 19.0607C9.77936 19.342 9.39782 19.5 9 19.5C8.60218 19.5 8.22064 19.342 7.93934 19.0607C7.65804 18.7794 7.5 18.3978 7.5 18M10.5 18C10.5 17.6022 10.342 17.2206 10.0607 16.9393C9.77936 16.658 9.39782 16.5 9 16.5C8.60218 16.5 8.22064 16.658 7.93934 16.9393C7.65804 17.2206 7.5 17.6022 7.5 18M7.5 18H3.75M16.5 12H20.25M16.5 12C16.5 12.3978 16.342 12.7794 16.0607 13.0607C15.7794 13.342 15.3978 13.5 15 13.5C14.6022 13.5 14.2206 13.342 13.9393 13.0607C13.658 12.7794 13.5 12.3978 13.5 12M16.5 12C16.5 11.6022 16.342 11.2206 16.0607 10.9393C15.7794 10.658 15.3978 10.5 15 10.5C14.6022 10.5 14.2206 10.658 13.9393 10.9393C13.658 11.2206 13.5 11.6022 13.5 12M13.5 12H3.75" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
									<span className="ml-3 rtl:mr-3">{t("filter")}</span>
									</div>
									<span className="text-[#1D4179] text-[16px] font-[400] ">{t("Reset all")} </span>
							</div>
	
							
									{
										!loading && travelData.length > 0 ?
											<BusResultsFilters className="flex-1 mr-10" 
											RefactoredData={travelDataImmutable} isLoading={loading}
											TravleFrom = {T_F} 
											TravleTo = {T_T}
											setData={setDisplayableData}
											
											/> : null
									}
									
									
	
							</div>
	
							<div className={` ${Styled.Min_filter} lg:hidden md:hidden  sm:block max-sm:block w-[100%] h-[60px]`}>
							{
								!loading && travelData.length > 0 ?
									<BusResultsFilters className="flex-1 mr-10" 
									RefactoredData={travelDataImmutable} isLoading={loading}
									TravleFrom = {T_F} 
									TravleTo = {T_T}
									setData={setDisplayableData}
									
									/> : null
							}
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
				</div> : <div className="h-[100vh] flex  w-full justify-center items-center">
						<svg width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"  fill="#000000">
							<animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
						</div>
			}


		 </div>
	);
};

export default ListingBusPage;
