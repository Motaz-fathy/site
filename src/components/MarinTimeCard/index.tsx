import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import shipCircle from "../../images/Group 36.png";
import gesraraby from "../../images/gesraraby.png";
const MarinTimeCard: FC<any> = ({
  className = "",
  data,
  travelFrom,
  cityTo,
  travel,
  date,
  city
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
 console.log(data)
  return (
    <div
      className={`nc-FlightCardgroup relative space-y-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 transition-shadow hover:shadow-lg 
     dark:border-neutral-800 sm:px-6 sm:py-4  lg:h-[200px] lg:w-[100%] ${className}`}
      data-nc-id="FlightCard"
      onClick={() => {
        navigate(
          `/checkout-maritime/?${date}/${data?.id}/${travel}/${cityTo}/`
        );
      }}
    >
      <div
        className={` relative sm:pr-0  ${className} `}
        data-nc-id="FlightCard"
      >
        <div className="restyle-container  mb-[16px] flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 lg:h-[80px]">
          {/* LOGO IMG */}
          <div className="w-24 flex-shrink-0 max-[900px]:hidden  lg:w-32">
            <img src={shipCircle} className="w-[118]" alt="" />
          </div>

          {/* FOR MOBILE RESPONSIVE */}
          {/* <div className="block space-y-1 lg:hidden">
						<div className="flex font-semibold">
							<div>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{!!travelFrom && travelFrom}
								</span>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{!!data && date}
								</span>
							</div>
							<span className="flex w-12  justify-center  rtl:rotate-180">
								<i className=" las la-long-arrow-alt-right text-2xl"></i>
							</span>
							<div>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{city}
								</span>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{city}
								</span>
							</div>
						</div>
					</div> */}

          {/* TIME - NAME */}

          {/* TIMME */}
          <div className="  flex justify-around gap-[16px] items-center    text-[#69696A] text-center">
            <div className=" flex flex-col text-[12px] text-lg  font-medium ">
              <span className="text-[18px] font-[500] text-[#1E1E1E] ">
                {!!travelFrom && travelFrom}
              </span>
              <span className="text-[15px] font-[400]">{!!date && date}</span>
            </div>
            <div className=" flex flex-col text-lg font-medium max-[900px]:m-[1px] max-[900px]:mt-[10px] max-[900px]:w-[100px]">
              <span>
                <svg
                  width="80"
                  height="24"
                  viewBox="0 0 133 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_928_13513)">
                    <path
                      d="M74.0674 14.5226C73.55 14.5226 73.3167 14.4064 73.0212 14.2593C72.8992 14.1985 72.7714 14.135 72.6237 14.0783L74.2069 9.91326C74.3301 9.58908 74.3097 9.22639 74.1508 8.91814C73.9919 8.60989 73.7083 8.38283 73.3728 8.29517L72.2826 8.01033V4.74073C72.2826 4.05454 71.7244 3.49629 71.0382 3.49629H68.8866V2.28648C68.8866 1.32336 68.103 0.539795 67.1399 0.539795H65.9324C64.9693 0.539795 64.1857 1.32336 64.1857 2.28648V3.49626H62.0341C61.3479 3.49626 60.7897 4.05451 60.7897 4.7407V8.01033L59.6995 8.29517C59.364 8.38283 59.0804 8.60989 58.9215 8.91814C58.7626 9.22639 58.7421 9.58908 58.8654 9.91326L60.4486 14.0784C60.301 14.135 60.1731 14.1986 60.0512 14.2593C59.7557 14.4064 59.5223 14.5227 59.0049 14.5227C58.746 14.5227 58.5361 14.7325 58.5361 14.9914C58.5361 15.2503 58.746 15.4602 59.0049 15.4602C59.7428 15.4602 60.1286 15.268 60.4691 15.0985C60.7646 14.9514 60.998 14.8352 61.5154 14.8352C62.0328 14.8352 62.2662 14.9514 62.5618 15.0985C62.9022 15.268 63.2881 15.4602 64.0259 15.4602C64.7638 15.4602 65.1496 15.268 65.4901 15.0985C65.7856 14.9514 66.019 14.8352 66.5364 14.8352C67.0537 14.8352 67.2871 14.9514 67.5826 15.0985C67.923 15.268 68.3089 15.4602 69.0467 15.4602C69.7845 15.4602 70.1704 15.268 70.5108 15.0985C70.8063 14.9514 71.0397 14.8352 71.5571 14.8352C72.0744 14.8352 72.3078 14.9514 72.6033 15.0985C72.9437 15.268 73.3296 15.4602 74.0674 15.4602C74.3263 15.4602 74.5362 15.2503 74.5362 14.9914C74.5362 14.7325 74.3263 14.5226 74.0674 14.5226ZM65.1232 2.28648C65.1232 1.84029 65.4862 1.47729 65.9324 1.47729H67.1399C67.5861 1.47729 67.9491 1.84029 67.9491 2.28648V3.49626H65.1232V2.28648ZM61.7272 4.74073C61.7272 4.57148 61.8649 4.43379 62.0341 4.43379H71.0381C71.2074 4.43379 71.3451 4.57148 71.3451 4.74073V7.76539L66.6546 6.53983C66.5769 6.51954 66.4953 6.51954 66.4176 6.53983L61.7271 7.76539L61.7272 4.74073ZM70.0929 14.2593C69.7974 14.4064 69.564 14.5226 69.0467 14.5226C68.5294 14.5226 68.296 14.4064 68.0005 14.2593C67.66 14.0898 67.2742 13.8976 66.5364 13.8976C65.7985 13.8976 65.4127 14.0898 65.0722 14.2593C64.7767 14.4064 64.5433 14.5226 64.0259 14.5226C63.5086 14.5226 63.2751 14.4064 62.9796 14.2593C62.6392 14.0898 62.2533 13.8976 61.5154 13.8976C61.4702 13.8976 61.4264 13.8984 61.3837 13.8998L59.7417 9.58014C59.7023 9.47648 59.733 9.39005 59.7548 9.34773C59.7766 9.30542 59.8292 9.23026 59.9365 9.20223L66.5361 7.47783L73.1358 9.20226C73.2431 9.23026 73.2957 9.30542 73.3175 9.34773C73.3393 9.39005 73.37 9.47648 73.3306 9.58017L71.6886 13.8998C71.646 13.8984 71.6022 13.8977 71.557 13.8977C70.8192 13.8976 70.4334 14.0898 70.0929 14.2593Z"
                      fill="#B9C4D5"
                    />
                    <path
                      d="M70.8702 9.87672L66.6551 8.77534C66.5774 8.75506 66.4957 8.75506 66.4181 8.77534L62.2029 9.87672C61.9524 9.94215 61.8024 10.1983 61.8679 10.4487C61.9333 10.6992 62.1894 10.8492 62.4399 10.7838L66.5366 9.71337L70.6332 10.7838C70.6729 10.7942 70.7128 10.7991 70.752 10.7991C70.9601 10.7991 71.1502 10.6595 71.2052 10.4487C71.2707 10.1983 71.1207 9.94215 70.8702 9.87672Z"
                      fill="#B9C4D5"
                    />
                  </g>
                  <path
                    d="M0.536133 18.762L9.44377 21.1126C14.6063 22.475 20.0817 22.0011 24.9334 19.772V19.772C30.2108 17.3473 36.2095 17.0063 41.7278 18.8172L47.984 20.8704C52.5543 22.3702 57.5403 21.9242 61.7718 19.637V19.637C66.0619 17.3181 71.1246 16.8931 75.7412 18.4643L82.394 20.7284C87.1074 22.3325 92.2475 22.138 96.8262 20.1823L99.6444 18.9785C104.008 17.1146 109.011 17.5242 113.014 20.0734V20.0734C116.888 22.5408 121.708 23.0083 125.984 21.3314L132.536 18.762"
                    stroke="#DDE2EB"
                  />
                  <defs>
                    <clipPath id="clip0_928_13513">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(58.5361)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span>
                <svg
                  width="80"
                  height="6"
                  viewBox="0 0 133 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.536133 1.76201L9.44377 4.11265C14.6063 5.47498 20.0817 5.00108 24.9334 2.772V2.772C30.2108 0.347305 36.2095 0.00627303 41.7278 1.81722L47.984 3.87038C52.5543 5.37024 57.5403 4.92421 61.7718 2.63697V2.63697C66.0619 0.318088 71.1246 -0.106919 75.7412 1.46426L82.394 3.7284C87.1074 5.33254 92.2475 5.13804 96.8262 3.1823L99.6444 1.97854C104.008 0.114555 109.011 0.524228 113.014 3.07335V3.07335C116.888 5.54079 121.708 6.00829 125.984 4.33137L132.536 1.76201"
                    stroke="#B9C4D5"
                  />
                </svg>
              </span>
              <span className="m-auto">{t("Direct")}</span>
              <span className="m-auto text-[12px] ">5{t("h")} 2{t("min")}</span>
            </div>
            <div className="  flex flex-col text-[12px] text-lg font-medium  max-[900px]:m-[1px]">
              <span className="text-[18px] font-[500] text-[#1E1E1E] ">
                {!!city && city}
              </span>
              <span className="text-[15px] font-[400]">{!!date && date}</span>
            </div>
          </div>

          {/* PRICE */}
          <div className="flex flex-1 flex-col items-start gap-4  whitespace-nowrap md:flex-row md:justify-end ">
            <div>
              <div></div>
              {/* <span className="text-slate-400-6000 text-xl font-semibold">
								{t("takeOffTime", { time: `${data?.time}` })}{" "}
							</span> */}
            </div>
            <div>
              {/* <span className="text-xl font-semibold text-secondary-6000">
								{t("tripCost", { price: data?.adult_price })}
							</span> */}
              <img
                src={gesraraby}
                className="w-[87px] max-[900px]:mt-[-10px]"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* bottom container for navy card search */}
        <div
          style={{ borderTop: "1px solid #B9C4D5" }}
          className="flex flex-row items-center justify-between pt-4 lg:h-[60px] items-start "

        >
          <div className="max-[900px]:flex-col-reverse min-[900px]:justify-between min-[900px]:w-[82%] max-[1024]:w-[82%] min-[1280px]:w-[89%] flex  items-end">
            <div
              className="max-[900px]:bg-[#658FA9] flex h-[40px] w-[100px] items-center justify-around bg-[#658FA9] text-white items-start"
              style={{ borderRadius: "10px" }}
            >
              <div className=" max-[900px]:text-white my-auto text-[#1E1E1E]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M15.5312 14.5227C15.0139 14.5227 14.7805 14.4064 14.485 14.2593C14.3631 14.1986 14.2352 14.135 14.0875 14.0783L15.6708 9.91328C15.794 9.58909 15.7736 9.22641 15.6147 8.91815C15.4558 8.6099 15.1722 8.38284 14.8367 8.29519L13.7465 8.01034V4.74075C13.7465 4.05456 13.1882 3.49631 12.502 3.49631H10.3504V2.2865C10.3504 1.32337 9.56688 0.53981 8.60375 0.53981H7.39628C6.43316 0.53981 5.64959 1.32337 5.64959 2.2865V3.49628H3.498C2.81181 3.49628 2.25356 4.05453 2.25356 4.74072V8.01034L1.16338 8.29519C0.827844 8.38284 0.54425 8.6099 0.385375 8.91815C0.2265 9.22641 0.206 9.58909 0.32925 9.91328L1.9125 14.0784C1.76488 14.1351 1.637 14.1986 1.51509 14.2593C1.21956 14.4064 0.986156 14.5227 0.46875 14.5227C0.209875 14.5227 0 14.7326 0 14.9914C0 15.2503 0.209875 15.4602 0.46875 15.4602C1.20662 15.4602 1.5925 15.2681 1.93294 15.0986C2.22847 14.9514 2.46187 14.8352 2.97928 14.8352C3.49669 14.8352 3.73009 14.9514 4.02563 15.0986C4.36606 15.2681 4.75194 15.4602 5.48981 15.4602C6.22766 15.4602 6.6135 15.2681 6.95397 15.0986C7.24947 14.9514 7.48287 14.8352 8.00022 14.8352C8.51756 14.8352 8.75094 14.9514 9.04644 15.0986C9.38688 15.2681 9.77272 15.4602 10.5106 15.4602C11.2484 15.4602 11.6342 15.2681 11.9747 15.0986C12.2702 14.9514 12.5036 14.8352 13.0209 14.8352C13.5383 14.8352 13.7717 14.9514 14.0672 15.0986C14.4076 15.2681 14.7934 15.4602 15.5313 15.4602C15.7902 15.4602 16 15.2503 16 14.9914C16 14.7326 15.7901 14.5227 15.5312 14.5227ZM6.58709 2.2865C6.58709 1.84031 6.95009 1.47731 7.39628 1.47731H8.60375C9.04994 1.47731 9.41294 1.84031 9.41294 2.2865V3.49628H6.58709V2.2865ZM3.19103 4.74075C3.19103 4.5715 3.32872 4.43381 3.49797 4.43381H12.502C12.6712 4.43381 12.8089 4.5715 12.8089 4.74075V7.7654L8.11847 6.53984C8.04078 6.51956 7.95916 6.51956 7.88147 6.53984L3.191 7.7654L3.19103 4.74075ZM11.5568 14.2593C11.2613 14.4064 11.0279 14.5227 10.5106 14.5227C9.99325 14.5227 9.75984 14.4064 9.46434 14.2593C9.12391 14.0898 8.73806 13.8977 8.00022 13.8977C7.26237 13.8977 6.87653 14.0898 6.53606 14.2593C6.24056 14.4064 6.00716 14.5227 5.48981 14.5227C4.97244 14.5227 4.739 14.4064 4.4435 14.2593C4.10306 14.0898 3.71719 13.8977 2.97931 13.8977C2.93409 13.8977 2.89022 13.8984 2.84756 13.8998L1.20553 9.58015C1.16612 9.4765 1.19684 9.39006 1.21866 9.34775C1.24047 9.30544 1.29306 9.23028 1.40034 9.20225L8 7.47784L14.5997 9.20228C14.7069 9.23028 14.7595 9.30544 14.7813 9.34775C14.8032 9.39006 14.8339 9.4765 14.7945 9.58019L13.1525 13.8998C13.1099 13.8984 13.0661 13.8977 13.0209 13.8977C12.2831 13.8977 11.8972 14.0898 11.5568 14.2593Z"
                    fill="white"
                  />
                  <path
                    d="M12.3341 9.87672L8.11893 8.77534C8.04124 8.75506 7.95962 8.75506 7.88193 8.77534L3.66677 9.87672C3.41631 9.94215 3.26631 10.1983 3.33174 10.4487C3.39718 10.6992 3.65331 10.8492 3.90377 10.7838L8.00043 9.71337L12.0971 10.7838C12.1368 10.7942 12.1767 10.7991 12.2159 10.7991C12.424 10.7991 12.6141 10.6595 12.6691 10.4487C12.7346 10.1983 12.5846 9.94215 12.3341 9.87672Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="max-[900px]:text-white my-auto flex justify-center text-[16px] font-[400] text-white ">
                Ferry
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start max-sm:flex-col max-sm:items-start">

            <div className="flex flex-col ">
              <span className="w-[150px] text-[16px] text-[600]">
                {t("tripCost")} {data?.adult_price} {t("LE")}
              </span>
              <span className="text-[12px] text-[400]">
                {t("Price per person")}
              </span>
            </div>

            <div
              className="flex items-center justify-center "
              style={{ alignContent: "end" }}
            >
              <button
                className=" btn-hover max-[1024px]:bg-black   h-[54px]  w-[110px] text-[20px] text-[600] text-white "
                style={{ borderRadius: "9px" }}
                onClick={() => {
                  navigate(
                    `/checkout-maritime/?${date}/${data?.id}/${travel}/${cityTo}/`
                  );
                }}
              >
                {t("select")}
              </button>
            </div>

          </div>
          </div>

      </div>
    </div>
  );
};

export default MarinTimeCard;
