import React, { FC, ReactNode, useEffect } from "react";
import imagePng from "images/hero-right2.png";
import HeroSearchForm, {
	SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";
import { useTranslation } from "react-i18next";

export interface SectionHeroArchivePageProps {
	className?: string;
	listingType?: ReactNode;
	currentPage: "Bus" | "Cars" | "Maritime transport" | "Flights";
	currentTab: SearchTab;
	rightImage?: string;
	city?: string;
	trips: any;
	isLoading?: boolean;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
	className = "",
	listingType,
	currentPage,
	currentTab,
	city,
	isLoading,
	rightImage = imagePng,
	trips,
}) => {
	const { t } = useTranslation();
	const newCity = !!city && city !== "undefined" ? city : "";
	useEffect(() => {
		if (trips?.length) {
			const windowHeight = window.innerHeight;
			window.scrollTo({
				top: windowHeight / 2,
				behavior: "smooth",
			});
		}
	}, [JSON.stringify(trips)]);
	return (
		<div
			className={`nc-SectionHeroArchivePage  relative z-10 flex flex-col ${className} `}
			data-nc-id="SectionHeroArchivePage "
		>
			
			

			<div className="z-50 hidden lg:flow-root ">

				<div className="z-50 lg:-mt-40 xl:-mt-56 w-[90%] m-auto">
					<HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
				</div>
			</div>
			{trips?.length === 0 && !isLoading && (
				<div className="lg:h-72">
					<div className="mt-6 flex h-full w-full flex-col  items-center justify-center text-center  text-4xl font-extrabold text-primary-400 lg:mt-0">
						{t("noData")}
					</div>
				</div>
			)}
		</div>
	);
};

export default SectionHeroArchivePage;
