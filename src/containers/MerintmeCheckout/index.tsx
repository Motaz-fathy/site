/* eslint-disable jsx-a11y/iframe-has-title */
import { Listbox, Dialog, Transition } from "@headlessui/react";
import {
	CheckIcon,
	ChevronUpDownIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import React, {
	FC,
	Fragment,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment, createTrip, createTripMaritime, getSeats } from "api";
import { useQuery } from "react-query";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import PaymentDetailsModal from "shared/payment";
import { Bus } from "shared/bus";
import { ClassicBus } from "shared/classicBus";
import { ComfortBus } from "shared/ComfortBus";
import { MerintmeHeader } from "./MerintmeHeader";
import axios from "axios";
export interface CheckOutPageProps {
	className?: string;
}

const MaritimeCheckout: FC<CheckOutPageProps> = ({ className = "" }) => {
	const { search } = useLocation();
	const [date, setDate] = useState<string>("");
	const [travelTo, setTravelTo] = useState<string>("");
	const [travelFrom, setTravelFrom] = useState<string>("");
	const [cityTo, setCityTo] = useState<string>("");
	const [cityFrom, setCityFrom] = useState<string>("");
	const { t } = useTranslation();
	const [seats, setSeats] = useState([]);
	const [id, setId] = useState("");
	const [price, setPrice] = useState<string | number>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<number | string>("");
	const [iframe, setIframe] = useState<null | string>(null);
	let [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState<string | null>("");
	const [selectedSeatsList, setSelectedSeatsList] = useState<any>({});
	const [adultSeats, setAdultSeats] = useState<any>(0);
	const [childSeats, setChildSeats] = useState<any>(0);
	const [url, setUrl] = useState();
	const location = useLocation();
	const navigate = useNavigate();
	const [formVal, setFormVal] = useState([
		{
			middle_name: "",
			last_name: "",
			first_name: "",
			passport_number: "",
			nationality_id: 3,
			dob: "",
			passport_created_date: "",
		},
	]);
	const addRow = () => {
		setFormVal([
			...formVal,
			{
				middle_name: "",
				last_name: "",
				first_name: "",
				passport_number: "",
				nationality_id: 3,
				dob: "",
				passport_created_date: "",
			},
		]);
	};
	const onRemove = (i: number) => {
		const newForm = [...formVal];
		newForm.splice(i, 1);
		setFormVal(newForm);
	};
	const onHandle = (e: any, i: number) => {
		let newForm: any = [...formVal];
		newForm[i][e.target.name] = e.target.value;
		setFormVal(newForm);
	};
	useEffect(() => {
		if (!!search) {
			const data = search.slice(1).split("/");
			setDate(data?.[0]);
			setTravelFrom(data?.[2]);
			setTravelTo(data?.[3]);
			setId(data?.[1]);
			setCityFrom(data?.[5]);
			setCityTo(data?.[6]);
			sessionStorage.setItem(
				"path",
				location?.pathname +
					`?${data?.[0]}/${data?.[1]}/${data?.[2]}/${data?.[3]}/${data?.[4]}/${data?.[5]}/${data?.[6]}`,
			);
		}
	}, [search]);

	const formValidation = (formVal: any) => {
		const data = [...formVal];
		let valid = true;
		for (let index = 0; index < data.length; index++) {
			if (data[index].first_name === "") {
				valid = false;
			} else if (data[index].middle_name === "") {
				valid = false;
			} else if (data[index].last_name === "") {
				valid = false;
			} else if (data[index].nationality_id === "") {
				valid = false;
			} else if (data[index].dob === "") {
				valid = false;
			} else if (data[index].passport_number === "") {
				valid = false;
			}
		}
		setFormVal(data);
		return valid;
	};
	const createTicket = async () => {
		setLoading(true);

		if (formValidation(formVal)) {
			await createTripMaritime(
				{
					date,
					to_location_id: +travelTo,
					from_location_id: +travelFrom,
					passenger_details: formVal,
					adult_seats_numbers: +adultSeats,
					child_seats_numbers: +childSeats,
				},
				id,
			)
				.then(res => {
					// console.log(res?.data?.data)
					if (res?.data?.data) {
						setOrderId(res?.data?.data);
						setPrice(res?.data?.data?.total);
						toast.success(res?.data?.message);
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
			toast.error(t("addValidInformation"));
			setLoading(false);
		}
	};
	useEffect(() => {});

	const createPayments = async () => {
		createPayment(orderId)
			.then(res => {
				if (res?.data?.payment_url) {
					setIframe(res?.data?.payment_url);
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

		const token = localStorage.getItem("token");
		const config = {
			headers: {
				accept: "application/json, text/plain, /",
				Authorization: `Bearer ${token}`,
			},
		};

		if (iframe) {
			try {
				const { data } = await axios.post(iframe, config);
				const url = data?.url;
				// console.log(url)
				window.location.href = `${url}`;
			} catch (error: any) {
				console.log(error.message);
			}
		}
	};

	const renderMain = () => {
		return (
			<div className="flex w-full flex-col space-y-8 border-neutral-200 px-0 dark:border-neutral-700 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
				<h2 className="text-[24px] font-semibold first-letter:uppercase ">
					{/* {t("confirmPayment")} */}
					passenger details
				</h2>
				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<div>
						{/* <h3 className="text-2xl font-semibold">{t("tripDate")}</h3> */}
						<NcModal
							renderTrigger={openModal => <></>}
							renderContent={() => <></>}
							modalTitle=""
						/>
					</div>
					{/* <div className="mt-6 flex flex-col divide-y divide-neutral-200 rounded border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 sm:flex-row sm:divide-x sm:divide-y-0">
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
									<PencilSquareIcon className="h-6 w-6 text-neutral-6000 dark:text-neutral-400" />
								</button>
							)}
						/>
					</div> */}
					<div className="mt-2 flex ">
						<div className="w-full rounded-lg bg-white p-8">
							<form data-te-validation-init>
								<div
									className="w-[100%] "
									data-te-datepicker-init
									data-te-input-wrapper-init
									data-te-validate="input"
									data-te-validation-ruleset="isRequired|isNumber"
								>
									<div className=" mb-6  py-8">
										<div className=" text-lg ">
											<div className="w-full">
												<div className="mb-4 grid grid-cols-1 gap-4 gap-y-2 md:grid-cols-5">
													<div className=" md:col-span-3">
														<label htmlFor="guests text-[#69696A] text-[16px] font-[400]">
															{t("adultPassenger")}{" "}
														</label>
														<input
															type="number"
															name="guests"
															id="guests"
															className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 `}
															defaultValue={adultSeats}
															onChange={e => setAdultSeats(e.target.value)}
															required
															min={0}
															placeholder={t("adultPassenger")!}
														/>
													</div>

													<div className="md:col-span-2 ">
														<label htmlFor="child text-[#69696A] text-[16px]">
															{t("childPassenger")}
														</label>
														<input
															type="number"
															name="child"
															id="child"
															className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50  `}
															defaultValue={childSeats}
															onChange={e => setChildSeats(e.target.value)}
															required
															min={0}
															placeholder={t("childPassenger")!}
														/>
													</div>
												</div>
												{formVal.map((item, index) => (
													<>
														<div className="mb-4 grid grid-cols-1 gap-4 gap-y-2 border-b border-gray-200 pb-5 md:grid-cols-5">
															<div className="md:col-span-2">
																<label htmlFor="first_name">
																	{/* {t("firstName")}  */}
																	firs name
																</label>
																<div className="mt-1  flex h-10 items-center rounded border border-gray-200">
																	<input
																		name="first_name"
																		id="first_name"
																		className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50  `}
																		placeholder={t("firstName")!}
																		defaultValue={item.first_name || ""}
																		onChange={e => onHandle(e, index)}
																		required
																	/>
																</div>
															</div>

															<div className="md:col-span-1">
																<label htmlFor="middle_name">
																	{t("middleName")}
																</label>
																<div className="mt-1 flex h-10 items-center rounded border border-gray-200">
																	<input
																		name="middle_name"
																		id="middle_name"
																		placeholder={t("middleName")!}
																		className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50  `}
																		defaultValue={item.middle_name || ""}
																		onChange={e => onHandle(e, index)}
																		required
																	/>
																</div>
															</div>

															<div className="md:col-span-2">
																<label htmlFor="last_name">
																	{t("lastName")}
																</label>
																<div className="mt-1 flex h-10 items-center rounded border border-gray-200">
																	<input
																		name="last_name"
																		id="last_name"
																		placeholder={t("lastName")!}
																		className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50  `}
																		defaultValue={item.last_name || ""}
																		onChange={e => onHandle(e, index)}
																		required
																	/>
																</div>
															</div>
															<div className="md:col-span-3">
																<label htmlFor="nationality_id">
																	{t("nationalId")}
																</label>
																<input
																	type="text"
																	name="nationality_id"
																	id="nationality_id"
																	className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50  `}
																	placeholder={t("nationalId")!}
																	required
																	defaultValue={item.nationality_id || ""}
																	onChange={e => onHandle(e, index)}
																/>
															</div>

															<div className="md:col-span-2">
																<label htmlFor="passport_number">
																	{t("passportNumber")}
																</label>
																<input
																	type="text"
																	name="passport_number"
																	id="passport_number"
																	className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50  `}
																	defaultValue={item.passport_number || ""}
																	onChange={e => onHandle(e, index)}
																	placeholder={t("passportNumber")!}
																	required
																/>
															</div>

															<div className="md:col-span-3">
																<label htmlFor="passport_created_date">
																	{t("createdat")}
																</label>
																<input
																	type="date"
																	name="passport_created_date"
																	id="passport_created_date"
																	className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50  `}
																	defaultValue={
																		item.passport_created_date || ""
																	}
																	onChange={e => onHandle(e, index)}
																	required
																	placeholder={t("createdat")!}
																/>
															</div>

															<div className="md:col-span-2">
																<label htmlFor="dob"> {t("birthDate")}</label>
																<input
																	type="date"
																	name="dob"
																	id="dob"
																	className={`block h-[50px] w-full rounded-[0px] border-neutral-200 bg-white p-5 text-[20px] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50  `}
																	defaultValue={item.dob || ""}
																	onChange={e => onHandle(e, index)}
																	placeholder={t("createdat")!}
																	required
																/>
															</div>
														</div>
														{!!index && (
															<div
																onClick={() => onRemove(index)}
																className="col-span-5 mb-2  mt-1 flex w-full cursor-pointer justify-end font-semibold text-red-500"
															>
																{t("removeOne")}
															</div>
														)}
													</>
												))}
												<div
													onClick={addRow}
													className="col-span-5 mb-2 mt-1 w-full cursor-pointer font-semibold text-indigo-700"
												>
													{t("addOne")}
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div>
					{!!price && (
						<div className="my-3  w-full">
							<p className="text-lg text-green-500">
								{t("totalPrice", { total: price })}
							</p>
						</div>
					)}
					<div className="mt-6">
						<div className="pt-8">
							{!orderId && (
								<ButtonPrimary loading={loading} onClick={() => createTicket()}>
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
	return (
		<div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
			<MerintmeHeader
				from_address={travelFrom}
				to_address={travelTo}
				adult={adultSeats}
				modle={"ship"}
			/>

			<main className="container mt-[6vh] flex flex-col-reverse items-center  max-sm:mt-[9vh]">
				<div className="w-full   ">{renderMain()}</div>
			</main>

			{/* <SeatsDetailsModal
        isOpenProp={true}
        onCloseModal={() => setIsOpen(false)}
      /> */}
		</div>
	);
};

export default MaritimeCheckout;
