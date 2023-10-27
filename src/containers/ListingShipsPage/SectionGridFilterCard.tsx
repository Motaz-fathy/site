import React, { FC } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import FlightCard, { FlightCardProps } from "components/FlightCard/FlightCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useTranslation } from "react-i18next";
import MarinTimeCard from "components/MarinTimeCard";

export interface SectionGridFilterCardProps {
	className?: string;
	city?: string;
	trips: any;
	isLoading: boolean;
	date?: any;
	travelFrom?: any;
	setPage?: any;
	cityFrom?: any;
	travelTo?: any;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
	className = "",
	city,
	trips,
	isLoading,
	travelFrom,
	date,
	setPage,
	cityFrom,
	travelTo,
}) => {
	// const { t } = useTranslation();
	// const newCity = !!city && city !== "undefined" ? city : "";
	return (
		<div
			className={`nc-SectionGridFilterCard w-[85vw] max-sm:w-[95vw] ${className} `}
			data-nc-id="SectionGridFilterCard"
		>
			{/* <Heading2
				heading={
					t("egypt") + " - " + (decodeURIComponent(newCity ?? "") ?? "" ?? "")
				}
				subHeading={<></>}
			/> */}
			{/* <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div> */}
			<div className="grid grid-cols-1 gap-6 rounded-3xl  lg:p-10  ">
				{trips?.length > 0 &&
					trips?.map((item: any, index: number) => {
						return (
							<MarinTimeCard
						        className="cursor-pointer"
								travelFrom={decodeURIComponent(cityFrom ?? "")}
								travel={travelFrom}
								key={index}
								data={item}
								date={date}
								cityTo={travelTo}
								city={decodeURIComponent(city ?? "")}
							/>
						);
					})}

				{/* <div className="flex mt-12 justify-center items-center">
          <ButtonPrimary onClick={setPage} loading={isLoading}>
            {t("showMore")}
          </ButtonPrimary>
        </div> */}
			</div>
		</div>
	);
};

export default SectionGridFilterCard;
