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
			// >>>>>>>>>>>>> err let seat_id = seatsList[0]?.seat_id;
			// "trip_id": 37422,
			// "from_city_id": 2,
			// "to_city_id": 1,
			// "from_location_id": 22,
			// "to_location_id": 53,
			// "date": "2023-10-01",
			// let seat_type_id = seatsList[0]?.seat_type_id;\

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
			let seat_id = seatsList[0]?.seat_id;
			let seat_type_id = seatsList[0]?.seat_type_id;

			const data = {
				round: 1,
				boarding: {
					trip_id: id,
					from_city_id: cityFrom,
					to_city_id: cityTo,
					from_location_id: travelFrom,
					to_location_id: travelTo,
					date: date,
					seats: [
						{
							seat_type_id: seat_type_id,
							seat_id: seat_id,
						},
					],
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
					<h3 className="z-10">{date} . Economy class</h3>
				</div>
			</div>
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
