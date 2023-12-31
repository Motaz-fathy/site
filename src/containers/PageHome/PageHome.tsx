import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React from "react";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionDowloadApp from "./SectionDowloadApp";
import { useTranslation } from "react-i18next";
import SectionSteps from "containers/PageHome/SectionSteps";
import SectionFeatures from "containers/PageHome/SectionFeatures";
import ScrollableList from "components/SectionSliderNewCategories/section_slider";
import swvel from "images/image 4.png";
import paymob from "images/image 2.png";
import webus from "images/image 6 (1).png";
import skyscanner from "images/image 3.png";
import elgesrElAraby from "images/image 5.png";
import ontimebus from "images/image 8.png";
import { SliderOurPartner } from "components/SectionSliderNewCategories/SliderOurPartner";
function PageHome() {
	const page_path_name = window.location.pathname
	window.localStorage.setItem("page_path_name" ,page_path_name)
	const { t } = useTranslation();
	return (
		<div className=" max-sm:mb-[20px] relative overflow-hidden  bg-[#E8ECF2] ">
			{/* GLASSMOPHIN */}

			<div className="relative mb-24 lg:mb-28  ">
				{/* SECTION HERO */}
				<SectionHero className="pt-10 lg:pt-16 lg:pb-2" />

				<div
					className=""
				>
					{/* margin top changes depends on search form  */}
					<div className=" ">
						<SectionFeatures />
					</div>
				</div>

				<div
					className="mt-[250px] bg-white pt-12 pb-12 
				max-sm:mt-[900px]  max-sm:mb-[50px] max-sm:rtl:mt-[900px]  max-sm:rtl:mb-[50px]
				
				"
				>
					<div className="container w-full text-center">
						<span className="text-center text-[32px]  text-[#1E1E1E] ">
							{t("Our partner")}
						</span>
						<p className="text-[#69696A]w-[589px] my-[20px] text-center text-[16px]  text-[400]  m-auto">
							{t("our_partenr")}
						</p>

		
						<SliderOurPartner />
						
					</div>
				</div>
				<div className=" max-sm:mb-[80px] flex flex-col items-center justify-center  bg-[#E8ECF2] rtl:flex-row-reverse">
					<SectionDowloadApp />
				</div>
				<div
					style={{
						perspective: "1000px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
					className="mt-[12px] sm:mt-[-120px]"
				>
					<div className="w-full bg-[#1D4179]">
						<SectionSteps />
					</div>
				</div>
			</div>
		</div>
	);
}

export default PageHome;
