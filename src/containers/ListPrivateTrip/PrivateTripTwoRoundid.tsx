/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AnchorDirectionShape,
  DateRangePicker,
  FocusedInputShape
} from "react-dates";
import "react-time-picker/dist/TimePicker.css";
import { DateRage } from "../../components/HeroSearchForm/StaySearchForm";
import useWindowSize from "hooks/useWindowResize";
import useNcId from "hooks/useNcId";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { getAddressList } from "../../api/index";

import Styled from "./component.module.css";
import { Headprivatetrip } from "components/ptivateTrip/Headprivatetrip";
import MapAddress from "components/ptivateTrip/MapAddress";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import { toast } from "react-toastify";

export interface RentalCarDatesRangeInputProps {
  defaultDateValue: DateRage;
  defaultFocus?: FocusedInputShape | null;
  onChange?: (data: { stateDate: DateRage }) => void;
  onFocusChange?: (focus: FocusedInputShape | null) => void;
  fieldClassName?: string;
  className?: string;
  numberOfMonths?: number;
  anchorDirection?: AnchorDirectionShape;
}

export const PrivateTripTwoRoundid: FC<RentalCarDatesRangeInputProps> = ({
  defaultDateValue,
  onChange,
  defaultFocus = null,
  onFocusChange,
  className = "",
  numberOfMonths,
  anchorDirection
}) => {
  const { trip_Id } = useParams();
  window.localStorage.setItem("trip_Id" , JSON.stringify(trip_Id))
  const [data, setData]: any = useState();

  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [stateDate, setStateDate] = useState(defaultDateValue);
  const startDateId = useNcId();
  const endDateId = useNcId();
  const { t, i18n } = useTranslation();
  const [addressapifrom, setAddressapifrom]: any = useState();
  const [addressapito, setAddressapito]: any = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const pod:any = window.localStorage.getItem("private_twoRound_start_date");
  const private_oneRound_date_time:any = JSON.parse(pod)
  

  const end:any = window.localStorage.getItem("busEndDate");
  const end_date = JSON.parse(end)
  // code will be enhance
  const fromhead_en: string | null = window.localStorage.getItem("fromhead_en");
  const tohead_en: string | null = window.localStorage.getItem("tohead_en");
  const fromhead_ar: string | null = window.localStorage.getItem("fromhead_ar");
  const tohead_ar: string | null = window.localStorage.getItem("tohead_ar");
  // code will be enhance
  
  
  useEffect(() => {
    setStateDate(defaultDateValue);
  }, [defaultDateValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  const windowSize = useWindowSize();

  const handleDateFocusChange = (focus: FocusedInputShape | null) => {
    setFocusedInput(focus);
    onFocusChange && onFocusChange(focus);
  };
  useEffect(() => {
    getAddressList().then((res: any) => {
    setAddressapifrom(res?.data?.data);
    setAddressapito(res?.data?.data);
  }).catch((erro) => {
      console.log(erro)
  })
}, []);
  const renderInputpickUpDate = () => {
    const focused: any = focusedInput === "startDate";
    return (
      <div
        className={`ml-2  flex  items-center  justify-center max-sm:w-full  ${className} ${
          focused ? "nc-hero-field-focused" : " "
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90646 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z"
              stroke="#B9C4D5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <span
            className={`mt-1 flex text-sm font-light leading-none text-neutral-400 ${className}`}
          >
            {`${private_oneRound_date_time} __to__ ${end_date}`}
          </span>
        </div>
      </div>
    );
  };

  // handle data of trip
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `${process.env.REACT_APP_API_TELE_URL}/api/transports/private/trips/${trip_Id}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((res: any) => {
        setData(res?.data?.data);
        setLoading(false)
      });
  }, []);

  // popup map address

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active_modal");
  } else {
    document.body.classList.remove("active_modal");
  }

  const [AddressFromOne, setAddressFromOne] = useState<any>();
  const [AddressToOne, setAddressToOne] = useState<any>();
  const [time, setTime] = useState<any>();
  window.localStorage.setItem("private_time" , JSON.stringify(time)) 
  window.localStorage.setItem("AddressFromOne" , JSON.stringify(AddressFromOne))
  window.localStorage.setItem("AddressToOne" , JSON.stringify(AddressToOne))
  const dropOffLocationType = window.localStorage.getItem(
    "dropOffLocationType"
  );

  const handelTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const [enablefrom, setEnableFrom] = useState(false);
  const [enableto, setEnableTo] = useState(false);

  const PopAddressfrom = () => {
    setEnableFrom(!enablefrom);
  };
  const PopAddressto = () => {
    setEnableTo(!enableto);
  };

  // { get screen dimensions }

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  // navigate pages
  const nav = useNavigate();


  const GoToSummary =  () => {
    setLoading(true)
      if (
        AddressFromOne === undefined ||
        AddressToOne === undefined ||
        time === undefined ||
        private_oneRound_date_time === undefined
      ) {
        nav(`/private-trip/twoRound/${trip_Id}`);
        toast.error("fill input required ")
      } else if (AddressFromOne === AddressToOne) {
        nav(`/private-trip/twoRound/${trip_Id}`);
        toast.error("no select same address")
      } else {
       
        nav("/private-trip/twoRound/summary");
      }
    
  };

  //  { handle large screen display  }

  const Large_Screen_display = () => {
    const handlesetfromaddress = (itemfrom: any) => {
      setAddressFromOne(itemfrom);
      setEnableFrom(false);
    };
    const handlesettoaddress = (itemto: any) => {
      setAddressToOne(itemto);
      setEnableTo(false);
      setLoading(false)
    };
    return (
      <>
        <div className="m-auto flex w-full items-center justify-center ">
          {modal && (
            <div className={Styled.modal}>
              <div onClick={toggleModal} className={Styled.overlay}></div>
              <div className={Styled.modal_content}>
                <MapAddress />
                <ButtonClose 
                className={` absolute top-[20px] left-[20px]   ` }
                onClick={toggleModal}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex w-[100%] flex-col items-center rounded-lg bg-[white]">
          <div className="mt-4 flex h-[auto] w-[98%] items-center justify-between  pb-1 pt-1">
            <div className="flex items-center justify-start ">
              <div className="  ">
                <img
                  src={data?.bus?.featured_image}
                  className="h-[80px] w-[80px]"
                />
              </div>

              <div className=" ml-10 flex  flex-col rtl:mr-10 rtl:justify-end">
                <div className=" flex justify-start  ">
                  <h3 className="text-[20px] text-[#1E1E1E]  ">
                    {" "}
                    {data?.bus?.name}{" "}
                  </h3>
                  <p className=" rtl:text-right ">
                    {" "}
                    {data?.bus?.model} & {data?.bus?.year} or similar{" "}
                  </p>
                </div>
                <div className="mt-5 flex items-end justify-start text-[#69696A] rtl:justify-end">
                  <span className="flex items-center justify-start rtl:justify-end ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="10"
                      viewBox="0 0 25 10"
                      fill="none"
                    >
                      <path
                        d="M14.7656 3.80786H13.1656V4.60805H14.7656V3.80786Z"
                        fill="#69696A"
                      />
                      <path
                        d="M1.10725 2.61179L3.82456 2.22374C4.32004 1.91936 4.83424 1.64688 5.36438 1.40777C7.11515 0.614742 9.01535 0.205534 10.9375 0.20765H11.4096C13.6779 0.209277 15.91 0.77849 17.9024 1.86336L19.2737 2.61146C20.879 2.62953 22.4533 3.05648 23.8479 3.85146C24.4147 4.17651 24.7646 4.77958 24.7656 5.43278V7.80811C24.7656 8.02915 24.5866 8.2082 24.3655 8.2082H23.0223C22.5855 9.45455 21.2209 10.1108 19.9746 9.67396C19.2885 9.43355 18.7493 8.89412 18.5088 8.2082H7.82126C7.38438 9.45455 6.01987 10.1108 4.77352 9.67396C4.0876 9.43355 3.54818 8.89412 3.30776 8.2082H3.1642C3.11325 8.2082 3.06279 8.1986 3.01542 8.17972L1.71976 7.65983C1.14095 7.43064 0.761852 6.87038 0.763968 6.24811V3.00781C0.763968 2.8089 0.910299 2.64011 1.10725 2.61179ZM19.1977 7.72819C19.3746 8.59397 20.2199 9.15244 21.0857 8.97551C21.9516 8.79858 22.5101 7.9533 22.3332 7.08736C22.1561 6.22157 21.3108 5.66311 20.445 5.84004C19.7 5.99223 19.1651 6.64771 19.1653 7.40818C19.1653 7.51561 19.1762 7.62288 19.1977 7.72819ZM11.9648 7.40818H18.3653C18.3653 6.08257 19.4397 5.00795 20.7653 5.00795C22.091 5.00795 23.1656 6.08257 23.1656 7.40818H23.9656V5.43278C23.9651 5.06638 23.7688 4.72798 23.4508 4.546C22.1453 3.80067 20.6683 3.40839 19.1653 3.4079H11.9648V7.40818ZM11.9648 2.60788H17.5963L17.5192 2.56572C15.809 1.6363 13.9092 1.1094 11.9648 1.02525V2.60788ZM11.1648 1.00767H10.9383C9.32625 1.00588 7.7288 1.31189 6.23147 1.90943L6.92992 2.60788H11.1648V1.00767ZM3.99661 7.72819C4.17355 8.59397 5.01882 9.15244 5.88476 8.97551C6.75055 8.79858 7.30902 7.9533 7.13208 7.08736C6.95515 6.22157 6.10971 5.66311 5.24393 5.84004C4.49893 5.99223 3.96406 6.64771 3.96422 7.40818C3.96422 7.51561 3.97513 7.62288 3.99661 7.72819ZM1.56399 3.80783H2.76411V4.60802H1.56399V6.24811C1.56301 6.54289 1.74271 6.8082 2.01682 6.91645L3.1642 7.37725C3.1642 7.34047 3.16892 7.30401 3.17136 7.26722C3.1738 7.23043 3.17462 7.1873 3.17852 7.14726C3.18259 7.10722 3.19057 7.06717 3.19692 7.02729C3.20343 6.98725 3.20815 6.94721 3.21612 6.91091C3.2241 6.87445 3.23582 6.83408 3.24623 6.796C3.25665 6.75807 3.26463 6.71966 3.27667 6.68238C3.28856 6.64527 3.30304 6.60962 3.31655 6.57316C3.33022 6.53686 3.3426 6.49926 3.35659 6.46313C3.37059 6.42716 3.38947 6.39444 3.40624 6.36042C3.42301 6.3264 3.43945 6.28912 3.45816 6.25478C3.47705 6.22044 3.49821 6.19114 3.51627 6.15923C3.53418 6.12717 3.55615 6.09071 3.57894 6.05799C3.60189 6.02511 3.62305 5.99923 3.64503 5.9696C3.667 5.93998 3.6919 5.90515 3.71746 5.87438C3.74302 5.84362 3.76694 5.81953 3.79185 5.7943C3.81659 5.76923 3.84426 5.73521 3.87177 5.70722C3.89944 5.67922 3.92662 5.65708 3.95413 5.63234C3.9818 5.6076 4.01143 5.5783 4.04186 5.55226C4.07214 5.52638 4.10307 5.50636 4.13334 5.48357C4.16378 5.46078 4.19422 5.43636 4.22612 5.41504C4.25819 5.39388 4.29416 5.37516 4.3285 5.3527C4.36301 5.33024 4.39101 5.31266 4.4234 5.29557C4.45579 5.27831 4.49616 5.26025 4.53295 5.24267C4.56973 5.22509 4.59854 5.20946 4.63256 5.19514C4.66658 5.18065 4.71264 5.16551 4.75253 5.15119C4.79257 5.1367 4.81861 5.12547 4.85263 5.11473C4.8982 5.10073 4.94492 5.09064 4.99147 5.07908C5.02191 5.07192 5.05105 5.06231 5.08181 5.05597C5.13097 5.04588 5.18143 5.04034 5.2314 5.03302C5.26102 5.02911 5.28934 5.0226 5.31897 5.01983C5.39905 5.01186 5.47897 5.00746 5.56297 5.00746C6.88809 5.00876 7.96189 6.08257 7.9632 7.40769H11.1646V3.40774H6.76438C6.65825 3.40774 6.55652 3.36558 6.48165 3.29055L5.4443 2.2532C5.00889 2.46041 4.58552 2.69203 4.17615 2.94693C4.12895 2.9764 4.07621 2.99577 4.02103 3.00374L1.56399 3.35451V3.80783Z"
                        fill="#69696A"
                      />
                    </svg>
                    <h4 className="ml-2">Van</h4>
                  </span>

                  <span className="ml-3 flex items-end justify-start  rtl:justify-end ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M16.3818 6C16.3818 6.99456 15.9867 7.94839 15.2835 8.65165C14.5802 9.35491 13.6264 9.75 12.6318 9.75C11.6373 9.75 10.6834 9.35491 9.98016 8.65165C9.2769 7.94839 8.88181 6.99456 8.88181 6C8.88181 5.00544 9.2769 4.05161 9.98016 3.34835C10.6834 2.64509 11.6373 2.25 12.6318 2.25C13.6264 2.25 14.5802 2.64509 15.2835 3.34835C15.9867 4.05161 16.3818 5.00544 16.3818 6ZM5.13281 20.118C5.16495 18.1504 5.96915 16.2742 7.37199 14.894C8.77483 13.5139 10.6639 12.7405 12.6318 12.7405C14.5997 12.7405 16.4888 13.5139 17.8916 14.894C19.2945 16.2742 20.0987 18.1504 20.1308 20.118C17.7782 21.1968 15.22 21.7535 12.6318 21.75C9.95581 21.75 7.41581 21.166 5.13281 20.118Z"
                        stroke="#69696A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <h4 className="ml-1"> {data?.bus?.seats_number} seat</h4>{" "}
                  </span>

                  <span className="ml-2 flex items-end justify-start rtl:justify-end ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="24"
                      viewBox="0 0 21 24"
                      fill="none"
                    >
                      <path
                        d="M19.2578 13.125V12.375C19.2578 12.2755 19.2183 12.1802 19.148 12.1098C19.0777 12.0395 18.9823 12 18.8828 12H17.3828C17.2834 12 17.188 12.0395 17.1176 12.1098C17.0473 12.1802 17.0078 12.2755 17.0078 12.375V13.125H16.6328V12C16.6328 11.7016 16.5143 11.4155 16.3033 11.2045C16.0923 10.9935 15.8062 10.875 15.5078 10.875H12.8828V9.75C12.8822 9.2529 12.6845 8.77633 12.333 8.42483C11.9815 8.07333 11.5049 7.8756 11.0078 7.875H10.2578V4.875H10.6328C10.7323 4.875 10.8277 4.83549 10.898 4.76516C10.9683 4.69484 11.0078 4.59946 11.0078 4.5V1.5C11.0078 1.20163 10.8893 0.915483 10.6783 0.704505C10.4673 0.493526 10.1812 0.375 9.88281 0.375H3.88281C3.58444 0.375 3.2983 0.493526 3.08732 0.704505C2.87634 0.915483 2.75781 1.20163 2.75781 1.5V4.5C2.75781 4.59946 2.79732 4.69484 2.86765 4.76516C2.93797 4.83549 3.03336 4.875 3.13281 4.875H3.50781V7.875H2.75781C2.26071 7.8756 1.78415 8.07333 1.43264 8.42483C1.08114 8.77633 0.883408 9.2529 0.882812 9.75V20.25C0.883408 20.7471 1.08114 21.2237 1.43264 21.5752C1.78415 21.9267 2.26071 22.1244 2.75781 22.125H2.82681C2.7824 22.2451 2.75906 22.372 2.75781 22.5C2.75781 22.7984 2.87634 23.0845 3.08732 23.2955C3.2983 23.5065 3.58444 23.625 3.88281 23.625C4.18118 23.625 4.46733 23.5065 4.67831 23.2955C4.88929 23.0845 5.00781 22.7984 5.00781 22.5C5.00657 22.372 4.98323 22.2451 4.93881 22.125H8.75781V23.25C8.75781 23.3495 8.79732 23.4448 8.86765 23.5152C8.93797 23.5855 9.03336 23.625 9.13281 23.625H11.3828C11.4823 23.625 11.5777 23.5855 11.648 23.5152C11.7183 23.4448 11.7578 23.3495 11.7578 23.25V22.125H16.2578V23.25C16.2578 23.3495 16.2973 23.4448 16.3676 23.5152C16.438 23.5855 16.5334 23.625 16.6328 23.625H18.8828C18.9823 23.625 19.0777 23.5855 19.148 23.5152C19.2183 23.4448 19.2578 23.3495 19.2578 23.25V22.125C19.5562 22.125 19.8423 22.0065 20.0533 21.7955C20.2643 21.5845 20.3828 21.2984 20.3828 21V14.25C20.3828 13.9516 20.2643 13.6655 20.0533 13.4545C19.8423 13.2435 19.5562 13.125 19.2578 13.125ZM19.6328 14.25V17.625H8.38281V14.25C8.38281 14.1505 8.42232 14.0552 8.49265 13.9848C8.56297 13.9145 8.65836 13.875 8.75781 13.875H16.6328V14.4697L15.9927 15.1099C15.9224 15.1802 15.8828 15.2756 15.8828 15.375V16.5C15.8828 16.5995 15.9223 16.6948 15.9926 16.7652C16.063 16.8355 16.1584 16.875 16.2578 16.875H17.7578C17.8573 16.875 17.9527 16.8355 18.023 16.7652C18.0933 16.6948 18.1328 16.5995 18.1328 16.5V15.375C18.1328 15.2756 18.0933 15.1802 18.0229 15.1099L17.3828 14.4697V13.875H19.2578C19.3573 13.875 19.4527 13.9145 19.523 13.9848C19.5933 14.0552 19.6328 14.1505 19.6328 14.25ZM8.38281 18.375H19.6328V19.125H8.38281V18.375ZM10.2578 12.75V13.125H9.50781V12.75H10.2578ZM17.3828 15.5303V16.125H16.6328V15.5303L17.0078 15.1553L17.3828 15.5303ZM17.7578 12.75H18.5078V13.125H17.7578V12.75ZM15.8828 12V13.125H12.1328V12C12.1328 11.9005 12.1723 11.8052 12.2426 11.7348C12.313 11.6645 12.4084 11.625 12.5078 11.625H15.5078C15.6073 11.625 15.7027 11.6645 15.773 11.7348C15.8433 11.8052 15.8828 11.9005 15.8828 12ZM3.50781 1.5C3.50781 1.40054 3.54732 1.30516 3.61765 1.23483C3.68797 1.16451 3.78336 1.125 3.88281 1.125H9.88281C9.98227 1.125 10.0777 1.16451 10.148 1.23483C10.2183 1.30516 10.2578 1.40054 10.2578 1.5V4.125H9.50781V2.25C9.50781 2.15054 9.4683 2.05516 9.39798 1.98484C9.32765 1.91451 9.23227 1.875 9.13281 1.875H4.63281C4.53336 1.875 4.43797 1.91451 4.36765 1.98484C4.29732 2.05516 4.25781 2.15054 4.25781 2.25V4.125H3.50781V1.5ZM4.25781 4.875H4.63281C4.73227 4.875 4.82765 4.83549 4.89798 4.76516C4.9683 4.69484 5.00781 4.59946 5.00781 4.5V2.625H8.75781V4.5C8.75781 4.59946 8.79732 4.69484 8.86765 4.76516C8.93797 4.83549 9.03336 4.875 9.13281 4.875H9.50781V7.875H4.25781V4.875ZM1.63281 20.25V9.75C1.63281 9.45163 1.75134 9.16548 1.96232 8.9545C2.1733 8.74353 2.45944 8.625 2.75781 8.625H11.0078C11.3062 8.625 11.5923 8.74353 11.8033 8.9545C12.0143 9.16548 12.1328 9.45163 12.1328 9.75V10.944C11.9142 11.0213 11.7248 11.1642 11.5906 11.3532C11.4563 11.5423 11.3838 11.7682 11.3828 12V13.125H11.0078V12.375C11.0078 12.2755 10.9683 12.1802 10.898 12.1098C10.8277 12.0395 10.7323 12 10.6328 12V10.125H9.88281V12H9.13281C9.03336 12 8.93797 12.0395 8.86765 12.1098C8.79732 12.1802 8.75781 12.2755 8.75781 12.375V13.125C8.45944 13.125 8.1733 13.2435 7.96232 13.4545C7.75134 13.6655 7.63281 13.9516 7.63281 14.25V21C7.63406 21.128 7.6574 21.2549 7.70181 21.375H2.75781C2.45944 21.375 2.1733 21.2565 1.96232 21.0455C1.75134 20.8345 1.63281 20.5484 1.63281 20.25ZM4.25781 22.5C4.25781 22.5742 4.23582 22.6467 4.19461 22.7083C4.15341 22.77 4.09484 22.8181 4.02632 22.8465C3.9578 22.8748 3.8824 22.8823 3.80965 22.8678C3.73691 22.8533 3.67009 22.8176 3.61765 22.7652C3.5652 22.7127 3.52949 22.6459 3.51502 22.5732C3.50055 22.5004 3.50797 22.425 3.53636 22.3565C3.56474 22.288 3.61281 22.2294 3.67447 22.1882C3.73614 22.147 3.80864 22.125 3.88281 22.125C3.98227 22.125 4.07765 22.1645 4.14798 22.2348C4.2183 22.3052 4.25781 22.4005 4.25781 22.5ZM11.0078 22.875H9.50781V22.125H11.0078V22.875ZM18.5078 22.875H17.0078V22.125H18.5078V22.875ZM19.2578 21.375H8.75781C8.65836 21.375 8.56297 21.3355 8.49265 21.2652C8.42232 21.1948 8.38281 21.0995 8.38281 21V19.875H19.6328V21C19.6328 21.0995 19.5933 21.1948 19.523 21.2652C19.4527 21.3355 19.3573 21.375 19.2578 21.375Z"
                        fill="#69696A"
                      />
                    </svg>
                    <h4 className="ml-2">1 large bag + 1 small bag </h4>{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="">
              <img src={data?.company_logo} className="h-[40px] w-[70px]" />
            </div>
          </div>

          <hr className="color-black mb-5 w-full"></hr>

          <div className="mb-4  flex  w-[98%] items-center justify-between">
            <div className=" text-[#FFB229] ">
              <h3>
                {t("Free cancellation up to 3 hours before your pick-up")}
              </h3>
            </div>

            <div className=" ">
              <div className="flex flex-col">
                <h3 className="text-[20px] font-[500] text-[black]">
                  LE <span className="ml-2">{data?.price}</span>{" "}
                </h3>
                <span>{t(`${dropOffLocationType}`)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" container mb-5 mt-5 flex h-auto w-full flex-col rounded-lg bg-white pb-5">
          <div className="mr-auto mt-5 w-full rtl:ml-auto">
            <span className=" text-[24px] font-[500] text-[#1D4179]">
              {t("Outbound trip details")}
            </span>
          </div>

          <div className="w-fll mt-10 flex flex-col">
            <span className="mr-auto w-full text-[16px] font-[400] text-[#1E1E1E] rtl:ml-auto">
              {t("Pick Up Information")}
            </span>

            <div className="mt-3 flex w-full items-center justify-between ">
              <div className=" mr-auto flex w-[45%] flex-col rounded-[4px] rtl:ml-auto">
                <span className=" text-[12px] font-[400] text-[#69696A]">
                  {t("Confirm Pickup Date")}
                </span>

                <div className="flex h-[50px] items-center justify-between border-[1px] border-[#E8ECF2] ">
                  <div
                    className={` relative  flex  sm:pt-0 ${className} ${
                      !!focusedInput
                        ? "nc-date-focusedInput"
                        : "nc-date-not-focusedInput"
                    }   } max-sm:w-full   `}
                  >
                    <div className={` absolute   inset-0 flex   `}>
                      <DateRangePicker
                        disabled={true}
                        startDate={stateDate?.startDate}
                        endDate={stateDate?.endDate}
                        focusedInput={focusedInput}
                        onDatesChange={(date) => {
                          setStateDate(date);
                          onChange && onChange({ stateDate: date });
                        }}
                        onFocusChange={handleDateFocusChange}
                        startDateId={startDateId}
                        endDateId={endDateId}
                        daySize={windowSize.width > 1279 ? 54 : 44}
                        orientation={"horizontal"}
                        showClearDates
                        noBorder
                        hideKeyboardShortcutsPanel
                        numberOfMonths={
                          numberOfMonths ||
                          (windowSize.width < 1024 ? 1 : undefined)
                        }
                        anchorDirection={anchorDirection}
                        renderMonthElement={({ month }) =>
                          moment(month)
                            .locale(i18n.language)
                            .format("MMMM YYYY")
                        }
                        reopenPickerOnClearDates
                        isRTL={i18n.language === "ar" ? true : false}
                      />
                    </div>

                    {renderInputpickUpDate()}
                    {/* {renderInputdropOffDate()} */}
                  </div>
                </div>
              </div>
              <div className="w-[10%]"></div>
              <div className="ml-auto flex w-[45%] flex-col rtl:mr-auto ">
                <span className=" text-[12px] font-[400] text-[#69696A] ">
                  {t("Confirm Pickup Time")}
                </span>
                <input
                  onChange={handelTimeChange}
                  min="00:00"
                  max="23:59"
                  step="60"
                  type="time"
                  className={`block w-full h-[50px] rounded-[0px] cursor-pointer border-neutral-200 bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 `}
                />
              </div>
            </div>

            <div className="mt-10 text-[16px] font-[400] text-[#1E1E1E] ">
              {" "}
              {t("Address in")} {t(`${data?.from_location?.name}`)}{" "}
            </div>
            <div className="flex flex-col ">
              <div className=" w-full rounded-[4px] ">
                <span className="text-[12px] font-[400] text-[#69696A]">
                  {t("Address from")}
                </span>

                <div
                  className={`relative  flex cursor-pointer items-center justify-start border-[1px] border-[#E8ECF2] block w-full h-[50px] rounded-[0px] cursor-pointer border-neutral-200 bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 `}
                  onClick={PopAddressfrom}
                >
                  <div className=" flex items-center  justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5C9 9.70435 9.31607 8.94129 9.87868 8.37868C10.4413 7.81607 11.2044 7.5 12 7.5C12.7956 7.5 13.5587 7.81607 14.1213 8.37868C14.6839 8.94129 15 9.70435 15 10.5Z"
                        stroke="#B9C4D5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.5 10.5C19.5 17.642 12 21.75 12 21.75C12 21.75 4.5 17.642 4.5 10.5C4.5 8.51088 5.29018 6.60322 6.6967 5.1967C8.10322 3.79018 10.0109 3 12 3C13.9891 3 15.8968 3.79018 17.3033 5.1967C18.7098 6.60322 19.5 8.51088 19.5 10.5Z"
                        stroke="#B9C4D5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className=" text-[12px] font-[400] text-[#B9C4D5]">
                      {t("address")}
                    </span>
                  </div>

                  <div
                    className={`ml-5 flex h-[40px] items-center  justify-start  `}
                  >
                    {AddressFromOne?.name}
                  </div>
                  <div
                    className={`z-[999999999] overflow-y-scroll ${
                      enablefrom ? Styled.pop_container : Styled.popHide
                    } `}
                  >
                    <div className="container mt-3 w-full h-[200px]">
                      {addressapifrom?.map((item: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`container mt-2 flex h-[40px] w-full cursor-pointer items-center justify-start  ${Styled.itemAddress}`}
                            onClick={() => handlesetfromaddress(item)}
                          >
                            <span className="text-[16px] text-[#1E1E1E]">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className=" mb-5 mt-3 flex w-full cursor-pointer items-center justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 3C8.27614 3 8.5 3.22386 8.5 3.5V7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H8.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V8.5H3.5C3.22386 8.5 3 8.27614 3 8C3 7.72386 3.22386 7.5 3.5 7.5H7.5V3.5C7.5 3.22386 7.72386 3 8 3Z"
                      fill="#1D4179"
                    />
                  </svg>
                  <span
                    className="text-[14px] font-[400] text-[#1D4179]"
                    onClick={toggleModal}
                  >
                    {" "}
                    {t("add address")}{" "}
                  </span>
                </div>
              </div>

              <div className=" w-full rounded-[4px] ">
                <span className="text-[12px] font-[400] text-[#69696A]">
                  {t("address")} {t("to")}
                </span>

                <div
                  className={`relative flex items-center justify-start border-[1px] border-[#E8ECF2] block w-full h-[50px] rounded-[0px] cursor-pointer border-neutral-200 bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 ${Styled.pushup}`}
                >
                  <div className="flex items-center  justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5C9 9.70435 9.31607 8.94129 9.87868 8.37868C10.4413 7.81607 11.2044 7.5 12 7.5C12.7956 7.5 13.5587 7.81607 14.1213 8.37868C14.6839 8.94129 15 9.70435 15 10.5Z"
                        stroke="#B9C4D5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.5 10.5C19.5 17.642 12 21.75 12 21.75C12 21.75 4.5 17.642 4.5 10.5C4.5 8.51088 5.29018 6.60322 6.6967 5.1967C8.10322 3.79018 10.0109 3 12 3C13.9891 3 15.8968 3.79018 17.3033 5.1967C18.7098 6.60322 19.5 8.51088 19.5 10.5Z"
                        stroke="#B9C4D5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <span className=" text-[12px] font-[400] text-[#B9C4D5]">
                      {t("address")}
                    </span>
                  </div>

                  <div
                    className=" ml-5 flex h-[40px] w-full cursor-pointer   items-center justify-start"
                    onClick={PopAddressto}
                  >
                    {AddressToOne?.name}
                  </div>
                  <div
                    className={`z-[999999999] overflow-y-scroll ${
                      enableto ? Styled.pop_container_to : Styled.popHide_to
                    } `}
                  >
                    <div className="container mt-3 w-full h-[200px]  ">
                      {addressapito?.map((itemTo: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`container mt-2 flex h-[40px] w-full cursor-pointer items-center justify-start  ${Styled.itemAddress_to}`}
                            onClick={() => handlesettoaddress(itemTo)}
                          >
                            <span className="text-[16px] text-[#1E1E1E]">
                              {itemTo.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="z-0  mt-3 flex w-full cursor-pointer items-center justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 3C8.27614 3 8.5 3.22386 8.5 3.5V7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H8.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V8.5H3.5C3.22386 8.5 3 8.27614 3 8C3 7.72386 3.22386 7.5 3.5 7.5H7.5V3.5C7.5 3.22386 7.72386 3 8 3Z"
                      fill="#1D4179"
                    />
                  </svg>
                  <span
                    className="text-[14px] font-[400] text-[#1D4179]"
                    onClick={toggleModal}
                  >
                    {" "}
                    {t("add address")}{" "}
                  </span>
                </div>

                <div className="flex w-full items-center justify-end ">
                  <button
                    className="mr-10 flex cursor-pointer items-center justify-center
                      rounded-lg bg-[#1D4179] pb-[1%] pl-[5%] pr-[5%] pt-[1%] text-[16px] font-[500] text-white "
                    onClick={GoToSummary}
                  >
                    {t("Summary")}
                  </button>
                </div>
                {/* <a className=" flex justify-center items-center mr-10 pl-[5%]
              cursor-pointer pr-[5%] bg-[#1D4179] text-white text-[16px] font-[500] pt-[1%] pb-[1%] rounded-lg"
              href={`/private-trip/twoRound/${trip_Id}${AddressFromOne}${AddressToOne}${StartDate}${time}`}
             > Next </a> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // { handle min and meduim screen }

  const Min_Midum_Screen = () => {
    const handlesetfromaddress = (itemfrom: any) => {
      setAddressFromOne(itemfrom);
      setEnableFrom(false);

    };
    const handlesettoaddress = (itemto: any) => {
      setAddressToOne(itemto);
      setEnableTo(false);
      setLoading(false)
    };

    return (
      <>
       <div className="m-auto flex w-full items-center justify-center ">
          {modal && (
            <div className={Styled.modal}>
              <div onClick={toggleModal} className={Styled.overlay}></div>
              <div className={Styled.modal_content}>
                <MapAddress />
                <ButtonClose 
                className={` absolute top-[20px] left-[20px]   ` }
                onClick={toggleModal}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex w-[100%] flex-col items-center rounded-lg bg-[white]">
          <div className="mt-4 flex h-[auto] w-[98%] items-center justify-between  pb-1 pt-1">
            <div className="flex items-center justify-start ">
              <div className="  ">
                <img
                  src={data?.bus?.featured_image}
                  className="h-[80px] w-[80px]"
                />
              </div>

              <div className=" ml-10 flex  flex-col rtl:mr-10 rtl:justify-end">
                <div className=" flex justify-start  ">
                  <h3 className="text-[20px] text-[#1E1E1E]  ">
                    {" "}
                    {data?.bus?.name}{" "}
                  </h3>
                  <p className=" rtl:text-right ">
                    {" "}
                    {data?.bus?.model} & {data?.bus?.year} or similar{" "}
                  </p>
                </div>
                <div className="flex items-start flex-col text-[#69696A] rtl:justify-start">
                  <span className="flex items-center justify-start rtl:justify-end ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="10"
                      viewBox="0 0 25 10"
                      fill="none"
                    >
                      <path
                        d="M14.7656 3.80786H13.1656V4.60805H14.7656V3.80786Z"
                        fill="#69696A"
                      />
                      <path
                        d="M1.10725 2.61179L3.82456 2.22374C4.32004 1.91936 4.83424 1.64688 5.36438 1.40777C7.11515 0.614742 9.01535 0.205534 10.9375 0.20765H11.4096C13.6779 0.209277 15.91 0.77849 17.9024 1.86336L19.2737 2.61146C20.879 2.62953 22.4533 3.05648 23.8479 3.85146C24.4147 4.17651 24.7646 4.77958 24.7656 5.43278V7.80811C24.7656 8.02915 24.5866 8.2082 24.3655 8.2082H23.0223C22.5855 9.45455 21.2209 10.1108 19.9746 9.67396C19.2885 9.43355 18.7493 8.89412 18.5088 8.2082H7.82126C7.38438 9.45455 6.01987 10.1108 4.77352 9.67396C4.0876 9.43355 3.54818 8.89412 3.30776 8.2082H3.1642C3.11325 8.2082 3.06279 8.1986 3.01542 8.17972L1.71976 7.65983C1.14095 7.43064 0.761852 6.87038 0.763968 6.24811V3.00781C0.763968 2.8089 0.910299 2.64011 1.10725 2.61179ZM19.1977 7.72819C19.3746 8.59397 20.2199 9.15244 21.0857 8.97551C21.9516 8.79858 22.5101 7.9533 22.3332 7.08736C22.1561 6.22157 21.3108 5.66311 20.445 5.84004C19.7 5.99223 19.1651 6.64771 19.1653 7.40818C19.1653 7.51561 19.1762 7.62288 19.1977 7.72819ZM11.9648 7.40818H18.3653C18.3653 6.08257 19.4397 5.00795 20.7653 5.00795C22.091 5.00795 23.1656 6.08257 23.1656 7.40818H23.9656V5.43278C23.9651 5.06638 23.7688 4.72798 23.4508 4.546C22.1453 3.80067 20.6683 3.40839 19.1653 3.4079H11.9648V7.40818ZM11.9648 2.60788H17.5963L17.5192 2.56572C15.809 1.6363 13.9092 1.1094 11.9648 1.02525V2.60788ZM11.1648 1.00767H10.9383C9.32625 1.00588 7.7288 1.31189 6.23147 1.90943L6.92992 2.60788H11.1648V1.00767ZM3.99661 7.72819C4.17355 8.59397 5.01882 9.15244 5.88476 8.97551C6.75055 8.79858 7.30902 7.9533 7.13208 7.08736C6.95515 6.22157 6.10971 5.66311 5.24393 5.84004C4.49893 5.99223 3.96406 6.64771 3.96422 7.40818C3.96422 7.51561 3.97513 7.62288 3.99661 7.72819ZM1.56399 3.80783H2.76411V4.60802H1.56399V6.24811C1.56301 6.54289 1.74271 6.8082 2.01682 6.91645L3.1642 7.37725C3.1642 7.34047 3.16892 7.30401 3.17136 7.26722C3.1738 7.23043 3.17462 7.1873 3.17852 7.14726C3.18259 7.10722 3.19057 7.06717 3.19692 7.02729C3.20343 6.98725 3.20815 6.94721 3.21612 6.91091C3.2241 6.87445 3.23582 6.83408 3.24623 6.796C3.25665 6.75807 3.26463 6.71966 3.27667 6.68238C3.28856 6.64527 3.30304 6.60962 3.31655 6.57316C3.33022 6.53686 3.3426 6.49926 3.35659 6.46313C3.37059 6.42716 3.38947 6.39444 3.40624 6.36042C3.42301 6.3264 3.43945 6.28912 3.45816 6.25478C3.47705 6.22044 3.49821 6.19114 3.51627 6.15923C3.53418 6.12717 3.55615 6.09071 3.57894 6.05799C3.60189 6.02511 3.62305 5.99923 3.64503 5.9696C3.667 5.93998 3.6919 5.90515 3.71746 5.87438C3.74302 5.84362 3.76694 5.81953 3.79185 5.7943C3.81659 5.76923 3.84426 5.73521 3.87177 5.70722C3.89944 5.67922 3.92662 5.65708 3.95413 5.63234C3.9818 5.6076 4.01143 5.5783 4.04186 5.55226C4.07214 5.52638 4.10307 5.50636 4.13334 5.48357C4.16378 5.46078 4.19422 5.43636 4.22612 5.41504C4.25819 5.39388 4.29416 5.37516 4.3285 5.3527C4.36301 5.33024 4.39101 5.31266 4.4234 5.29557C4.45579 5.27831 4.49616 5.26025 4.53295 5.24267C4.56973 5.22509 4.59854 5.20946 4.63256 5.19514C4.66658 5.18065 4.71264 5.16551 4.75253 5.15119C4.79257 5.1367 4.81861 5.12547 4.85263 5.11473C4.8982 5.10073 4.94492 5.09064 4.99147 5.07908C5.02191 5.07192 5.05105 5.06231 5.08181 5.05597C5.13097 5.04588 5.18143 5.04034 5.2314 5.03302C5.26102 5.02911 5.28934 5.0226 5.31897 5.01983C5.39905 5.01186 5.47897 5.00746 5.56297 5.00746C6.88809 5.00876 7.96189 6.08257 7.9632 7.40769H11.1646V3.40774H6.76438C6.65825 3.40774 6.55652 3.36558 6.48165 3.29055L5.4443 2.2532C5.00889 2.46041 4.58552 2.69203 4.17615 2.94693C4.12895 2.9764 4.07621 2.99577 4.02103 3.00374L1.56399 3.35451V3.80783Z"
                        fill="#69696A"
                      />
                    </svg>
                    <h4 className="ml-2">Van</h4>
                  </span>

                  <span className=" flex items-end justify-start  rtl:justify-end ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M16.3818 6C16.3818 6.99456 15.9867 7.94839 15.2835 8.65165C14.5802 9.35491 13.6264 9.75 12.6318 9.75C11.6373 9.75 10.6834 9.35491 9.98016 8.65165C9.2769 7.94839 8.88181 6.99456 8.88181 6C8.88181 5.00544 9.2769 4.05161 9.98016 3.34835C10.6834 2.64509 11.6373 2.25 12.6318 2.25C13.6264 2.25 14.5802 2.64509 15.2835 3.34835C15.9867 4.05161 16.3818 5.00544 16.3818 6ZM5.13281 20.118C5.16495 18.1504 5.96915 16.2742 7.37199 14.894C8.77483 13.5139 10.6639 12.7405 12.6318 12.7405C14.5997 12.7405 16.4888 13.5139 17.8916 14.894C19.2945 16.2742 20.0987 18.1504 20.1308 20.118C17.7782 21.1968 15.22 21.7535 12.6318 21.75C9.95581 21.75 7.41581 21.166 5.13281 20.118Z"
                        stroke="#69696A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <h4 className="ml-1"> {data?.bus?.seats_number} seat</h4>{" "}
                  </span>

                  <span className=" flex items-end justify-start rtl:justify-end ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="24"
                      viewBox="0 0 21 24"
                      fill="none"
                    >
                      <path
                        d="M19.2578 13.125V12.375C19.2578 12.2755 19.2183 12.1802 19.148 12.1098C19.0777 12.0395 18.9823 12 18.8828 12H17.3828C17.2834 12 17.188 12.0395 17.1176 12.1098C17.0473 12.1802 17.0078 12.2755 17.0078 12.375V13.125H16.6328V12C16.6328 11.7016 16.5143 11.4155 16.3033 11.2045C16.0923 10.9935 15.8062 10.875 15.5078 10.875H12.8828V9.75C12.8822 9.2529 12.6845 8.77633 12.333 8.42483C11.9815 8.07333 11.5049 7.8756 11.0078 7.875H10.2578V4.875H10.6328C10.7323 4.875 10.8277 4.83549 10.898 4.76516C10.9683 4.69484 11.0078 4.59946 11.0078 4.5V1.5C11.0078 1.20163 10.8893 0.915483 10.6783 0.704505C10.4673 0.493526 10.1812 0.375 9.88281 0.375H3.88281C3.58444 0.375 3.2983 0.493526 3.08732 0.704505C2.87634 0.915483 2.75781 1.20163 2.75781 1.5V4.5C2.75781 4.59946 2.79732 4.69484 2.86765 4.76516C2.93797 4.83549 3.03336 4.875 3.13281 4.875H3.50781V7.875H2.75781C2.26071 7.8756 1.78415 8.07333 1.43264 8.42483C1.08114 8.77633 0.883408 9.2529 0.882812 9.75V20.25C0.883408 20.7471 1.08114 21.2237 1.43264 21.5752C1.78415 21.9267 2.26071 22.1244 2.75781 22.125H2.82681C2.7824 22.2451 2.75906 22.372 2.75781 22.5C2.75781 22.7984 2.87634 23.0845 3.08732 23.2955C3.2983 23.5065 3.58444 23.625 3.88281 23.625C4.18118 23.625 4.46733 23.5065 4.67831 23.2955C4.88929 23.0845 5.00781 22.7984 5.00781 22.5C5.00657 22.372 4.98323 22.2451 4.93881 22.125H8.75781V23.25C8.75781 23.3495 8.79732 23.4448 8.86765 23.5152C8.93797 23.5855 9.03336 23.625 9.13281 23.625H11.3828C11.4823 23.625 11.5777 23.5855 11.648 23.5152C11.7183 23.4448 11.7578 23.3495 11.7578 23.25V22.125H16.2578V23.25C16.2578 23.3495 16.2973 23.4448 16.3676 23.5152C16.438 23.5855 16.5334 23.625 16.6328 23.625H18.8828C18.9823 23.625 19.0777 23.5855 19.148 23.5152C19.2183 23.4448 19.2578 23.3495 19.2578 23.25V22.125C19.5562 22.125 19.8423 22.0065 20.0533 21.7955C20.2643 21.5845 20.3828 21.2984 20.3828 21V14.25C20.3828 13.9516 20.2643 13.6655 20.0533 13.4545C19.8423 13.2435 19.5562 13.125 19.2578 13.125ZM19.6328 14.25V17.625H8.38281V14.25C8.38281 14.1505 8.42232 14.0552 8.49265 13.9848C8.56297 13.9145 8.65836 13.875 8.75781 13.875H16.6328V14.4697L15.9927 15.1099C15.9224 15.1802 15.8828 15.2756 15.8828 15.375V16.5C15.8828 16.5995 15.9223 16.6948 15.9926 16.7652C16.063 16.8355 16.1584 16.875 16.2578 16.875H17.7578C17.8573 16.875 17.9527 16.8355 18.023 16.7652C18.0933 16.6948 18.1328 16.5995 18.1328 16.5V15.375C18.1328 15.2756 18.0933 15.1802 18.0229 15.1099L17.3828 14.4697V13.875H19.2578C19.3573 13.875 19.4527 13.9145 19.523 13.9848C19.5933 14.0552 19.6328 14.1505 19.6328 14.25ZM8.38281 18.375H19.6328V19.125H8.38281V18.375ZM10.2578 12.75V13.125H9.50781V12.75H10.2578ZM17.3828 15.5303V16.125H16.6328V15.5303L17.0078 15.1553L17.3828 15.5303ZM17.7578 12.75H18.5078V13.125H17.7578V12.75ZM15.8828 12V13.125H12.1328V12C12.1328 11.9005 12.1723 11.8052 12.2426 11.7348C12.313 11.6645 12.4084 11.625 12.5078 11.625H15.5078C15.6073 11.625 15.7027 11.6645 15.773 11.7348C15.8433 11.8052 15.8828 11.9005 15.8828 12ZM3.50781 1.5C3.50781 1.40054 3.54732 1.30516 3.61765 1.23483C3.68797 1.16451 3.78336 1.125 3.88281 1.125H9.88281C9.98227 1.125 10.0777 1.16451 10.148 1.23483C10.2183 1.30516 10.2578 1.40054 10.2578 1.5V4.125H9.50781V2.25C9.50781 2.15054 9.4683 2.05516 9.39798 1.98484C9.32765 1.91451 9.23227 1.875 9.13281 1.875H4.63281C4.53336 1.875 4.43797 1.91451 4.36765 1.98484C4.29732 2.05516 4.25781 2.15054 4.25781 2.25V4.125H3.50781V1.5ZM4.25781 4.875H4.63281C4.73227 4.875 4.82765 4.83549 4.89798 4.76516C4.9683 4.69484 5.00781 4.59946 5.00781 4.5V2.625H8.75781V4.5C8.75781 4.59946 8.79732 4.69484 8.86765 4.76516C8.93797 4.83549 9.03336 4.875 9.13281 4.875H9.50781V7.875H4.25781V4.875ZM1.63281 20.25V9.75C1.63281 9.45163 1.75134 9.16548 1.96232 8.9545C2.1733 8.74353 2.45944 8.625 2.75781 8.625H11.0078C11.3062 8.625 11.5923 8.74353 11.8033 8.9545C12.0143 9.16548 12.1328 9.45163 12.1328 9.75V10.944C11.9142 11.0213 11.7248 11.1642 11.5906 11.3532C11.4563 11.5423 11.3838 11.7682 11.3828 12V13.125H11.0078V12.375C11.0078 12.2755 10.9683 12.1802 10.898 12.1098C10.8277 12.0395 10.7323 12 10.6328 12V10.125H9.88281V12H9.13281C9.03336 12 8.93797 12.0395 8.86765 12.1098C8.79732 12.1802 8.75781 12.2755 8.75781 12.375V13.125C8.45944 13.125 8.1733 13.2435 7.96232 13.4545C7.75134 13.6655 7.63281 13.9516 7.63281 14.25V21C7.63406 21.128 7.6574 21.2549 7.70181 21.375H2.75781C2.45944 21.375 2.1733 21.2565 1.96232 21.0455C1.75134 20.8345 1.63281 20.5484 1.63281 20.25ZM4.25781 22.5C4.25781 22.5742 4.23582 22.6467 4.19461 22.7083C4.15341 22.77 4.09484 22.8181 4.02632 22.8465C3.9578 22.8748 3.8824 22.8823 3.80965 22.8678C3.73691 22.8533 3.67009 22.8176 3.61765 22.7652C3.5652 22.7127 3.52949 22.6459 3.51502 22.5732C3.50055 22.5004 3.50797 22.425 3.53636 22.3565C3.56474 22.288 3.61281 22.2294 3.67447 22.1882C3.73614 22.147 3.80864 22.125 3.88281 22.125C3.98227 22.125 4.07765 22.1645 4.14798 22.2348C4.2183 22.3052 4.25781 22.4005 4.25781 22.5ZM11.0078 22.875H9.50781V22.125H11.0078V22.875ZM18.5078 22.875H17.0078V22.125H18.5078V22.875ZM19.2578 21.375H8.75781C8.65836 21.375 8.56297 21.3355 8.49265 21.2652C8.42232 21.1948 8.38281 21.0995 8.38281 21V19.875H19.6328V21C19.6328 21.0995 19.5933 21.1948 19.523 21.2652C19.4527 21.3355 19.3573 21.375 19.2578 21.375Z"
                        fill="#69696A"
                      />
                    </svg>
                    <h4 className="ml-2">1 large bag + 1 small bag </h4>{" "}
                  </span>
                </div>
              </div>
            </div>

      
          </div>

          <hr className="color-black mb-5 w-full"></hr>

          <div className="mb-4  flex  w-[98%] items-center justify-between ">

            <div className="">
              <img src={data?.company_logo} className="h-[40px] w-[70px]" />
            </div>
            
         
            <div className=" ">
              <div className="flex flex-col">
                <h3 className="text-[20px] font-[500] text-[black]">
                  LE <span className="ml-2">{data?.price}</span>{" "}
                </h3>
                <span>{t(`${dropOffLocationType}`)}</span>
              </div>
            </div>

          </div>
            <div className=" container text-[#FFB229] ">
              <h3>
                {t("Free cancellation up to 3 hours before your pick-up")}
              </h3>
            </div>

        </div>

        <div className=" container mb-5 mt-5 flex h-auto w-full flex-col rounded-lg bg-white pb-5">
          <div className="mr-auto mt-5 w-full rtl:ml-auto">
            <span className=" text-[24px] font-[500] text-[#1D4179]">
              {t("Outbound trip details")}
            </span>
          </div>

          <div className="w-fll mt-10 flex flex-col">
            <span className="mr-auto w-full text-[16px] font-[400] text-[#1E1E1E] rtl:ml-auto">
              {t("Pick Up Information")}
            </span>

            <div className={`mt-3 flex w-full items-center justify-between ${Styled.Date_and_Time_minScreen}`} >
              <div className=" mr-auto flex w-[45%] flex-col rounded-[4px] rtl:ml-auto">
                <span className=" text-[12px] font-[400] text-[#69696A]">
                  {t("Confirm Pickup Date")}
                </span>

                <div className={`flex h-[40px] items-center justify-between border-[1px] border-[#E8ECF2] ${Styled.date_container}`}>
                  <div
                    className={` relative  flex  sm:pt-0 ${className} ${
                      !!focusedInput
                        ? "nc-date-focusedInput"
                        : "nc-date-not-focusedInput"
                    }   } max-sm:w-full   `}
                  >
                    <div className={` absolute   inset-0 flex  ${Styled.date_container} `}>
                      <DateRangePicker
                        disabled={true}
                        startDate={stateDate?.startDate}
                        endDate={stateDate?.endDate}
                        focusedInput={focusedInput}
                        onDatesChange={(date) => {
                          setStateDate(date);
                          onChange && onChange({ stateDate: date });
                        }}
                        onFocusChange={handleDateFocusChange}
                        startDateId={startDateId}
                        endDateId={endDateId}
                        daySize={windowSize.width > 1279 ? 54 : 44}
                        orientation={"horizontal"}
                        showClearDates
                        noBorder
                        hideKeyboardShortcutsPanel
                        numberOfMonths={
                          numberOfMonths ||
                          (windowSize.width < 1024 ? 1 : undefined)
                        }
                        anchorDirection={anchorDirection}
                        renderMonthElement={({ month }) =>
                          moment(month)
                            .locale(i18n.language)
                            .format("MMMM YYYY")
                        }
                        reopenPickerOnClearDates
                        isRTL={i18n.language === "ar" ? true : false}
                      />
                    </div>

                    {renderInputpickUpDate()}
                    {/* {renderInputdropOffDate()} */}
                  </div>
                </div>
              </div>
              <div className="w-[10%]"></div>
              <div className="ml-auto flex w-[45%] flex-col rtl:mr-auto ">
                <span className=" text-[12px] font-[400] text-[#69696A] ">
                  {t("Confirm Pickup Time")}
                </span>
                <input
                  onChange={handelTimeChange}
                  min="00:00"
                  max="23:59"
                  step="60"
                  type="time"
                  className="rounded-[4px] text-[#B9C4D5]  focus:border-[0px] focus:border-white after:focus:outline-none "
                />
              </div>
            </div>

            <div className="mt-10 text-[16px] font-[400] text-[#1E1E1E]">
              {" "}
              {t("Address in")} {t(`${data?.from_location?.name}`)}{" "}
            </div>
            <div className="flex flex-col ">
              <div className=" w-full rounded-[4px] ">
                <span className="text-[12px] font-[400] text-[#69696A]">
                  {t("Address from")}
                </span>

                <div
                  className={`relative  flex cursor-pointer items-center justify-start border-[1px] border-[#E8ECF2] `}
                  onClick={PopAddressfrom}
                >
                  <div className=" flex items-center  justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5C9 9.70435 9.31607 8.94129 9.87868 8.37868C10.4413 7.81607 11.2044 7.5 12 7.5C12.7956 7.5 13.5587 7.81607 14.1213 8.37868C14.6839 8.94129 15 9.70435 15 10.5Z"
                        stroke="#B9C4D5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.5 10.5C19.5 17.642 12 21.75 12 21.75C12 21.75 4.5 17.642 4.5 10.5C4.5 8.51088 5.29018 6.60322 6.6967 5.1967C8.10322 3.79018 10.0109 3 12 3C13.9891 3 15.8968 3.79018 17.3033 5.1967C18.7098 6.60322 19.5 8.51088 19.5 10.5Z"
                        stroke="#B9C4D5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className=" text-[12px] font-[400] text-[#B9C4D5]">
                      {t("address")}
                    </span>
                  </div>

                  <div
                    className={`ml-5 flex h-[40px] items-center  justify-start  `}
                  >
                    <span className="text-[14px] font-[400] text-[#1E1E1E]">
                      {AddressFromOne?.name}
                    </span>
                  </div>
                  <div
                    className={` ${
                      enablefrom ? Styled.pop_container : Styled.popHide
                    } `}
                  >
                    <div className="container mt-3 w-full ">
                      {addressapifrom?.map((item: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`container mt-2 flex h-[40px] w-full cursor-pointer items-center justify-start  ${Styled.itemAddress}`}
                            onClick={() => handlesetfromaddress(item)}
                          >
                            <span className="text-[16px] text-[#1E1E1E]">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className=" mb-5 mt-3 flex w-full cursor-pointer items-center justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 3C8.27614 3 8.5 3.22386 8.5 3.5V7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H8.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V8.5H3.5C3.22386 8.5 3 8.27614 3 8C3 7.72386 3.22386 7.5 3.5 7.5H7.5V3.5C7.5 3.22386 7.72386 3 8 3Z"
                      fill="#1D4179"
                    />
                  </svg>
                  <span
                    className="text-[14px] font-[400] text-[#1D4179]"
                    onClick={toggleModal}
                  >
                    {" "}
                    {t("add address")}{" "}
                  </span>
                </div>
              </div>

              <div className=" w-full rounded-[4px] ">
                <span className="text-[12px] font-[400] text-[#69696A]">
                  {t("address")} {t("to")}
                </span>

                <div
                  className={`relative flex items-center justify-start border-[1px] border-[#E8ECF2] ${Styled.pushup}`}
                >
                  <div className="flex items-center  justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5C9 9.70435 9.31607 8.94129 9.87868 8.37868C10.4413 7.81607 11.2044 7.5 12 7.5C12.7956 7.5 13.5587 7.81607 14.1213 8.37868C14.6839 8.94129 15 9.70435 15 10.5Z"
                        stroke="#B9C4D5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.5 10.5C19.5 17.642 12 21.75 12 21.75C12 21.75 4.5 17.642 4.5 10.5C4.5 8.51088 5.29018 6.60322 6.6967 5.1967C8.10322 3.79018 10.0109 3 12 3C13.9891 3 15.8968 3.79018 17.3033 5.1967C18.7098 6.60322 19.5 8.51088 19.5 10.5Z"
                        stroke="#B9C4D5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <span className=" text-[12px] font-[400] text-[#B9C4D5]">
                      {t("address")}
                    </span>
                  </div>

                  <div
                    className=" ml-5 flex h-[40px] w-full cursor-pointer   items-center justify-start"
                    onClick={PopAddressto}
                  >
                    {AddressToOne?.name}
                  </div>
                  <div
                    className={` ${
                      enableto ? Styled.pop_container_to : Styled.popHide_to
                    } `}
                  >
                    <div className="container mt-3 w-full ">
                      {addressapito?.map((itemTo: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`container mt-2 flex h-[40px] w-full cursor-pointer items-center justify-start  ${Styled.itemAddress_to}`}
                            onClick={() => handlesettoaddress(itemTo)}
                          >
                            <span className="text-[16px] text-[#1E1E1E]">
                              {itemTo.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="z-0  mt-3 flex w-full cursor-pointer items-center justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 3C8.27614 3 8.5 3.22386 8.5 3.5V7.5H12.5C12.7761 7.5 13 7.72386 13 8C13 8.27614 12.7761 8.5 12.5 8.5H8.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V8.5H3.5C3.22386 8.5 3 8.27614 3 8C3 7.72386 3.22386 7.5 3.5 7.5H7.5V3.5C7.5 3.22386 7.72386 3 8 3Z"
                      fill="#1D4179"
                    />
                  </svg>
                  <span
                    className="text-[14px] font-[400] text-[#1D4179]"
                    onClick={toggleModal}
                  >
                    {" "}
                    {t("add address")}{" "}
                  </span>
                </div>

                <div className="flex w-full items-center justify-end ">
                  <button
                    className="mr-10 flex cursor-pointer items-center justify-center
                      rounded-lg bg-[#1D4179] pb-[1%] pl-[5%] pr-[5%] pt-[1%] text-[16px] font-[500] text-white "
                    onClick={GoToSummary}
                  >
                    {t("Summary")}
                  </button>
                </div>
                {/* <a className=" flex justify-center items-center mr-10 pl-[5%]
              cursor-pointer pr-[5%] bg-[#1D4179] text-white text-[16px] font-[500] pt-[1%] pb-[1%] rounded-lg"
              href={`/private-trip/twoRound/${trip_Id}${AddressFromOne}${AddressToOne}${StartDate}${time}`}
             > Next </a> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };


    return (
      <>
        <Headprivatetrip
          fromhead_en={fromhead_en}
          tohead_en={tohead_en}
          fromhead_ar={fromhead_ar}
          tohead_ar={tohead_ar}
          seats_number={data?.bus?.seats_number}
        />
  {loading && 

( <div className="my-4 flex  w-full justify-center">
   <svg
     className="-ml-1 mr-3 h-20 w-20 animate-spin"
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
   >
     <circle
       className="opacity-25"
       cx="12"
       cy="12"
       r="10"
       stroke="currentColor"
       strokeWidth="3"
     ></circle>
     <path
       className="opacity-75"
       fill="currentColor"
       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
     ></path>
   </svg>
 </div>)
 
 }
        <div className="container m-auto mb-5 mt-10 flex w-full flex-col">
          {screenSize.width >= 600 ? Large_Screen_display() : Min_Midum_Screen()}
        </div>
      </>
    );
  
};
