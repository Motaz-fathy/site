import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import moment from "moment";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { useTranslation } from "react-i18next";
import { getFlightsClasses } from "api";
import { useQuery } from "react-query";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import SingleDate from "./SingleDate";
import i18next from "i18next";

export interface DateRage {
	startDate: moment.Moment | null;
	endDate: moment.Moment | null;
}

export interface TimeRage {
	startTime: string;
	endTime: string;
}

export interface FlightSearchFormProps {
	haveDefaultValue?: boolean;
	disabled?: boolean;
}

const FlightSearchForm: FC<FlightSearchFormProps> = ({
	haveDefaultValue,
	disabled,
}) => {
	// DEFAULT DATA FOR ARCHIVE PAGE
	const defaultPickUpInputValue = "";
	const defaultDropOffInputValue = "";
	const location = useLocation();
	// USE STATE
	const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
		startDate: null,
		endDate: null,
	});
	const [travelFrom, setTravelFrom] = useState<any>("");
	const [travelTo, setTravelTo] = useState<any>("");
	const { t } = useTranslation();
	const [pickUpInputValue, setPickUpInputValue] = useState<any>("");
	const [dropOffInputValue, setDropOffInputValue] = useState<any>("");
	const [fieldFocused, setFieldFocused] = useState<
		FocusedInputShape | "dropOffInput" | null
	>(null);
	const [dropOffLocationType, setDropOffLocationType] = useState<
		"roundTrip" | "oneWay" | ""
	>("roundTrip");
	const [guests, setGuests] = useState(1);
	const navigate = useNavigate();
	const [flightClassState, setFlightClassState] = useState("");
	const [flightClassCode, setFlightClassCode] = useState("");
	const [flightClass, setFlightClass] = useState<any>([]);

	window.localStorage.setItem("flightClassState" , flightClassState)
	console.log("flightClassState" , flightClassState)
	// USER EFFECT
	useEffect(() => {
		const localStorage = JSON.parse(
			sessionStorage.getItem("flightData") ?? "{}",
		);
		if (Object.keys(localStorage).length && location?.pathname !== "/") {
			setDateRangeValue({
				startDate: moment(localStorage?.dateRangeValue?.startDate),
				endDate: moment(localStorage?.dateRangeValue?.endDate),
			});
			setDropOffLocationType(localStorage?.round === 1 ? "oneWay" : "roundTrip");
			setPickUpInputValue(localStorage?.travelFrom?.name);
			setDropOffInputValue(localStorage?.travelTo?.name);
			setTravelFrom(localStorage?.travelFrom);
			setTravelTo(localStorage?.travelTo);
			setFlightClassCode(localStorage?.cabinClass);
			setFlightClassState(localStorage?.cabinClassState);
			setGuests(localStorage?.adults ?? 0);
		}
	}, []);

	useEffect(() => {
		if (haveDefaultValue) {
			setPickUpInputValue(defaultPickUpInputValue);
			setDropOffInputValue(defaultDropOffInputValue);
		}
	}, []);
	//

	const { data } = useQuery(
		["getFlightsClasses"],
		() => {
			return getFlightsClasses();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				setFlightClass(response?.data?.data);
				setFlightClassState(response?.data?.data?.[1]?.title ?? "");
				setFlightClassCode(response?.data?.data?.[1]?.id ?? "");
				
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

	const navigateFightTrips = () => {
		sessionStorage.setItem(
			"flightData",
			JSON.stringify({
				travelFrom: travelFrom,
				travelTo: travelTo,
				rounded: dropOffLocationType,
				dateRangeValue: dateRangeValue,
				cabinClass: flightClassCode,
				round: dropOffLocationType === "oneWay" ? 1 : 2,
				origin: travelFrom?.id,
				destination: travelTo?.id,
				departureDateTime: dateRangeValue?.startDate?.format("YYYY-MM-DD"),
				arrivalDateTime: dateRangeValue?.endDate?.format("YYYY-MM-DD"),
				adults: guests,
				childrenAges: [],
				cabinClassState: flightClassState,
				filter_by: "cheapest",
				filter_dir: "desc",
			}),

		);
		if(dropOffLocationType === "oneWay"){
			navigate("/listing-flights-oneRound?flights=" + travelFrom?.id);
		} else if (dropOffLocationType === "roundTrip"){
			navigate("/listing-flights-twoRound?flights=" + travelFrom?.id);
		} else {
			navigate("/")
		}
	};
	const renderRadioBtn = () => {
		return (
			<div className=" [ nc-hero-field-padding ] flex flex-row  flex-wrap gap-3 py-5 ">
				<label
					onClick={e => setDropOffLocationType("oneWay")}
					className="flex cursor-pointer select-none items-center text-[#B9C4D5]"
				>
					<div className="relative">
						<input type="checkbox" className="sr-only" />
						<div className="box mr-2 rtl:ml-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#1D4179]">
							<span
								className={`h-[10px] w-[10px] rounded-full
               ${
									dropOffLocationType === "oneWay"
										? "bg-[#1D4179] "
										: "bg-transparent"
								}
              `}
							>
								{" "}
							</span>
						</div>
					</div>
					{t("oneWay")}
				</label>
				<label
					htmlFor="checkboxLabelFour"
					className="flex cursor-pointer select-none items-center text-[#B9C4D5]"
					onClick={e => {
						setDropOffLocationType("roundTrip");
					}}
				>
					<div className="relative">
						<input type="checkbox" id="checkboxLabelFour" className="sr-only" />
						<div className="box mr-2 rtl:ml-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#1D4179]">
							<span
								className={`h-[10px] w-[10px] rounded-full
               ${
									dropOffLocationType === "roundTrip"
										? "bg-[#1D4179] "
										: "bg-transparent"
								}
              `}
							>
								{" "}
							</span>
						</div>
					</div>
					{t("RoundTrip")}
				</label>
			</div>
		);
	};

	const renderForm = () => {
		return (
			<div
				className={`relative w-full  ${
					disabled ? "cursor-not-allowed   select-none	" : "cursor-pointer"
				}  md:h-fit `}
			>
				
				<form className="relative mt-2  w-full p-2 dark:bg-neutral-800 sm:mt-8  sm:bg-white sm:p-8 xl:rounded-xl   sm:flex-col-reverse  max-sm:flex-col-reverse  ">
					<span className="flex sm:hidden">{renderRadioBtn()}</span>
					<div className="flex h-[56px]  lg:w-full md:w-full sm:w-full  max-sm:flex-col gap-1 md:flex-row sm:justify-around ">
						<div className="relative flex lg:flex-row w-[40vw] max-sm:flex-col gap-y-2   sm:gap-1  max-sm:w-full ">

							<LocationInput
								className="h-12 sm:h-14 "
								defaultValue={pickUpInputValue}
								onChange={(e) => setPickUpInputValue(e)}
								onInputDone={(value: any) => {
									setFieldFocused("dropOffInput");
									setTravelFrom(value);
									setPickUpInputValue(
										i18next.language === "en" ? value?.name_en : value?.name_ar,
									);
								}}
								placeHolder={t("pickingFrom")!}
								noPlaceHolder={true}
								desc={t("travelFrom")!}
								type={"flight"}
								typeIcon="from"
							/>
							<div
								className="absolute  right-0 top-7 z-30 mx-2 flex h-[50px] w-[50px] cursor-pointer items-center justify-center  rounded-full border-[1px] border-[#E8ECF2] bg-[#FFFFFF]  sm:relative sm:top-0 sm:w-[60px] sm:rounded-[4px]
								sm:bg-transparent sm:p-0  sm:py-[25px]
								max-sm:rtl:right-[80%]
								"
								onClick={() => {
									setTravelFrom(travelFrom);
									setPickUpInputValue(dropOffInputValue);
									setDropOffInputValue(pickUpInputValue);
									setTravelTo(travelTo);
								}}
							>
								<svg
									width="50"
									height="50"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="rotate-90 p-2 sm:rotate-180"
								>
									<path
										d="M7.5 21L3 16.5M3 16.5L7.5 12M3 16.5H16.5M16.5 3L21 7.5M21 7.5L16.5 12M21 7.5H7.5"
										stroke="#B9C4D5"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>

							<LocationInput
								className=" sm:h-14"
								defaultValue={dropOffInputValue}
								onChange={e => setDropOffInputValue(e)}
								onInputDone={value => {
									setTravelTo(value);
									setDropOffInputValue(
										i18next.language === "en" ? value?.name_en : value?.name_ar,
									);
									setFieldFocused("dropOffInput");
								}}
								placeHolder={t("pickingTo")!}
								noPlaceHolder={true}
								desc={t("travelTo")!}
								autoFocus={fieldFocused === "dropOffInput"}
								type={"flight"}
								typeIcon="to"
							/>

						</div>
						{dropOffLocationType === "roundTrip" ? (
							<RentalCarDatesRangeInput
								type="flight"
								flightClassState={flightClassState}
								flightClass={flightClass}
								onChangeFlightClass={(title: any, id: any) => {
									setFlightClassState(title);
									setFlightClassCode(id);
								}}
								guests={guests}
								onChangeGuests={(value: any) => setGuests(value)}
								defaultDateValue={dateRangeValue}
								defaultFocus={
									fieldFocused === "dropOffInput" ? null : fieldFocused
								}
								onFocusChange={focus => setFieldFocused(focus)}
								onChange={data => {
									setDateRangeValue(data.stateDate);
								}}
								buttonSubmitHref={navigateFightTrips}
							/>
						) : (
							<SingleDate
								type="flight"
								flightClassState={flightClassState}
								flightClass={flightClass}
								onChangeFlightClass={(title: any, id: any) => {
									setFlightClassState(title);
									setFlightClassCode(id);
								}}
								guests={guests}
								onChangeGuests={(value: any) => setGuests(value)}
								defaultValue={dateRangeValue?.startDate}
								onChange={data => {
									setDateRangeValue({
										startDate: data,
									} as any);
								}}
								
								onFocusChange={focus => setFieldFocused(focus as any)}
								buttonSubmitHref={navigateFightTrips}
							/>
						)}
					</div>
					<span className="hidden sm:flex">{renderRadioBtn()}</span>
				</form>
			</div>
		);
	};

	return renderForm();
};

export default FlightSearchForm;
