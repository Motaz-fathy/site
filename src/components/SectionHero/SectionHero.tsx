import React, { FC, useLayoutEffect } from "react";
import homeBg1 from "images/homeBg1.png";
import homeBg2 from "images/homeBg2.png";
import homeBg3 from "images/homeBg3.png";
import homeBg4 from "images/homeBg4.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import { useTranslation } from "react-i18next";

export interface SectionHeroProps {
	className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	const slides = [
		{
			url: homeBg3,
			progress: "25%",
		},
		{
			url: homeBg2,
			progress: "50%",
		},
		{
			url: homeBg1,
			progress: "75%",
		},

		{
			url: homeBg4,
			progress: "100%",
		},
	];

	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [openTab, setOpenTab] = React.useState("");
	useLayoutEffect(() => {
		window.addEventListener("storage", () => {
			const sessionTab = sessionStorage.getItem("currentActiveTab");
			if (sessionTab) {
				setOpenTab(sessionTab);
			}
			// ...
		});
		switch (openTab) {
			case "Flights":
				setCurrentIndex(2);
				break;
			case "Bus":
				setCurrentIndex(0);

				break;
			case "Cars":
				setCurrentIndex(3);

				break;
			case "Maritime transport":
				setCurrentIndex(1);
				break;
		}
		return () => {
			window.removeEventListener("storage", () => {});
		};
	}, [openTab]);
	// const prevSlide = () => {
	// 	const isFirstSlide = currentIndex === 0;
	// 	const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
	// 	setCurrentIndex(newIndex);
	// };


	return (
		<div
			className={`nc-SectionHero  relative flex w-full   bg-cover bg-center lg:flex-col ${className} xl:h-[80vh] lg:h-[85vh] md:h-[65vh]  max-sm:h-fit
			
			xl:bg-cover lg:bg-contain md:bg-cover max-md:bg-cover max-sm:bg-auto 
			 
			max-sm:mt-0  max-sm:flex-col 
			sm:flex-col
			`}
			data-nc-id="SectionHero"
			style={{
				backgroundImage: `url(${slides[currentIndex].url})`,
				backgroundAttachment: "fixed",
				
				backgroundRepeat: "no-repeat"
				
				// WebkitBorderBottomLeftRadius:"0"
			}}
		>
			{/* slider */}
			<div
				className="relative flex-row-reverse items-center max-md:mx-auto
			
			max-md:mt-10
			max-md:mb-44 max-sm:mx-auto max-sm:mt-24
			max-sm:mb-44 md:mx-auto md:mt-10
			md:mb-44 lg:right-[-20%] lg:flex
			"
			>
			
			</div>
			<div className="container  xl:w-[89%] lg:w-[89%]   xl:translate-y-[-90px] lg:translate-y-[-150px] md:translate-y-[-150px]
			 sm:translate-y-[-150px]   max-sm:translate-y-[-200px]  
			">
			<div className="w-[40%] max-sm:w-full  text-white xl:text-[30px] lg:text-[30px] md:text-[24px] sm:text-[20px] max-sm:text-[20px] font-[500] block">
		    <span className="xl:text-[34px] lg:text-[34px] md:text-[24px] sm:text-[20px] max-sm:text-[32px] font-[500] block mb-3 max-sm:mb-8">
			{t("telefreik_header")}	
			</span>		
			<span className="xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] max-sm:text-[20px] font-[500] max-sm:font-[400]">
			{t('telefreik_title')}
			</span>
			</div>
			</div>
			<div
				className="relative z-10 mb-12 xl:translate-y-[-170px] lg:translate-y-[-200px] md:translate-y-[-20px] max-sm:translate-y-[-500px]
				 flex w-full flex-col items-center justify-center text-center lg:mb-0 lg:mt-40 lg:justify-end
			
			"
			>
					

				<div
					className=" flex h-[60vh] w-full justify-center text-justify sm:h-min sm:px-5 
				"
				>
					<HeroSearchForm />
				</div>
			</div>
		</div>
	);
};

export default SectionHero;
