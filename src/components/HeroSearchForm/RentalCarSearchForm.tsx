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
import { useLocation, useNavigate } from "react-router-dom";
import i18next from "i18next";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";
import SingleDate from "components/HeroSearchForm/SingleDate";

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
}

const RentalCarSearchForm: FC<FlightSearchFormProps> = ({
	haveDefaultValue,
}) => {
	// DEFAULT DATA FOR ARCHIVE PAGE
	const defaultPickUpInputValue = "";
	const defaultDropOffInputValue = "";
	const { t } = useTranslation();
	// USE STATE

	const [dateValue, setdateValue] = useState<moment.Moment | null>(
		moment().add(1, "day"),
	);
	const [dateFocused, setDateFocused] = useState<boolean>(false);
	const [travelFrom, setTravelFrom] = useState<any>("");
	const [travelTo, setTravelTo] = useState<any>("");
	const [pickUpInputValue, setPickUpInputValue] = useState("");
	const [dropOffInputValue, setDropOffInputValue] = useState("");
	const [fieldFocused, setFieldFocused] = useState<
		FocusedInputShape | "dropOffInput" | null
	>(null);


	
	window.localStorage.setItem("travelFrom" , (travelFrom.id))
	window.localStorage.setItem("travelTo" , (travelTo.id))
    
	window.localStorage.setItem("fromhead_en" , (travelFrom.name_en))
	window.localStorage.setItem("tohead_en" , (travelTo.name_en))
	window.localStorage.setItem("fromhead_ar" , (travelFrom.name_ar))
	window.localStorage.setItem("tohead_ar" , (travelTo.name_ar))
	window.localStorage.setItem("guests" , (travelTo.guests))
    
	const navigate = useNavigate();

	const [dropOffLocationType, setDropOffLocationType] = useState<
		`roundTrip` | `oneWay` | ``
	>(`roundTrip`);

	const [guests, setGuests] = useState(1);
	const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
		startDate: null,
		endDate: null,
	});
	
	window.localStorage.setItem("dropOffLocationType" , (dropOffLocationType))
	window.localStorage.setItem("guests" , JSON.stringify(guests))

	const start_date =  dateRangeValue.startDate?.format("YYYY-MM-DD")
	window.localStorage.setItem("private_twoRound_start_date" , JSON.stringify(start_date))
	const oneRound:any = dateValue?.format("YYYY-MM-DD")
    window.localStorage.setItem("private_oneRound_date_time" , JSON.stringify(oneRound))
	
	const { search } = useLocation();

	// USER EFFECT
	useEffect(() => {
		if (haveDefaultValue) {
			setdateValue(moment());
			setPickUpInputValue(defaultPickUpInputValue);
			setDropOffInputValue(defaultDropOffInputValue);
		}
	}, []);
	//
	useEffect(() => {
		if (!!search && !search?.includes("flights")) {
			const data = search.slice(1).split("/");

			if (data?.[0] !== "undefined") {
				setdateValue(moment(data?.[0] ?? ""));
			}

			if (data?.[3] !=="undefined") {
				setTravelTo({
					id: data?.[1],
					name_en: decodeURIComponent(data?.[3]),
					name_ar: decodeURIComponent(data?.[3]),
				});

				setDropOffInputValue(decodeURIComponent(data?.[3]));
			}

			if (data?.[4] !== "undefined") {
				setTravelFrom({
					id: data?.[2],
					name_en: decodeURIComponent(data?.[4]),
					name_ar: decodeURIComponent(data?.[4]),
				});
				setPickUpInputValue(decodeURIComponent(data?.[4]));
			}
		}
	}, [search]);

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
			<div className="w-full">
				<form className="relative mt-2  w-full p-2 dark:bg-neutral-800 sm:mt-8  sm:bg-white sm:p-8 xl:rounded-xl   sm:flex-col-reverse  max-sm:flex-col-reverse  ">
					<span className="flex sm:hidden">{renderRadioBtn()}</span>
					<div className="flex h-[56px]  lg:w-full md:w-full sm:w-full  max-sm:flex-col gap-1 md:flex-row sm:justify-around ">
						<div className="relative flex lg:flex-row w-[40vw] max-sm:flex-col gap-y-2   sm:gap-1  max-sm:w-full ">
							<LocationInput
								defaultValue={pickUpInputValue}
								onChange={e => setPickUpInputValue(e)}
								onInputDone={(value: any) => {
									setTravelFrom(value);
									setFieldFocused("dropOffInput");
									setPickUpInputValue(
										i18next.language === "en" ? value?.name_en : value?.name_ar,
									);
								}}
								placeHolder={t("pickingFrom")!}
								desc={t("travelFrom")!}
								noPlaceHolder={true}
								type={"private"}
								typeIcon="from"
							/>
							<div
								className="absolute  right-0 top-7 z-30 mx-2 flex h-[50px] w-[50px] cursor-pointer items-center justify-center  rounded-full border-[1px] border-[#E8ECF2] bg-[#FFFFFF]  sm:relative sm:top-0 sm:w-[60px] sm:rounded-[4px]
								sm:bg-transparent sm:p-0  sm:py-[25px]
								max-sm:rtl:right-[80%]
								"
								onClick={() => {
							
									setTravelFrom(travelTo);
									setPickUpInputValue(dropOffInputValue);
									setDropOffInputValue(pickUpInputValue);
									setTravelTo(travelFrom);
								}}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
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
								defaultValue={dropOffInputValue}
								onChange={e => {
									setDropOffInputValue(e);
								}}
								onInputDone={value => {
									setTravelTo(value);

									setFieldFocused("dropOffInput");
									setDropOffInputValue(
										i18next.language === "en" ? value?.name_en : value?.name_ar,
									);
								}}
								placeHolder={t("pickingTo")!}
								desc={t("travelTo")!}
								type={"private"}
								noPlaceHolder={true}
								typeIcon="from"
							/>
						</div>
						{dropOffLocationType === "roundTrip" ? (
							<RentalCarDatesRangeInput
								type="cars"
								defaultDateValue={dateRangeValue}
								onChange={data => {
									setDateRangeValue(data.stateDate);
								}}
								defaultFocus={
									fieldFocused === "dropOffInput" ? null : fieldFocused
								}
								onFocusChange={(focus: any) => {
									setDateFocused(focus);
								}}
								className="mr-5 w-auto rtl:ml-5"
								buttonSubmitHref={() =>
									navigate(
										`/private-trip?${dateValue?.format("YYYY-MM-DD")}/${
											travelTo?.id
										}/${ travelFrom?.id}/${
											i18next.language === "en"
												? travelTo?.name_en
												: travelTo?.name_ar
										}/${
											i18next.language === "en"
												? travelFrom?.name_en
												: travelFrom?.name_ar
										}`,

									)
								}
							/>
						) : (
							<SingleDate
								type="cars"
								defaultValue={dateValue}
								onChange={date => setdateValue(date)}
								defaultFocus={dateFocused}
								onFocusChange={(focus: boolean) => {
									setDateFocused(focus);
								}}
								className="mr-5 rtl:ml-5"
								buttonSubmitHref={() =>
									navigate(
										`/private-trip?${dateValue?.format("YYYY-MM-DD")}/${
											travelTo?.id
										}/${travelFrom?.id}/${
											i18next.language === "en"
												? travelTo?.name_en
												: travelTo?.name_ar
										}/${
											i18next.language === "en"
												? travelFrom?.name_en
												: travelFrom?.name_ar
										}`,
									)
								}
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

export default RentalCarSearchForm;
