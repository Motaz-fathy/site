import React, { useEffect, useState } from "react";
import classes from "./Booking.module.css";
import Logo from "../../images/WebusLogo.png";
import ProfileButtom from "components/ProfileButtom/ProfileButtom";
import Profile from "images/Profile";
import ShowIcon from "images/logos/ShowIcon";
import CurrentCard from "components/CurrentCard/CurrentCard";
import PrevCard from "components/PrevCard/PrevCard";
import PendCard from "components/PendCard/PendCard";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import {
	getAddressList,
	listBus,
	listMaritime,
	listPrivates,
	searchTripsMaritime,
} from "api";
import { showApiErrorMessages } from "utils";
import { useNavigate } from "react-router-dom";
import EmptyState from "components/EmptyState/EmptyState";
import { forEach } from "lodash";
import { useTranslation } from "react-i18next";
function compareDate(dateStr: string): boolean {
	const currentDate = new Date();
	const targetDate = new Date(dateStr);

	// Add 4 hours to the current date
	const fourHoursFromNow = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);

	return targetDate > fourHoursFromNow;
}
const BookingCard = () => {
	const {t} = useTranslation()

	const navigate = useNavigate();
	const [privates, setPrivates] = useState<any>([]);
	const [addressList, setAddressList] = useState<any>([]);
	const [bus, setBus] = useState<any>([]);
	const [fbus, setFbus] = useState<any>([]);
	const [maritimes, setMritimes] = useState<any>([]);
	const [allTrips, setAllTrips] = useState<any>([]);
	const [nav, setNav] = useState<any>("All");
	let newBus: any[] = [];

	const { data, isLoading } = useQuery(
		["getTripsMarinTime"],
		() => {
			return listPrivates();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setPrivates([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
	const { data: addressListData } = useQuery(
		["addressListData"],
		() => {
			return getAddressList();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setAddressList([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
	const { data: busListData } = useQuery(
		["busListData"],
		() => {
			return listBus();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setBus([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
	const { data: maritimesListData } = useQuery(
		["maritimeListData"],
		() => {
			return listMaritime();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setMritimes([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
	// const [newBus , setNewBus]: any = useState([])
	// newBus =  data?.data?.data?.filter((item : any) => {

	//    if(item?.status_code === "pending") {
	// 	return item
	//    }
	// })

	function isDateToday(dateString: string): boolean {
		const today = new Date();
		const date = new Date(dateString);
		
		// Set the time portion of both dates to midnight
		today.setHours(0, 0, 0, 0);
		date.setHours(0, 0, 0, 0);
		if(today.getTime() === date.getTime() || today.getTime() > date.getTime() ){
			return true
		}
		 return false
	  } 

	useEffect(() => {
		setAllTrips([...privates, ...addressList, ...bus, ...maritimes]);
	}, []);
	if (isLoading) {
		<p>Loading</p>;
	}
	// if(addressList.length > 0){
	// 	compareDate(addressList.date)
	// }
	console.log(data?.data?.data)
	if (nav === "cur") {
		for (let i = 0; i < data?.data?.data?.length; i++) {
			if(data?.data?.data[i]?.payment_status_code?.toLowerCase()	=== "success" && isDateToday(data?.data?.data?.date)) {
				newBus = [...newBus, bus[i]];
			}
		}

		return (
			<div className={classes.bookingCard}>
			<span className="text-[20px] font-[500] ">{t("My bookings")}</span>
			<ul className={classes.bookingList}>
				<li
					className={`${nav === "All" ? classes.active : ""}`}
					onClick={() => setNav("All")}
				>
					<span>{t("All bookings")}</span>
				</li>
				<li
					className={nav === "cur" ? classes.active : ""}
					onClick={() => setNav("cur")}
				>
					<span>{t("Current bookings")}</span>
				</li>
				<li
					className={nav === "pend" ? classes.active : ""}
					onClick={() => {
						setNav("pend");
					}}
				>
					<span>{t("Pending bookings")}</span>
				</li>
				<li
					className={nav === "prev" ? classes.active : ""}
					onClick={() => {
						setNav("prev");
					}}
				>
					<span>{t("Previous bookings")}</span>
				</li>
			</ul>

				{newBus.length === 0 ? (
					<p> no Current </p>
				) : (
					newBus.map((bu: any) => (
						<CurrentCard
							img_url={bu.company_data.avatar}
							key={bu}
							total={bu.total}
							seat={bu.tickets[0].seat_number}
							stationFrom={bu.station_from.name}
							stationTo={bu.station_to.name}
							timeFrom={bu.station_from.arrival_at}
							timeTo={bu.station_to.arrival_at}
						/>
					))
				)}
			</div>
		);
	}
	if (nav === "pend") {
		for (let i = 0; i < data?.data?.data?.length; i++) {
			// console.log(
			// 	"bus",
			// 	bus[i],
			// 	compareDate(bus[i].date),
			// 	bus[i].can_be_cancel,
			// );

			// if (compareDate(bus[i].date_time) === true && bus[i].can_be_cancel) {
			// 	newBus = [...newBus, bus[i]];
			// }
			if(data?.data?.data[i]?.status_code === "pending" ) {
				newBus = [...newBus, bus[i]];
			}
		}
		return (
			<div className={classes.bookingCard}>
			<span className="text-[20px] font-[500] ">{t("My bookings")}</span>
			<ul className={classes.bookingList}>
				<li
					className={`${nav === "All" ? classes.active : ""}`}
					onClick={() => setNav("All")}
				>
					<span>{t("All bookings")}</span>
				</li>
				<li
					className={nav === "cur" ? classes.active : ""}
					onClick={() => setNav("cur")}
				>
					<span>{t("Current bookings")}</span>
				</li>
				<li
					className={nav === "pend" ? classes.active : ""}
					onClick={() => {
						setNav("pend");
					}}
				>
					<span>{t("Pending bookings")}</span>
				</li>
				<li
					className={nav === "prev" ? classes.active : ""}
					onClick={() => {
						setNav("prev");
					}}
				>
					<span>{t("Previous bookings")}</span>
				</li>
			</ul>
				{newBus.length === 0 ? (
					<p>No Pennding</p>
				) : (
					newBus.map((bu: any) => (
						<PendCard
							id={bu.id}
							cancel={bu.can_be_cancel}
							cancel_url={bu.cancel_url}
							invoice_url={bu.payment_url}
							img_url={bu.company_data.avatar}
							key={bu}
							total={bu.total}
							seat={bu.tickets[0].seat_number}
							stationFrom={bu.station_from.name}
							stationTo={bu.station_to.name}
							timeFrom={bu.station_from.arrival_at}
							timeTo={bu.station_to.arrival_at}
						/>
					))
				)}
			</div>
		);
	}
	if (nav === "prev" && !compareDate(addressList.data)) {
		for (let i = 0; i < bus.length; i++) {
			// console.log('bus',bus[i],compareDate(bus[i].date));

			if (compareDate(bus[i].date_time) === false) {
				newBus = [...newBus, bus[i]];
			}
		}
		return (
			<div className={classes.bookingCard}>
			<span className="text-[20px] font-[500] ">{t("My bookings")}</span>
			<ul className={classes.bookingList}>
				<li
					className={`${nav === "All" ? classes.active : ""}`}
					onClick={() => setNav("All")}
				>
					<span>{t("All bookings")}</span>
				</li>
				<li
					className={nav === "cur" ? classes.active : ""}
					onClick={() => setNav("cur")}
				>
					<span>{t("Current bookings")}</span>
				</li>
				<li
					className={nav === "pend" ? classes.active : ""}
					onClick={() => {
						setNav("pend");
					}}
				>
					<span>{t("Pending bookings")}</span>
				</li>
				<li
					className={nav === "prev" ? classes.active : ""}
					onClick={() => {
						setNav("prev");
					}}
				>
					<span>{t("Previous bookings")}</span>
				</li>
			</ul>
				{newBus === null ? 
					<p>No Previous</p>
				: (
					newBus.map((bu: any) => (
						<PrevCard
							img_url={bu.company_data.avatar}
							key={bu}
							total={bu.total}
							seat={bu.tickets[0].seat_number}
							stationFrom={bu.station_from.name}
							stationTo={bu.station_to.name}
							timeFrom={bu.station_from.arrival_at}
							timeTo={bu.station_to.arrival_at}
						/>
					))
				)}
				{bus.map((bu: any) => (
					<PrevCard
						key={bu}
						img_url={bu.company_data.avatar}
						total={bu.total}
						seat={bu.tickets[0].seat_number}
						stationFrom={bu.station_from.name}
						stationTo={bu.station_to.name}
						timeFrom={bu.station_from.arrival_at}
						timeTo={bu.station_to.arrival_at}
					/>
				))}
			</div>
		);
	}
	return (
		<div className={`m-0 p-0 container w-full ${classes.bookingCard}`}>
			<span className="text-[20px] font-[500] ">{t("My bookings")}</span>
			<ul className={classes.bookingList}>
				<li
					className={`${nav === "All" ? classes.active : ""}`}
					onClick={() => setNav("All")}
				>
					<span>{t("All bookings")}</span>
				</li>
				<li
					className={nav === "cur" ? classes.active : ""}
					onClick={() => setNav("cur")}
				>
					<span>{t("Current bookings")}</span>
				</li>
				<li
					className={nav === "pend" ? classes.active : ""}
					onClick={() => {
						setNav("pend");
					}}
				>
					<span>{t("Pending bookings")}</span>
				</li>
				<li
					className={nav === "prev" ? classes.active : ""}
					onClick={() => {
						setNav("prev");
					}}
				>
					<span>{t("Previous bookings")}</span>
				</li>
			</ul>

			{nav === "All"
				? bus.map((bu: any) => (
						<CurrentCard
							key={bu}
							total={bu.total}
							seat={bu.tickets[0].seat_number}
							stationFrom={bu.station_from.name}
							stationTo={bu.station_to.name}
							timeFrom={bu.station_from.arrival_at}
							timeTo={bu.station_to.arrival_at}
							img_url={bu.company_data.avatar}
						/>
				  ))
				: ""}

			{/* <EmptyState /> */}
			{/* <PrevCard />
       <PrevCard />
       <PrevCard /> */}
			{/* <PendCard />
       <PendCard />
       <PendCard /> */}
		</div>
	);
};

export default BookingCard;
