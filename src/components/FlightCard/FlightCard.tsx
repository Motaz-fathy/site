import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import bus from "images/bluebus.jpeg";
import tv from "images/outline.png";
import conditioning from "images/air-conditioner 1.png";
import we_bus_logo from "images/Rectangle 124.png";
import blue_bus_logo from "images/image 4.png";
import miniBus from "images/bus1.png";
import moment, { Moment } from "moment";
import { t } from "i18next";
import { toast } from "react-toastify";

export interface FlightCardProps {
  refactoredData?: any;
}

const FlightCard: FC<FlightCardProps> = ({ refactoredData }) => {

  interface Props {
    item: {
      gateway_id: string;
      company_logo: string;
    };
  }

  function removeDuplicates(travelData: any) {
    const uniqueData = [];
    const keySet: string[] = [];

    for (const item of travelData) {
      const key = `${item?.trip_url}`;

      if (!keySet.includes(key)) {
        uniqueData.push(item);
        keySet.push(key);
      }
    }

    return uniqueData;
  }

  const calculateDuration = (
    start_date: string,
    end_date: string
  ): any | string => {
    const formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"];
    let duration: moment.Duration | null = null;

    for (const date_format of formats) {
      const start_datetime = moment(start_date, date_format);
      const end_datetime = moment(end_date, date_format);
      if (start_datetime.isValid() && end_datetime.isValid()) {
        duration = moment.duration(end_datetime.diff(start_datetime));
        break;
      }
    }

    if (duration === null) {
      throw new Error("Invalid date format for start_date or end_date");
    }

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes() % 60);

    return ` ${t("H")} ${hours}   ${t("M")} ${minutes}`;
  };

  refactoredData = removeDuplicates(refactoredData);
 
  const navigate = useNavigate();
  const busCardContainer = (refactoredData: any) => {
   
    return refactoredData?.map((item: any ) => {
      const bus_image =  item?.company_data?.bus_image?item.company_data.bus_image :  item.gateway_id.includes("WEBUS")
      ? miniBus
        : item.gateway_id.includes("BlueBus")
      ? bus
        : item.gateway_id.includes("Bellman")
      ? item.company_logo
        : item.gateway_id.includes("OnTime")
      ? item.company_logo
        : null;
    console.log(item, "from biuussus5555555555")
      return (
     
      <div
        key={item.id}
        className="lg:h-100 md:h-100 m-0 flex h-[80%] w-[100%] 
			flex-col
			bg-white
			max-sm:h-[100%]
			sm:h-[100%]
		  "
        style={{
          borderRadius: "16px",
          padding: "0px 16px 16px"
          //   boxShadow:"0 4px 4px 0 rgba(0, 0, 0, 0.25)"
        }}
      >
        <div
          className="W-100 flex h-[70px] flex-row justify-between pt-4  "
          style={{
            borderBottom: "1px solid var(--boareder, #E8ECF2)",
            alignItems: "center"
          }}
        >
          <div>
            <div className="w-24 flex-shrink-0 lg:w-36">
             
                <img
                  src={item?.company_data?.avatar}
                  className="h-[40px] w-[75px] flex-shrink-0 lg:w-[70px] "
                  alt=""
                />
            </div>
          </div>
          <div>
            <div>
              <div className="ml-0 flex w-fit flex-shrink-0 flex-row justify-between lg:w-fit">
                <div className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6V12H16.5M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                      stroke="#69696A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="rel:rotate-[]">
                  {" "}
                  {calculateDuration(item?.travel_at, item?.arrival_at)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* seconed container for body  it is from 2 containers*/}

        <div
          className="w-100 flex h-[148px] flex-row justify-between p-[16px] align-middle 
				max-sm:h-[270px] max-sm:flex-col
				sm:h-[200px] sm:flex-col
				md:h-[148px] md:flex-row
				lg:h-[148px] lg:flex-row
				"
          style={{ borderBottom: "1px solid #E8ECF2" }}
        >
          {/* first contain left */}
          <div className="flex  flex-row space-y-6 sm:flex-row sm:items-center sm:space-y-0">
            <div className="flex flex-col justify-center ">
              <svg
                width="6"
                height="116"
                viewBox="0 0 6 116"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 0.333272C1.52724 0.333272 0.333333 1.52718 0.333333 2.99994C0.333333 4.4727 1.52724 5.66661 3 5.66661C4.47276 5.66661 5.66667 4.4727 5.66667 2.99994C5.66667 1.52718 4.47276 0.333272 3 0.333272ZM3 110.333C1.52724 110.333 0.333329 111.527 0.333328 113C0.333328 114.473 1.52724 115.667 3 115.667C4.47275 115.667 5.66666 114.473 5.66666 113C5.66666 111.527 4.47275 110.333 3 110.333ZM2.5 2.99994L2.5 113L3.5 113L3.5 2.99994L2.5 2.99994Z"
                  fill="#69696A"
                />
              </svg>
            </div>

            <div className="my-[16px]  ml-[17.2px] w-[428px] rtl:mr-3">
              <div className="mb-[15px]">
                <h4
                  className=" mb-[8px] text-[16px]  font-[600]"
                  style={{ color: "#1E1E1E", lineHeight: "150.7%" }}
                >
                  {item?.city_from_name} ({item?.travel_from})
                </h4>
                <h4
                  className=" text-[16px] font-[400]"
                  style={{ color: "#69696A", lineHeight: "100.7%" }}
                >
                  {item?.travel_at}
                </h4>
              </div>
              <div>
                <h4
                  className=" mb-[8px] text-[16px] font-[600]"
                  style={{ color: "#1E1E1E", lineHeight: "150.7%" }}
                >
                  {item?.city_to_name} ({item?.travel_to})
                </h4>
                <h4
                  className=" text-[16px] font-[400]"
                  style={{ color: "#69696A", lineHeight: "100.7%" }}
                >
                  {item?.arrival_at}
                </h4>
              </div>
            </div>
          </div>
          {/* seconde contain left */}

          <div className="flex  flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0">
            {/* LOGO IMG */}

            <div className="w-[130px] flex-shrink-0 lg:w-[130px] xl:translate-x-[10px] lg:translate-x-[-40px] lg:rtl:translate-x-[50px] md:translate-x-[0px] ">
            {bus_image && (
                <img
                  src={bus_image}
                  className="h-[80px] max-sm:h-[40px] max-sm:w-[75px] md:w-[120px] lg:w-[130px]"
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        {/* third container */}
        <div
          className="w-100 m-[16px] flex h-[54px] flex-row justify-between
			max-sm:h-[120px] max-sm:flex-col
			sm:h-[100px] sm:flex-col
			md:h-[54px] md:flex-row
			lg:h-[54px] lg:flex-row 
			"
        >
          <div className=" max-sm:w-full flex max-sm:justify-center max-sm:items-center  lg:justify-between lg:items-center">
           
              <div
                className="max-sm:w-full  flex justify-center items-center "
              >
                <img src={tv} className="max-sm:mr-5 h-[24px] w-[24px] lg:rtl:ml-5 md:rtl:ml-5" alt="tv" />
                <img src={conditioning} className=" h-[24px] w-[24px] lg:ml-5 md:ml-5 rtl:mr-3" alt="conditioning" />
                
               {
                item?.classes === "Prime_Mix" && 
                <div
                className="max-sm:ml-5 rtl:mr-5 h-[40px] w-[120px] lg:ml-5 md:ml-5 items-center max-sm:h-[40px] max-sm:w-[120px]
                 justify-center bg-[#F9B35F] p-[8px] align-middle text-[14px] text-[#69696A] max-sm:rtl:mr-5"
                style={{ borderRadius: "24px", textAlign: "center" }}
              >
                {item?.classes}{" "}
              </div>
               }
                {
                item?.classes === "Comfort" && 
                <div
                className="max-sm:ml-5 rtl:mr-5 h-[40px] w-[120px] lg:ml-5 md:ml-5 items-center max-sm:h-[40px] max-sm:w-[120px]
                 justify-center bg-[#BEC1BE] p-[8px] align-middle text-[14px] text-[#525252] max-sm:rtl:mr-5"
                style={{ borderRadius: "24px", textAlign: "center" }}
              >
                {item?.classes}{" "}
              </div>
               }

               {
                item?.classes === "First10" ||  item?.classes === "First"  || item?.classes === "First8"  ?
                <div
                className="max-sm:ml-5 rtl:mr-5 h-[40px] w-[120px] lg:ml-5 md:ml-5 items-center max-sm:h-[40px] max-sm:w-[120px]
                 justify-center bg-[#6D706B] p-[8px] align-middle text-[14px] text-[#D3D5D3] max-sm:rtl:mr-5"
                style={{ borderRadius: "24px", textAlign: "center" }}
              >
                {item?.classes}{" "}
              </div>  : ""
               }

              {
                item?.classes === "first_class"   ?
                <div
                className="max-sm:ml-5 rtl:mr-5 h-[40px] w-[120px] lg:ml-5 md:ml-5 items-center max-sm:h-[40px] max-sm:w-[120px]
                 justify-center bg-blue-300 p-[8px] align-middle text-[14px] text-[#525252] max-sm:rtl:mr-5"
                style={{ borderRadius: "24px", textAlign: "center" }}
              >
                {item?.classes}{" "}
              </div>  : ""
               }

               {
                item?.classes === "Business 40" && 
                <div
                className="max-sm:ml-5 rtl:mr-5 h-[40px] w-[120px] lg:ml-5 md:ml-5 items-center max-sm:h-[40px] max-sm:w-[120px]
                 justify-center bg-[#7591FF] p-[8px] align-middle text-[14px] text-[#D3D5D3] max-sm:rtl:mr-5"
                style={{ borderRadius: "24px", textAlign: "center" }}
              >
                {item?.classes}{" "}
              </div>
               }


                <div
                  className="h-[40px]  w-[120px] md:ml-5 lg:ml-5 justify-center rtl:mr-5  p-[8px] align-middle max-sm:text-[12px]  max-sm:leading-[15px] text-[16px] text-[#69696A]"
                  style={{ borderRadius: "24px", textAlign: "center" }}
                >
                 
                 
                  {item?.available_seats !== 0 &&
                 <>
                  {item?.available_seats} {t("seats free")}{" "}
                 </>
                  } 
                  
                </div>
              </div>
           
          </div>
          <div className=" flex justify-between ">
            <div className="flex flex-col justify-between w-[80px]  ">
              <h4 className="text-[20px] font-[700] text-[#1E1E1E] ">
                 {item?.prices_start_with} {t("LE")}
              </h4>
              <span className="text-[10px]  max-sm:text-[8px] ">{t("Price per person")}</span>
            </div>
            <div className="h-full justify-center align-middle ">
              <button
                className=" h-full w-[110px] lg:w-[100px]  text-[20px] text-white btn-hover"
                style={{ borderRadius: "9px" }}
                onClick={() => {
                  navigate(item?.trip_url);
                }}
              >
                {t("select")}
              </button>
            </div>
          </div>
        </div>
      </div>
    )});
  };

  return <>{busCardContainer(refactoredData)}</>;
};

export default FlightCard;
