import React, { FC, Fragment, useEffect, useState } from "react";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
	createFirstTrip,
	createOneRoundTrip,
	createPayment,
	createReturnTrip,
	createTrip,
	getSeats,
} from "api";
import { useQuery } from "react-query";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import PaymentDetailsModal from "shared/payment";
import { Bus } from "shared/bus";
import { ClassicBus } from "shared/classicBus";
import { ComfortBus } from "shared/ComfortBus";
import { PrimeBus } from "shared/primeBus";
import { BusinessBus } from "shared/businessBus";
import { FirstTenBus } from "shared/firstTen";
import { FirstEightBus } from "shared/firstEight";
import i18next from "i18next";
import { EconomyBus } from "shared/EconomyBus";

export interface CheckOutPageProps {
	className?: string;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {
	const { search } = useLocation();
	const [date, setDate] = useState<string>("");
	const [travelTo, setTravelTo] = useState<string>("");
	const [travelFrom, setTravelFrom] = useState<string>("");
	const [cityTo, setCityTo] = useState<string>("");
	const [cityFrom, setCityFrom] = useState<string>("");
	const { t } = useTranslation();
	const [seats, setSeats] = useState([]);
	const [id, setId] = useState("");
	const [priceData, setPriceData] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<number | string>("");
	const [iframe, setIframe] = useState<null | string>(null);
	let [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState<string | null>("");
	const [selectedSeatsList, setSelectedSeatsList] = useState<any>({});
	const [seatsType, setSeatsType] = useState("");
	const [end_Date, setend_Date] = useState();
	const [flagbus, setFlagbus] = useState("any");
    
	const [ID, setID] = useState();
	const navigate = useNavigate();
	const location = useLocation();

	const dropOffLocationType = window.localStorage.getItem(
		"dropOffLocationType",
	);
    const first = window.localStorage.getItem("first")
	const tf: any = window.localStorage.getItem("travle_from_bus");
	const travle_from_bus = JSON.parse(tf);

	const tt: any = window.localStorage.getItem("travle_to_bus");
	const travle_to_bus = JSON.parse(tt);

	const isFirsftTripFinshed = window.localStorage.getItem(
		"isFirsftTripFinshed",
	);

	useEffect(() => {
		if (dropOffLocationType !== "oneWay") {
			const END: any = window.localStorage.getItem("busEndDate");
			const end_date = JSON.parse(END);
			setend_Date(end_date);
		}
		if (flagbus !== undefined) {
			const first: any = window.localStorage.getItem("bus_First_Ticket");
			const i = JSON.parse(first);
			setID(i?.id);
		}
	}, []);

	useEffect(() => {
		if (!!search) {
			const data = search?.slice(1)?.split("/");
			console.log("search data ", data);
			setDate(data?.[0]);
			setTravelFrom(data?.[1]);
			setTravelTo(data?.[2]);
			setId(data?.[3]);
			setCityFrom(data?.[5]);
			setCityTo(data?.[6]);
			setType(data?.[7]);
			setSeatsType(data?.[8]);

			sessionStorage.setItem(
				"path",
				location?.pathname +
					`?${data?.[0]}/${data?.[1]}/${data?.[2]}/${data?.[3]}/${data?.[4]}/${data?.[5]}/${data?.[6]}/${data?.[7]}/${data?.[8]}`,
			);
		}
	}, [search]);
	const { data } = useQuery(
		["getSeats", travelFrom, travelTo, id],
		() => {
			return getSeats({
				from_location_id: travelFrom,
				to_location_id: travelTo,
				id,
				date,
				cityFrom: cityFrom,
				cityTo: cityTo,
			});
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data?.length) {
					setSeats(response?.data?.data);
					response?.data?.data.forEach((item: any) => {
						if (item?.seat_type_name === "comfort") setType("");
					});
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

	//   const createTicket = async () => {
	// 	const seatsList: any = [];
	// 	for (const property in selectedSeatsList) {
	// 		seats.forEach((item: any) => {
	// 			if (+item?.id === +selectedSeatsList[property]) {
	// 				seatsList.push({
	// 					seat_id: item?.id,
	// 					seat_type_id: item?.seat_type_id,
	// 				});
	// 			}
	// 		});
	// 	}

	// 	setLoading(true);
	// 	if (seatsList?.length) {

	// 		await createTrip(
	// 			{
	// 				date,
	// 				to_location_id: travelTo,
	// 				from_location_id: travelFrom,
	// 				seats: seatsList,
	// 				from_city_id: cityFrom,
	// 				to_city_id: cityTo,
	// 			},
	// 			id,
	// 		)
	// 			.then(res => {
	// 				if (res?.data?.data?.gateway_order_id) {
	// 					setOrderId(res?.data?.data?.gateway_order_id);
	// 					setPriceData(res?.data?.data);
	// 					toast.success(res?.data?.message);
	// 					let busTicket: any = JSON.stringify(res?.data)
	// 					window.sessionStorage.setItem("bus_Ticket" , busTicket)
	// 					console.log("create ticket"  , res?.data?.data )
	// 					dropOffLocationType === "oneWay" ? navigate(`/bus-trip/oneRound/summary`) :
	// 					navigate(
	// 						`/listing-bus?${busEndDate}/

	// 						${
	// 							travle_from_bus?.id
	// 						}/${travle_to_bus?.id}/${
	// 							i18next.language === "en"
	// 								? travle_from_bus?.name_en
	// 								: travle_from_bus?.name_ar
	// 						}/${
	// 							i18next.language === "en"
	// 								? travle_to_bus?.name_en
	// 								: travle_to_bus?.name_ar
	// 						}`,
	// 					)

	// 				}
	// 				setLoading(false);
	// 			})
	// 			.catch(err => {
	// 				setLoading(false);
	// 				if (Object.keys(err?.response?.data?.errors)?.length) {
	// 					setLoading(false);
	// 					showApiErrorMessages(err.response.data.errors);
	// 				} else {
	// 					setLoading(false);
	// 					toast.error(err?.response?.data?.message);
	// 				}
	// 				if (err.response.status === 401) {
	// 					navigate("/login");
	// 				}
	// 			});
	// 	} else {
	// 		toast.error(t("selectSeatPlz"));
	// 		setLoading(false);
	// 	}
	// };

	const createFirsttrip = async () => {
		const seatsList: any = [];
		for (const property in selectedSeatsList) {
			seats.forEach((item: any) => {
				if (+item?.id === +selectedSeatsList[property]) {
					seatsList.push({
						seat_id: item?.id,
						seat_type_id: item?.seat_type_id,
					});
				}
			});
		}
		setLoading(true);
		if (seatsList?.length) {
			

			const data = {
				round: 1,
				boarding: {
					trip_id: id,
					from_city_id: cityFrom,
					to_city_id: cityTo,
					from_location_id: travelFrom,
					to_location_id: travelTo,
					date: date,
					seats: seatsList,
				},
			};
			console.log('seatsList' , data)
			await createFirstTrip(data)
				.then(res => {
					setOrderId(res?.data?.data?.gateway_order_id);
					setPriceData(res?.data?.data);
					toast.success(res?.data?.message);
					let busTicket: any = JSON.stringify(res?.data?.data);
					window.localStorage.setItem("bus_First_Ticket", busTicket);
					console.log("bus_First_Ticket", res?.data?.data);
					// setFlagbus("a");

					navigate(
						`/listing-bus?${end_Date}/
							${travle_from_bus?.id}/${travle_to_bus?.id}/${
							i18next.language === "en"
								? travle_from_bus?.name_en
								: travle_from_bus?.name_ar
						}/${
							i18next.language === "en"
								? travle_to_bus?.name_en
								: travle_to_bus?.name_ar
						}/first`,
					);

					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
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
			toast.error(t("selectSeatPlz"));
			setLoading(false);
		}
	};

	const createReturnTicket = async () => {
		const seatsList: any = [];
		for (const property in selectedSeatsList) {
			seats.forEach((item: any) => {
				if (+item?.id === +selectedSeatsList[property]) {
					seatsList.push({
						seat_id: item?.id,
						seat_type_id: item?.seat_type_id,
					});
				}
			});
		}

		setLoading(true);
		if (seatsList?.length) {
			const data = {
				trip_id: id,
				from_city_id: cityFrom,
				to_city_id: cityTo,
				from_location_id: travelFrom,
				to_location_id: travelTo,
				date: end_Date,
				seats: seatsList,
			};

			await createReturnTrip(data, ID)
				.then(res => {
					setOrderId(res?.data?.data?.gateway_order_id);
					setPriceData(res?.data?.data);
					toast.success(res?.data?.message);
					let busTicket: any = JSON.stringify(res?.data);
					window.localStorage.setItem("bus_Return_Ticket", busTicket);
					console.log("create return  ticket", res?.data);
					navigate(`/bus-trip/twoRound/summary`);
					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
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
			toast.error(t("selectSeatPlz"));
			setLoading(false);
		}
	};

	const createOneRound = async () => {
		const seatsList: any = [];
		for (const property in selectedSeatsList) {
			seats.forEach((item: any) => {
				if (+item?.id === +selectedSeatsList[property]) {
					seatsList.push({
						seat_id: item?.id,
						seat_type_id: item?.seat_type_id,
					});
				}
			});
		}

		setLoading(true);
		if (seatsList?.length) {
			const data = {
				round: 1,
				boarding: {
					trip_id: id,
					from_city_id: cityFrom,
					to_city_id: cityTo,
					from_location_id: travelFrom,
					to_location_id: travelTo,
					date: date,
					seats: seatsList
				},
			};
			await createOneRoundTrip(data)
				.then(res => {
					setOrderId(res?.data?.data?.gateway_order_id);
					setPriceData(res?.data?.data);
					toast.success(res?.data?.message);
					let busTicket: any = JSON.stringify(res?.data?.data);
					window.localStorage.setItem("bus_Ticket", busTicket);
					navigate(`/bus-trip/oneRound/summary`);
					setFlagbus("a");
					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
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
			toast.error(t("selectSeatPlz"));
			setLoading(false);
		}
	};
	const RenderButton = () => {
		if (dropOffLocationType === "oneWay") {
			return (
				<ButtonPrimary
					className="ml-3 bg-green-400 text-black hover:bg-green-600"
					loading={loading}
					onClick={() => createOneRound()}
				>
					{t("go to summary")}
				</ButtonPrimary>
			);
		} else {
			if (isFirsftTripFinshed === "first") {
				return (
					<ButtonPrimary
						className="ml-3 bg-green-400 text-black hover:bg-green-600"
						loading={loading}
						onClick={() => createReturnTicket()}
					>
						{t("go to summary")}
					</ButtonPrimary>
				);
			} else {
				return (
					<ButtonPrimary loading={loading} onClick={() => createFirsttrip()}>
						{t("confirmTicket")}
					</ButtonPrimary>
				);
			}
		}
	};

	const createPayments = async () => {
		if (!!orderId) {
			await createPayment(orderId)
				.then(res => {
					if (res?.data?.data?.url) {
						setIframe(res?.data?.data?.url);
						setIsOpen(true);
					}
					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
				});
		} else {
			toast.error(t("notFound"));
			setLoading(false);
		}
	};

	const renderMain = () => {
		return (
			<div className="flex w-full items-start justify-start space-y-8 border-neutral-200 px-0 dark:border-neutral-700 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
				<div className="w-full">
					{type === "WEBUS" || seatsType.includes("Mini") ? (
						<Bus
							seats={seats}
							selected={selectedSeatsList}
							setSelected={setSelectedSeatsList}
						/>
					) : type === "Tazcara" ? (
						<ClassicBus
							seats={seats}
							selected={selectedSeatsList}
							setSelected={setSelectedSeatsList}
						/>
					) : seatsType === "Prime_Mix" ? (
						<PrimeBus
							seats={seats}
							selected={selectedSeatsList}
							setSelected={setSelectedSeatsList}
						/>
					) : seatsType === "Comfort" ? (
						<ComfortBus
							seats={seats}
							selected={selectedSeatsList}
							setSelected={setSelectedSeatsList}
						/>
					) : seatsType === "Business40" ? (
						<BusinessBus
							seats={seats}
							selected={selectedSeatsList}
							setSelected={setSelectedSeatsList}
						/>
					) : seatsType === "economy" || seatsType === "Economy" ? (
						<EconomyBus
							seats={seats}
							selected={selectedSeatsList}
							setSelected={setSelectedSeatsList}
						/>
					) 
					
					: seatsType === "First10" ? (
						<FirstTenBus
							seats={seats}
							selected={selectedSeatsList}
							setSelected={setSelectedSeatsList}
						/>
					) : (
						<FirstEightBus
							seats={seats}
							selected={selectedSeatsList}
							setSelected={setSelectedSeatsList}
						/>
					)
					
					}
					{!!priceData && (
						<div className="my-3  w-full">
							{/* <p className="text-lg text-green-500">
                {t("totalPrice", { total: priceData.total })}
                {priceData?.discount > 0 && (
                  <>
                    <span className="mt-4 flex text-[15px] text-neutral-600 dark:text-neutral-200">
                      {t("totalBeforeDiscount", {
                        totalBeforeDiscount: priceData?.original_tickets_totals
                      })}
                    </span>
                    <span className="flex text-[15px] text-neutral-600 dark:text-neutral-200">
                      {t("discount", { discount: priceData?.discount })}
                    </span>
                    <span className="flex text-[15px] text-neutral-600 dark:text-neutral-200">
                      {t("totalAfterDiscount", {
                        totalAfterDiscount: priceData?.total
                      })}
                    </span>
                  </>
                )}
              </p> */}
						</div>
					)}
					<div className="mt-6">
						<div className="pt-8">{!orderId && RenderButton()}</div>
					</div>
				</div>
			</div>
		);
	};
	// if (!!iframe) return <></>;
	function handleBackClick() {
		window.history.back();
	}
	return (
		<div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
			<div className="flex h-[15vh] w-full flex-col bg-[#1d4179] ">
				{/* top nav */}
				<div className="relative mx-auto flex h-[50px] w-[80vw] flex-row  justify-between text-white ">
					<button
						className="flex w-[3vw] items-center justify-between"
						onClick={handleBackClick}
					>
						<svg
							width="10"
							height="17"
							viewBox="0 0 10 17"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8.75 16.1538L1.25 8.65381L8.75 1.15381"
								stroke="white"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						back
					</button>
				</div>
				{/* center data */}
				<div className="flex flex-col items-center justify-center text-white">
					<span className="absolute z-0 h-[20vh] w-[20vh]   rotate-45 rounded bg-[#1d4179]"></span>
					<h3 className="z-10">
						{i18next.language === "en"
							? travle_from_bus?.name_en
							: travle_from_bus?.name_ar}{" "}
						-{" "}
						{i18next.language === "en"
							? travle_to_bus?.name_en
							: travle_to_bus?.name_ar}
					</h3>
					<h3 className="z-10">{date} . {seatsType}</h3>
				</div>
			</div>
			{/* {
				first === "first" && dropOffLocationType !== "oneWay" ?
				<div className="container w-full mt-[100px] flex justify-center block max-sm:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="61" viewBox="0 0 1300 61" fill="none">
<path d="M16 60.0164L407 60.0164L484 30.5082L407 1L387 1L16 1C7.16342 1 -3.05176e-05 8.16345 -3.05176e-05 17V30.5082V44.0164C-3.05176e-05 52.853 7.16342 60.0164 16 60.0164Z" fill="#1D4179"/>
<path d="M406 60.0164H890L989.5 30.5082L890 1H406.5L482.5 30.5082L406 60.0164Z" fill="#1D4078"/>
<path d="M1283.5 60.0164L891 60.0164L989.5 30.5082L891 1L912.5 1L1283.5 1C1292.34 1 1299.5 8.16345 1299.5 17V30.5082V44.0164C1299.5 52.853 1292.34 60.0164 1283.5 60.0164Z" fill="#DDE2EB" stroke="#DDE2EB"/>
<path d="M1056.9 38.2C1055.83 38.2 1054.91 38.03 1054.13 37.69C1053.35 37.35 1052.74 36.84 1052.31 36.16C1051.88 35.4733 1051.65 34.6133 1051.63 33.58H1053.91C1053.94 34.14 1054.07 34.61 1054.32 34.99C1054.57 35.37 1054.93 35.6533 1055.38 35.84C1055.84 36.0267 1056.39 36.12 1057.04 36.12C1057.66 36.12 1058.17 36.0467 1058.56 35.9C1058.95 35.7533 1059.24 35.5467 1059.43 35.28C1059.62 35.0067 1059.71 34.6867 1059.71 34.32C1059.71 33.92 1059.6 33.5833 1059.37 33.31C1059.14 33.03 1058.78 32.77 1058.29 32.53C1057.8 32.2833 1057.16 32.02 1056.35 31.74C1055.52 31.4533 1054.79 31.1033 1054.16 30.69C1053.54 30.2767 1053.06 29.7867 1052.71 29.22C1052.37 28.6467 1052.2 27.9767 1052.2 27.21C1052.2 25.9167 1052.62 24.93 1053.47 24.25C1054.32 23.57 1055.48 23.23 1056.95 23.23C1057.97 23.23 1058.8 23.3867 1059.43 23.7C1060.06 24.0133 1060.54 24.4767 1060.86 25.09C1061.19 25.6967 1061.4 26.45 1061.51 27.35H1059.22C1059.16 26.89 1059.04 26.51 1058.85 26.21C1058.66 25.91 1058.41 25.6867 1058.08 25.54C1057.76 25.3867 1057.36 25.31 1056.87 25.31C1056.12 25.31 1055.54 25.4633 1055.13 25.77C1054.72 26.07 1054.52 26.52 1054.52 27.12C1054.52 27.46 1054.58 27.77 1054.71 28.05C1054.84 28.33 1055.11 28.6067 1055.52 28.88C1055.93 29.1533 1056.55 29.4533 1057.38 29.78C1058.02 30.0333 1058.62 30.2767 1059.18 30.51C1059.75 30.7367 1060.24 31 1060.67 31.3C1061.1 31.6 1061.44 31.9733 1061.69 32.42C1061.94 32.8667 1062.06 33.4333 1062.07 34.12C1062.08 35.44 1061.65 36.45 1060.77 37.15C1059.9 37.85 1058.61 38.2 1056.9 38.2ZM1067.06 38.22C1066.12 38.22 1065.36 37.89 1064.78 37.23C1064.21 36.57 1063.92 35.6233 1063.92 34.39V27.08H1066.28V33.76C1066.28 34.2933 1066.34 34.7333 1066.46 35.08C1066.58 35.4267 1066.77 35.68 1067.03 35.84C1067.29 36 1067.63 36.08 1068.04 36.08C1068.54 36.08 1068.99 35.9367 1069.39 35.65C1069.8 35.3567 1070.09 35.0267 1070.25 34.66V27.08H1072.61V38H1070.6L1070.33 33.88L1070.51 34.71C1070.43 35.31 1070.27 35.8767 1070.03 36.41C1069.8 36.9433 1069.44 37.38 1068.96 37.72C1068.49 38.0533 1067.86 38.22 1067.06 38.22ZM1075.59 38V27.08H1077.62L1077.88 31.2L1077.71 30.37C1077.79 29.77 1077.94 29.2033 1078.18 28.67C1078.41 28.13 1078.76 27.6933 1079.24 27.36C1079.71 27.0267 1080.34 26.86 1081.13 26.86C1082 26.86 1082.7 27.11 1083.24 27.61C1083.78 28.1033 1084.11 28.8633 1084.24 29.89L1084.29 30.05V38H1081.92V31.59C1081.92 30.9633 1081.86 30.46 1081.74 30.08C1081.62 29.7 1081.43 29.4267 1081.17 29.26C1080.91 29.0867 1080.58 29 1080.16 29C1079.66 29 1079.22 29.1467 1078.82 29.44C1078.42 29.7267 1078.13 30.0533 1077.96 30.42V38H1075.59ZM1088.25 38V31.59C1088.25 30.9633 1088.19 30.46 1088.07 30.08C1087.95 29.7 1087.76 29.4267 1087.5 29.26C1087.24 29.0867 1086.91 29 1086.49 29C1085.99 29 1085.55 29.1467 1085.15 29.44C1084.75 29.7267 1084.46 30.0533 1084.29 30.42L1084.27 31.2L1084.11 30.55C1084.17 29.9567 1084.32 29.38 1084.54 28.82C1084.76 28.2533 1085.11 27.7867 1085.58 27.42C1086.04 27.0467 1086.67 26.86 1087.46 26.86C1088.44 26.86 1089.22 27.1833 1089.78 27.83C1090.34 28.47 1090.62 29.45 1090.62 30.77V38H1088.25ZM1093.56 38V27.08H1095.59L1095.85 31.2L1095.68 30.37C1095.76 29.77 1095.91 29.2033 1096.15 28.67C1096.38 28.13 1096.73 27.6933 1097.21 27.36C1097.68 27.0267 1098.31 26.86 1099.1 26.86C1099.97 26.86 1100.67 27.11 1101.21 27.61C1101.75 28.1033 1102.08 28.8633 1102.21 29.89L1102.26 30.05V38H1099.89V31.59C1099.89 30.9633 1099.83 30.46 1099.71 30.08C1099.59 29.7 1099.4 29.4267 1099.14 29.26C1098.88 29.0867 1098.55 29 1098.13 29C1097.63 29 1097.19 29.1467 1096.79 29.44C1096.39 29.7267 1096.1 30.0533 1095.93 30.42V38H1093.56ZM1106.22 38V31.59C1106.22 30.9633 1106.16 30.46 1106.04 30.08C1105.92 29.7 1105.73 29.4267 1105.47 29.26C1105.21 29.0867 1104.88 29 1104.46 29C1103.96 29 1103.52 29.1467 1103.12 29.44C1102.72 29.7267 1102.43 30.0533 1102.26 30.42L1102.24 31.2L1102.08 30.55C1102.14 29.9567 1102.29 29.38 1102.51 28.82C1102.73 28.2533 1103.08 27.7867 1103.55 27.42C1104.01 27.0467 1104.64 26.86 1105.43 26.86C1106.41 26.86 1107.19 27.1833 1107.75 27.83C1108.31 28.47 1108.59 29.45 1108.59 30.77V38H1106.22ZM1114.21 38.12C1113.55 38.12 1112.96 37.9967 1112.44 37.75C1111.93 37.4967 1111.53 37.1467 1111.23 36.7C1110.95 36.2533 1110.8 35.7367 1110.8 35.15C1110.8 34.5033 1110.92 33.97 1111.15 33.55C1111.39 33.13 1111.72 32.7967 1112.16 32.55C1112.61 32.2967 1113.13 32.1033 1113.73 31.97C1114.16 31.8767 1114.61 31.8 1115.08 31.74C1115.56 31.68 1116.01 31.6333 1116.41 31.6C1116.82 31.56 1117.13 31.5333 1117.35 31.52V31.08C1117.35 30.34 1117.2 29.7867 1116.9 29.42C1116.61 29.0467 1116.11 28.86 1115.4 28.86C1114.95 28.86 1114.57 28.9167 1114.26 29.03C1113.96 29.1367 1113.72 29.3433 1113.56 29.65C1113.41 29.95 1113.33 30.39 1113.31 30.97H1111.16C1111.09 30.03 1111.22 29.26 1111.56 28.66C1111.91 28.0533 1112.42 27.6067 1113.1 27.32C1113.79 27.0267 1114.6 26.88 1115.53 26.88C1116.09 26.88 1116.61 26.9433 1117.09 27.07C1117.59 27.19 1118.02 27.4 1118.4 27.7C1118.78 27.9933 1119.08 28.3967 1119.3 28.91C1119.52 29.4233 1119.63 30.0733 1119.63 30.86V38H1117.32L1117.35 35.55C1117.23 36.29 1116.91 36.9033 1116.39 37.39C1115.88 37.8767 1115.15 38.12 1114.21 38.12ZM1114.84 36.34C1115.19 36.34 1115.54 36.28 1115.89 36.16C1116.25 36.04 1116.57 35.8667 1116.83 35.64C1117.11 35.4133 1117.28 35.1467 1117.35 34.84V32.84C1117.09 32.8667 1116.77 32.9133 1116.4 32.98C1116.04 33.0467 1115.73 33.1067 1115.47 33.16C1114.73 33.3133 1114.19 33.5167 1113.85 33.77C1113.53 34.0167 1113.36 34.3967 1113.36 34.91C1113.36 35.2033 1113.43 35.46 1113.56 35.68C1113.7 35.8933 1113.89 36.0567 1114.11 36.17C1114.34 36.2833 1114.58 36.34 1114.84 36.34ZM1122.54 38V27.08H1124.56L1124.82 31.29L1124.61 30.71C1124.66 30.27 1124.74 29.8233 1124.87 29.37C1125 28.9167 1125.19 28.5 1125.43 28.12C1125.68 27.74 1125.99 27.4367 1126.37 27.21C1126.76 26.9767 1127.23 26.86 1127.78 26.86C1127.91 26.86 1128.05 26.8667 1128.18 26.88C1128.31 26.8933 1128.44 26.9167 1128.55 26.95V29.47C1128.32 29.3967 1128.08 29.35 1127.82 29.33C1127.57 29.3033 1127.33 29.29 1127.12 29.29C1126.86 29.29 1126.58 29.3433 1126.28 29.45C1125.98 29.55 1125.7 29.7033 1125.45 29.91C1125.2 30.1167 1125.01 30.3733 1124.9 30.68V38H1122.54ZM1130.62 42.31V40.11H1131.48C1131.96 40.11 1132.33 40.0667 1132.59 39.98C1132.86 39.8933 1133.06 39.7633 1133.18 39.59C1133.32 39.4167 1133.41 39.2067 1133.47 38.96C1133.55 38.6667 1133.63 38.4467 1133.71 38.3C1133.81 38.16 1133.92 38.06 1134.04 38H1133.26L1129.7 27.09H1132.32L1133.57 32.07L1134.58 35.68H1134.67L1135.58 32.08L1136.83 27.09H1139.43L1135.92 38C1135.71 38.66 1135.48 39.2567 1135.23 39.79C1134.99 40.3233 1134.7 40.7767 1134.37 41.15C1134.05 41.5233 1133.65 41.81 1133.17 42.01C1132.71 42.21 1132.14 42.31 1131.48 42.31H1130.62Z" fill="#1D4179"/>
<g clip-path="url(#clip0_355_10957)">
<path d="M161.047 21.5667C160.078 21.5667 159.289 22.3551 159.289 23.3244C159.289 24.2936 160.078 25.0821 161.047 25.0821C162.016 25.0821 162.805 24.2936 162.805 23.3244C162.805 22.3552 162.016 21.5667 161.047 21.5667ZM161.047 23.676C160.853 23.676 160.695 23.5183 160.695 23.3244C160.695 23.1305 160.853 22.9729 161.047 22.9729C161.241 22.9729 161.398 23.1305 161.398 23.3244C161.398 23.5183 161.241 23.676 161.047 23.676Z" fill="white"/>
<path d="M176.906 33.1077C175.937 33.1077 175.148 33.8962 175.148 34.8654C175.148 35.8346 175.937 36.6232 176.906 36.6232C177.875 36.6232 178.664 35.8346 178.664 34.8654C178.664 33.8962 177.875 33.1077 176.906 33.1077ZM176.906 35.217C176.712 35.217 176.555 35.0593 176.555 34.8654C176.555 34.6716 176.712 34.5139 176.906 34.5139C177.1 34.5139 177.258 34.6716 177.258 34.8654C177.258 35.0593 177.1 35.217 176.906 35.217Z" fill="white"/>
<path d="M179.814 32.0026C178.235 30.424 175.666 30.4241 174.088 32.0026C172.779 33.311 172.524 35.3367 173.467 36.9287L175.717 40.728H162.087C160.884 40.728 159.905 39.749 159.905 38.5458C159.905 37.3426 160.884 36.3636 162.087 36.3636H168.689C170.668 36.3636 172.278 34.7539 172.278 32.7752C172.278 30.7966 170.668 29.1868 168.689 29.1868H162.283L164.533 25.3876C165.476 23.7956 165.221 21.7699 163.912 20.4615C163.148 19.6969 162.131 19.2756 161.049 19.2756C159.968 19.2756 158.951 19.6968 158.186 20.4615C156.878 21.7699 156.623 23.7957 157.566 25.3877L160.649 30.593H168.689C169.893 30.593 170.872 31.572 170.872 32.7753C170.872 33.9785 169.893 34.9574 168.689 34.9574H162.087C160.109 34.9574 158.499 36.5672 158.499 38.5458C158.499 40.5244 160.108 42.1342 162.087 42.1342H177.351L180.434 36.9288C181.377 35.3367 181.122 33.311 179.814 32.0026ZM158.776 24.6711C158.16 23.632 158.327 22.3099 159.181 21.4559C159.68 20.9568 160.343 20.6819 161.049 20.6819C161.755 20.6819 162.419 20.9568 162.918 21.4559C163.772 22.3099 163.938 23.632 163.323 24.6711L161.049 28.5102L158.776 24.6711ZM179.224 36.2121L176.951 40.0513L174.677 36.2121C174.062 35.173 174.228 33.8509 175.082 32.9969C175.597 32.4818 176.274 32.2242 176.951 32.2242C177.627 32.2242 178.304 32.4818 178.819 32.9969C179.673 33.8509 179.84 35.173 179.224 36.2121Z" fill="white"/>
</g>
<path d="M204.32 38.0048C203.14 38.0048 202.067 37.7115 201.1 37.1248C200.133 36.5382 199.363 35.6748 198.79 34.5348C198.217 33.3948 197.93 31.9982 197.93 30.3448C197.93 28.7448 198.203 27.3882 198.75 26.2748C199.297 25.1615 200.05 24.3182 201.01 23.7448C201.977 23.1648 203.083 22.8748 204.33 22.8748C205.543 22.8748 206.633 23.1648 207.6 23.7448C208.567 24.3182 209.33 25.1615 209.89 26.2748C210.45 27.3882 210.73 28.7448 210.73 30.3448C210.73 31.9982 210.45 33.3948 209.89 34.5348C209.337 35.6748 208.577 36.5382 207.61 37.1248C206.643 37.7115 205.547 38.0048 204.32 38.0048ZM204.32 35.8248C205.067 35.8248 205.74 35.6315 206.34 35.2448C206.94 34.8515 207.417 34.2548 207.77 33.4548C208.13 32.6482 208.31 31.6182 208.31 30.3648C208.31 29.1782 208.133 28.1915 207.78 27.4048C207.427 26.6182 206.95 26.0315 206.35 25.6448C205.75 25.2515 205.077 25.0548 204.33 25.0548C203.617 25.0548 202.957 25.2515 202.35 25.6448C201.75 26.0315 201.267 26.6182 200.9 27.4048C200.533 28.1915 200.35 29.1782 200.35 30.3648C200.35 31.3048 200.453 32.1182 200.66 32.8048C200.873 33.4915 201.163 34.0582 201.53 34.5048C201.903 34.9515 202.327 35.2848 202.8 35.5048C203.28 35.7182 203.787 35.8248 204.32 35.8248ZM216.228 37.9248C215.281 37.9248 214.521 37.5948 213.948 36.9348C213.375 36.2748 213.088 35.3282 213.088 34.0948V26.7848H215.448V33.4648C215.448 33.9982 215.508 34.4382 215.628 34.7848C215.748 35.1315 215.938 35.3848 216.198 35.5448C216.458 35.7048 216.795 35.7848 217.208 35.7848C217.708 35.7848 218.158 35.6415 218.558 35.3548C218.965 35.0615 219.251 34.7315 219.418 34.3648V26.7848H221.778V37.7048H219.768L219.498 33.5848L219.678 34.4148C219.598 35.0148 219.438 35.5815 219.198 36.1148C218.965 36.6482 218.608 37.0848 218.128 37.4248C217.655 37.7582 217.021 37.9248 216.228 37.9248ZM227.934 37.8648C227.067 37.8648 226.39 37.6448 225.904 37.2048C225.424 36.7582 225.184 36.1215 225.184 35.2948V29.7748C225.184 29.5548 225.23 29.3582 225.324 29.1848C225.417 29.0048 225.554 28.8915 225.734 28.8448L225.184 27.2248V26.9348L225.714 23.6648H227.514V34.7048C227.514 35.0915 227.597 35.3615 227.764 35.5148C227.937 35.6682 228.257 35.7448 228.724 35.7448C229.024 35.7448 229.3 35.7448 229.554 35.7448C229.807 35.7382 230.037 35.7315 230.244 35.7248V37.7348C229.897 37.7948 229.517 37.8315 229.104 37.8448C228.69 37.8582 228.3 37.8648 227.934 37.8648ZM223.754 28.8448V26.7848H230.264V28.8448H223.754ZM237.715 37.8248C236.995 37.8248 236.422 37.7048 235.995 37.4648C235.569 37.2248 235.255 36.9448 235.055 36.6248C234.855 36.2982 234.729 36.0115 234.675 35.7648L234.155 35.2948L234.805 35.0148C234.852 35.1815 234.955 35.3448 235.115 35.5048C235.282 35.6582 235.515 35.7848 235.815 35.8848C236.122 35.9782 236.499 36.0248 236.945 36.0248C237.692 36.0248 238.309 35.7348 238.795 35.1548C239.282 34.5748 239.525 33.6115 239.525 32.2648C239.525 31.0515 239.295 30.1382 238.835 29.5248C238.382 28.9048 237.802 28.5948 237.095 28.5948C236.595 28.5948 236.182 28.6648 235.855 28.8048C235.535 28.9448 235.292 29.1082 235.125 29.2948C234.959 29.4815 234.852 29.6482 234.805 29.7948L234.655 29.6548L234.815 29.2748C234.849 28.7682 234.975 28.3148 235.195 27.9148C235.422 27.5082 235.755 27.1848 236.195 26.9448C236.642 26.7048 237.205 26.5848 237.885 26.5848C238.765 26.5848 239.505 26.8215 240.105 27.2948C240.705 27.7615 241.159 28.4048 241.465 29.2248C241.779 30.0382 241.935 30.9782 241.935 32.0448C241.935 33.0115 241.815 33.8582 241.575 34.5848C241.342 35.3048 241.022 35.9048 240.615 36.3848C240.215 36.8648 239.765 37.2248 239.265 37.4648C238.765 37.7048 238.249 37.8248 237.715 37.8248ZM232.475 37.7048L232.465 22.1448H234.815V27.0948L234.825 35.2448L234.995 35.6248L234.805 36.0148L234.705 37.7048H232.475ZM248.747 37.8548C247.74 37.8548 246.863 37.6382 246.117 37.2048C245.37 36.7715 244.79 36.1348 244.377 35.2948C243.963 34.4482 243.757 33.4115 243.757 32.1848C243.757 31.0248 243.973 30.0248 244.407 29.1848C244.847 28.3448 245.447 27.7015 246.207 27.2548C246.967 26.8015 247.827 26.5748 248.787 26.5748C249.827 26.5748 250.717 26.8015 251.457 27.2548C252.203 27.7015 252.777 28.3448 253.177 29.1848C253.577 30.0248 253.777 31.0248 253.777 32.1848C253.777 33.4115 253.553 34.4482 253.107 35.2948C252.667 36.1348 252.067 36.7715 251.307 37.2048C250.547 37.6382 249.693 37.8548 248.747 37.8548ZM248.787 35.8448C249.553 35.8448 250.18 35.5582 250.667 34.9848C251.153 34.4115 251.397 33.4782 251.397 32.1848C251.397 30.9848 251.16 30.0848 250.687 29.4848C250.213 28.8848 249.567 28.5848 248.747 28.5848C247.98 28.5848 247.353 28.8815 246.867 29.4748C246.387 30.0682 246.147 30.9715 246.147 32.1848C246.147 33.4182 246.39 34.3382 246.877 34.9448C247.37 35.5448 248.007 35.8448 248.787 35.8448ZM259.119 37.9248C258.172 37.9248 257.412 37.5948 256.839 36.9348C256.265 36.2748 255.979 35.3282 255.979 34.0948V26.7848H258.339V33.4648C258.339 33.9982 258.399 34.4382 258.519 34.7848C258.639 35.1315 258.829 35.3848 259.089 35.5448C259.349 35.7048 259.685 35.7848 260.099 35.7848C260.599 35.7848 261.049 35.6415 261.449 35.3548C261.855 35.0615 262.142 34.7315 262.309 34.3648V26.7848H264.669V37.7048H262.659L262.389 33.5848L262.569 34.4148C262.489 35.0148 262.329 35.5815 262.089 36.1148C261.855 36.6482 261.499 37.0848 261.019 37.4248C260.545 37.7582 259.912 37.9248 259.119 37.9248ZM267.641 37.7048V26.7848H269.661L269.921 30.9048L269.751 30.0748C269.831 29.4748 269.988 28.9082 270.221 28.3748C270.461 27.8348 270.818 27.3982 271.291 27.0648C271.764 26.7315 272.398 26.5648 273.191 26.5648C274.224 26.5648 275.024 26.8882 275.591 27.5348C276.158 28.1748 276.441 29.1548 276.441 30.4748V37.7048H274.081V31.2948C274.081 30.6682 274.018 30.1648 273.891 29.7848C273.771 29.4048 273.574 29.1315 273.301 28.9648C273.028 28.7915 272.664 28.7048 272.211 28.7048C271.718 28.7048 271.268 28.8515 270.861 29.1448C270.461 29.4315 270.174 29.7582 270.001 30.1248V37.7048H267.641ZM282.97 37.8248C282.03 37.8248 281.243 37.5815 280.61 37.0948C279.977 36.6082 279.5 35.9415 279.18 35.0948C278.86 34.2415 278.7 33.2715 278.7 32.1848C278.7 30.9515 278.907 29.9215 279.32 29.0948C279.74 28.2615 280.28 27.6348 280.94 27.2148C281.6 26.7948 282.303 26.5848 283.05 26.5848C283.777 26.5848 284.347 26.7048 284.76 26.9448C285.173 27.1848 285.477 27.4648 285.67 27.7848C285.863 28.1048 285.987 28.3915 286.04 28.6448L286.73 28.7348L285.91 29.5848C285.857 29.4182 285.75 29.2582 285.59 29.1048C285.437 28.9448 285.213 28.8148 284.92 28.7148C284.633 28.6148 284.26 28.5648 283.8 28.5648C283.02 28.5648 282.377 28.8515 281.87 29.4248C281.363 29.9982 281.11 30.9348 281.11 32.2348C281.11 33.4015 281.34 34.3048 281.8 34.9448C282.267 35.5848 282.873 35.9048 283.62 35.9048C284.127 35.9048 284.537 35.8215 284.85 35.6548C285.17 35.4882 285.417 35.2982 285.59 35.0848C285.763 34.8648 285.87 34.6848 285.91 34.5448L286.01 34.8848L285.91 35.2448C285.877 35.4582 285.81 35.7115 285.71 36.0048C285.61 36.2915 285.45 36.5748 285.23 36.8548C285.017 37.1348 284.727 37.3682 284.36 37.5548C283.993 37.7348 283.53 37.8248 282.97 37.8248ZM285.92 37.7048L285.91 22.1448H288.26V37.7048H285.92ZM298.188 37.8648C297.321 37.8648 296.644 37.6448 296.158 37.2048C295.678 36.7582 295.438 36.1215 295.438 35.2948V29.7748C295.438 29.5548 295.484 29.3582 295.578 29.1848C295.671 29.0048 295.808 28.8915 295.988 28.8448L295.438 27.2248V26.9348L295.968 23.6648H297.768V34.7048C297.768 35.0915 297.851 35.3615 298.018 35.5148C298.191 35.6682 298.511 35.7448 298.978 35.7448C299.278 35.7448 299.554 35.7448 299.808 35.7448C300.061 35.7382 300.291 35.7315 300.498 35.7248V37.7348C300.151 37.7948 299.771 37.8315 299.358 37.8448C298.944 37.8582 298.554 37.8648 298.188 37.8648ZM294.008 28.8448V26.7848H300.518V28.8448H294.008ZM302.719 37.7048V26.7848H304.739L304.999 30.9948L304.789 30.4148C304.836 29.9748 304.923 29.5282 305.049 29.0748C305.183 28.6215 305.369 28.2048 305.609 27.8248C305.856 27.4448 306.169 27.1415 306.549 26.9148C306.936 26.6815 307.406 26.5648 307.959 26.5648C308.093 26.5648 308.226 26.5715 308.359 26.5848C308.493 26.5982 308.616 26.6215 308.729 26.6548V29.1748C308.503 29.1015 308.259 29.0548 307.999 29.0348C307.746 29.0082 307.513 28.9948 307.299 28.9948C307.039 28.9948 306.759 29.0482 306.459 29.1548C306.159 29.2548 305.883 29.4082 305.629 29.6148C305.376 29.8215 305.193 30.0782 305.079 30.3848V37.7048H302.719ZM310.493 37.7048V26.7848H312.883L312.853 37.7048H310.493ZM311.703 25.1748C311.27 25.1748 310.903 25.0248 310.603 24.7248C310.303 24.4182 310.153 24.0282 310.153 23.5548C310.153 23.0882 310.303 22.7082 310.603 22.4148C310.903 22.1215 311.27 21.9748 311.703 21.9748C312.123 21.9748 312.483 22.1215 312.783 22.4148C313.09 22.7082 313.243 23.0882 313.243 23.5548C313.243 24.0282 313.09 24.4182 312.783 24.7248C312.483 25.0248 312.123 25.1748 311.703 25.1748ZM321.085 37.8248C320.365 37.8248 319.791 37.7048 319.365 37.4648C318.938 37.2248 318.625 36.9448 318.425 36.6248C318.225 36.2982 318.098 36.0115 318.045 35.7648L317.245 35.8048L318.175 35.0148C318.221 35.1815 318.325 35.3448 318.485 35.5048C318.645 35.6582 318.878 35.7848 319.185 35.8848C319.491 35.9782 319.868 36.0248 320.315 36.0248C321.061 36.0248 321.675 35.7348 322.155 35.1548C322.641 34.5748 322.885 33.6048 322.885 32.2448C322.885 31.0715 322.658 30.1715 322.205 29.5448C321.751 28.9115 321.171 28.5948 320.465 28.5948C319.965 28.5948 319.551 28.6648 319.225 28.8048C318.905 28.9448 318.661 29.1082 318.495 29.2948C318.328 29.4815 318.221 29.6482 318.175 29.7948V29.0448C318.188 28.8248 318.245 28.5782 318.345 28.3048C318.451 28.0248 318.621 27.7548 318.855 27.4948C319.095 27.2282 319.408 27.0115 319.795 26.8448C320.188 26.6715 320.675 26.5848 321.255 26.5848C322.135 26.5848 322.875 26.8215 323.475 27.2948C324.075 27.7682 324.528 28.4182 324.835 29.2448C325.148 30.0648 325.305 30.9982 325.305 32.0448C325.305 33.0115 325.185 33.8582 324.945 34.5848C324.711 35.3048 324.391 35.9048 323.985 36.3848C323.585 36.8648 323.135 37.2248 322.635 37.4648C322.135 37.7048 321.618 37.8248 321.085 37.8248ZM315.825 41.7348V26.7848H318.145L318.175 28.2948V35.1048L318.045 35.7648L318.175 37.7148V41.7348H315.825Z" fill="white"/>
<g clip-path="url(#clip1_355_10957)">
<path d="M632.047 21.8618C631.078 21.8618 630.289 22.6503 630.289 23.6195C630.289 24.5888 631.078 25.3773 632.047 25.3773C633.016 25.3773 633.805 24.5888 633.805 23.6195C633.805 22.6503 633.016 21.8618 632.047 21.8618ZM632.047 23.9711C631.853 23.9711 631.695 23.8135 631.695 23.6196C631.695 23.4257 631.853 23.268 632.047 23.268C632.241 23.268 632.398 23.4257 632.398 23.6196C632.398 23.8135 632.241 23.9711 632.047 23.9711Z" fill="white"/>
<path d="M647.906 33.4028C646.937 33.4028 646.148 34.1913 646.148 35.1606C646.148 36.1298 646.937 36.9183 647.906 36.9183C648.875 36.9183 649.664 36.1298 649.664 35.1606C649.664 34.1914 648.875 33.4028 647.906 33.4028ZM647.906 35.5122C647.712 35.5122 647.555 35.3545 647.555 35.1606C647.555 34.9667 647.712 34.809 647.906 34.809C648.1 34.809 648.258 34.9667 648.258 35.1606C648.258 35.3545 648.1 35.5122 647.906 35.5122Z" fill="white"/>
<path d="M650.814 32.2978C649.235 30.7192 646.666 30.7192 645.088 32.2978C643.779 33.6062 643.524 35.6318 644.467 37.2239L646.717 41.0231H633.087C631.884 41.0231 630.905 40.0442 630.905 38.841C630.905 37.6377 631.884 36.6588 633.087 36.6588H639.689C641.668 36.6588 643.278 35.049 643.278 33.0704C643.278 31.0917 641.668 29.482 639.689 29.482H633.283L635.533 25.6828C636.476 24.0907 636.221 22.065 634.912 20.7567C634.148 19.992 633.131 19.5708 632.049 19.5708C630.968 19.5708 629.951 19.992 629.186 20.7567C627.878 22.0651 627.623 24.0908 628.566 25.6828L631.649 30.8882H639.689C640.893 30.8882 641.872 31.8671 641.872 33.0704C641.872 34.2737 640.893 35.2526 639.689 35.2526H633.087C631.109 35.2526 629.499 36.8624 629.499 38.841C629.499 40.8196 631.108 42.4293 633.087 42.4293H648.351L651.434 37.2239C652.377 35.6318 652.122 33.6062 650.814 32.2978ZM629.776 24.9663C629.16 23.9272 629.327 22.605 630.181 21.7511C630.68 21.2519 631.343 20.9771 632.049 20.9771C632.755 20.9771 633.419 21.252 633.918 21.7511C634.772 22.605 634.938 23.9272 634.323 24.9663L632.049 28.8054L629.776 24.9663ZM650.224 36.5073L647.951 40.3465L645.677 36.5073C645.062 35.4682 645.228 34.1461 646.082 33.2921C646.597 32.7769 647.274 32.5194 647.951 32.5194C648.627 32.5194 649.304 32.777 649.819 33.2921C650.673 34.1461 650.84 35.4682 650.224 36.5073Z" fill="white"/>
</g>
<path d="M677.33 38L673.9 32.28H671.71L671.04 32.13L671.33 30.53V30.21H673.72C674.313 30.21 674.787 30.1133 675.14 29.92C675.493 29.7267 675.747 29.45 675.9 29.09C676.06 28.73 676.14 28.3 676.14 27.8C676.14 27.22 676.033 26.78 675.82 26.48C675.613 26.1733 675.33 25.9633 674.97 25.85C674.61 25.7367 674.207 25.68 673.76 25.68L671.89 25.67L671.81 25.12L671.03 23.46C671.337 23.46 671.633 23.46 671.92 23.46C672.207 23.46 672.507 23.46 672.82 23.46C673.14 23.46 673.497 23.46 673.89 23.46C674.817 23.46 675.63 23.6067 676.33 23.9C677.03 24.1867 677.577 24.6367 677.97 25.25C678.363 25.8567 678.56 26.64 678.56 27.6C678.56 28.24 678.44 28.8633 678.2 29.47C677.967 30.07 677.603 30.59 677.11 31.03C676.617 31.4633 675.983 31.7567 675.21 31.91L675.06 31.76C675.347 31.76 675.583 31.7833 675.77 31.83C675.957 31.87 676.13 31.9633 676.29 32.11C676.45 32.2567 676.627 32.48 676.82 32.78L680.2 38H677.33ZM669.61 38V23.46H671.95V38H669.61ZM686.047 38.15C684.994 38.15 684.08 37.9367 683.307 37.51C682.54 37.0767 681.95 36.44 681.537 35.6C681.124 34.76 680.917 33.73 680.917 32.51C680.917 31.3233 681.134 30.31 681.567 29.47C682.007 28.6233 682.61 27.98 683.377 27.54C684.144 27.0933 685.024 26.87 686.017 26.87C686.997 26.87 687.834 27.0633 688.527 27.45C689.227 27.8367 689.76 28.41 690.127 29.17C690.494 29.9233 690.677 30.85 690.677 31.95C690.677 32.1633 690.67 32.34 690.657 32.48C690.65 32.62 690.64 32.7867 690.627 32.98H683.267C683.327 34.0933 683.6 34.9133 684.087 35.44C684.574 35.96 685.17 36.22 685.877 36.22C686.537 36.22 687.04 36.08 687.387 35.8C687.74 35.5133 687.967 35.1933 688.067 34.84H690.347C690.287 35.54 690.067 36.14 689.687 36.64C689.307 37.1333 688.804 37.51 688.177 37.77C687.557 38.0233 686.847 38.15 686.047 38.15ZM684.347 31.37H688.327C688.307 30.57 688.114 29.9533 687.747 29.52C687.38 29.08 686.777 28.86 685.937 28.86C685.064 28.86 684.414 29.1533 683.987 29.74C683.56 30.32 683.32 31.1233 683.267 32.15C683.32 31.85 683.434 31.6467 683.607 31.54C683.78 31.4267 684.027 31.37 684.347 31.37ZM696.102 38.16C695.235 38.16 694.558 37.94 694.072 37.5C693.592 37.0533 693.352 36.4167 693.352 35.59V30.07C693.352 29.85 693.398 29.6533 693.492 29.48C693.585 29.3 693.722 29.1867 693.902 29.14L693.352 27.52V27.23L693.882 23.96H695.682V35C695.682 35.3867 695.765 35.6567 695.932 35.81C696.105 35.9633 696.425 36.04 696.892 36.04C697.192 36.04 697.468 36.04 697.722 36.04C697.975 36.0333 698.205 36.0267 698.412 36.02V38.03C698.065 38.09 697.685 38.1267 697.272 38.14C696.858 38.1533 696.468 38.16 696.102 38.16ZM691.922 29.14V27.08H698.432V29.14H691.922ZM703.693 38.22C702.746 38.22 701.986 37.89 701.413 37.23C700.839 36.57 700.553 35.6233 700.553 34.39V27.08H702.913V33.76C702.913 34.2933 702.973 34.7333 703.093 35.08C703.213 35.4267 703.403 35.68 703.663 35.84C703.923 36 704.259 36.08 704.673 36.08C705.173 36.08 705.623 35.9367 706.023 35.65C706.429 35.3567 706.716 35.0267 706.883 34.66V27.08H709.243V38H707.233L706.963 33.88L707.143 34.71C707.063 35.31 706.903 35.8767 706.663 36.41C706.429 36.9433 706.073 37.38 705.593 37.72C705.119 38.0533 704.486 38.22 703.693 38.22ZM712.215 38V27.08H714.235L714.495 31.29L714.285 30.71C714.332 30.27 714.419 29.8233 714.545 29.37C714.679 28.9167 714.865 28.5 715.105 28.12C715.352 27.74 715.665 27.4367 716.045 27.21C716.432 26.9767 716.902 26.86 717.455 26.86C717.589 26.86 717.722 26.8667 717.855 26.88C717.989 26.8933 718.112 26.9167 718.225 26.95V29.47C717.999 29.3967 717.755 29.35 717.495 29.33C717.242 29.3033 717.009 29.29 716.795 29.29C716.535 29.29 716.255 29.3433 715.955 29.45C715.655 29.55 715.379 29.7033 715.125 29.91C714.872 30.1167 714.689 30.3733 714.575 30.68V38H712.215ZM719.989 38V27.08H722.009L722.269 31.2L722.099 30.37C722.179 29.77 722.335 29.2033 722.569 28.67C722.809 28.13 723.165 27.6933 723.639 27.36C724.112 27.0267 724.745 26.86 725.539 26.86C726.572 26.86 727.372 27.1833 727.939 27.83C728.505 28.47 728.789 29.45 728.789 30.77V38H726.429V31.59C726.429 30.9633 726.365 30.46 726.239 30.08C726.119 29.7 725.922 29.4267 725.649 29.26C725.375 29.0867 725.012 29 724.559 29C724.065 29 723.615 29.1467 723.209 29.44C722.809 29.7267 722.522 30.0533 722.349 30.42V38H719.989ZM738.621 38.16C737.755 38.16 737.078 37.94 736.591 37.5C736.111 37.0533 735.871 36.4167 735.871 35.59V30.07C735.871 29.85 735.918 29.6533 736.011 29.48C736.105 29.3 736.241 29.1867 736.421 29.14L735.871 27.52V27.23L736.401 23.96H738.201V35C738.201 35.3867 738.285 35.6567 738.451 35.81C738.625 35.9633 738.945 36.04 739.411 36.04C739.711 36.04 739.988 36.04 740.241 36.04C740.495 36.0333 740.725 36.0267 740.931 36.02V38.03C740.585 38.09 740.205 38.1267 739.791 38.14C739.378 38.1533 738.988 38.16 738.621 38.16ZM734.441 29.14V27.08H740.951V29.14H734.441ZM743.153 38V27.08H745.173L745.433 31.29L745.223 30.71C745.269 30.27 745.356 29.8233 745.483 29.37C745.616 28.9167 745.803 28.5 746.043 28.12C746.289 27.74 746.603 27.4367 746.983 27.21C747.369 26.9767 747.839 26.86 748.393 26.86C748.526 26.86 748.659 26.8667 748.793 26.88C748.926 26.8933 749.049 26.9167 749.163 26.95V29.47C748.936 29.3967 748.693 29.35 748.433 29.33C748.179 29.3033 747.946 29.29 747.733 29.29C747.473 29.29 747.193 29.3433 746.893 29.45C746.593 29.55 746.316 29.7033 746.063 29.91C745.809 30.1167 745.626 30.3733 745.513 30.68V38H743.153ZM750.927 38V27.08H753.317L753.287 38H750.927ZM752.137 25.47C751.703 25.47 751.337 25.32 751.037 25.02C750.737 24.7133 750.587 24.3233 750.587 23.85C750.587 23.3833 750.737 23.0033 751.037 22.71C751.337 22.4167 751.703 22.27 752.137 22.27C752.557 22.27 752.917 22.4167 753.217 22.71C753.523 23.0033 753.677 23.3833 753.677 23.85C753.677 24.3233 753.523 24.7133 753.217 25.02C752.917 25.32 752.557 25.47 752.137 25.47ZM761.518 38.12C760.798 38.12 760.225 38 759.798 37.76C759.372 37.52 759.058 37.24 758.858 36.92C758.658 36.5933 758.532 36.3067 758.478 36.06L757.678 36.1L758.608 35.31C758.655 35.4767 758.758 35.64 758.918 35.8C759.078 35.9533 759.312 36.08 759.618 36.18C759.925 36.2733 760.302 36.32 760.748 36.32C761.495 36.32 762.108 36.03 762.588 35.45C763.075 34.87 763.318 33.9 763.318 32.54C763.318 31.3667 763.092 30.4667 762.638 29.84C762.185 29.2067 761.605 28.89 760.898 28.89C760.398 28.89 759.985 28.96 759.658 29.1C759.338 29.24 759.095 29.4033 758.928 29.59C758.762 29.7767 758.655 29.9433 758.608 30.09V29.34C758.622 29.12 758.678 28.8733 758.778 28.6C758.885 28.32 759.055 28.05 759.288 27.79C759.528 27.5233 759.842 27.3067 760.228 27.14C760.622 26.9667 761.108 26.88 761.688 26.88C762.568 26.88 763.308 27.1167 763.908 27.59C764.508 28.0633 764.962 28.7133 765.268 29.54C765.582 30.36 765.738 31.2933 765.738 32.34C765.738 33.3067 765.618 34.1533 765.378 34.88C765.145 35.6 764.825 36.2 764.418 36.68C764.018 37.16 763.568 37.52 763.068 37.76C762.568 38 762.052 38.12 761.518 38.12ZM756.258 42.03V27.08H758.578L758.608 28.59V35.4L758.478 36.06L758.608 38.01V42.03H756.258Z" fill="white"/>
<defs>
<clipPath id="clip0_355_10957">
<rect width="24" height="24" fill="white" transform="translate(157 18.7048)"/>
</clipPath>
<clipPath id="clip1_355_10957">
<rect width="24" height="24" fill="white" transform="translate(628 19)"/>
</clipPath>
</defs>
                </svg>
				</div>  : 
				<div className="container w-full mt-[100px] flex justify-center block max-sm:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="62" viewBox="0 0 1300 62" fill="none">
				<path d="M16 61L407 61L484 31L407 1L387 1L16 1C7.16342 1 -3.05176e-05 8.16344 -3.05176e-05 17V31V45C-3.05176e-05 53.8366 7.16342 61 16 61Z" fill="#1D4179"/>
				<path d="M407 61H891L990.5 31L891 1H407.5L483.5 31L407 61Z" fill="#DDE2EB"/>
				<path d="M1299.5 61L891 61L989.5 31L891 1L912.5 1L1299.5 1V31V61Z" stroke="#DDE2EB"/>
				<path d="M1056.9 38.2C1055.83 38.2 1054.91 38.03 1054.13 37.69C1053.35 37.35 1052.74 36.84 1052.31 36.16C1051.88 35.4733 1051.65 34.6133 1051.63 33.58H1053.91C1053.94 34.14 1054.07 34.61 1054.32 34.99C1054.57 35.37 1054.93 35.6533 1055.38 35.84C1055.84 36.0267 1056.39 36.12 1057.04 36.12C1057.66 36.12 1058.17 36.0467 1058.56 35.9C1058.95 35.7533 1059.24 35.5467 1059.43 35.28C1059.62 35.0067 1059.71 34.6867 1059.71 34.32C1059.71 33.92 1059.6 33.5833 1059.37 33.31C1059.14 33.03 1058.78 32.77 1058.29 32.53C1057.8 32.2833 1057.16 32.02 1056.35 31.74C1055.52 31.4533 1054.79 31.1033 1054.16 30.69C1053.54 30.2767 1053.06 29.7867 1052.71 29.22C1052.37 28.6467 1052.2 27.9767 1052.2 27.21C1052.2 25.9167 1052.62 24.93 1053.47 24.25C1054.32 23.57 1055.48 23.23 1056.95 23.23C1057.97 23.23 1058.8 23.3867 1059.43 23.7C1060.06 24.0133 1060.54 24.4767 1060.86 25.09C1061.19 25.6967 1061.4 26.45 1061.51 27.35H1059.22C1059.16 26.89 1059.04 26.51 1058.85 26.21C1058.66 25.91 1058.41 25.6867 1058.08 25.54C1057.76 25.3867 1057.36 25.31 1056.87 25.31C1056.12 25.31 1055.54 25.4633 1055.13 25.77C1054.72 26.07 1054.52 26.52 1054.52 27.12C1054.52 27.46 1054.58 27.77 1054.71 28.05C1054.84 28.33 1055.11 28.6067 1055.52 28.88C1055.93 29.1533 1056.55 29.4533 1057.38 29.78C1058.02 30.0333 1058.62 30.2767 1059.18 30.51C1059.75 30.7367 1060.24 31 1060.67 31.3C1061.1 31.6 1061.44 31.9733 1061.69 32.42C1061.94 32.8667 1062.06 33.4333 1062.07 34.12C1062.08 35.44 1061.65 36.45 1060.77 37.15C1059.9 37.85 1058.61 38.2 1056.9 38.2ZM1067.06 38.22C1066.12 38.22 1065.36 37.89 1064.78 37.23C1064.21 36.57 1063.92 35.6233 1063.92 34.39V27.08H1066.28V33.76C1066.28 34.2933 1066.34 34.7333 1066.46 35.08C1066.58 35.4267 1066.77 35.68 1067.03 35.84C1067.29 36 1067.63 36.08 1068.04 36.08C1068.54 36.08 1068.99 35.9367 1069.39 35.65C1069.8 35.3567 1070.09 35.0267 1070.25 34.66V27.08H1072.61V38H1070.6L1070.33 33.88L1070.51 34.71C1070.43 35.31 1070.27 35.8767 1070.03 36.41C1069.8 36.9433 1069.44 37.38 1068.96 37.72C1068.49 38.0533 1067.86 38.22 1067.06 38.22ZM1075.59 38V27.08H1077.62L1077.88 31.2L1077.71 30.37C1077.79 29.77 1077.94 29.2033 1078.18 28.67C1078.41 28.13 1078.76 27.6933 1079.24 27.36C1079.71 27.0267 1080.34 26.86 1081.13 26.86C1082 26.86 1082.7 27.11 1083.24 27.61C1083.78 28.1033 1084.11 28.8633 1084.24 29.89L1084.29 30.05V38H1081.92V31.59C1081.92 30.9633 1081.86 30.46 1081.74 30.08C1081.62 29.7 1081.43 29.4267 1081.17 29.26C1080.91 29.0867 1080.58 29 1080.16 29C1079.66 29 1079.22 29.1467 1078.82 29.44C1078.42 29.7267 1078.13 30.0533 1077.96 30.42V38H1075.59ZM1088.25 38V31.59C1088.25 30.9633 1088.19 30.46 1088.07 30.08C1087.95 29.7 1087.76 29.4267 1087.5 29.26C1087.24 29.0867 1086.91 29 1086.49 29C1085.99 29 1085.55 29.1467 1085.15 29.44C1084.75 29.7267 1084.46 30.0533 1084.29 30.42L1084.27 31.2L1084.11 30.55C1084.17 29.9567 1084.32 29.38 1084.54 28.82C1084.76 28.2533 1085.11 27.7867 1085.58 27.42C1086.04 27.0467 1086.67 26.86 1087.46 26.86C1088.44 26.86 1089.22 27.1833 1089.78 27.83C1090.34 28.47 1090.62 29.45 1090.62 30.77V38H1088.25ZM1093.56 38V27.08H1095.59L1095.85 31.2L1095.68 30.37C1095.76 29.77 1095.91 29.2033 1096.15 28.67C1096.38 28.13 1096.73 27.6933 1097.21 27.36C1097.68 27.0267 1098.31 26.86 1099.1 26.86C1099.97 26.86 1100.67 27.11 1101.21 27.61C1101.75 28.1033 1102.08 28.8633 1102.21 29.89L1102.26 30.05V38H1099.89V31.59C1099.89 30.9633 1099.83 30.46 1099.71 30.08C1099.59 29.7 1099.4 29.4267 1099.14 29.26C1098.88 29.0867 1098.55 29 1098.13 29C1097.63 29 1097.19 29.1467 1096.79 29.44C1096.39 29.7267 1096.1 30.0533 1095.93 30.42V38H1093.56ZM1106.22 38V31.59C1106.22 30.9633 1106.16 30.46 1106.04 30.08C1105.92 29.7 1105.73 29.4267 1105.47 29.26C1105.21 29.0867 1104.88 29 1104.46 29C1103.96 29 1103.52 29.1467 1103.12 29.44C1102.72 29.7267 1102.43 30.0533 1102.26 30.42L1102.24 31.2L1102.08 30.55C1102.14 29.9567 1102.29 29.38 1102.51 28.82C1102.73 28.2533 1103.08 27.7867 1103.55 27.42C1104.01 27.0467 1104.64 26.86 1105.43 26.86C1106.41 26.86 1107.19 27.1833 1107.75 27.83C1108.31 28.47 1108.59 29.45 1108.59 30.77V38H1106.22ZM1114.21 38.12C1113.55 38.12 1112.96 37.9967 1112.44 37.75C1111.93 37.4967 1111.53 37.1467 1111.23 36.7C1110.95 36.2533 1110.8 35.7367 1110.8 35.15C1110.8 34.5033 1110.92 33.97 1111.15 33.55C1111.39 33.13 1111.72 32.7967 1112.16 32.55C1112.61 32.2967 1113.13 32.1033 1113.73 31.97C1114.16 31.8767 1114.61 31.8 1115.08 31.74C1115.56 31.68 1116.01 31.6333 1116.41 31.6C1116.82 31.56 1117.13 31.5333 1117.35 31.52V31.08C1117.35 30.34 1117.2 29.7867 1116.9 29.42C1116.61 29.0467 1116.11 28.86 1115.4 28.86C1114.95 28.86 1114.57 28.9167 1114.26 29.03C1113.96 29.1367 1113.72 29.3433 1113.56 29.65C1113.41 29.95 1113.33 30.39 1113.31 30.97H1111.16C1111.09 30.03 1111.22 29.26 1111.56 28.66C1111.91 28.0533 1112.42 27.6067 1113.1 27.32C1113.79 27.0267 1114.6 26.88 1115.53 26.88C1116.09 26.88 1116.61 26.9433 1117.09 27.07C1117.59 27.19 1118.02 27.4 1118.4 27.7C1118.78 27.9933 1119.08 28.3967 1119.3 28.91C1119.52 29.4233 1119.63 30.0733 1119.63 30.86V38H1117.32L1117.35 35.55C1117.23 36.29 1116.91 36.9033 1116.39 37.39C1115.88 37.8767 1115.15 38.12 1114.21 38.12ZM1114.84 36.34C1115.19 36.34 1115.54 36.28 1115.89 36.16C1116.25 36.04 1116.57 35.8667 1116.83 35.64C1117.11 35.4133 1117.28 35.1467 1117.35 34.84V32.84C1117.09 32.8667 1116.77 32.9133 1116.4 32.98C1116.04 33.0467 1115.73 33.1067 1115.47 33.16C1114.73 33.3133 1114.19 33.5167 1113.85 33.77C1113.53 34.0167 1113.36 34.3967 1113.36 34.91C1113.36 35.2033 1113.43 35.46 1113.56 35.68C1113.7 35.8933 1113.89 36.0567 1114.11 36.17C1114.34 36.2833 1114.58 36.34 1114.84 36.34ZM1122.54 38V27.08H1124.56L1124.82 31.29L1124.61 30.71C1124.66 30.27 1124.74 29.8233 1124.87 29.37C1125 28.9167 1125.19 28.5 1125.43 28.12C1125.68 27.74 1125.99 27.4367 1126.37 27.21C1126.76 26.9767 1127.23 26.86 1127.78 26.86C1127.91 26.86 1128.05 26.8667 1128.18 26.88C1128.31 26.8933 1128.44 26.9167 1128.55 26.95V29.47C1128.32 29.3967 1128.08 29.35 1127.82 29.33C1127.57 29.3033 1127.33 29.29 1127.12 29.29C1126.86 29.29 1126.58 29.3433 1126.28 29.45C1125.98 29.55 1125.7 29.7033 1125.45 29.91C1125.2 30.1167 1125.01 30.3733 1124.9 30.68V38H1122.54ZM1130.62 42.31V40.11H1131.48C1131.96 40.11 1132.33 40.0667 1132.59 39.98C1132.86 39.8933 1133.06 39.7633 1133.18 39.59C1133.32 39.4167 1133.41 39.2067 1133.47 38.96C1133.55 38.6667 1133.63 38.4467 1133.71 38.3C1133.81 38.16 1133.92 38.06 1134.04 38H1133.26L1129.7 27.09H1132.32L1133.57 32.07L1134.58 35.68H1134.67L1135.58 32.08L1136.83 27.09H1139.43L1135.92 38C1135.71 38.66 1135.48 39.2567 1135.23 39.79C1134.99 40.3233 1134.7 40.7767 1134.37 41.15C1134.05 41.5233 1133.65 41.81 1133.17 42.01C1132.71 42.21 1132.14 42.31 1131.48 42.31H1130.62Z" fill="#1D4179"/>
				<g clip-path="url(#clip0_355_10950)">
				<path d="M161.047 21.8618C160.078 21.8618 159.289 22.6503 159.289 23.6195C159.289 24.5888 160.078 25.3773 161.047 25.3773C162.016 25.3773 162.805 24.5888 162.805 23.6195C162.805 22.6503 162.016 21.8618 161.047 21.8618ZM161.047 23.9711C160.853 23.9711 160.695 23.8135 160.695 23.6196C160.695 23.4257 160.853 23.268 161.047 23.268C161.241 23.268 161.398 23.4257 161.398 23.6196C161.398 23.8135 161.241 23.9711 161.047 23.9711Z" fill="white"/>
				<path d="M176.906 33.4028C175.937 33.4028 175.148 34.1913 175.148 35.1606C175.148 36.1298 175.937 36.9183 176.906 36.9183C177.875 36.9183 178.664 36.1298 178.664 35.1606C178.664 34.1914 177.875 33.4028 176.906 33.4028ZM176.906 35.5122C176.712 35.5122 176.555 35.3545 176.555 35.1606C176.555 34.9667 176.712 34.809 176.906 34.809C177.1 34.809 177.258 34.9667 177.258 35.1606C177.258 35.3545 177.1 35.5122 176.906 35.5122Z" fill="white"/>
				<path d="M179.814 32.2978C178.235 30.7192 175.666 30.7192 174.088 32.2978C172.779 33.6062 172.524 35.6318 173.467 37.2239L175.717 41.0231H162.087C160.884 41.0231 159.905 40.0442 159.905 38.841C159.905 37.6377 160.884 36.6588 162.087 36.6588H168.689C170.668 36.6588 172.278 35.049 172.278 33.0704C172.278 31.0917 170.668 29.482 168.689 29.482H162.283L164.533 25.6828C165.476 24.0907 165.221 22.065 163.912 20.7567C163.148 19.992 162.131 19.5708 161.049 19.5708C159.968 19.5708 158.951 19.992 158.186 20.7567C156.878 22.0651 156.623 24.0908 157.566 25.6828L160.649 30.8882H168.689C169.893 30.8882 170.872 31.8671 170.872 33.0704C170.872 34.2737 169.893 35.2526 168.689 35.2526H162.087C160.109 35.2526 158.499 36.8624 158.499 38.841C158.499 40.8196 160.108 42.4293 162.087 42.4293H177.351L180.434 37.2239C181.377 35.6318 181.122 33.6062 179.814 32.2978ZM158.776 24.9663C158.16 23.9272 158.327 22.605 159.181 21.7511C159.68 21.2519 160.343 20.9771 161.049 20.9771C161.755 20.9771 162.419 21.252 162.918 21.7511C163.772 22.605 163.938 23.9272 163.323 24.9663L161.049 28.8054L158.776 24.9663ZM179.224 36.5073L176.951 40.3465L174.677 36.5073C174.062 35.4682 174.228 34.1461 175.082 33.2921C175.597 32.7769 176.274 32.5194 176.951 32.5194C177.627 32.5194 178.304 32.777 178.819 33.2921C179.673 34.1461 179.84 35.4682 179.224 36.5073Z" fill="white"/>
				</g>
				<path d="M204.32 38.3C203.14 38.3 202.067 38.0067 201.1 37.42C200.133 36.8333 199.363 35.97 198.79 34.83C198.217 33.69 197.93 32.2933 197.93 30.64C197.93 29.04 198.203 27.6833 198.75 26.57C199.297 25.4567 200.05 24.6133 201.01 24.04C201.977 23.46 203.083 23.17 204.33 23.17C205.543 23.17 206.633 23.46 207.6 24.04C208.567 24.6133 209.33 25.4567 209.89 26.57C210.45 27.6833 210.73 29.04 210.73 30.64C210.73 32.2933 210.45 33.69 209.89 34.83C209.337 35.97 208.577 36.8333 207.61 37.42C206.643 38.0067 205.547 38.3 204.32 38.3ZM204.32 36.12C205.067 36.12 205.74 35.9267 206.34 35.54C206.94 35.1467 207.417 34.55 207.77 33.75C208.13 32.9433 208.31 31.9133 208.31 30.66C208.31 29.4733 208.133 28.4867 207.78 27.7C207.427 26.9133 206.95 26.3267 206.35 25.94C205.75 25.5467 205.077 25.35 204.33 25.35C203.617 25.35 202.957 25.5467 202.35 25.94C201.75 26.3267 201.267 26.9133 200.9 27.7C200.533 28.4867 200.35 29.4733 200.35 30.66C200.35 31.6 200.453 32.4133 200.66 33.1C200.873 33.7867 201.163 34.3533 201.53 34.8C201.903 35.2467 202.327 35.58 202.8 35.8C203.28 36.0133 203.787 36.12 204.32 36.12ZM216.228 38.22C215.281 38.22 214.521 37.89 213.948 37.23C213.375 36.57 213.088 35.6233 213.088 34.39V27.08H215.448V33.76C215.448 34.2933 215.508 34.7333 215.628 35.08C215.748 35.4267 215.938 35.68 216.198 35.84C216.458 36 216.795 36.08 217.208 36.08C217.708 36.08 218.158 35.9367 218.558 35.65C218.965 35.3567 219.251 35.0267 219.418 34.66V27.08H221.778V38H219.768L219.498 33.88L219.678 34.71C219.598 35.31 219.438 35.8767 219.198 36.41C218.965 36.9433 218.608 37.38 218.128 37.72C217.655 38.0533 217.021 38.22 216.228 38.22ZM227.934 38.16C227.067 38.16 226.39 37.94 225.904 37.5C225.424 37.0533 225.184 36.4167 225.184 35.59V30.07C225.184 29.85 225.23 29.6533 225.324 29.48C225.417 29.3 225.554 29.1867 225.734 29.14L225.184 27.52V27.23L225.714 23.96H227.514V35C227.514 35.3867 227.597 35.6567 227.764 35.81C227.937 35.9633 228.257 36.04 228.724 36.04C229.024 36.04 229.3 36.04 229.554 36.04C229.807 36.0333 230.037 36.0267 230.244 36.02V38.03C229.897 38.09 229.517 38.1267 229.104 38.14C228.69 38.1533 228.3 38.16 227.934 38.16ZM223.754 29.14V27.08H230.264V29.14H223.754ZM237.715 38.12C236.995 38.12 236.422 38 235.995 37.76C235.569 37.52 235.255 37.24 235.055 36.92C234.855 36.5933 234.729 36.3067 234.675 36.06L234.155 35.59L234.805 35.31C234.852 35.4767 234.955 35.64 235.115 35.8C235.282 35.9533 235.515 36.08 235.815 36.18C236.122 36.2733 236.499 36.32 236.945 36.32C237.692 36.32 238.309 36.03 238.795 35.45C239.282 34.87 239.525 33.9067 239.525 32.56C239.525 31.3467 239.295 30.4333 238.835 29.82C238.382 29.2 237.802 28.89 237.095 28.89C236.595 28.89 236.182 28.96 235.855 29.1C235.535 29.24 235.292 29.4033 235.125 29.59C234.959 29.7767 234.852 29.9433 234.805 30.09L234.655 29.95L234.815 29.57C234.849 29.0633 234.975 28.61 235.195 28.21C235.422 27.8033 235.755 27.48 236.195 27.24C236.642 27 237.205 26.88 237.885 26.88C238.765 26.88 239.505 27.1167 240.105 27.59C240.705 28.0567 241.159 28.7 241.465 29.52C241.779 30.3333 241.935 31.2733 241.935 32.34C241.935 33.3067 241.815 34.1533 241.575 34.88C241.342 35.6 241.022 36.2 240.615 36.68C240.215 37.16 239.765 37.52 239.265 37.76C238.765 38 238.249 38.12 237.715 38.12ZM232.475 38L232.465 22.44H234.815V27.39L234.825 35.54L234.995 35.92L234.805 36.31L234.705 38H232.475ZM248.747 38.15C247.74 38.15 246.863 37.9333 246.117 37.5C245.37 37.0667 244.79 36.43 244.377 35.59C243.963 34.7433 243.757 33.7067 243.757 32.48C243.757 31.32 243.973 30.32 244.407 29.48C244.847 28.64 245.447 27.9967 246.207 27.55C246.967 27.0967 247.827 26.87 248.787 26.87C249.827 26.87 250.717 27.0967 251.457 27.55C252.203 27.9967 252.777 28.64 253.177 29.48C253.577 30.32 253.777 31.32 253.777 32.48C253.777 33.7067 253.553 34.7433 253.107 35.59C252.667 36.43 252.067 37.0667 251.307 37.5C250.547 37.9333 249.693 38.15 248.747 38.15ZM248.787 36.14C249.553 36.14 250.18 35.8533 250.667 35.28C251.153 34.7067 251.397 33.7733 251.397 32.48C251.397 31.28 251.16 30.38 250.687 29.78C250.213 29.18 249.567 28.88 248.747 28.88C247.98 28.88 247.353 29.1767 246.867 29.77C246.387 30.3633 246.147 31.2667 246.147 32.48C246.147 33.7133 246.39 34.6333 246.877 35.24C247.37 35.84 248.007 36.14 248.787 36.14ZM259.119 38.22C258.172 38.22 257.412 37.89 256.839 37.23C256.265 36.57 255.979 35.6233 255.979 34.39V27.08H258.339V33.76C258.339 34.2933 258.399 34.7333 258.519 35.08C258.639 35.4267 258.829 35.68 259.089 35.84C259.349 36 259.685 36.08 260.099 36.08C260.599 36.08 261.049 35.9367 261.449 35.65C261.855 35.3567 262.142 35.0267 262.309 34.66V27.08H264.669V38H262.659L262.389 33.88L262.569 34.71C262.489 35.31 262.329 35.8767 262.089 36.41C261.855 36.9433 261.499 37.38 261.019 37.72C260.545 38.0533 259.912 38.22 259.119 38.22ZM267.641 38V27.08H269.661L269.921 31.2L269.751 30.37C269.831 29.77 269.988 29.2033 270.221 28.67C270.461 28.13 270.818 27.6933 271.291 27.36C271.764 27.0267 272.398 26.86 273.191 26.86C274.224 26.86 275.024 27.1833 275.591 27.83C276.158 28.47 276.441 29.45 276.441 30.77V38H274.081V31.59C274.081 30.9633 274.018 30.46 273.891 30.08C273.771 29.7 273.574 29.4267 273.301 29.26C273.028 29.0867 272.664 29 272.211 29C271.718 29 271.268 29.1467 270.861 29.44C270.461 29.7267 270.174 30.0533 270.001 30.42V38H267.641ZM282.97 38.12C282.03 38.12 281.243 37.8767 280.61 37.39C279.977 36.9033 279.5 36.2367 279.18 35.39C278.86 34.5367 278.7 33.5667 278.7 32.48C278.7 31.2467 278.907 30.2167 279.32 29.39C279.74 28.5567 280.28 27.93 280.94 27.51C281.6 27.09 282.303 26.88 283.05 26.88C283.777 26.88 284.347 27 284.76 27.24C285.173 27.48 285.477 27.76 285.67 28.08C285.863 28.4 285.987 28.6867 286.04 28.94L286.73 29.03L285.91 29.88C285.857 29.7133 285.75 29.5533 285.59 29.4C285.437 29.24 285.213 29.11 284.92 29.01C284.633 28.91 284.26 28.86 283.8 28.86C283.02 28.86 282.377 29.1467 281.87 29.72C281.363 30.2933 281.11 31.23 281.11 32.53C281.11 33.6967 281.34 34.6 281.8 35.24C282.267 35.88 282.873 36.2 283.62 36.2C284.127 36.2 284.537 36.1167 284.85 35.95C285.17 35.7833 285.417 35.5933 285.59 35.38C285.763 35.16 285.87 34.98 285.91 34.84L286.01 35.18L285.91 35.54C285.877 35.7533 285.81 36.0067 285.71 36.3C285.61 36.5867 285.45 36.87 285.23 37.15C285.017 37.43 284.727 37.6633 284.36 37.85C283.993 38.03 283.53 38.12 282.97 38.12ZM285.92 38L285.91 22.44H288.26V38H285.92ZM298.188 38.16C297.321 38.16 296.644 37.94 296.158 37.5C295.678 37.0533 295.438 36.4167 295.438 35.59V30.07C295.438 29.85 295.484 29.6533 295.578 29.48C295.671 29.3 295.808 29.1867 295.988 29.14L295.438 27.52V27.23L295.968 23.96H297.768V35C297.768 35.3867 297.851 35.6567 298.018 35.81C298.191 35.9633 298.511 36.04 298.978 36.04C299.278 36.04 299.554 36.04 299.808 36.04C300.061 36.0333 300.291 36.0267 300.498 36.02V38.03C300.151 38.09 299.771 38.1267 299.358 38.14C298.944 38.1533 298.554 38.16 298.188 38.16ZM294.008 29.14V27.08H300.518V29.14H294.008ZM302.719 38V27.08H304.739L304.999 31.29L304.789 30.71C304.836 30.27 304.923 29.8233 305.049 29.37C305.183 28.9167 305.369 28.5 305.609 28.12C305.856 27.74 306.169 27.4367 306.549 27.21C306.936 26.9767 307.406 26.86 307.959 26.86C308.093 26.86 308.226 26.8667 308.359 26.88C308.493 26.8933 308.616 26.9167 308.729 26.95V29.47C308.503 29.3967 308.259 29.35 307.999 29.33C307.746 29.3033 307.513 29.29 307.299 29.29C307.039 29.29 306.759 29.3433 306.459 29.45C306.159 29.55 305.883 29.7033 305.629 29.91C305.376 30.1167 305.193 30.3733 305.079 30.68V38H302.719ZM310.493 38V27.08H312.883L312.853 38H310.493ZM311.703 25.47C311.27 25.47 310.903 25.32 310.603 25.02C310.303 24.7133 310.153 24.3233 310.153 23.85C310.153 23.3833 310.303 23.0033 310.603 22.71C310.903 22.4167 311.27 22.27 311.703 22.27C312.123 22.27 312.483 22.4167 312.783 22.71C313.09 23.0033 313.243 23.3833 313.243 23.85C313.243 24.3233 313.09 24.7133 312.783 25.02C312.483 25.32 312.123 25.47 311.703 25.47ZM321.085 38.12C320.365 38.12 319.791 38 319.365 37.76C318.938 37.52 318.625 37.24 318.425 36.92C318.225 36.5933 318.098 36.3067 318.045 36.06L317.245 36.1L318.175 35.31C318.221 35.4767 318.325 35.64 318.485 35.8C318.645 35.9533 318.878 36.08 319.185 36.18C319.491 36.2733 319.868 36.32 320.315 36.32C321.061 36.32 321.675 36.03 322.155 35.45C322.641 34.87 322.885 33.9 322.885 32.54C322.885 31.3667 322.658 30.4667 322.205 29.84C321.751 29.2067 321.171 28.89 320.465 28.89C319.965 28.89 319.551 28.96 319.225 29.1C318.905 29.24 318.661 29.4033 318.495 29.59C318.328 29.7767 318.221 29.9433 318.175 30.09V29.34C318.188 29.12 318.245 28.8733 318.345 28.6C318.451 28.32 318.621 28.05 318.855 27.79C319.095 27.5233 319.408 27.3067 319.795 27.14C320.188 26.9667 320.675 26.88 321.255 26.88C322.135 26.88 322.875 27.1167 323.475 27.59C324.075 28.0633 324.528 28.7133 324.835 29.54C325.148 30.36 325.305 31.2933 325.305 32.34C325.305 33.3067 325.185 34.1533 324.945 34.88C324.711 35.6 324.391 36.2 323.985 36.68C323.585 37.16 323.135 37.52 322.635 37.76C322.135 38 321.618 38.12 321.085 38.12ZM315.825 42.03V27.08H318.145L318.175 28.59V35.4L318.045 36.06L318.175 38.01V42.03H315.825Z" fill="white"/>
				<g clip-path="url(#clip1_355_10950)">
				<path d="M633.047 21.8618C632.078 21.8618 631.289 22.6503 631.289 23.6195C631.289 24.5888 632.078 25.3773 633.047 25.3773C634.016 25.3773 634.805 24.5888 634.805 23.6195C634.805 22.6503 634.016 21.8618 633.047 21.8618ZM633.047 23.9711C632.853 23.9711 632.695 23.8135 632.695 23.6196C632.695 23.4257 632.853 23.268 633.047 23.268C633.241 23.268 633.398 23.4257 633.398 23.6196C633.398 23.8135 633.241 23.9711 633.047 23.9711Z" fill="#1D4179"/>
				<path d="M648.906 33.4028C647.937 33.4028 647.148 34.1913 647.148 35.1606C647.148 36.1298 647.937 36.9183 648.906 36.9183C649.875 36.9183 650.664 36.1298 650.664 35.1606C650.664 34.1914 649.875 33.4028 648.906 33.4028ZM648.906 35.5122C648.712 35.5122 648.555 35.3545 648.555 35.1606C648.555 34.9667 648.712 34.809 648.906 34.809C649.1 34.809 649.258 34.9667 649.258 35.1606C649.258 35.3545 649.1 35.5122 648.906 35.5122Z" fill="#1D4179"/>
				<path d="M651.814 32.2978C650.235 30.7192 647.666 30.7192 646.088 32.2978C644.779 33.6062 644.524 35.6318 645.467 37.2239L647.717 41.0231H634.087C632.884 41.0231 631.905 40.0442 631.905 38.841C631.905 37.6377 632.884 36.6588 634.087 36.6588H640.689C642.668 36.6588 644.278 35.049 644.278 33.0704C644.278 31.0917 642.668 29.482 640.689 29.482H634.283L636.533 25.6828C637.476 24.0907 637.221 22.065 635.912 20.7567C635.148 19.992 634.131 19.5708 633.049 19.5708C631.968 19.5708 630.951 19.992 630.186 20.7567C628.878 22.0651 628.623 24.0908 629.566 25.6828L632.649 30.8882H640.689C641.893 30.8882 642.872 31.8671 642.872 33.0704C642.872 34.2737 641.893 35.2526 640.689 35.2526H634.087C632.109 35.2526 630.499 36.8624 630.499 38.841C630.499 40.8196 632.108 42.4293 634.087 42.4293H649.351L652.434 37.2239C653.377 35.6318 653.122 33.6062 651.814 32.2978ZM630.776 24.9663C630.16 23.9272 630.327 22.605 631.181 21.7511C631.68 21.2519 632.343 20.9771 633.049 20.9771C633.755 20.9771 634.419 21.252 634.918 21.7511C635.772 22.605 635.938 23.9272 635.323 24.9663L633.049 28.8054L630.776 24.9663ZM651.224 36.5073L648.951 40.3465L646.677 36.5073C646.062 35.4682 646.228 34.1461 647.082 33.2921C647.597 32.7769 648.274 32.5194 648.951 32.5194C649.627 32.5194 650.304 32.777 650.819 33.2921C651.673 34.1461 651.84 35.4682 651.224 36.5073Z" fill="#1D4179"/>
				</g>
				<path d="M678.33 38L674.9 32.28H672.71L672.04 32.13L672.33 30.53V30.21H674.72C675.313 30.21 675.787 30.1133 676.14 29.92C676.493 29.7267 676.747 29.45 676.9 29.09C677.06 28.73 677.14 28.3 677.14 27.8C677.14 27.22 677.033 26.78 676.82 26.48C676.613 26.1733 676.33 25.9633 675.97 25.85C675.61 25.7367 675.207 25.68 674.76 25.68L672.89 25.67L672.81 25.12L672.03 23.46C672.337 23.46 672.633 23.46 672.92 23.46C673.207 23.46 673.507 23.46 673.82 23.46C674.14 23.46 674.497 23.46 674.89 23.46C675.817 23.46 676.63 23.6067 677.33 23.9C678.03 24.1867 678.577 24.6367 678.97 25.25C679.363 25.8567 679.56 26.64 679.56 27.6C679.56 28.24 679.44 28.8633 679.2 29.47C678.967 30.07 678.603 30.59 678.11 31.03C677.617 31.4633 676.983 31.7567 676.21 31.91L676.06 31.76C676.347 31.76 676.583 31.7833 676.77 31.83C676.957 31.87 677.13 31.9633 677.29 32.11C677.45 32.2567 677.627 32.48 677.82 32.78L681.2 38H678.33ZM670.61 38V23.46H672.95V38H670.61ZM687.047 38.15C685.994 38.15 685.08 37.9367 684.307 37.51C683.54 37.0767 682.95 36.44 682.537 35.6C682.124 34.76 681.917 33.73 681.917 32.51C681.917 31.3233 682.134 30.31 682.567 29.47C683.007 28.6233 683.61 27.98 684.377 27.54C685.144 27.0933 686.024 26.87 687.017 26.87C687.997 26.87 688.834 27.0633 689.527 27.45C690.227 27.8367 690.76 28.41 691.127 29.17C691.494 29.9233 691.677 30.85 691.677 31.95C691.677 32.1633 691.67 32.34 691.657 32.48C691.65 32.62 691.64 32.7867 691.627 32.98H684.267C684.327 34.0933 684.6 34.9133 685.087 35.44C685.574 35.96 686.17 36.22 686.877 36.22C687.537 36.22 688.04 36.08 688.387 35.8C688.74 35.5133 688.967 35.1933 689.067 34.84H691.347C691.287 35.54 691.067 36.14 690.687 36.64C690.307 37.1333 689.804 37.51 689.177 37.77C688.557 38.0233 687.847 38.15 687.047 38.15ZM685.347 31.37H689.327C689.307 30.57 689.114 29.9533 688.747 29.52C688.38 29.08 687.777 28.86 686.937 28.86C686.064 28.86 685.414 29.1533 684.987 29.74C684.56 30.32 684.32 31.1233 684.267 32.15C684.32 31.85 684.434 31.6467 684.607 31.54C684.78 31.4267 685.027 31.37 685.347 31.37ZM697.102 38.16C696.235 38.16 695.558 37.94 695.072 37.5C694.592 37.0533 694.352 36.4167 694.352 35.59V30.07C694.352 29.85 694.398 29.6533 694.492 29.48C694.585 29.3 694.722 29.1867 694.902 29.14L694.352 27.52V27.23L694.882 23.96H696.682V35C696.682 35.3867 696.765 35.6567 696.932 35.81C697.105 35.9633 697.425 36.04 697.892 36.04C698.192 36.04 698.468 36.04 698.722 36.04C698.975 36.0333 699.205 36.0267 699.412 36.02V38.03C699.065 38.09 698.685 38.1267 698.272 38.14C697.858 38.1533 697.468 38.16 697.102 38.16ZM692.922 29.14V27.08H699.432V29.14H692.922ZM704.693 38.22C703.746 38.22 702.986 37.89 702.413 37.23C701.839 36.57 701.553 35.6233 701.553 34.39V27.08H703.913V33.76C703.913 34.2933 703.973 34.7333 704.093 35.08C704.213 35.4267 704.403 35.68 704.663 35.84C704.923 36 705.259 36.08 705.673 36.08C706.173 36.08 706.623 35.9367 707.023 35.65C707.429 35.3567 707.716 35.0267 707.883 34.66V27.08H710.243V38H708.233L707.963 33.88L708.143 34.71C708.063 35.31 707.903 35.8767 707.663 36.41C707.429 36.9433 707.073 37.38 706.593 37.72C706.119 38.0533 705.486 38.22 704.693 38.22ZM713.215 38V27.08H715.235L715.495 31.29L715.285 30.71C715.332 30.27 715.419 29.8233 715.545 29.37C715.679 28.9167 715.865 28.5 716.105 28.12C716.352 27.74 716.665 27.4367 717.045 27.21C717.432 26.9767 717.902 26.86 718.455 26.86C718.589 26.86 718.722 26.8667 718.855 26.88C718.989 26.8933 719.112 26.9167 719.225 26.95V29.47C718.999 29.3967 718.755 29.35 718.495 29.33C718.242 29.3033 718.009 29.29 717.795 29.29C717.535 29.29 717.255 29.3433 716.955 29.45C716.655 29.55 716.379 29.7033 716.125 29.91C715.872 30.1167 715.689 30.3733 715.575 30.68V38H713.215ZM720.989 38V27.08H723.009L723.269 31.2L723.099 30.37C723.179 29.77 723.335 29.2033 723.569 28.67C723.809 28.13 724.165 27.6933 724.639 27.36C725.112 27.0267 725.745 26.86 726.539 26.86C727.572 26.86 728.372 27.1833 728.939 27.83C729.505 28.47 729.789 29.45 729.789 30.77V38H727.429V31.59C727.429 30.9633 727.365 30.46 727.239 30.08C727.119 29.7 726.922 29.4267 726.649 29.26C726.375 29.0867 726.012 29 725.559 29C725.065 29 724.615 29.1467 724.209 29.44C723.809 29.7267 723.522 30.0533 723.349 30.42V38H720.989ZM739.621 38.16C738.755 38.16 738.078 37.94 737.591 37.5C737.111 37.0533 736.871 36.4167 736.871 35.59V30.07C736.871 29.85 736.918 29.6533 737.011 29.48C737.105 29.3 737.241 29.1867 737.421 29.14L736.871 27.52V27.23L737.401 23.96H739.201V35C739.201 35.3867 739.285 35.6567 739.451 35.81C739.625 35.9633 739.945 36.04 740.411 36.04C740.711 36.04 740.988 36.04 741.241 36.04C741.495 36.0333 741.725 36.0267 741.931 36.02V38.03C741.585 38.09 741.205 38.1267 740.791 38.14C740.378 38.1533 739.988 38.16 739.621 38.16ZM735.441 29.14V27.08H741.951V29.14H735.441ZM744.153 38V27.08H746.173L746.433 31.29L746.223 30.71C746.269 30.27 746.356 29.8233 746.483 29.37C746.616 28.9167 746.803 28.5 747.043 28.12C747.289 27.74 747.603 27.4367 747.983 27.21C748.369 26.9767 748.839 26.86 749.393 26.86C749.526 26.86 749.659 26.8667 749.793 26.88C749.926 26.8933 750.049 26.9167 750.163 26.95V29.47C749.936 29.3967 749.693 29.35 749.433 29.33C749.179 29.3033 748.946 29.29 748.733 29.29C748.473 29.29 748.193 29.3433 747.893 29.45C747.593 29.55 747.316 29.7033 747.063 29.91C746.809 30.1167 746.626 30.3733 746.513 30.68V38H744.153ZM751.927 38V27.08H754.317L754.287 38H751.927ZM753.137 25.47C752.703 25.47 752.337 25.32 752.037 25.02C751.737 24.7133 751.587 24.3233 751.587 23.85C751.587 23.3833 751.737 23.0033 752.037 22.71C752.337 22.4167 752.703 22.27 753.137 22.27C753.557 22.27 753.917 22.4167 754.217 22.71C754.523 23.0033 754.677 23.3833 754.677 23.85C754.677 24.3233 754.523 24.7133 754.217 25.02C753.917 25.32 753.557 25.47 753.137 25.47ZM762.518 38.12C761.798 38.12 761.225 38 760.798 37.76C760.372 37.52 760.058 37.24 759.858 36.92C759.658 36.5933 759.532 36.3067 759.478 36.06L758.678 36.1L759.608 35.31C759.655 35.4767 759.758 35.64 759.918 35.8C760.078 35.9533 760.312 36.08 760.618 36.18C760.925 36.2733 761.302 36.32 761.748 36.32C762.495 36.32 763.108 36.03 763.588 35.45C764.075 34.87 764.318 33.9 764.318 32.54C764.318 31.3667 764.092 30.4667 763.638 29.84C763.185 29.2067 762.605 28.89 761.898 28.89C761.398 28.89 760.985 28.96 760.658 29.1C760.338 29.24 760.095 29.4033 759.928 29.59C759.762 29.7767 759.655 29.9433 759.608 30.09V29.34C759.622 29.12 759.678 28.8733 759.778 28.6C759.885 28.32 760.055 28.05 760.288 27.79C760.528 27.5233 760.842 27.3067 761.228 27.14C761.622 26.9667 762.108 26.88 762.688 26.88C763.568 26.88 764.308 27.1167 764.908 27.59C765.508 28.0633 765.962 28.7133 766.268 29.54C766.582 30.36 766.738 31.2933 766.738 32.34C766.738 33.3067 766.618 34.1533 766.378 34.88C766.145 35.6 765.825 36.2 765.418 36.68C765.018 37.16 764.568 37.52 764.068 37.76C763.568 38 763.052 38.12 762.518 38.12ZM757.258 42.03V27.08H759.578L759.608 28.59V35.4L759.478 36.06L759.608 38.01V42.03H757.258Z" fill="#1D4179"/>
				<defs>
				<clipPath id="clip0_355_10950">
				<rect width="24" height="24" fill="white" transform="translate(157 19)"/>
				</clipPath>
				<clipPath id="clip1_355_10950">
				<rect width="24" height="24" fill="white" transform="translate(629 19)"/>
				</clipPath>
				</defs>
				</svg>
				</div>
			}

{
				first === "first" && dropOffLocationType !== "oneWay" ?
				<div className=" flex justify-center w-[100%] hidden  max-sm:block">
				<svg xmlns="http://www.w3.org/2000/svg" width="375" height="72" viewBox="0 0 375 72" fill="none">
<rect width="375" height="72" fill="white"/>
<rect x="20" y="16" width="69" height="40" rx="16" fill="#1D4179"/>
<g clip-path="url(#clip0_722_17895)">
<path d="M32.0487 26.8618C31.0795 26.8618 30.291 27.6503 30.291 28.6195C30.291 29.5888 31.0795 30.3773 32.0487 30.3773C33.018 30.3773 33.8065 29.5888 33.8065 28.6195C33.8065 27.6503 33.018 26.8618 32.0487 26.8618ZM32.0487 28.9711C31.8549 28.9711 31.6972 28.8135 31.6972 28.6196C31.6972 28.4257 31.8549 28.268 32.0487 28.268C32.2426 28.268 32.4003 28.4257 32.4003 28.6196C32.4002 28.8135 32.2426 28.9711 32.0487 28.9711Z" fill="white"/>
<path d="M47.9062 38.4028C46.9369 38.4028 46.1484 39.1913 46.1484 40.1606C46.1484 41.1298 46.9369 41.9183 47.9062 41.9183C48.8754 41.9183 49.6639 41.1298 49.6639 40.1606C49.6639 39.1914 48.8754 38.4028 47.9062 38.4028ZM47.9062 40.5122C47.7123 40.5122 47.5546 40.3545 47.5546 40.1606C47.5546 39.9667 47.7123 39.809 47.9062 39.809C48.1 39.809 48.2577 39.9667 48.2577 40.1606C48.2577 40.3545 48.1 40.5122 47.9062 40.5122Z" fill="white"/>
<path d="M50.8135 37.2978C49.2349 35.7192 46.6664 35.7192 45.0878 37.2978C43.7793 38.6062 43.5241 40.6318 44.467 42.2239L46.7171 46.0231H33.0871C31.8839 46.0231 30.9049 45.0442 30.9049 43.841C30.9049 42.6377 31.8838 41.6588 33.0871 41.6588H39.6894C41.668 41.6588 43.2778 40.049 43.2778 38.0704C43.2778 36.0917 41.668 34.482 39.6894 34.482H33.2829L35.533 30.6828C36.4758 29.0907 36.2206 27.065 34.9122 25.7567C34.1475 24.992 33.1308 24.5708 32.0493 24.5708C30.9679 24.5708 29.9511 24.992 29.1864 25.7567C27.878 27.0651 27.6228 29.0908 28.5657 30.6828L31.6486 35.8882H39.6894C40.8926 35.8882 41.8716 36.8671 41.8716 38.0704C41.8716 39.2737 40.8927 40.2526 39.6894 40.2526H33.0871C31.1085 40.2526 29.4987 41.8624 29.4987 43.841C29.4987 45.8196 31.1085 47.4293 33.0871 47.4293H48.3515L51.4344 42.2239C52.3772 40.6318 52.1219 38.6062 50.8135 37.2978ZM29.7756 29.9663C29.1602 28.9272 29.3268 27.605 30.1808 26.7511C30.6799 26.2519 31.3435 25.9771 32.0493 25.9771C32.7551 25.9771 33.4187 26.252 33.9179 26.7511C34.7718 27.605 34.9384 28.9272 34.3231 29.9663L32.0493 33.8054L29.7756 29.9663ZM50.2244 41.5073L47.9507 45.3465L45.6769 41.5073C45.0616 40.4682 45.2281 39.1461 46.0821 38.2921C46.5973 37.7769 47.274 37.5194 47.9507 37.5194C48.6274 37.5194 49.3041 37.777 49.8192 38.2921C50.6732 39.1461 50.8398 40.4682 50.2244 41.5073Z" fill="white"/>
</g>
<path d="M71.82 43L71.84 30.34L72.44 28.46H74.25V43H71.82ZM68.8 32.11V29.79C69.1533 29.79 69.4767 29.7767 69.77 29.75C70.07 29.7167 70.3333 29.6667 70.56 29.6C70.8867 29.5067 71.21 29.3867 71.53 29.24C71.85 29.0867 72.1533 28.8267 72.44 28.46L71.97 30.24C71.8233 30.6 71.68 30.9067 71.54 31.16C71.4067 31.4133 71.1967 31.6167 70.91 31.77C70.65 31.91 70.3867 32.0033 70.12 32.05C69.8533 32.09 69.4133 32.11 68.8 32.11ZM78.0111 43.15C77.5844 43.15 77.2211 43.0033 76.9211 42.71C76.6278 42.41 76.4811 42.02 76.4811 41.54C76.4811 41.0733 76.6278 40.69 76.9211 40.39C77.2211 40.09 77.5844 39.94 78.0111 39.94C78.4444 39.94 78.8078 40.09 79.1011 40.39C79.3944 40.69 79.5411 41.0733 79.5411 41.54C79.5411 42.02 79.3911 42.41 79.0911 42.71C78.7978 43.0033 78.4378 43.15 78.0111 43.15Z" fill="white"/>
<rect x="109" y="16" width="167" height="40" rx="16" fill="#DDE2EB"/>
<g clip-path="url(#clip1_722_17895)">
<path d="M121.049 26.8618C120.08 26.8618 119.291 27.6503 119.291 28.6195C119.291 29.5888 120.08 30.3773 121.049 30.3773C122.018 30.3773 122.806 29.5888 122.806 28.6195C122.806 27.6503 122.018 26.8618 121.049 26.8618ZM121.049 28.9711C120.855 28.9711 120.697 28.8135 120.697 28.6196C120.697 28.4257 120.855 28.268 121.049 28.268C121.243 28.268 121.4 28.4257 121.4 28.6196C121.4 28.8135 121.243 28.9711 121.049 28.9711Z" fill="#1D4179"/>
<path d="M136.906 38.4028C135.937 38.4028 135.148 39.1913 135.148 40.1606C135.148 41.1298 135.937 41.9183 136.906 41.9183C137.875 41.9183 138.664 41.1298 138.664 40.1606C138.664 39.1914 137.875 38.4028 136.906 38.4028ZM136.906 40.5122C136.712 40.5122 136.555 40.3545 136.555 40.1606C136.555 39.9667 136.712 39.809 136.906 39.809C137.1 39.809 137.258 39.9667 137.258 40.1606C137.258 40.3545 137.1 40.5122 136.906 40.5122Z" fill="#1D4179"/>
<path d="M139.814 37.2978C138.235 35.7192 135.666 35.7192 134.088 37.2978C132.779 38.6062 132.524 40.6318 133.467 42.2239L135.717 46.0231H122.087C120.884 46.0231 119.905 45.0442 119.905 43.841C119.905 42.6377 120.884 41.6588 122.087 41.6588H128.689C130.668 41.6588 132.278 40.049 132.278 38.0704C132.278 36.0917 130.668 34.482 128.689 34.482H122.283L124.533 30.6828C125.476 29.0907 125.221 27.065 123.912 25.7567C123.148 24.992 122.131 24.5708 121.049 24.5708C119.968 24.5708 118.951 24.992 118.186 25.7567C116.878 27.0651 116.623 29.0908 117.566 30.6828L120.649 35.8882H128.689C129.893 35.8882 130.872 36.8671 130.872 38.0704C130.872 39.2737 129.893 40.2526 128.689 40.2526H122.087C120.109 40.2526 118.499 41.8624 118.499 43.841C118.499 45.8196 120.108 47.4293 122.087 47.4293H137.351L140.434 42.2239C141.377 40.6318 141.122 38.6062 139.814 37.2978ZM118.776 29.9663C118.16 28.9272 118.327 27.605 119.181 26.7511C119.68 26.2519 120.343 25.9771 121.049 25.9771C121.755 25.9771 122.419 26.252 122.918 26.7511C123.772 27.605 123.938 28.9272 123.323 29.9663L121.049 33.8054L118.776 29.9663ZM139.224 41.5073L136.951 45.3465L134.677 41.5073C134.062 40.4682 134.228 39.1461 135.082 38.2921C135.597 37.7769 136.274 37.5194 136.951 37.5194C137.627 37.5194 138.304 37.777 138.819 38.2921C139.673 39.1461 139.84 40.4682 139.224 41.5073Z" fill="#1D4179"/>
</g>
<path d="M157.31 43C157.71 42.5067 158.107 42.0167 158.5 41.53C158.9 41.0367 159.293 40.5467 159.68 40.06C160.067 39.5733 160.447 39.09 160.82 38.61C161.2 38.13 161.573 37.65 161.94 37.17C162.447 36.5233 162.91 35.94 163.33 35.42C163.75 34.9 164.087 34.39 164.34 33.89C164.593 33.39 164.72 32.8433 164.72 32.25C164.72 31.5833 164.523 31.07 164.13 30.71C163.737 30.35 163.21 30.1767 162.55 30.19C162.057 30.1967 161.613 30.3 161.22 30.5C160.833 30.7 160.54 31.0333 160.34 31.5C160.147 31.96 160.093 32.58 160.18 33.36H157.97C157.83 32.1533 157.933 31.1667 158.28 30.4C158.633 29.6333 159.183 29.07 159.93 28.71C160.683 28.3433 161.59 28.16 162.65 28.16C163.57 28.16 164.357 28.3133 165.01 28.62C165.663 28.9267 166.163 29.3767 166.51 29.97C166.857 30.5633 167.027 31.2833 167.02 32.13C167.02 32.8833 166.91 33.5433 166.69 34.11C166.47 34.6767 166.177 35.2167 165.81 35.73C165.45 36.2367 165.05 36.7833 164.61 37.37C164.343 37.7233 164.07 38.08 163.79 38.44C163.517 38.8 163.247 39.15 162.98 39.49C162.713 39.83 162.453 40.16 162.2 40.48C161.953 40.7933 161.713 41.09 161.48 41.37C161.7 41.1033 161.987 40.95 162.34 40.91C162.7 40.87 163.207 40.85 163.86 40.85H166.99V43H157.31ZM170.488 43.15C170.061 43.15 169.698 43.0033 169.398 42.71C169.104 42.41 168.958 42.02 168.958 41.54C168.958 41.0733 169.104 40.69 169.398 40.39C169.698 40.09 170.061 39.94 170.488 39.94C170.921 39.94 171.284 40.09 171.578 40.39C171.871 40.69 172.018 41.0733 172.018 41.54C172.018 42.02 171.868 42.41 171.568 42.71C171.274 43.0033 170.914 43.15 170.488 43.15Z" fill="#1D4179"/>
<path d="M196.464 41.5L193.72 36.924H191.968L191.432 36.804L191.664 35.524V35.268H193.576C194.051 35.268 194.429 35.1907 194.712 35.036C194.995 34.8813 195.197 34.66 195.32 34.372C195.448 34.084 195.512 33.74 195.512 33.34C195.512 32.876 195.427 32.524 195.256 32.284C195.091 32.0387 194.864 31.8707 194.576 31.78C194.288 31.6893 193.965 31.644 193.608 31.644L192.112 31.636L192.048 31.196L191.424 29.868C191.669 29.868 191.907 29.868 192.136 29.868C192.365 29.868 192.605 29.868 192.856 29.868C193.112 29.868 193.397 29.868 193.712 29.868C194.453 29.868 195.104 29.9853 195.664 30.22C196.224 30.4493 196.661 30.8093 196.976 31.3C197.291 31.7853 197.448 32.412 197.448 33.18C197.448 33.692 197.352 34.1907 197.16 34.676C196.973 35.156 196.683 35.572 196.288 35.924C195.893 36.2707 195.387 36.5053 194.768 36.628L194.648 36.508C194.877 36.508 195.067 36.5267 195.216 36.564C195.365 36.596 195.504 36.6707 195.632 36.788C195.76 36.9053 195.901 37.084 196.056 37.324L198.76 41.5H196.464ZM190.288 41.5V29.868H192.16V41.5H190.288ZM203.438 41.62C202.595 41.62 201.864 41.4493 201.246 41.108C200.632 40.7613 200.16 40.252 199.83 39.58C199.499 38.908 199.334 38.084 199.334 37.108C199.334 36.1587 199.507 35.348 199.854 34.676C200.206 33.9987 200.688 33.484 201.302 33.132C201.915 32.7747 202.619 32.596 203.414 32.596C204.198 32.596 204.867 32.7507 205.422 33.06C205.982 33.3693 206.408 33.828 206.702 34.436C206.995 35.0387 207.142 35.78 207.142 36.66C207.142 36.8307 207.136 36.972 207.126 37.084C207.12 37.196 207.112 37.3293 207.102 37.484H201.214C201.262 38.3747 201.48 39.0307 201.87 39.452C202.259 39.868 202.736 40.076 203.302 40.076C203.83 40.076 204.232 39.964 204.51 39.74C204.792 39.5107 204.974 39.2547 205.054 38.972H206.878C206.83 39.532 206.654 40.012 206.35 40.412C206.046 40.8067 205.643 41.108 205.142 41.316C204.646 41.5187 204.078 41.62 203.438 41.62ZM202.078 36.196H205.262C205.246 35.556 205.091 35.0627 204.798 34.716C204.504 34.364 204.022 34.188 203.35 34.188C202.651 34.188 202.131 34.4227 201.79 34.892C201.448 35.356 201.256 35.9987 201.214 36.82C201.256 36.58 201.347 36.4173 201.486 36.332C201.624 36.2413 201.822 36.196 202.078 36.196ZM211.481 41.628C210.788 41.628 210.247 41.452 209.857 41.1C209.473 40.7427 209.281 40.2333 209.281 39.572V35.156C209.281 34.98 209.319 34.8227 209.393 34.684C209.468 34.54 209.577 34.4493 209.721 34.412L209.281 33.116V32.884L209.705 30.268H211.145V39.1C211.145 39.4093 211.212 39.6253 211.345 39.748C211.484 39.8707 211.74 39.932 212.113 39.932C212.353 39.932 212.575 39.932 212.777 39.932C212.98 39.9267 213.164 39.9213 213.329 39.916V41.524C213.052 41.572 212.748 41.6013 212.417 41.612C212.087 41.6227 211.775 41.628 211.481 41.628ZM208.137 34.412V32.764H213.345V34.412H208.137ZM217.554 41.676C216.797 41.676 216.189 41.412 215.73 40.884C215.272 40.356 215.042 39.5987 215.042 38.612V32.764H216.93V38.108C216.93 38.5347 216.978 38.8867 217.074 39.164C217.17 39.4413 217.322 39.644 217.53 39.772C217.738 39.9 218.008 39.964 218.338 39.964C218.738 39.964 219.098 39.8493 219.418 39.62C219.744 39.3853 219.973 39.1213 220.106 38.828V32.764H221.994V41.5H220.386L220.17 38.204L220.314 38.868C220.25 39.348 220.122 39.8013 219.93 40.228C219.744 40.6547 219.458 41.004 219.074 41.276C218.696 41.5427 218.189 41.676 217.554 41.676ZM224.372 41.5V32.764H225.988L226.196 36.132L226.028 35.668C226.066 35.316 226.135 34.9587 226.236 34.596C226.343 34.2333 226.492 33.9 226.684 33.596C226.882 33.292 227.132 33.0493 227.436 32.868C227.746 32.6813 228.122 32.588 228.564 32.588C228.671 32.588 228.778 32.5933 228.884 32.604C228.991 32.6147 229.09 32.6333 229.18 32.66V34.676C228.999 34.6173 228.804 34.58 228.596 34.564C228.394 34.5427 228.207 34.532 228.036 34.532C227.828 34.532 227.604 34.5747 227.364 34.66C227.124 34.74 226.903 34.8627 226.7 35.028C226.498 35.1933 226.351 35.3987 226.26 35.644V41.5H224.372ZM230.591 41.5V32.764H232.207L232.415 36.06L232.279 35.396C232.343 34.916 232.468 34.4627 232.655 34.036C232.847 33.604 233.132 33.2547 233.511 32.988C233.89 32.7213 234.396 32.588 235.031 32.588C235.858 32.588 236.498 32.8467 236.951 33.364C237.404 33.876 237.631 34.66 237.631 35.716V41.5H235.743V36.372C235.743 35.8707 235.692 35.468 235.591 35.164C235.495 34.86 235.338 34.6413 235.119 34.508C234.9 34.3693 234.61 34.3 234.247 34.3C233.852 34.3 233.492 34.4173 233.167 34.652C232.847 34.8813 232.618 35.1427 232.479 35.436V41.5H230.591ZM245.497 41.628C244.804 41.628 244.262 41.452 243.873 41.1C243.489 40.7427 243.297 40.2333 243.297 39.572V35.156C243.297 34.98 243.334 34.8227 243.409 34.684C243.484 34.54 243.593 34.4493 243.737 34.412L243.297 33.116V32.884L243.721 30.268H245.161V39.1C245.161 39.4093 245.228 39.6253 245.361 39.748C245.5 39.8707 245.756 39.932 246.129 39.932C246.369 39.932 246.59 39.932 246.793 39.932C246.996 39.9267 247.18 39.9213 247.345 39.916V41.524C247.068 41.572 246.764 41.6013 246.433 41.612C246.102 41.6227 245.79 41.628 245.497 41.628ZM242.153 34.412V32.764H247.361V34.412H242.153ZM249.122 41.5V32.764H250.738L250.946 36.132L250.778 35.668C250.816 35.316 250.885 34.9587 250.986 34.596C251.093 34.2333 251.242 33.9 251.434 33.596C251.632 33.292 251.882 33.0493 252.186 32.868C252.496 32.6813 252.872 32.588 253.314 32.588C253.421 32.588 253.528 32.5933 253.634 32.604C253.741 32.6147 253.84 32.6333 253.93 32.66V34.676C253.749 34.6173 253.554 34.58 253.346 34.564C253.144 34.5427 252.957 34.532 252.786 34.532C252.578 34.532 252.354 34.5747 252.114 34.66C251.874 34.74 251.653 34.8627 251.45 35.028C251.248 35.1933 251.101 35.3987 251.01 35.644V41.5H249.122ZM255.341 41.5V32.764H257.253L257.229 41.5H255.341ZM256.309 31.476C255.963 31.476 255.669 31.356 255.429 31.116C255.189 30.8707 255.069 30.5587 255.069 30.18C255.069 29.8067 255.189 29.5027 255.429 29.268C255.669 29.0333 255.963 28.916 256.309 28.916C256.645 28.916 256.933 29.0333 257.173 29.268C257.419 29.5027 257.541 29.8067 257.541 30.18C257.541 30.5587 257.419 30.8707 257.173 31.116C256.933 31.356 256.645 31.476 256.309 31.476ZM263.815 41.596C263.239 41.596 262.78 41.5 262.439 41.308C262.097 41.116 261.847 40.892 261.687 40.636C261.527 40.3747 261.425 40.1453 261.383 39.948L260.743 39.98L261.487 39.348C261.524 39.4813 261.607 39.612 261.735 39.74C261.863 39.8627 262.049 39.964 262.295 40.044C262.54 40.1187 262.841 40.156 263.199 40.156C263.796 40.156 264.287 39.924 264.671 39.46C265.06 38.996 265.255 38.22 265.255 37.132C265.255 36.1933 265.073 35.4733 264.711 34.972C264.348 34.4653 263.884 34.212 263.319 34.212C262.919 34.212 262.588 34.268 262.327 34.38C262.071 34.492 261.876 34.6227 261.743 34.772C261.609 34.9213 261.524 35.0547 261.487 35.172V34.572C261.497 34.396 261.543 34.1987 261.623 33.98C261.708 33.756 261.844 33.54 262.031 33.332C262.223 33.1187 262.473 32.9453 262.783 32.812C263.097 32.6733 263.487 32.604 263.951 32.604C264.655 32.604 265.247 32.7933 265.727 33.172C266.207 33.5507 266.569 34.0707 266.815 34.732C267.065 35.388 267.191 36.1347 267.191 36.972C267.191 37.7453 267.095 38.4227 266.903 39.004C266.716 39.58 266.46 40.06 266.135 40.444C265.815 40.828 265.455 41.116 265.055 41.308C264.655 41.5 264.241 41.596 263.815 41.596ZM259.607 44.724V32.764H261.463L261.487 33.972V39.42L261.383 39.948L261.487 41.508V44.724H259.607Z" fill="#1D4179"/>
<g clip-path="url(#clip2_722_17895)">
<path d="M300.049 26.8618C299.08 26.8618 298.291 27.6503 298.291 28.6195C298.291 29.5888 299.08 30.3773 300.049 30.3773C301.018 30.3773 301.806 29.5888 301.806 28.6195C301.806 27.6503 301.018 26.8618 300.049 26.8618ZM300.049 28.9711C299.855 28.9711 299.697 28.8135 299.697 28.6196C299.697 28.4257 299.855 28.268 300.049 28.268C300.243 28.268 300.4 28.4257 300.4 28.6196C300.4 28.8135 300.243 28.9711 300.049 28.9711Z" fill="#1D4179"/>
<path d="M315.906 38.4028C314.937 38.4028 314.148 39.1913 314.148 40.1606C314.148 41.1298 314.937 41.9183 315.906 41.9183C316.875 41.9183 317.664 41.1298 317.664 40.1606C317.664 39.1914 316.875 38.4028 315.906 38.4028ZM315.906 40.5122C315.712 40.5122 315.555 40.3545 315.555 40.1606C315.555 39.9667 315.712 39.809 315.906 39.809C316.1 39.809 316.258 39.9667 316.258 40.1606C316.258 40.3545 316.1 40.5122 315.906 40.5122Z" fill="#1D4179"/>
<path d="M318.814 37.2978C317.235 35.7192 314.666 35.7192 313.088 37.2978C311.779 38.6062 311.524 40.6318 312.467 42.2239L314.717 46.0231H301.087C299.884 46.0231 298.905 45.0442 298.905 43.841C298.905 42.6377 299.884 41.6588 301.087 41.6588H307.689C309.668 41.6588 311.278 40.049 311.278 38.0704C311.278 36.0917 309.668 34.482 307.689 34.482H301.283L303.533 30.6828C304.476 29.0907 304.221 27.065 302.912 25.7567C302.148 24.992 301.131 24.5708 300.049 24.5708C298.968 24.5708 297.951 24.992 297.186 25.7567C295.878 27.0651 295.623 29.0908 296.566 30.6828L299.649 35.8882H307.689C308.893 35.8882 309.872 36.8671 309.872 38.0704C309.872 39.2737 308.893 40.2526 307.689 40.2526H301.087C299.109 40.2526 297.499 41.8624 297.499 43.841C297.499 45.8196 299.108 47.4293 301.087 47.4293H316.351L319.434 42.2239C320.377 40.6318 320.122 38.6062 318.814 37.2978ZM297.776 29.9663C297.16 28.9272 297.327 27.605 298.181 26.7511C298.68 26.2519 299.343 25.9771 300.049 25.9771C300.755 25.9771 301.419 26.252 301.918 26.7511C302.772 27.605 302.938 28.9272 302.323 29.9663L300.049 33.8054L297.776 29.9663ZM318.224 41.5073L315.951 45.3465L313.677 41.5073C313.062 40.4682 313.228 39.1461 314.082 38.2921C314.597 37.7769 315.274 37.5194 315.951 37.5194C316.627 37.5194 317.304 37.777 317.819 38.2921C318.673 39.1461 318.84 40.4682 318.224 41.5073Z" fill="#1D4179"/>
</g>
<path d="M341.54 43.29C340.853 43.29 340.197 43.2033 339.57 43.03C338.943 42.8567 338.39 42.5833 337.91 42.21C337.437 41.83 337.073 41.3433 336.82 40.75C336.567 40.15 336.467 39.4233 336.52 38.57H338.84C338.8 39.3833 338.997 40.0233 339.43 40.49C339.87 40.9567 340.567 41.19 341.52 41.19C342.013 41.19 342.467 41.1133 342.88 40.96C343.293 40.8 343.623 40.56 343.87 40.24C344.123 39.9133 344.25 39.4933 344.25 38.98C344.25 38.08 343.987 37.44 343.46 37.06C342.933 36.68 342.273 36.49 341.48 36.49H339.96V34.47H341.46C341.967 34.47 342.387 34.3667 342.72 34.16C343.053 33.9467 343.303 33.67 343.47 33.33C343.637 32.99 343.72 32.62 343.72 32.22C343.72 31.56 343.513 31.0567 343.1 30.71C342.687 30.3633 342.17 30.19 341.55 30.19C340.897 30.19 340.357 30.38 339.93 30.76C339.51 31.1333 339.323 31.76 339.37 32.64H337.04C337.033 31.6133 337.197 30.77 337.53 30.11C337.863 29.4433 338.367 28.9533 339.04 28.64C339.713 28.32 340.553 28.16 341.56 28.16C343.053 28.16 344.167 28.53 344.9 29.27C345.64 30.0033 346.01 30.9467 346.01 32.1C346.01 32.5867 345.91 33.07 345.71 33.55C345.51 34.0233 345.197 34.4333 344.77 34.78C344.35 35.12 343.807 35.3433 343.14 35.45C344.227 35.5367 345.067 35.8767 345.66 36.47C346.26 37.0567 346.56 37.9067 346.56 39.02C346.56 39.94 346.343 40.72 345.91 41.36C345.483 41.9933 344.893 42.4733 344.14 42.8C343.387 43.1267 342.52 43.29 341.54 43.29ZM349.624 43.15C349.198 43.15 348.834 43.0033 348.534 42.71C348.241 42.41 348.094 42.02 348.094 41.54C348.094 41.0733 348.241 40.69 348.534 40.39C348.834 40.09 349.198 39.94 349.624 39.94C350.058 39.94 350.421 40.09 350.714 40.39C351.008 40.69 351.154 41.0733 351.154 41.54C351.154 42.02 351.004 42.41 350.704 42.71C350.411 43.0033 350.051 43.15 349.624 43.15Z" fill="#1D4179"/>
<defs>
<clipPath id="clip0_722_17895">
<rect width="24" height="24" fill="white" transform="translate(28 24)"/>
</clipPath>
<clipPath id="clip1_722_17895">
<rect width="24" height="24" fill="white" transform="translate(117 24)"/>
</clipPath>
<clipPath id="clip2_722_17895">
<rect width="24" height="24" fill="white" transform="translate(296 24)"/>
</clipPath>
</defs>
</svg>
			    </div> : 
				<div className="bg-white flex justify-center w-[100%] max-sm:mt-[100px] hidden  max-sm:block">
				<svg xmlns="http://www.w3.org/2000/svg" width="375" height="72" viewBox="0 0 375 72" fill="none">
<rect width="375" height="72" fill="white"/>
<rect x="20" y="16" width="69" height="40" rx="16" fill="#1D4179"/>
<g clip-path="url(#clip0_722_17895)">
<path d="M32.0487 26.8618C31.0795 26.8618 30.291 27.6503 30.291 28.6195C30.291 29.5888 31.0795 30.3773 32.0487 30.3773C33.018 30.3773 33.8065 29.5888 33.8065 28.6195C33.8065 27.6503 33.018 26.8618 32.0487 26.8618ZM32.0487 28.9711C31.8549 28.9711 31.6972 28.8135 31.6972 28.6196C31.6972 28.4257 31.8549 28.268 32.0487 28.268C32.2426 28.268 32.4003 28.4257 32.4003 28.6196C32.4002 28.8135 32.2426 28.9711 32.0487 28.9711Z" fill="white"/>
<path d="M47.9062 38.4028C46.9369 38.4028 46.1484 39.1913 46.1484 40.1606C46.1484 41.1298 46.9369 41.9183 47.9062 41.9183C48.8754 41.9183 49.6639 41.1298 49.6639 40.1606C49.6639 39.1914 48.8754 38.4028 47.9062 38.4028ZM47.9062 40.5122C47.7123 40.5122 47.5546 40.3545 47.5546 40.1606C47.5546 39.9667 47.7123 39.809 47.9062 39.809C48.1 39.809 48.2577 39.9667 48.2577 40.1606C48.2577 40.3545 48.1 40.5122 47.9062 40.5122Z" fill="white"/>
<path d="M50.8135 37.2978C49.2349 35.7192 46.6664 35.7192 45.0878 37.2978C43.7793 38.6062 43.5241 40.6318 44.467 42.2239L46.7171 46.0231H33.0871C31.8839 46.0231 30.9049 45.0442 30.9049 43.841C30.9049 42.6377 31.8838 41.6588 33.0871 41.6588H39.6894C41.668 41.6588 43.2778 40.049 43.2778 38.0704C43.2778 36.0917 41.668 34.482 39.6894 34.482H33.2829L35.533 30.6828C36.4758 29.0907 36.2206 27.065 34.9122 25.7567C34.1475 24.992 33.1308 24.5708 32.0493 24.5708C30.9679 24.5708 29.9511 24.992 29.1864 25.7567C27.878 27.0651 27.6228 29.0908 28.5657 30.6828L31.6486 35.8882H39.6894C40.8926 35.8882 41.8716 36.8671 41.8716 38.0704C41.8716 39.2737 40.8927 40.2526 39.6894 40.2526H33.0871C31.1085 40.2526 29.4987 41.8624 29.4987 43.841C29.4987 45.8196 31.1085 47.4293 33.0871 47.4293H48.3515L51.4344 42.2239C52.3772 40.6318 52.1219 38.6062 50.8135 37.2978ZM29.7756 29.9663C29.1602 28.9272 29.3268 27.605 30.1808 26.7511C30.6799 26.2519 31.3435 25.9771 32.0493 25.9771C32.7551 25.9771 33.4187 26.252 33.9179 26.7511C34.7718 27.605 34.9384 28.9272 34.3231 29.9663L32.0493 33.8054L29.7756 29.9663ZM50.2244 41.5073L47.9507 45.3465L45.6769 41.5073C45.0616 40.4682 45.2281 39.1461 46.0821 38.2921C46.5973 37.7769 47.274 37.5194 47.9507 37.5194C48.6274 37.5194 49.3041 37.777 49.8192 38.2921C50.6732 39.1461 50.8398 40.4682 50.2244 41.5073Z" fill="white"/>
</g>
<path d="M71.82 43L71.84 30.34L72.44 28.46H74.25V43H71.82ZM68.8 32.11V29.79C69.1533 29.79 69.4767 29.7767 69.77 29.75C70.07 29.7167 70.3333 29.6667 70.56 29.6C70.8867 29.5067 71.21 29.3867 71.53 29.24C71.85 29.0867 72.1533 28.8267 72.44 28.46L71.97 30.24C71.8233 30.6 71.68 30.9067 71.54 31.16C71.4067 31.4133 71.1967 31.6167 70.91 31.77C70.65 31.91 70.3867 32.0033 70.12 32.05C69.8533 32.09 69.4133 32.11 68.8 32.11ZM78.0111 43.15C77.5844 43.15 77.2211 43.0033 76.9211 42.71C76.6278 42.41 76.4811 42.02 76.4811 41.54C76.4811 41.0733 76.6278 40.69 76.9211 40.39C77.2211 40.09 77.5844 39.94 78.0111 39.94C78.4444 39.94 78.8078 40.09 79.1011 40.39C79.3944 40.69 79.5411 41.0733 79.5411 41.54C79.5411 42.02 79.3911 42.41 79.0911 42.71C78.7978 43.0033 78.4378 43.15 78.0111 43.15Z" fill="white"/>
<rect x="109" y="16" width="167" height="40" rx="16" fill="#DDE2EB"/>
<g clip-path="url(#clip1_722_17895)">
<path d="M121.049 26.8618C120.08 26.8618 119.291 27.6503 119.291 28.6195C119.291 29.5888 120.08 30.3773 121.049 30.3773C122.018 30.3773 122.806 29.5888 122.806 28.6195C122.806 27.6503 122.018 26.8618 121.049 26.8618ZM121.049 28.9711C120.855 28.9711 120.697 28.8135 120.697 28.6196C120.697 28.4257 120.855 28.268 121.049 28.268C121.243 28.268 121.4 28.4257 121.4 28.6196C121.4 28.8135 121.243 28.9711 121.049 28.9711Z" fill="#1D4179"/>
<path d="M136.906 38.4028C135.937 38.4028 135.148 39.1913 135.148 40.1606C135.148 41.1298 135.937 41.9183 136.906 41.9183C137.875 41.9183 138.664 41.1298 138.664 40.1606C138.664 39.1914 137.875 38.4028 136.906 38.4028ZM136.906 40.5122C136.712 40.5122 136.555 40.3545 136.555 40.1606C136.555 39.9667 136.712 39.809 136.906 39.809C137.1 39.809 137.258 39.9667 137.258 40.1606C137.258 40.3545 137.1 40.5122 136.906 40.5122Z" fill="#1D4179"/>
<path d="M139.814 37.2978C138.235 35.7192 135.666 35.7192 134.088 37.2978C132.779 38.6062 132.524 40.6318 133.467 42.2239L135.717 46.0231H122.087C120.884 46.0231 119.905 45.0442 119.905 43.841C119.905 42.6377 120.884 41.6588 122.087 41.6588H128.689C130.668 41.6588 132.278 40.049 132.278 38.0704C132.278 36.0917 130.668 34.482 128.689 34.482H122.283L124.533 30.6828C125.476 29.0907 125.221 27.065 123.912 25.7567C123.148 24.992 122.131 24.5708 121.049 24.5708C119.968 24.5708 118.951 24.992 118.186 25.7567C116.878 27.0651 116.623 29.0908 117.566 30.6828L120.649 35.8882H128.689C129.893 35.8882 130.872 36.8671 130.872 38.0704C130.872 39.2737 129.893 40.2526 128.689 40.2526H122.087C120.109 40.2526 118.499 41.8624 118.499 43.841C118.499 45.8196 120.108 47.4293 122.087 47.4293H137.351L140.434 42.2239C141.377 40.6318 141.122 38.6062 139.814 37.2978ZM118.776 29.9663C118.16 28.9272 118.327 27.605 119.181 26.7511C119.68 26.2519 120.343 25.9771 121.049 25.9771C121.755 25.9771 122.419 26.252 122.918 26.7511C123.772 27.605 123.938 28.9272 123.323 29.9663L121.049 33.8054L118.776 29.9663ZM139.224 41.5073L136.951 45.3465L134.677 41.5073C134.062 40.4682 134.228 39.1461 135.082 38.2921C135.597 37.7769 136.274 37.5194 136.951 37.5194C137.627 37.5194 138.304 37.777 138.819 38.2921C139.673 39.1461 139.84 40.4682 139.224 41.5073Z" fill="#1D4179"/>
</g>
<path d="M157.31 43C157.71 42.5067 158.107 42.0167 158.5 41.53C158.9 41.0367 159.293 40.5467 159.68 40.06C160.067 39.5733 160.447 39.09 160.82 38.61C161.2 38.13 161.573 37.65 161.94 37.17C162.447 36.5233 162.91 35.94 163.33 35.42C163.75 34.9 164.087 34.39 164.34 33.89C164.593 33.39 164.72 32.8433 164.72 32.25C164.72 31.5833 164.523 31.07 164.13 30.71C163.737 30.35 163.21 30.1767 162.55 30.19C162.057 30.1967 161.613 30.3 161.22 30.5C160.833 30.7 160.54 31.0333 160.34 31.5C160.147 31.96 160.093 32.58 160.18 33.36H157.97C157.83 32.1533 157.933 31.1667 158.28 30.4C158.633 29.6333 159.183 29.07 159.93 28.71C160.683 28.3433 161.59 28.16 162.65 28.16C163.57 28.16 164.357 28.3133 165.01 28.62C165.663 28.9267 166.163 29.3767 166.51 29.97C166.857 30.5633 167.027 31.2833 167.02 32.13C167.02 32.8833 166.91 33.5433 166.69 34.11C166.47 34.6767 166.177 35.2167 165.81 35.73C165.45 36.2367 165.05 36.7833 164.61 37.37C164.343 37.7233 164.07 38.08 163.79 38.44C163.517 38.8 163.247 39.15 162.98 39.49C162.713 39.83 162.453 40.16 162.2 40.48C161.953 40.7933 161.713 41.09 161.48 41.37C161.7 41.1033 161.987 40.95 162.34 40.91C162.7 40.87 163.207 40.85 163.86 40.85H166.99V43H157.31ZM170.488 43.15C170.061 43.15 169.698 43.0033 169.398 42.71C169.104 42.41 168.958 42.02 168.958 41.54C168.958 41.0733 169.104 40.69 169.398 40.39C169.698 40.09 170.061 39.94 170.488 39.94C170.921 39.94 171.284 40.09 171.578 40.39C171.871 40.69 172.018 41.0733 172.018 41.54C172.018 42.02 171.868 42.41 171.568 42.71C171.274 43.0033 170.914 43.15 170.488 43.15Z" fill="#1D4179"/>
<path d="M196.464 41.5L193.72 36.924H191.968L191.432 36.804L191.664 35.524V35.268H193.576C194.051 35.268 194.429 35.1907 194.712 35.036C194.995 34.8813 195.197 34.66 195.32 34.372C195.448 34.084 195.512 33.74 195.512 33.34C195.512 32.876 195.427 32.524 195.256 32.284C195.091 32.0387 194.864 31.8707 194.576 31.78C194.288 31.6893 193.965 31.644 193.608 31.644L192.112 31.636L192.048 31.196L191.424 29.868C191.669 29.868 191.907 29.868 192.136 29.868C192.365 29.868 192.605 29.868 192.856 29.868C193.112 29.868 193.397 29.868 193.712 29.868C194.453 29.868 195.104 29.9853 195.664 30.22C196.224 30.4493 196.661 30.8093 196.976 31.3C197.291 31.7853 197.448 32.412 197.448 33.18C197.448 33.692 197.352 34.1907 197.16 34.676C196.973 35.156 196.683 35.572 196.288 35.924C195.893 36.2707 195.387 36.5053 194.768 36.628L194.648 36.508C194.877 36.508 195.067 36.5267 195.216 36.564C195.365 36.596 195.504 36.6707 195.632 36.788C195.76 36.9053 195.901 37.084 196.056 37.324L198.76 41.5H196.464ZM190.288 41.5V29.868H192.16V41.5H190.288ZM203.438 41.62C202.595 41.62 201.864 41.4493 201.246 41.108C200.632 40.7613 200.16 40.252 199.83 39.58C199.499 38.908 199.334 38.084 199.334 37.108C199.334 36.1587 199.507 35.348 199.854 34.676C200.206 33.9987 200.688 33.484 201.302 33.132C201.915 32.7747 202.619 32.596 203.414 32.596C204.198 32.596 204.867 32.7507 205.422 33.06C205.982 33.3693 206.408 33.828 206.702 34.436C206.995 35.0387 207.142 35.78 207.142 36.66C207.142 36.8307 207.136 36.972 207.126 37.084C207.12 37.196 207.112 37.3293 207.102 37.484H201.214C201.262 38.3747 201.48 39.0307 201.87 39.452C202.259 39.868 202.736 40.076 203.302 40.076C203.83 40.076 204.232 39.964 204.51 39.74C204.792 39.5107 204.974 39.2547 205.054 38.972H206.878C206.83 39.532 206.654 40.012 206.35 40.412C206.046 40.8067 205.643 41.108 205.142 41.316C204.646 41.5187 204.078 41.62 203.438 41.62ZM202.078 36.196H205.262C205.246 35.556 205.091 35.0627 204.798 34.716C204.504 34.364 204.022 34.188 203.35 34.188C202.651 34.188 202.131 34.4227 201.79 34.892C201.448 35.356 201.256 35.9987 201.214 36.82C201.256 36.58 201.347 36.4173 201.486 36.332C201.624 36.2413 201.822 36.196 202.078 36.196ZM211.481 41.628C210.788 41.628 210.247 41.452 209.857 41.1C209.473 40.7427 209.281 40.2333 209.281 39.572V35.156C209.281 34.98 209.319 34.8227 209.393 34.684C209.468 34.54 209.577 34.4493 209.721 34.412L209.281 33.116V32.884L209.705 30.268H211.145V39.1C211.145 39.4093 211.212 39.6253 211.345 39.748C211.484 39.8707 211.74 39.932 212.113 39.932C212.353 39.932 212.575 39.932 212.777 39.932C212.98 39.9267 213.164 39.9213 213.329 39.916V41.524C213.052 41.572 212.748 41.6013 212.417 41.612C212.087 41.6227 211.775 41.628 211.481 41.628ZM208.137 34.412V32.764H213.345V34.412H208.137ZM217.554 41.676C216.797 41.676 216.189 41.412 215.73 40.884C215.272 40.356 215.042 39.5987 215.042 38.612V32.764H216.93V38.108C216.93 38.5347 216.978 38.8867 217.074 39.164C217.17 39.4413 217.322 39.644 217.53 39.772C217.738 39.9 218.008 39.964 218.338 39.964C218.738 39.964 219.098 39.8493 219.418 39.62C219.744 39.3853 219.973 39.1213 220.106 38.828V32.764H221.994V41.5H220.386L220.17 38.204L220.314 38.868C220.25 39.348 220.122 39.8013 219.93 40.228C219.744 40.6547 219.458 41.004 219.074 41.276C218.696 41.5427 218.189 41.676 217.554 41.676ZM224.372 41.5V32.764H225.988L226.196 36.132L226.028 35.668C226.066 35.316 226.135 34.9587 226.236 34.596C226.343 34.2333 226.492 33.9 226.684 33.596C226.882 33.292 227.132 33.0493 227.436 32.868C227.746 32.6813 228.122 32.588 228.564 32.588C228.671 32.588 228.778 32.5933 228.884 32.604C228.991 32.6147 229.09 32.6333 229.18 32.66V34.676C228.999 34.6173 228.804 34.58 228.596 34.564C228.394 34.5427 228.207 34.532 228.036 34.532C227.828 34.532 227.604 34.5747 227.364 34.66C227.124 34.74 226.903 34.8627 226.7 35.028C226.498 35.1933 226.351 35.3987 226.26 35.644V41.5H224.372ZM230.591 41.5V32.764H232.207L232.415 36.06L232.279 35.396C232.343 34.916 232.468 34.4627 232.655 34.036C232.847 33.604 233.132 33.2547 233.511 32.988C233.89 32.7213 234.396 32.588 235.031 32.588C235.858 32.588 236.498 32.8467 236.951 33.364C237.404 33.876 237.631 34.66 237.631 35.716V41.5H235.743V36.372C235.743 35.8707 235.692 35.468 235.591 35.164C235.495 34.86 235.338 34.6413 235.119 34.508C234.9 34.3693 234.61 34.3 234.247 34.3C233.852 34.3 233.492 34.4173 233.167 34.652C232.847 34.8813 232.618 35.1427 232.479 35.436V41.5H230.591ZM245.497 41.628C244.804 41.628 244.262 41.452 243.873 41.1C243.489 40.7427 243.297 40.2333 243.297 39.572V35.156C243.297 34.98 243.334 34.8227 243.409 34.684C243.484 34.54 243.593 34.4493 243.737 34.412L243.297 33.116V32.884L243.721 30.268H245.161V39.1C245.161 39.4093 245.228 39.6253 245.361 39.748C245.5 39.8707 245.756 39.932 246.129 39.932C246.369 39.932 246.59 39.932 246.793 39.932C246.996 39.9267 247.18 39.9213 247.345 39.916V41.524C247.068 41.572 246.764 41.6013 246.433 41.612C246.102 41.6227 245.79 41.628 245.497 41.628ZM242.153 34.412V32.764H247.361V34.412H242.153ZM249.122 41.5V32.764H250.738L250.946 36.132L250.778 35.668C250.816 35.316 250.885 34.9587 250.986 34.596C251.093 34.2333 251.242 33.9 251.434 33.596C251.632 33.292 251.882 33.0493 252.186 32.868C252.496 32.6813 252.872 32.588 253.314 32.588C253.421 32.588 253.528 32.5933 253.634 32.604C253.741 32.6147 253.84 32.6333 253.93 32.66V34.676C253.749 34.6173 253.554 34.58 253.346 34.564C253.144 34.5427 252.957 34.532 252.786 34.532C252.578 34.532 252.354 34.5747 252.114 34.66C251.874 34.74 251.653 34.8627 251.45 35.028C251.248 35.1933 251.101 35.3987 251.01 35.644V41.5H249.122ZM255.341 41.5V32.764H257.253L257.229 41.5H255.341ZM256.309 31.476C255.963 31.476 255.669 31.356 255.429 31.116C255.189 30.8707 255.069 30.5587 255.069 30.18C255.069 29.8067 255.189 29.5027 255.429 29.268C255.669 29.0333 255.963 28.916 256.309 28.916C256.645 28.916 256.933 29.0333 257.173 29.268C257.419 29.5027 257.541 29.8067 257.541 30.18C257.541 30.5587 257.419 30.8707 257.173 31.116C256.933 31.356 256.645 31.476 256.309 31.476ZM263.815 41.596C263.239 41.596 262.78 41.5 262.439 41.308C262.097 41.116 261.847 40.892 261.687 40.636C261.527 40.3747 261.425 40.1453 261.383 39.948L260.743 39.98L261.487 39.348C261.524 39.4813 261.607 39.612 261.735 39.74C261.863 39.8627 262.049 39.964 262.295 40.044C262.54 40.1187 262.841 40.156 263.199 40.156C263.796 40.156 264.287 39.924 264.671 39.46C265.06 38.996 265.255 38.22 265.255 37.132C265.255 36.1933 265.073 35.4733 264.711 34.972C264.348 34.4653 263.884 34.212 263.319 34.212C262.919 34.212 262.588 34.268 262.327 34.38C262.071 34.492 261.876 34.6227 261.743 34.772C261.609 34.9213 261.524 35.0547 261.487 35.172V34.572C261.497 34.396 261.543 34.1987 261.623 33.98C261.708 33.756 261.844 33.54 262.031 33.332C262.223 33.1187 262.473 32.9453 262.783 32.812C263.097 32.6733 263.487 32.604 263.951 32.604C264.655 32.604 265.247 32.7933 265.727 33.172C266.207 33.5507 266.569 34.0707 266.815 34.732C267.065 35.388 267.191 36.1347 267.191 36.972C267.191 37.7453 267.095 38.4227 266.903 39.004C266.716 39.58 266.46 40.06 266.135 40.444C265.815 40.828 265.455 41.116 265.055 41.308C264.655 41.5 264.241 41.596 263.815 41.596ZM259.607 44.724V32.764H261.463L261.487 33.972V39.42L261.383 39.948L261.487 41.508V44.724H259.607Z" fill="#1D4179"/>
<g clip-path="url(#clip2_722_17895)">
<path d="M300.049 26.8618C299.08 26.8618 298.291 27.6503 298.291 28.6195C298.291 29.5888 299.08 30.3773 300.049 30.3773C301.018 30.3773 301.806 29.5888 301.806 28.6195C301.806 27.6503 301.018 26.8618 300.049 26.8618ZM300.049 28.9711C299.855 28.9711 299.697 28.8135 299.697 28.6196C299.697 28.4257 299.855 28.268 300.049 28.268C300.243 28.268 300.4 28.4257 300.4 28.6196C300.4 28.8135 300.243 28.9711 300.049 28.9711Z" fill="#1D4179"/>
<path d="M315.906 38.4028C314.937 38.4028 314.148 39.1913 314.148 40.1606C314.148 41.1298 314.937 41.9183 315.906 41.9183C316.875 41.9183 317.664 41.1298 317.664 40.1606C317.664 39.1914 316.875 38.4028 315.906 38.4028ZM315.906 40.5122C315.712 40.5122 315.555 40.3545 315.555 40.1606C315.555 39.9667 315.712 39.809 315.906 39.809C316.1 39.809 316.258 39.9667 316.258 40.1606C316.258 40.3545 316.1 40.5122 315.906 40.5122Z" fill="#1D4179"/>
<path d="M318.814 37.2978C317.235 35.7192 314.666 35.7192 313.088 37.2978C311.779 38.6062 311.524 40.6318 312.467 42.2239L314.717 46.0231H301.087C299.884 46.0231 298.905 45.0442 298.905 43.841C298.905 42.6377 299.884 41.6588 301.087 41.6588H307.689C309.668 41.6588 311.278 40.049 311.278 38.0704C311.278 36.0917 309.668 34.482 307.689 34.482H301.283L303.533 30.6828C304.476 29.0907 304.221 27.065 302.912 25.7567C302.148 24.992 301.131 24.5708 300.049 24.5708C298.968 24.5708 297.951 24.992 297.186 25.7567C295.878 27.0651 295.623 29.0908 296.566 30.6828L299.649 35.8882H307.689C308.893 35.8882 309.872 36.8671 309.872 38.0704C309.872 39.2737 308.893 40.2526 307.689 40.2526H301.087C299.109 40.2526 297.499 41.8624 297.499 43.841C297.499 45.8196 299.108 47.4293 301.087 47.4293H316.351L319.434 42.2239C320.377 40.6318 320.122 38.6062 318.814 37.2978ZM297.776 29.9663C297.16 28.9272 297.327 27.605 298.181 26.7511C298.68 26.2519 299.343 25.9771 300.049 25.9771C300.755 25.9771 301.419 26.252 301.918 26.7511C302.772 27.605 302.938 28.9272 302.323 29.9663L300.049 33.8054L297.776 29.9663ZM318.224 41.5073L315.951 45.3465L313.677 41.5073C313.062 40.4682 313.228 39.1461 314.082 38.2921C314.597 37.7769 315.274 37.5194 315.951 37.5194C316.627 37.5194 317.304 37.777 317.819 38.2921C318.673 39.1461 318.84 40.4682 318.224 41.5073Z" fill="#1D4179"/>
</g>
<path d="M341.54 43.29C340.853 43.29 340.197 43.2033 339.57 43.03C338.943 42.8567 338.39 42.5833 337.91 42.21C337.437 41.83 337.073 41.3433 336.82 40.75C336.567 40.15 336.467 39.4233 336.52 38.57H338.84C338.8 39.3833 338.997 40.0233 339.43 40.49C339.87 40.9567 340.567 41.19 341.52 41.19C342.013 41.19 342.467 41.1133 342.88 40.96C343.293 40.8 343.623 40.56 343.87 40.24C344.123 39.9133 344.25 39.4933 344.25 38.98C344.25 38.08 343.987 37.44 343.46 37.06C342.933 36.68 342.273 36.49 341.48 36.49H339.96V34.47H341.46C341.967 34.47 342.387 34.3667 342.72 34.16C343.053 33.9467 343.303 33.67 343.47 33.33C343.637 32.99 343.72 32.62 343.72 32.22C343.72 31.56 343.513 31.0567 343.1 30.71C342.687 30.3633 342.17 30.19 341.55 30.19C340.897 30.19 340.357 30.38 339.93 30.76C339.51 31.1333 339.323 31.76 339.37 32.64H337.04C337.033 31.6133 337.197 30.77 337.53 30.11C337.863 29.4433 338.367 28.9533 339.04 28.64C339.713 28.32 340.553 28.16 341.56 28.16C343.053 28.16 344.167 28.53 344.9 29.27C345.64 30.0033 346.01 30.9467 346.01 32.1C346.01 32.5867 345.91 33.07 345.71 33.55C345.51 34.0233 345.197 34.4333 344.77 34.78C344.35 35.12 343.807 35.3433 343.14 35.45C344.227 35.5367 345.067 35.8767 345.66 36.47C346.26 37.0567 346.56 37.9067 346.56 39.02C346.56 39.94 346.343 40.72 345.91 41.36C345.483 41.9933 344.893 42.4733 344.14 42.8C343.387 43.1267 342.52 43.29 341.54 43.29ZM349.624 43.15C349.198 43.15 348.834 43.0033 348.534 42.71C348.241 42.41 348.094 42.02 348.094 41.54C348.094 41.0733 348.241 40.69 348.534 40.39C348.834 40.09 349.198 39.94 349.624 39.94C350.058 39.94 350.421 40.09 350.714 40.39C351.008 40.69 351.154 41.0733 351.154 41.54C351.154 42.02 351.004 42.41 350.704 42.71C350.411 43.0033 350.051 43.15 349.624 43.15Z" fill="#1D4179"/>
<defs>
<clipPath id="clip0_722_17895">
<rect width="24" height="24" fill="white" transform="translate(28 24)"/>
</clipPath>
<clipPath id="clip1_722_17895">
<rect width="24" height="24" fill="white" transform="translate(117 24)"/>
</clipPath>
<clipPath id="clip2_722_17895">
<rect width="24" height="24" fill="white" transform="translate(296 24)"/>
</clipPath>
</defs>
</svg>
			    </div>
			} */}
		
			<main className="container mb-24 mt-11 flex w-full flex-col-reverse lg:mb-32 lg:flex-row">
				<div className=" itmes-start flex justify-between   lg:w-3/5 lg:pr-10 xl:w-2/3 ">
					{renderMain()}
				</div>
				{/* <div className=" container bg-white w-[30%] h-[300px] rounded-lg mt-[120px] flex flex-col">
          <div className="flex justify-start items-center mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 6V12H16.5M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="#FFB229" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span className="text-[#FFB229] text-[20px] font-[500]">Seats on hold for 15:00 Mins</span>
          </div>
          <div className="flex justify-between items-center w-full mt-3">
          <div className="flex justify-start items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15.751 6C15.751 6.99456 15.3559 7.94839 14.6526 8.65165C13.9493 9.35491 12.9955 9.75 12.001 9.75C11.0064 9.75 10.0526 9.35491 9.3493 8.65165C8.64604 7.94839 8.25095 6.99456 8.25095 6C8.25095 5.00544 8.64604 4.05161 9.3493 3.34835C10.0526 2.64509 11.0064 2.25 12.001 2.25C12.9955 2.25 13.9493 2.64509 14.6526 3.34835C15.3559 4.05161 15.751 5.00544 15.751 6ZM4.50195 20.118C4.53409 18.1504 5.33829 16.2742 6.74113 14.894C8.14397 13.5139 10.033 12.7405 12.001 12.7405C13.9689 12.7405 15.8579 13.5139 17.2608 14.894C18.6636 16.2742 19.4678 18.1504 19.5 20.118C17.1473 21.1968 14.5891 21.7535 12.001 21.75C9.32495 21.75 6.78495 21.166 4.50195 20.118Z" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>1 Passenger</span>
          </div>
          <span className="text-[#1D4179] text-[16px] font-[400] cursor-pointer">Edit</span>
          </div>

          <div className="flex w-full items-center  justify-between pb-5 mt-3">
            <div className="flex items-baseline justify-start ">
              <span className="flex flex-col   ">
                <span className="mb-2 flex justify-start">
                  <h4 className=""> 25 may  </h4>
                </span>
                <h4 className="">
                  {" "}
                  cairo |{" "}
                  alx {" "}
                </h4>
              </span>
            </div>

            <div className="flex items-baseline justify-start ">
              <span className="flex flex-col   ">
                <span className="mb-2 flex justify-end text-[16px] font-[400]">
                  Ticket Price
                </span>
                <h4 className="text-[16px] font-[400] text-[#1D4179]">
                  LE 987
                </h4>
              </span>
            </div>
          </div>

          <div className="flex w-full items-center  justify-between pb-5 mt-3">
            <span className="text-[16px] font-[400] text-[]">Tax Included</span>
            <span className="text-[16px] font-[400] text-[#1D4179]">0%</span>
          </div>

          <div className="flex w-full items-center  justify-between pb-5 mt-3">
            <span className="text-[16px] font-[400] text-[]">Total</span>
            <span className="text-[16px] font-[400] text-[#1D4179]">LE 987</span>
          </div>

        </div> */}
			</main>

			
			<PaymentDetailsModal
				iframe={iframe}
				isOpenProp={isOpen}
				onCloseModal={() => setIsOpen(false)}
			/>
			{/* <SeatsDetailsModal
        isOpenProp={true}
        onCloseModal={() => setIsOpen(false)}
      /> */}
		</div>
	);
};

export default CheckOutPage;
