import React, { FC, Fragment, useEffect, useState } from "react";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { createFirstTrip, createPayment, createTrip, getSeats } from "api";
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

export interface CheckOutOneRoundProps {
	className?: string;
}

const CheckOutOneRound: FC<CheckOutOneRoundProps> = ({ className = "" }) => {
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

	const [ifreturn, setIfreturn] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const dropOffLocationType = window.localStorage.getItem(
		"dropOffLocationType",
	);

	const tf: any = window.localStorage.getItem("travle_from_bus");
	const travle_from_bus = JSON.parse(tf);

	const tt: any = window.localStorage.getItem("travle_to_bus");
	const travle_to_bus = JSON.parse(tt);

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

	// const RenderButton = () => {
	// 	if(dropOffLocationType === "oneWay") {
	// 		return
	// 	} else {
	// 		if(ifreturn === false) {
	// 			return <ButtonPrimary loading={loading} onClick={() => createFirsttrip()}>
	// 							{t("confirmTicket")}
	// 				   </ButtonPrimary>
	// 		}else {

	// 			return
	// 		}

	// 	}
	// }

	// console.log("travelTo",travelTo , "travelFrom" , travelFrom
	//  ,"cityFrom", cityFrom ,"cityTo", cityTo , "trip_id" , id , "date" , date , "selected seate " , selectedSeatsList  )

	// const createTicket = async () => {
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
					seats: seatsList,
				},
			};
			await createFirstTrip(data)
				.then(res => {
					if (res?.data?.data?.gateway_order_id) {
						setOrderId(res?.data?.data?.gateway_order_id);
						setPriceData(res?.data?.data);
						toast.success(res?.data?.message);
						let busTicket: any = JSON.stringify(res?.data);
						window.localStorage.setItem("bus_Ticket", busTicket);
						console.log("create ticket", res?.data?.data);
						navigate(`/bus-trip/oneRound/summary`);
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
					if (err.response.status === 401) {
						navigate("/login");
					}
				});
		} else {
			toast.error(t("selectSeatPlz"));
			setLoading(false);
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
			<div className="flex w-full flex-col space-y-8 border-neutral-200 px-0 dark:border-neutral-700 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
				<h2 className="text-3xl font-semibold lg:text-4xl">
					{t("confirmPayment")}
				</h2>
				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<div>
						<h3 className="text-2xl font-semibold">{t("tripDate")}</h3>
						<NcModal
							renderTrigger={openModal => <></>}
							renderContent={() => <></>}
							modalTitle=""
						/>
					</div>
					<div className="mt-6 flex flex-col divide-y divide-neutral-200 rounded-3xl border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 sm:flex-row sm:divide-x sm:divide-y-0">
						<ModalSelectDate
							defaultValue={date}
							onSelectDate={() => {}}
							renderChildren={({ openModal }) => (
								<button
									onClick={openModal}
									className="flex flex-1 justify-between space-x-5 p-5 text-left "
									type="button"
									disabled
								>
									<div className="flex flex-col">
										<span className="text-sm text-neutral-400">
											{t("tripDate")}
										</span>
										<span className="mt-1.5 text-lg font-semibold">{date}</span>
									</div>
								</button>
							)}
						/>
					</div>
				</div>

				<div>
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
					) : seatsType === "First10" ? (
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
					)}
					{!!priceData && (
						<div className="my-3  w-full">
							<p className="text-lg text-green-500">
								{t("totalPrice", { total: priceData.total })}
								{priceData?.discount > 0 && (
									<>
										<span className="mt-4 flex text-[15px] text-neutral-600 dark:text-neutral-200">
											{t("totalBeforeDiscount", {
												totalBeforeDiscount: priceData?.original_tickets_totals,
											})}
										</span>
										<span className="flex text-[15px] text-neutral-600 dark:text-neutral-200">
											{t("discount", { discount: priceData?.discount })}
										</span>
										<span className="flex text-[15px] text-neutral-600 dark:text-neutral-200">
											{t("totalAfterDiscount", {
												totalAfterDiscount: priceData?.total,
											})}
										</span>
									</>
								)}
							</p>
						</div>
					)}
					<div className="mt-6">
						<div className="pt-8">
							{!orderId && (
								<ButtonPrimary
									loading={loading}
									onClick={() => createOneRound()}
								>
									{t("confirmTicket")}
								</ButtonPrimary>
							)}
							{!!orderId && (
								<ButtonPrimary
									loading={loading}
									onClick={() => createPayments()}
								>
									{t("confirmPay")}
								</ButtonPrimary>
							)}
						</div>
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
						{travelFrom} - {travelTo}
					</h3>
					<h3 className="z-10">{date} . Economy class</h3>
				</div>
			</div>
			<main className="container mt-11 mb-24 flex flex-col-reverse lg:mb-32 lg:flex-row">
				<div className="w-full lg:w-3/5 lg:pr-10 xl:w-2/3 ">{renderMain()}</div>
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

export default CheckOutOneRound;
