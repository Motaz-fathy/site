import { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import { FC } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import i18next from "i18next";
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

const MaritimeTransportForm: FC<FlightSearchFormProps> = ({
	haveDefaultValue,
}) => {
	// DEFAULT DATA FOR ARCHIVE PAGE
	const defaultPickUpInputValue = "";
	const defaultDropOffInputValue = "";
	const { t } = useTranslation();
	// USE STATE
	const navigate = useNavigate();

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

	const [guests, setGuests] = useState(0);
    window.localStorage.setItem("maritime_from" , JSON.stringify(travelFrom))
    window.localStorage.setItem("maritime_to" ,  JSON.stringify(travelTo))
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
			setDropOffInputValue(
				decodeURIComponent(data?.[3] !== "undefined" ? data?.[3] : ""),
			);
			if (data?.[0] != "undefined") {
				setdateValue(moment(data?.[0] ?? ""));
			}

			setPickUpInputValue(
				decodeURIComponent(data?.[4] !== "undefined" ? data?.[4] : ""),
			);
		}
	}, [search]);

	const renderForm = () => {
		return (
			<div className="w-full">
				<form className="relative mt-8 w-full bg-white p-4 shadow-xl dark:bg-neutral-800   xl:rounded-xl  max-sm:flex-col-reverse  max-sm:h-[48vh] ">
					<div className="flex  max-sm:-[35vh] w-full  justify-around gap-1  max-sm:w-[95vw] max-sm:flex-col  ">
						<div className="relative flex gap-y-2  max-sm:flex-col  ">
							<LocationInput
								defaultValue={pickUpInputValue}
								onChange={e => setPickUpInputValue(e)}
								onInputDone={(value: string | number) => {
									setTravelFrom(value);
									setFieldFocused("dropOffInput");
								}}
								placeHolder={t("pickingFrom")!}
								desc={t("travelFrom")!}
								type={"maritime"}
								noPlaceHolder={true}
								typeIcon={"from"}
								setDropOffInputValue={(val: any) => {
									setTravelTo(val);
									setDropOffInputValue(
										i18next.language === "en" ? val?.name_en : val?.name_ar,
									);
								}}
								setPickUpInputValue={(val: any) => {
									setTravelFrom(val);
									setPickUpInputValue(
										i18next.language === "en" ? val?.name_en : val?.name_ar,
									);
								}}
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
								}}
								placeHolder={t("pickingTo")!}
								desc={t("travelTo")!}
								type={"maritime"}
								noPlaceHolder={true}
								typeIcon={"from"}
							/>
						</div>
						<SingleDate
							type="maritime"
							guests={guests}
							onChangeGuests={(value: any) => setGuests(value)}
							defaultValue={dateValue}
							onChange={date => setdateValue(date)}
							defaultFocus={dateFocused}
							onFocusChange={(focus: boolean) => {
								setDateFocused(focus);
							}}
							className="w-[18vw]  max-sm:w-full"
							buttonSubmitHref={() =>
								navigate(
									`/listing-ships?${dateValue?.format("YYYY-MM-DD")}/${
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
					</div>
				</form>
			</div>
		);
	};

	return renderForm();
};

export default MaritimeTransportForm;
