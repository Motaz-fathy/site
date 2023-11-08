import React, { FC } from 'react'
import Styled from './page.module.css'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

interface busHeaderProp {
  seatsNumber ?: any ,
  from ?: string ,
  to ?: string ,
  
}
export const BusHeader:FC<busHeaderProp> = ({seatsNumber , from , to }) => {

    const { t } = useTranslation();
    const handleBackClick = () => {
      window.history.back();
    };
  const dropOffLocationType = window.localStorage.getItem("dropOffLocationType")
  return (
    <div className={`${Styled.HideOver}`}>
      <div
        className={`relative flex h-[20vh] w-full flex-col bg-[#1d4179] ltr:py-2 rtl:ml-2 `}
      >
        {/* top nav */}
        <div className="relative mx-auto flex h-[50px] w-[80vw] flex-row  justify-between text-white ">
          <button
            className="flex w-[3vw] items-center justify-between"
            onClick={handleBackClick}
          >
            <span
              className={` ${Styled.back} flex items-center justify-center text-[20px] font-[400] rtl:z-40`}
            >
              <svg
                className="mr-2 h-[24px]  w-[24px] rtl:ml-2 "
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75 16.1538L1.25 8.65381L8.75 1.15381"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {t("back")}
            </span>
          </button>
        </div>
        {/* center data */}
        <div
          className={`relative flex flex-col items-center justify-center text-white ${Styled.containerHead} `}
        >
          <div className={Styled.contain_date}>
            <div
              className={`flex items-center justify-center ${Styled.fromtospace}`}
            >
              <span className={`text-[16px] font-[500px] ${Styled.from_name}`}>
                {from}
              </span>
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="62.028px"
                height="10px"
                viewBox="0 0 62.028 10"
                enable-background="new 0 0 62.028 10"
              >
                <circle fill="#FFFFFF" cx="3.581" cy="5.039" r="3.562" />
                <circle fill="#FFFFFF" cx="58.581" cy="5.039" r="3.562" />
                <rect x="3.653" y="4" fill="#FFFFFF" width="55" height="2" />
              </svg>
              <span className={`text-[16px] font-[500px] ${Styled.to_name}`}>
                {to}
              </span>
            </div>

            <div
              className={`flex items-center justify-center ${Styled.herizontalSpace}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
              >
                <path
                  d="M12.749 5C12.749 5.99456 12.3539 6.94839 11.6507 7.65165C10.9474 8.35491 9.99356 8.75 8.999 8.75C8.00444 8.75 7.05061 8.35491 6.34735 7.65165C5.64409 6.94839 5.249 5.99456 5.249 5C5.249 4.00544 5.64409 3.05161 6.34735 2.34835C7.05061 1.64509 8.00444 1.25 8.999 1.25C9.99356 1.25 10.9474 1.64509 11.6507 2.34835C12.3539 3.05161 12.749 4.00544 12.749 5ZM1.5 19.118C1.53213 17.1504 2.33634 15.2742 3.73918 13.894C5.14202 12.5139 7.03109 11.7405 8.999 11.7405C10.9669 11.7405 12.856 12.5139 14.2588 13.894C15.6617 15.2742 16.4659 17.1504 16.498 19.118C14.1454 20.1968 11.5871 20.7535 8.999 20.75C6.323 20.75 3.783 20.166 1.5 19.118Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-[14px] font-[400]">
                {" "}
               {seatsNumber} {t("Adult")} .
              </span>
              <span className="text-[14px] font-[400]"> {i18next.language === 'en' ?
               `${dropOffLocationType}` :t(`${dropOffLocationType}`) } . </span>
              <span className="text-[14px] font-[400]">
                {" "}
                
                {t("Bus")}
              </span>
            </div>
          </div>

          <span
            className={`bottom-o  absolute h-[15vh] w-[20vh]  rotate-45 rounded bg-[#1d4179] ${Styled.routarSquer}`}
          ></span>
        </div>
      </div>
    </div>
  )
}
