import rightImg from "images/4.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import { useTranslation } from "react-i18next";
import { Section2 } from "./section2";
import SectionFeatures from "./SectionFeatures";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`  h-[100%]  overflow-hidden bg-[#DDE2EB] `}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About || Booking</title>
      </Helmet>
      <div className=" flex h-[60vh] max-sm-:h-[800px] w-[100%] items-center justify-center bg-gradient-to-r from-[#242932] to-[#2B356E]">
        <div className=" container w-[80%] flex items-start justify-between max-sm:flex-col-reverse ">
          <div className="flex flex-col items-start w-[50%] text-white max-sm:w-full max-sm-:h-[500px]">
            <span className="text-[30px] max-sm:text-[16px] font-[500] mb-5 max-sm:mb-1 ">{t("About Us.")}</span>
            <p className="max-sm:text-[10px]">
             {t("about_paragraph")}
            </p>
          </div>
          <img
            src={rightImg}
            alt="telefreik logo "
            className="h-[50%] w-[50%] max-sm:w-full  max-sm:h-[300px] m-auto"
          />
        </div>
      </div>
      {/* ======== BG GLASS ======== */}
      {/* <BgGlassmorphism /> */}

      <div className="container m-0 w-[100vw] p-0 ">
        {/* <SectionFounder /> */}
        <Section2 />

        {/* <SectionStatistic /> */}

        {/* <SectionSubscribe2 /> */}
      </div>
      <div className=" h-fit w-full pb-[20vh]">
        <div
          className="h-fit 
				
				min-h-full
		bg-[#1D4179]
				"
        >
          {/* margin top changes depends on search form  */}
          <div className="container ">
            <SectionFeatures />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
