
import salonPic from "images/Yellow.png";
import searchPic2 from "images/Yellow2.png";
import card_flight from "images/card_flight.png";
import card_flight2 from "images/small_card flyu.png";
import { useTranslation } from "react-i18next";



export  const Section2  =()=> {
    const { t } = useTranslation();
return (
    <div className=" container w-full    block flex flex-col  justify-between mt-[100px]">
            
            
            <div className="  flex  items-center justify-around w-[80%] sm:w-[90%] max-sm:w-[90%]   m-auto  max-sm:flex-col max-md:flex-col  ">
                <div className="flex flex-col  items-center   max-sm:w-[80%] max-md:w-full">
                    <div className="flex  h-[244px] w-[216px] justify-center ">
                        <img
                            className=" object-fill w-[117px] "
                            src={salonPic}
                            alt=""
                            />
                        <img
                            className=" object-fill ml-[-40px] mt-[5px] mb-[-5px] w-[122px] "
                            src={searchPic2}
                            alt=""
                            />

                    </div>
                    <div className="max-sm:w-[100%] max-sm:flex-col max-sm:items-center">
                    <h4 className="text-center text-[16px] text-[400] text-black ">{t("Making it easier to experience the travel.")}</h4>
                    <p className="text-[16px] text-center text-[400]  text-[#1E1E1E]" >
                    {t("Find tickets for flight, bus and private car you won't see anywhere else. Check out our")}
                    </p>
                    <h4 className="text-center text-[16px] text-[400] text-[#1D4078]">{t("Mobile app")}</h4>
                    </div>
                </div>
                <div className="flex flex-col  items-center w-[50%] max-sm:w-full max-md:w-full max-sm:mt-5 max-md:mt-5">
                    <div className="flex flex-row   max-sm:w-full max-md:w-full  justify-center">
                        <img
                            className=" object-contain max-sm:hidden max-md:hidden"
                            src={card_flight}
                            alt=""
                            />
                        <img
                            className="hidden object-contain max-sm:w-full max-md:w-full max-sm:block max-md:block"
                            src={card_flight2}
                            alt=""
                            />
                        

                    </div>
                    <span className="text-center text-[16px] text-[400] text-black">{t("Making it easier to experience the travel.")}</span>
                    <p className="text-[16px] text-center text-[400] w-[419px] text-[#1E1E1E] max-sm:w-[80%]" >
                    {t("Find tickets for flight, bus and private car you won't see anywhere else. Check out our")}
                    </p>
                    <span className="text-center text-[16px] text-[400] text-[#1D4078]">{t("Mobile app")}</span>
                </div>
            </div>
            <div className="  flex flex-col items-start justify-around max-sm:container w-[90%] xl:mt-10 lg:mt-10 md:mt-10 m-auto max-sm:mt-5">
                {/* title and p  */}
                <span className="text-[24px] text-[500] text-[#1E1E1E] mb-[16px]">{t("What we do")}</span>
                <p className="text-20 text-400 text-[#69696A]">
                    {t("what_paragraph")}
                </p>
            </div>
            
            <div className=" flex flex-col items-start justify-around max-sm: w-[90%] max-sm:mt-5 m-auto xl:mt-10 lg:mt-10 md:mt-10 ">
                {/* title and p  */}
                <span className="text-[24px] text-[500] text-[#1E1E1E] mb-[16px]">{t("Our vision")}</span>
                <p className="text-20 text-400 text-[#69696A]">
                    {t("our_vision_paragraph")}
                </p>
            </div>
            




    </div>

)
}