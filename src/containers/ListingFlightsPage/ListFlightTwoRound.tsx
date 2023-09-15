import { getFlightsTrips, getFlightsTripsSession } from 'api';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showApiErrorMessages } from 'utils';
import Styled from './flight.module.css'
const ListFlightTwoRound = () => {

    const { t } = useTranslation();
	const [page, setPage] = useState<number>(1);
  
	const [loading, setLoading] = useState<boolean>(false);
	const [trips, setTrips] = useState<any>([]);
	const [sessionToken, setSessionToken] = useState<string>("");
	const location = useLocation();
	const [paginationStatus, setPaginationStatus] = useState<boolean>(true);
  const flightClassState:any = window.localStorage.getItem("flightClassState")

  function getMinimumPrice(objArray: Array<any>): number {
    if (objArray.length === 0) {
      return 0; // Return 0 or handle the empty array case as per your requirement
    }
  
    let minPrice = Number.MAX_VALUE;
  
    for (let i = 0; i < objArray.length; i++) {
      const obj = objArray[i];
      const price = parseFloat(obj.origin_price);
  
      if (!isNaN(price) && price < minPrice) {
        minPrice = price;
      }
    }
  
    return minPrice;
  }
  console.log("one trip ",trips[0])
  const getFlightsTripsData = async (localData: any) => {
        
		setLoading(true);
		if (!!localData) {
			
			const body: any = {
				cabinClass: localData?.cabinClass,
				round: localData?.round,
				origin: localData?.origin,
				destination: localData?.destination,
				departureDateTime: localData?.departureDateTime,
				adults: localData?.adults,
				childrenAges: [],
				filter_by: "cheapest",
				filter_dir: "desc",
			};
			if (localData?.round === 2)
				body["arrivalDateTime"] = localData?.arrivalDateTime;
			await getFlightsTrips(body)
				.then((res: any) => {
					setTrips([]);
					if (!!res?.data?.sessionToken) {
						setSessionToken(res?.data?.sessionToken ?? "");
					}
				})
				.catch((errors: any) => {
					if (Object.keys(errors.response.data.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(errors.response.data.errors);
					} else {
						setLoading(false);
						toast.error(errors.response.data.message);
					}
				});
		}
	};

	const getTripsSessionToken = async () => {
		if (!!sessionToken) {
			await getFlightsTripsSession(page, sessionToken)
				.then((res: any) => {
					if (!!res?.data?.data?.length) {
						setTrips((prev: any) => [...prev, ...res?.data?.data]);
					} else if (page > 1) {
						setPaginationStatus(false);
					}
					setLoading(false);
				})
				.catch((errors: any) => {
					if (Object.keys(errors.response.data.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(errors.response.data.errors);
					} else {
						setLoading(false);
						toast.error(errors.response.data.message);
					}
				});
		}
	};

	useEffect(() => {
		if (!!sessionToken) {
			getTripsSessionToken();
		}
	}, [sessionToken, page]);
	useEffect(() => {
		const localStorageData: any = sessionStorage.getItem("flightData");
		let searchData = {};
		if (!!localStorageData) searchData = JSON.parse(localStorageData ?? "{}");
		setPage(1);
		if (!!searchData) {
			getFlightsTripsData(searchData);
		}
	}, [sessionStorage.getItem("flightData"), location]);

  const navigate = useNavigate()

  function handleoffers  (item: any)  {
   window.localStorage.setItem("flight_item" , item)
   navigate('/listing-flights-twoRound-offers')
   } 

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
  
 const Max_Screen = () => {
  return (
   <>
   <div></div>
    <div className='container w-full h-auto mt-5 flex justify-between items-start'>
     
     <div className='w-[100%] '>
        {trips?.map((item : any , index: number) => {
        return (
         <div className='container flex flex-col h-auto bg-white mt-2 mb-2 rounded-[10px]' key={index}>
 
             <div className='flex justify-start w-full mt-3 text-[#1E1E1E] text-[16px] font-[400]'>
               <span className='mr-1'>{t(`${item?.depart_trip?.segments[0]?.originPlace?.name}`)}</span>
               <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
               <path d="M17.25 9L21 12.75M21 12.75L17.25 16.5M21 12.75H3" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
               <span className='mr-1'>{item?.depart_trip?.segments[item?.depart_trip?.segments.length - 1]?.destinationPlace?.name}</span>
               <span className='mr-1'>{item?.depart_trip?.arrivalDateTime}</span>
             </div>
 
               <div className={`w-full flex justify-start ${Styled.container_imageanddate}`}>
               <div className='w-[90%]  h-[100px] flex justify-between items-center  '>
                 <img  src={item?.depart_trip?.carriers[0]?.imageUrl} alt="image here" className={`${Styled.image_comapny}`}/>
 
                 <div className='flex flex-col items-start ml-3'>
                 <span className='text-[#69696A] text-[16px] font-[400]'>{item?.depart_trip?.segments[0]?.originPlace?.iata}</span>
                   <span className='text-[#69696A] text-[12px] font-[400]'>{item?.depart_trip?.segments[0]?.arrivalDateTime?.substring(11)}</span>
                 </div>
 
                 <svg xmlns="http://www.w3.org/2000/svg" width="94" height="2" viewBox="0 0 94 2" fill="none">
                 <path d="M0 1H93.5" stroke="url(#paint0_linear_2088_1234)" stroke-dasharray="2 2"/>
                 <defs>
                 <linearGradient id="paint0_linear_2088_1234" x1="0" y1="1.5" x2="93.5" y2="1.5" gradientUnits="userSpaceOnUse">
                 <stop stop-color="#D4CFBF"/>
                 <stop offset="1" stop-color="#D5CC9F"/>
                 </linearGradient>
                 </defs>
                 </svg>
 
                <div className='relative'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="67" height="51" viewBox="0 0 67 51" fill="none">
                   <path d="M61.9172 50.1567C62.2456 50.3463 62.6663 50.234 62.8491 49.9018C65.5703 44.9571 67 39.4014 67 33.75C67 27.8695 65.4521 22.0926 62.5118 17C59.5716 11.9074 55.3426 7.67839 50.25 4.73815C45.1574 1.79791 39.3805 0.249999 33.5 0.25C27.6195 0.250001 21.8426 1.79791 16.75 4.73815C11.6574 7.67839 7.42838 11.9074 4.48815 17C1.54791 22.0926 -1.12747e-06 27.8695 0 33.75C1.08355e-06 39.4014 1.42967 44.9571 4.1509 49.9018C4.33375 50.234 4.7544 50.3463 5.08283 50.1567C5.41127 49.967 5.52309 49.5474 5.34053 49.215C2.73967 44.4792 1.37336 39.1603 1.37336 33.75C1.37336 28.1106 2.85781 22.5706 5.67751 17.6867C8.49721 12.8028 12.5528 8.74722 17.4367 5.92752C22.3205 3.10781 27.8606 1.62336 33.5 1.62336C39.1394 1.62336 44.6795 3.10781 49.5633 5.92751C54.4472 8.74721 58.5028 12.8028 61.3225 17.6867C64.1422 22.5705 65.6266 28.1106 65.6266 33.75C65.6266 39.1603 64.2603 44.4792 61.6595 49.215C61.4769 49.5474 61.5887 49.967 61.9172 50.1567Z" fill="#FDB129"/>
                   </svg>
                   <svg className='absolute top-[48%] left-[32%]' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                   <path d="M24.2806 1.28192C24.026 1.02664 23.7177 0.831252 23.3782 0.709931C23.0387 0.58861 22.6764 0.544401 22.3177 0.580511C21.0249 0.705816 19.8163 1.27776 18.8996 2.19793L14.8011 6.29645L4.20676 3.96715C3.89324 3.8993 3.56767 3.91169 3.26022 4.0032C2.95277 4.0947 2.6734 4.26234 2.44801 4.49059L1.20746 5.7259C1.05015 5.88095 0.932142 6.07133 0.863254 6.28119C0.794367 6.49105 0.776592 6.71433 0.811409 6.93245C0.846225 7.15057 0.932627 7.35722 1.06343 7.53521C1.19422 7.71319 1.36563 7.85737 1.5634 7.95575L9.27887 11.8239L6.2691 14.8337L3.09707 15.153C2.81934 15.1835 2.55728 15.2971 2.3452 15.4789C2.13312 15.6608 1.98091 15.9025 1.9085 16.1724C1.83608 16.4422 1.84685 16.7276 1.93938 16.9913C2.03191 17.2549 2.20189 17.4844 2.42707 17.6498L5.63051 19.9215L7.91269 23.1354C8.07663 23.3642 8.3063 23.5378 8.57119 23.6329C8.83609 23.7281 9.12367 23.7405 9.39574 23.6683C9.66782 23.5962 9.91151 23.443 10.0944 23.2291C10.2774 23.0152 10.3909 22.7506 10.42 22.4707L10.7393 19.2986L13.749 16.2889L17.6068 23.9991C17.7051 24.1954 17.8486 24.3655 18.0254 24.4955C18.2023 24.6255 18.4075 24.7116 18.6241 24.7469C18.8408 24.7822 19.0627 24.7655 19.2717 24.6983C19.4806 24.6311 19.6707 24.5152 19.8261 24.3603L21.0771 23.1354C21.3058 22.9103 21.4737 22.631 21.5653 22.3234C21.6568 22.0159 21.6689 21.6902 21.6006 21.3767L19.2765 10.7614L23.3646 6.66286C24.2847 5.74623 24.8567 4.53756 24.982 3.24481C25.0185 2.88605 24.9744 2.52368 24.8531 2.1841C24.7318 1.84452 24.5362 1.53631 24.2806 1.28192ZM22.2654 5.54793L18.0779 9.73543C17.9121 9.89906 17.7906 10.1021 17.7247 10.3254C17.6588 10.5488 17.6506 10.7852 17.701 11.0126L20.0407 21.7064C20.0539 21.762 20.0527 21.8201 20.0371 21.875C20.0215 21.93 19.9921 21.9801 19.9518 22.0205L18.9049 23.0674L15.0367 15.3519C14.9386 15.1558 14.7955 14.9857 14.619 14.8555C14.4424 14.7254 14.2376 14.639 14.0212 14.6034C13.9481 14.5973 13.8745 14.5973 13.8014 14.6034C13.4339 14.6045 13.0819 14.7513 12.8225 15.0117L9.5877 18.2465C9.36187 18.4732 9.22133 18.7709 9.18988 19.0893L8.91246 21.8373L6.90769 19.0055C6.81679 18.8796 6.70531 18.7699 6.57793 18.681L3.75137 16.6762L6.49941 16.3988C6.8178 16.3673 7.11552 16.2268 7.34215 16.001L10.577 12.7661C10.7319 12.6107 10.8478 12.4206 10.915 12.2117C10.9822 12.0027 10.9989 11.7808 10.9636 11.5641C10.9284 11.3475 10.8422 11.1423 10.7122 10.9654C10.5822 10.7886 10.4121 10.6451 10.2158 10.5468L2.49512 6.65762L3.54199 5.61075C3.58295 5.57118 3.63306 5.54235 3.68785 5.52682C3.74264 5.5113 3.80043 5.50956 3.85605 5.52176L14.5499 7.86153C14.7768 7.91253 15.013 7.90519 15.2363 7.8402C15.4597 7.77521 15.6629 7.65469 15.8271 7.48989L20.0146 3.30239C20.6776 2.63986 21.5518 2.23056 22.4852 2.14559C22.6111 2.13437 22.7378 2.1509 22.8566 2.19402C22.9754 2.23714 23.0832 2.30579 23.1726 2.39514C23.2619 2.48449 23.3306 2.59235 23.3737 2.71113C23.4168 2.8299 23.4334 2.95668 23.4221 3.08254C23.3358 4.01667 22.9246 4.89092 22.2601 5.55317L22.2654 5.54793Z" fill="#593E0E"/>
                   </svg>
                   <div className='absolute top-[100%] left-[0%] flex flex-col items-center'>
                   <span className='text-[#69696A] text-[12px] font-[400]'>{item?.depart_trip?.segments[0]?.durationInMinutes} min</span> 
                   <svg xmlns="http://www.w3.org/2000/svg" width="65" height="10" viewBox="0 0 65 10" fill="none">
                   <path d="M60 1.25L63.75 5M63.75 5L60 8.75M63.75 5H1.25H45.75" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                   <span className='text-[#69696A] text-[12px] font-[400]' >{item?.depart_trip?.segments?.length} stop</span>
                   </div>
                </div>
 
                <svg xmlns="http://www.w3.org/2000/svg" width="94" height="2" viewBox="0 0 94 2" fill="none">
                 <path d="M0 1H93.5" stroke="url(#paint0_linear_2088_1234)" stroke-dasharray="2 2"/>
                 <defs>
                 <linearGradient id="paint0_linear_2088_1234" x1="0" y1="1.5" x2="93.5" y2="1.5" gradientUnits="userSpaceOnUse">
                 <stop stop-color="#D4CFBF"/>
                 <stop offset="1" stop-color="#D5CC9F"/>
                 </linearGradient>
                 </defs>
                 </svg>
 
                 <div className='flex flex-col items-start '>
                   <span className='text-[#69696A] text-[16px] font-[400]'>{item?.depart_trip?.segments[0]?.destinationPlace?.iata}</span>
                   <span className='text-[#69696A] text-[12px] font-[400]'>{item?.depart_trip?.segments[0]?.departureDateTime?.substring(11)}</span>
                 </div>
 
                 <div className='flex justify-center ml-2'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='rtl:ml-3'>
                 <path d="M13.6086 4.05245V1.00659H6.39141V4.05241H0V18.9934H20V4.05241L13.6086 4.05245ZM7.56328 2.17847H12.4367V4.05241H7.56328V2.17847ZM3.53895 17.8215H1.17188V5.22425H3.53895V17.8215ZM15.2892 17.8215H4.71082V5.22425H15.2892V17.8215ZM18.8281 17.8215H16.4611V5.22425H18.8281V17.8215Z" fill="#69696A"/>
                 </svg>
                 <div className='flex flex-col items-start text-[#69696A] text-[12px] font-[400]'>
                   <span className='ml-2'>Baggage included:</span>
                   <span>1x 23kg</span>
                 </div>
                 </div>
               </div>
             </div>
             <hr className='mt-[40px]'></hr>
 
             <div className='flex justify-start w-full mt-3 text-[#1E1E1E] text-[16px] font-[400]'>
               <span className='mr-1'>{item?.return_trip?.segments[0]?.originPlace?.name}</span>
               <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
               <path d="M17.25 9L21 12.75M21 12.75L17.25 16.5M21 12.75H3" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
               <span className='mr-1'>{item?.return_trip?.segments[item?.return_trip?.segments.length - 1]?.destinationPlace?.name}</span>
               <span className='mr-1'>{item?.return_trip?.arrivalDateTime}</span>
             </div>
 
               <div className='w-full flex justify-start'>
               <div className='w-[90%]  h-[100px] flex justify-between items-center  '>
                 <img  src={item?.return_trip?.carriers[0]?.imageUrl} alt="image here " />
 
                 <div className='flex flex-col items-start ml-3'>
                 <span className='text-[#69696A] text-[16px] font-[400]'>{item?.return_trip?.segments[0]?.originPlace?.iata}</span>
                   <span className='text-[#69696A] text-[12px] font-[400]'>{item?.return_trip?.segments[0]?.arrivalDateTime?.substring(11)}</span>
                 </div>
 
                 <svg xmlns="http://www.w3.org/2000/svg" width="94" height="2" viewBox="0 0 94 2" fill="none">
                 <path d="M0 1H93.5" stroke="url(#paint0_linear_2088_1234)" stroke-dasharray="2 2"/>
                 <defs>
                 <linearGradient id="paint0_linear_2088_1234" x1="0" y1="1.5" x2="93.5" y2="1.5" gradientUnits="userSpaceOnUse">
                 <stop stop-color="#D4CFBF"/>
                 <stop offset="1" stop-color="#D5CC9F"/>
                 </linearGradient>
                 </defs>
                 </svg>
 
                <div className='relative'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="67" height="51" viewBox="0 0 67 51" fill="none">
                   <path d="M61.9172 50.1567C62.2456 50.3463 62.6663 50.234 62.8491 49.9018C65.5703 44.9571 67 39.4014 67 33.75C67 27.8695 65.4521 22.0926 62.5118 17C59.5716 11.9074 55.3426 7.67839 50.25 4.73815C45.1574 1.79791 39.3805 0.249999 33.5 0.25C27.6195 0.250001 21.8426 1.79791 16.75 4.73815C11.6574 7.67839 7.42838 11.9074 4.48815 17C1.54791 22.0926 -1.12747e-06 27.8695 0 33.75C1.08355e-06 39.4014 1.42967 44.9571 4.1509 49.9018C4.33375 50.234 4.7544 50.3463 5.08283 50.1567C5.41127 49.967 5.52309 49.5474 5.34053 49.215C2.73967 44.4792 1.37336 39.1603 1.37336 33.75C1.37336 28.1106 2.85781 22.5706 5.67751 17.6867C8.49721 12.8028 12.5528 8.74722 17.4367 5.92752C22.3205 3.10781 27.8606 1.62336 33.5 1.62336C39.1394 1.62336 44.6795 3.10781 49.5633 5.92751C54.4472 8.74721 58.5028 12.8028 61.3225 17.6867C64.1422 22.5705 65.6266 28.1106 65.6266 33.75C65.6266 39.1603 64.2603 44.4792 61.6595 49.215C61.4769 49.5474 61.5887 49.967 61.9172 50.1567Z" fill="#FDB129"/>
                   </svg>
                   <svg className='absolute top-[48%] left-[32%]' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                   <path d="M24.2806 1.28192C24.026 1.02664 23.7177 0.831252 23.3782 0.709931C23.0387 0.58861 22.6764 0.544401 22.3177 0.580511C21.0249 0.705816 19.8163 1.27776 18.8996 2.19793L14.8011 6.29645L4.20676 3.96715C3.89324 3.8993 3.56767 3.91169 3.26022 4.0032C2.95277 4.0947 2.6734 4.26234 2.44801 4.49059L1.20746 5.7259C1.05015 5.88095 0.932142 6.07133 0.863254 6.28119C0.794367 6.49105 0.776592 6.71433 0.811409 6.93245C0.846225 7.15057 0.932627 7.35722 1.06343 7.53521C1.19422 7.71319 1.36563 7.85737 1.5634 7.95575L9.27887 11.8239L6.2691 14.8337L3.09707 15.153C2.81934 15.1835 2.55728 15.2971 2.3452 15.4789C2.13312 15.6608 1.98091 15.9025 1.9085 16.1724C1.83608 16.4422 1.84685 16.7276 1.93938 16.9913C2.03191 17.2549 2.20189 17.4844 2.42707 17.6498L5.63051 19.9215L7.91269 23.1354C8.07663 23.3642 8.3063 23.5378 8.57119 23.6329C8.83609 23.7281 9.12367 23.7405 9.39574 23.6683C9.66782 23.5962 9.91151 23.443 10.0944 23.2291C10.2774 23.0152 10.3909 22.7506 10.42 22.4707L10.7393 19.2986L13.749 16.2889L17.6068 23.9991C17.7051 24.1954 17.8486 24.3655 18.0254 24.4955C18.2023 24.6255 18.4075 24.7116 18.6241 24.7469C18.8408 24.7822 19.0627 24.7655 19.2717 24.6983C19.4806 24.6311 19.6707 24.5152 19.8261 24.3603L21.0771 23.1354C21.3058 22.9103 21.4737 22.631 21.5653 22.3234C21.6568 22.0159 21.6689 21.6902 21.6006 21.3767L19.2765 10.7614L23.3646 6.66286C24.2847 5.74623 24.8567 4.53756 24.982 3.24481C25.0185 2.88605 24.9744 2.52368 24.8531 2.1841C24.7318 1.84452 24.5362 1.53631 24.2806 1.28192ZM22.2654 5.54793L18.0779 9.73543C17.9121 9.89906 17.7906 10.1021 17.7247 10.3254C17.6588 10.5488 17.6506 10.7852 17.701 11.0126L20.0407 21.7064C20.0539 21.762 20.0527 21.8201 20.0371 21.875C20.0215 21.93 19.9921 21.9801 19.9518 22.0205L18.9049 23.0674L15.0367 15.3519C14.9386 15.1558 14.7955 14.9857 14.619 14.8555C14.4424 14.7254 14.2376 14.639 14.0212 14.6034C13.9481 14.5973 13.8745 14.5973 13.8014 14.6034C13.4339 14.6045 13.0819 14.7513 12.8225 15.0117L9.5877 18.2465C9.36187 18.4732 9.22133 18.7709 9.18988 19.0893L8.91246 21.8373L6.90769 19.0055C6.81679 18.8796 6.70531 18.7699 6.57793 18.681L3.75137 16.6762L6.49941 16.3988C6.8178 16.3673 7.11552 16.2268 7.34215 16.001L10.577 12.7661C10.7319 12.6107 10.8478 12.4206 10.915 12.2117C10.9822 12.0027 10.9989 11.7808 10.9636 11.5641C10.9284 11.3475 10.8422 11.1423 10.7122 10.9654C10.5822 10.7886 10.4121 10.6451 10.2158 10.5468L2.49512 6.65762L3.54199 5.61075C3.58295 5.57118 3.63306 5.54235 3.68785 5.52682C3.74264 5.5113 3.80043 5.50956 3.85605 5.52176L14.5499 7.86153C14.7768 7.91253 15.013 7.90519 15.2363 7.8402C15.4597 7.77521 15.6629 7.65469 15.8271 7.48989L20.0146 3.30239C20.6776 2.63986 21.5518 2.23056 22.4852 2.14559C22.6111 2.13437 22.7378 2.1509 22.8566 2.19402C22.9754 2.23714 23.0832 2.30579 23.1726 2.39514C23.2619 2.48449 23.3306 2.59235 23.3737 2.71113C23.4168 2.8299 23.4334 2.95668 23.4221 3.08254C23.3358 4.01667 22.9246 4.89092 22.2601 5.55317L22.2654 5.54793Z" fill="#593E0E"/>
                   </svg>
                   <div className='absolute top-[100%] left-[0%] flex flex-col items-center'>
                   <span className='text-[#69696A] text-[12px] font-[400]'>{item?.return_trip?.segments[0]?.durationInMinutes} min</span> 
                   <svg xmlns="http://www.w3.org/2000/svg" width="65" height="10" viewBox="0 0 65 10" fill="none">
                   <path d="M60 1.25L63.75 5M63.75 5L60 8.75M63.75 5H1.25H45.75" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                   <span className='text-[#69696A] text-[12px] font-[400]' >{item?.return_trip?.segments?.length} stop</span>
                   </div>
                </div>
 
                <svg xmlns="http://www.w3.org/2000/svg" width="94" height="2" viewBox="0 0 94 2" fill="none">
                 <path d="M0 1H93.5" stroke="url(#paint0_linear_2088_1234)" stroke-dasharray="2 2"/>
                 <defs>
                 <linearGradient id="paint0_linear_2088_1234" x1="0" y1="1.5" x2="93.5" y2="1.5" gradientUnits="userSpaceOnUse">
                 <stop stop-color="#D4CFBF"/>
                 <stop offset="1" stop-color="#D5CC9F"/>
                 </linearGradient>
                 </defs>
                 </svg>
 
                 <div className='flex flex-col items-start '>
                   <span className='text-[#69696A] text-[16px] font-[400]'>{item?.return_trip?.segments[0]?.destinationPlace?.iata}</span>
                   <span className='text-[#69696A] text-[12px] font-[400]'>{item?.return_trip?.segments[0]?.departureDateTime?.substring(11)}</span>
                 </div>
 
                 <div className='flex justify-center ml-2'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='rtl:ml-3'>
                 <path d="M13.6086 4.05245V1.00659H6.39141V4.05241H0V18.9934H20V4.05241L13.6086 4.05245ZM7.56328 2.17847H12.4367V4.05241H7.56328V2.17847ZM3.53895 17.8215H1.17188V5.22425H3.53895V17.8215ZM15.2892 17.8215H4.71082V5.22425H15.2892V17.8215ZM18.8281 17.8215H16.4611V5.22425H18.8281V17.8215Z" fill="#69696A"/>
                 </svg>
                 <div className='flex flex-col items-start text-[#69696A] text-[12px] font-[400]'>
                   <span className='ml-2'>Baggage included:</span>
                   <span>1x 23kg</span>
                 </div>
                 </div>
               </div>
             </div>
 
 
             <div className='flex justify-between w-full items-center mt-[32px]'>
               
             {flightClassState === "Business" && <div  className='flex justify-center items-center w-[145px] h-[39px] text-white bg-[#658FA9] rounded-[10px]'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                 <path d="M11.4375 0.812513C11.3159 0.69059 11.1687 0.59727 11.0065 0.539325C10.8444 0.481381 10.6714 0.460266 10.5 0.477513C9.8826 0.53736 9.30532 0.810526 8.86753 1.25001L6.91003 3.20751L1.85003 2.09501C1.70029 2.0626 1.5448 2.06853 1.39796 2.11223C1.25111 2.15593 1.11768 2.236 1.01003 2.34501L0.417534 2.93501C0.342401 3.00907 0.286039 3.09999 0.253137 3.20023C0.220236 3.30046 0.211746 3.4071 0.228375 3.51128C0.245004 3.61545 0.286271 3.71415 0.348741 3.79916C0.411212 3.88417 0.49308 3.95303 0.587534 4.00001L4.27253 5.84751L2.83503 7.28501L1.32003 7.43751C1.18739 7.45205 1.06222 7.50631 0.960932 7.59318C0.85964 7.68005 0.786942 7.79548 0.752357 7.92437C0.717773 8.05325 0.722914 8.18957 0.767107 8.31548C0.811301 8.44139 0.892487 8.55102 1.00003 8.63001L2.53003 9.71501L3.62003 11.25C3.69833 11.3593 3.80803 11.4422 3.93454 11.4876C4.06106 11.5331 4.19841 11.539 4.32836 11.5045C4.4583 11.4701 4.57469 11.3969 4.66207 11.2947C4.74944 11.1926 4.80366 11.0662 4.81753 10.9325L4.97003 9.41751L6.40753 7.98001L8.25003 11.6625C8.29699 11.7562 8.36552 11.8375 8.45 11.8996C8.53447 11.9617 8.63247 12.0028 8.73595 12.0197C8.83942 12.0365 8.94542 12.0286 9.04522 11.9964C9.14502 11.9643 9.23578 11.909 9.31003 11.835L9.90753 11.25C10.0167 11.1425 10.0969 11.0091 10.1407 10.8622C10.1844 10.7153 10.1902 10.5597 10.1575 10.41L9.04753 5.34001L11 3.38251C11.4395 2.94472 11.7127 2.36745 11.7725 1.75001C11.79 1.57867 11.7689 1.40559 11.711 1.24341C11.653 1.08122 11.5596 0.934012 11.4375 0.812513ZM10.475 2.85001L8.47503 4.85001C8.39588 4.92816 8.33785 5.02512 8.30637 5.1318C8.27489 5.23848 8.27099 5.35141 8.29503 5.46001L9.41253 10.5675C9.41883 10.5941 9.41823 10.6218 9.41079 10.648C9.40335 10.6743 9.38932 10.6982 9.37003 10.7175L8.87003 11.2175L7.02253 7.53251C6.97571 7.43883 6.90733 7.35758 6.82303 7.29544C6.73872 7.23329 6.64088 7.19202 6.53753 7.17501C6.50259 7.17211 6.46747 7.17211 6.43253 7.17501C6.25702 7.17552 6.08889 7.24565 5.96503 7.37001L4.42003 8.91501C4.31218 9.02325 4.24505 9.16545 4.23003 9.31751L4.09753 10.63L3.14003 9.27751C3.09662 9.21736 3.04337 9.16496 2.98253 9.12251L1.63253 8.16501L2.94503 8.03251C3.0971 8.01749 3.23929 7.95037 3.34753 7.84251L4.89253 6.29751C4.96654 6.22326 5.02187 6.1325 5.05397 6.0327C5.08607 5.9329 5.09403 5.8269 5.07719 5.72343C5.06035 5.61995 5.0192 5.52195 4.95711 5.43748C4.89502 5.353 4.81377 5.28447 4.72003 5.23751L1.03253 3.38001L1.53253 2.88001C1.5521 2.86111 1.57603 2.84734 1.6022 2.83993C1.62837 2.83251 1.65597 2.83168 1.68253 2.83751L6.79003 3.95501C6.89843 3.97937 7.01122 3.97587 7.1179 3.94483C7.22457 3.91379 7.32163 3.85622 7.40003 3.77751L9.40003 1.77751C9.7167 1.46108 10.1342 1.2656 10.58 1.22501C10.6401 1.21965 10.7007 1.22755 10.7574 1.24814C10.8142 1.26874 10.8657 1.30153 10.9083 1.3442C10.951 1.38688 10.9838 1.43839 11.0044 1.49512C11.025 1.55185 11.0329 1.6124 11.0275 1.67251C10.9863 2.11866 10.7899 2.53622 10.4725 2.85251L10.475 2.85001Z" fill="white"/>
                 </svg>
                 <span className='ml-2'>Business</span>
                 </div> }
 
                 {flightClassState === "Economy" && <div  className='flex justify-center items-center w-[145px] h-[39px] text-black bg-[#E8ECF2] rounded-[10px]'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                 <path d="M11.4375 1.06276C11.3159 0.940834 11.1687 0.847514 11.0065 0.789569C10.8444 0.731625 10.6714 0.71051 10.5 0.727757C9.8826 0.787604 9.30532 1.06077 8.86753 1.50026L6.91003 3.45776L1.85003 2.34526C1.70029 2.31285 1.5448 2.31877 1.39796 2.36247C1.25111 2.40618 1.11768 2.48624 1.01003 2.59526L0.417534 3.18526C0.342401 3.25931 0.286039 3.35024 0.253137 3.45047C0.220236 3.5507 0.211746 3.65734 0.228375 3.76152C0.245004 3.86569 0.286271 3.96439 0.348741 4.0494C0.411212 4.13441 0.49308 4.20327 0.587534 4.25026L4.27253 6.09776L2.83503 7.53526L1.32003 7.68776C1.18739 7.7023 1.06222 7.75655 0.960932 7.84342C0.85964 7.93029 0.786942 8.04573 0.752357 8.17461C0.717773 8.30349 0.722914 8.43981 0.767107 8.56572C0.811301 8.69163 0.892487 8.80126 1.00003 8.88026L2.53003 9.96526L3.62003 11.5003C3.69833 11.6095 3.80803 11.6924 3.93454 11.7379C4.06106 11.7833 4.19841 11.7892 4.32836 11.7548C4.4583 11.7203 4.57469 11.6471 4.66207 11.545C4.74944 11.4428 4.80366 11.3165 4.81753 11.1828L4.97003 9.66776L6.40753 8.23026L8.25003 11.9128C8.29699 12.0065 8.36552 12.0877 8.45 12.1498C8.53447 12.2119 8.63247 12.2531 8.73595 12.2699C8.83942 12.2868 8.94542 12.2788 9.04522 12.2467C9.14502 12.2146 9.23578 12.1593 9.31003 12.0853L9.90753 11.5003C10.0167 11.3927 10.0969 11.2593 10.1407 11.1124C10.1844 10.9656 10.1902 10.81 10.1575 10.6603L9.04753 5.59026L11 3.63276C11.4395 3.19497 11.7127 2.61769 11.7725 2.00026C11.79 1.82891 11.7689 1.65584 11.711 1.49365C11.653 1.33146 11.5596 1.18426 11.4375 1.06276ZM10.475 3.10026L8.47503 5.10026C8.39588 5.17841 8.33785 5.27536 8.30637 5.38204C8.27489 5.48873 8.27099 5.60166 8.29503 5.71026L9.41253 10.8178C9.41883 10.8443 9.41823 10.872 9.41079 10.8983C9.40335 10.9245 9.38932 10.9485 9.37003 10.9678L8.87003 11.4678L7.02253 7.78276C6.97571 7.68907 6.90733 7.60783 6.82303 7.54568C6.73872 7.48354 6.64088 7.44227 6.53753 7.42526C6.50259 7.42236 6.46747 7.42236 6.43253 7.42526C6.25702 7.42577 6.08889 7.4959 5.96503 7.62026L4.42003 9.16526C4.31218 9.2735 4.24505 9.41569 4.23003 9.56776L4.09753 10.8803L3.14003 9.52776C3.09662 9.46761 3.04337 9.41521 2.98253 9.37276L1.63253 8.41526L2.94503 8.28276C3.0971 8.26774 3.23929 8.20061 3.34753 8.09276L4.89253 6.54776C4.96654 6.4735 5.02187 6.38274 5.05397 6.28294C5.08607 6.18314 5.09403 6.07715 5.07719 5.97367C5.06035 5.8702 5.0192 5.77219 4.95711 5.68772C4.89502 5.60325 4.81377 5.53471 4.72003 5.48776L1.03253 3.63026L1.53253 3.13026C1.5521 3.11136 1.57603 3.09759 1.6022 3.09017C1.62837 3.08276 1.65597 3.08193 1.68253 3.08776L6.79003 4.20526C6.89843 4.22961 7.01122 4.22611 7.1179 4.19507C7.22457 4.16403 7.32163 4.10647 7.40003 4.02776L9.40003 2.02776C9.7167 1.71133 10.1342 1.51584 10.58 1.47526C10.6401 1.4699 10.7007 1.47779 10.7574 1.49839C10.8142 1.51898 10.8657 1.55177 10.9083 1.59445C10.951 1.63712 10.9838 1.68864 11.0044 1.74536C11.025 1.80209 11.0329 1.86265 11.0275 1.92276C10.9863 2.36891 10.7899 2.78646 10.4725 3.10276L10.475 3.10026Z" fill="#1E1E1E"/>
                 </svg>
                 <span className='ml-2'>Economy</span>
                 </div> }
 
                 {flightClassState === "Premium Economy" && <div  className='flex  justify-center items-center w-[170px] h-[39px] text-black bg-[#D4CFBF] rounded-[10px]'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                 <path d="M11.4375 0.562497C11.3159 0.440574 11.1687 0.347254 11.0065 0.28931C10.8444 0.231366 10.6714 0.210251 10.5 0.227497C9.8826 0.287345 9.30532 0.560511 8.86753 0.999997L6.91003 2.9575L1.85003 1.845C1.70029 1.81259 1.5448 1.81851 1.39796 1.86221C1.25111 1.90592 1.11768 1.98598 1.01003 2.095L0.417534 2.685C0.342401 2.75905 0.286039 2.84998 0.253137 2.95021C0.220236 3.05044 0.211746 3.15708 0.228375 3.26126C0.245004 3.36544 0.286271 3.46413 0.348741 3.54914C0.411212 3.63415 0.49308 3.70301 0.587534 3.75L4.27253 5.5975L2.83503 7.035L1.32003 7.1875C1.18739 7.20204 1.06222 7.25629 0.960932 7.34316C0.85964 7.43004 0.786942 7.54547 0.752357 7.67435C0.717773 7.80323 0.722914 7.93955 0.767107 8.06546C0.811301 8.19137 0.892487 8.301 1.00003 8.38L2.53003 9.465L3.62003 11C3.69833 11.1093 3.80803 11.1922 3.93454 11.2376C4.06106 11.2831 4.19841 11.289 4.32836 11.2545C4.4583 11.2201 4.57469 11.1469 4.66207 11.0447C4.74944 10.9425 4.80366 10.8162 4.81753 10.6825L4.97003 9.1675L6.40753 7.73L8.25003 11.4125C8.29699 11.5062 8.36552 11.5875 8.45 11.6496C8.53447 11.7117 8.63247 11.7528 8.73595 11.7697C8.83942 11.7865 8.94542 11.7785 9.04522 11.7464C9.14502 11.7143 9.23578 11.659 9.31003 11.585L9.90753 11C10.0167 10.8925 10.0969 10.7591 10.1407 10.6122C10.1844 10.4653 10.1902 10.3097 10.1575 10.16L9.04753 5.09L11 3.1325C11.4395 2.69471 11.7127 2.11743 11.7725 1.5C11.79 1.32865 11.7689 1.15558 11.711 0.993391C11.653 0.831205 11.5596 0.683997 11.4375 0.562497ZM10.475 2.6L8.47503 4.6C8.39588 4.67815 8.33785 4.7751 8.30637 4.88179C8.27489 4.98847 8.27099 5.1014 8.29503 5.21L9.41253 10.3175C9.41883 10.344 9.41823 10.3718 9.41079 10.398C9.40335 10.4243 9.38932 10.4482 9.37003 10.4675L8.87003 10.9675L7.02253 7.2825C6.97571 7.18881 6.90733 7.10757 6.82303 7.04542C6.73872 6.98328 6.64088 6.94201 6.53753 6.925C6.50259 6.9221 6.46747 6.9221 6.43253 6.925C6.25702 6.92551 6.08889 6.99564 5.96503 7.12L4.42003 8.665C4.31218 8.77324 4.24505 8.91543 4.23003 9.0675L4.09753 10.38L3.14003 9.0275C3.09662 8.96735 3.04337 8.91495 2.98253 8.8725L1.63253 7.915L2.94503 7.7825C3.0971 7.76748 3.23929 7.70035 3.34753 7.5925L4.89253 6.0475C4.96654 5.97324 5.02187 5.88248 5.05397 5.78268C5.08607 5.68288 5.09403 5.57689 5.07719 5.47341C5.06035 5.36994 5.0192 5.27193 4.95711 5.18746C4.89502 5.10299 4.81377 5.03446 4.72003 4.9875L1.03253 3.13L1.53253 2.63C1.5521 2.6111 1.57603 2.59733 1.6022 2.58991C1.62837 2.5825 1.65597 2.58167 1.68253 2.5875L6.79003 3.705C6.89843 3.72936 7.01122 3.72585 7.1179 3.69481C7.22457 3.66377 7.32163 3.60621 7.40003 3.5275L9.40003 1.5275C9.7167 1.21107 10.1342 1.01558 10.58 0.974997C10.6401 0.969638 10.7007 0.977534 10.7574 0.998128C10.8142 1.01872 10.8657 1.05151 10.9083 1.09419C10.951 1.13686 10.9838 1.18838 11.0044 1.2451C11.025 1.30183 11.0329 1.36239 11.0275 1.4225C10.9863 1.86865 10.7899 2.2862 10.4725 2.6025L10.475 2.6Z" fill="#593E0E"/>
                 </svg>
                 <span className='ml-2 text-[14px]'>Premium Economy</span>
                 </div> }
 
                 {flightClassState === "First class" && <div  className='flex justify-center items-center w-[145px] h-[39px] text-black bg-[#BBBCBB] rounded-[10px]'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                 <path d="M11.4375 0.562497C11.3159 0.440574 11.1687 0.347254 11.0065 0.28931C10.8444 0.231366 10.6714 0.210251 10.5 0.227497C9.8826 0.287345 9.30532 0.560511 8.86753 0.999997L6.91003 2.9575L1.85003 1.845C1.70029 1.81259 1.5448 1.81851 1.39796 1.86221C1.25111 1.90592 1.11768 1.98598 1.01003 2.095L0.417534 2.685C0.342401 2.75905 0.286039 2.84998 0.253137 2.95021C0.220236 3.05044 0.211746 3.15708 0.228375 3.26126C0.245004 3.36544 0.286271 3.46413 0.348741 3.54914C0.411212 3.63415 0.49308 3.70301 0.587534 3.75L4.27253 5.5975L2.83503 7.035L1.32003 7.1875C1.18739 7.20204 1.06222 7.25629 0.960932 7.34316C0.85964 7.43004 0.786942 7.54547 0.752357 7.67435C0.717773 7.80323 0.722914 7.93955 0.767107 8.06546C0.811301 8.19137 0.892487 8.301 1.00003 8.38L2.53003 9.465L3.62003 11C3.69833 11.1093 3.80803 11.1922 3.93454 11.2376C4.06106 11.2831 4.19841 11.289 4.32836 11.2545C4.4583 11.2201 4.57469 11.1469 4.66207 11.0447C4.74944 10.9425 4.80366 10.8162 4.81753 10.6825L4.97003 9.1675L6.40753 7.73L8.25003 11.4125C8.29699 11.5062 8.36552 11.5875 8.45 11.6496C8.53447 11.7117 8.63247 11.7528 8.73595 11.7697C8.83942 11.7865 8.94542 11.7785 9.04522 11.7464C9.14502 11.7143 9.23578 11.659 9.31003 11.585L9.90753 11C10.0167 10.8925 10.0969 10.7591 10.1407 10.6122C10.1844 10.4653 10.1902 10.3097 10.1575 10.16L9.04753 5.09L11 3.1325C11.4395 2.69471 11.7127 2.11743 11.7725 1.5C11.79 1.32865 11.7689 1.15558 11.711 0.993391C11.653 0.831205 11.5596 0.683997 11.4375 0.562497ZM10.475 2.6L8.47503 4.6C8.39588 4.67815 8.33785 4.7751 8.30637 4.88179C8.27489 4.98847 8.27099 5.1014 8.29503 5.21L9.41253 10.3175C9.41883 10.344 9.41823 10.3718 9.41079 10.398C9.40335 10.4243 9.38932 10.4482 9.37003 10.4675L8.87003 10.9675L7.02253 7.2825C6.97571 7.18881 6.90733 7.10757 6.82303 7.04542C6.73872 6.98328 6.64088 6.94201 6.53753 6.925C6.50259 6.9221 6.46747 6.9221 6.43253 6.925C6.25702 6.92551 6.08889 6.99564 5.96503 7.12L4.42003 8.665C4.31218 8.77324 4.24505 8.91543 4.23003 9.0675L4.09753 10.38L3.14003 9.0275C3.09662 8.96735 3.04337 8.91495 2.98253 8.8725L1.63253 7.915L2.94503 7.7825C3.0971 7.76748 3.23929 7.70035 3.34753 7.5925L4.89253 6.0475C4.96654 5.97324 5.02187 5.88248 5.05397 5.78268C5.08607 5.68288 5.09403 5.57689 5.07719 5.47341C5.06035 5.36994 5.0192 5.27193 4.95711 5.18746C4.89502 5.10299 4.81377 5.03446 4.72003 4.9875L1.03253 3.13L1.53253 2.63C1.5521 2.6111 1.57603 2.59733 1.6022 2.58991C1.62837 2.5825 1.65597 2.58167 1.68253 2.5875L6.79003 3.705C6.89843 3.72936 7.01122 3.72585 7.1179 3.69481C7.22457 3.66377 7.32163 3.60621 7.40003 3.5275L9.40003 1.5275C9.7167 1.21107 10.1342 1.01558 10.58 0.974997C10.6401 0.969638 10.7007 0.977534 10.7574 0.998128C10.8142 1.01872 10.8657 1.05151 10.9083 1.09419C10.951 1.13686 10.9838 1.18838 11.0044 1.2451C11.025 1.30183 11.0329 1.36239 11.0275 1.4225C10.9863 1.86865 10.7899 2.2862 10.4725 2.6025L10.475 2.6Z" fill="#593E0E"/>
                 </svg>
                 <span className='ml-2'>First</span>
                 </div> }
 
               <div className='flex justify-around items-center mb-3'>
                 <div className='flex flex-col rtl:ml-2' >
                   <span>{getMinimumPrice(item?.offers)} LE</span>
                   <span >{t("Price per person")}</span>
                 </div>
                 <button  onClick={() => handleoffers(JSON.stringify(item))} className='ml-2 cursor-pointer flex justify-center items-center rounded-[10px] text-white bg-[#1D4179] w-[177px] h-[54px]'>{t("select")}</button>
               </div>
             </div>
 
         </div>
        )
        })}
 
     </div>
     </div>
   </>
  )
 }

 const Min_Midum_Screen = () => {
  return (
    <div className='container w-full h-auto mt-5 flex justify-between items-start'>
     
    <div className='w-[100%] '>
       {trips?.map((item : any , index: number) => {
       return (
        <div className='container flex flex-col h-auto bg-white mt-2 mb-2 rounded-[10px]' key={index}>

            <div className='flex justify-start w-full mt-3 text-[#1E1E1E] text-[16px] font-[400]'>
              <span className='mr-1'>{item?.depart_trip?.segments[0]?.originPlace?.name}</span>
              <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M17.25 9L21 12.75M21 12.75L17.25 16.5M21 12.75H3" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className='mr-1'>{item?.depart_trip?.segments[item?.depart_trip?.segments.length -1 ]?.destinationPlace?.name}</span>
              <span className='mr-1'>{item?.depart_trip?.arrivalDateTime}</span>
            </div>

              <div className={`w-full flex justify-start ${Styled.container_imageanddate}`}>
              <div className='w-[90%]  h-[100px] flex justify-between items-center  '>
                <img  src={item?.depart_trip?.carriers[0]?.imageUrl} alt="image here" className={`${Styled.image_comapny}`}/>

             

                <div className='flex justify-center ml-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.6086 4.05245V1.00659H6.39141V4.05241H0V18.9934H20V4.05241L13.6086 4.05245ZM7.56328 2.17847H12.4367V4.05241H7.56328V2.17847ZM3.53895 17.8215H1.17188V5.22425H3.53895V17.8215ZM15.2892 17.8215H4.71082V5.22425H15.2892V17.8215ZM18.8281 17.8215H16.4611V5.22425H18.8281V17.8215Z" fill="#69696A"/>
                </svg>
                <div className='flex flex-col items-start text-[#69696A] text-[12px] font-[400]'>
                  <span className='ml-2'>Baggage included:</span>
                  <span>1x 23kg</span>
                </div>
                </div>
              </div>
              </div>
              <div className='flex justify-around items-center w-full'>
              <div className='flex flex-col items-start ml-3'>
                <span className='text-[#69696A] text-[16px] font-[400]'>{item?.depart_trip?.segments[0]?.originPlace?.iata}</span>
                  <span className='text-[#69696A] text-[12px] font-[400]'>{item?.depart_trip?.segments[0]?.arrivalDateTime?.substring(11)}</span>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="94" height="2" viewBox="0 0 94 2" fill="none">
                <path d="M0 1H93.5" stroke="url(#paint0_linear_2088_1234)" stroke-dasharray="2 2"/>
                <defs>
                <linearGradient id="paint0_linear_2088_1234" x1="0" y1="1.5" x2="93.5" y2="1.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D4CFBF"/>
                <stop offset="1" stop-color="#D5CC9F"/>
                </linearGradient>
                </defs>
                </svg>

               <div className='relative mb-10'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="67" height="51" viewBox="0 0 67 51" fill="none">
                  <path d="M61.9172 50.1567C62.2456 50.3463 62.6663 50.234 62.8491 49.9018C65.5703 44.9571 67 39.4014 67 33.75C67 27.8695 65.4521 22.0926 62.5118 17C59.5716 11.9074 55.3426 7.67839 50.25 4.73815C45.1574 1.79791 39.3805 0.249999 33.5 0.25C27.6195 0.250001 21.8426 1.79791 16.75 4.73815C11.6574 7.67839 7.42838 11.9074 4.48815 17C1.54791 22.0926 -1.12747e-06 27.8695 0 33.75C1.08355e-06 39.4014 1.42967 44.9571 4.1509 49.9018C4.33375 50.234 4.7544 50.3463 5.08283 50.1567C5.41127 49.967 5.52309 49.5474 5.34053 49.215C2.73967 44.4792 1.37336 39.1603 1.37336 33.75C1.37336 28.1106 2.85781 22.5706 5.67751 17.6867C8.49721 12.8028 12.5528 8.74722 17.4367 5.92752C22.3205 3.10781 27.8606 1.62336 33.5 1.62336C39.1394 1.62336 44.6795 3.10781 49.5633 5.92751C54.4472 8.74721 58.5028 12.8028 61.3225 17.6867C64.1422 22.5705 65.6266 28.1106 65.6266 33.75C65.6266 39.1603 64.2603 44.4792 61.6595 49.215C61.4769 49.5474 61.5887 49.967 61.9172 50.1567Z" fill="#FDB129"/>
                  </svg>
                  <svg className='absolute top-[48%] left-[32%]' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path d="M24.2806 1.28192C24.026 1.02664 23.7177 0.831252 23.3782 0.709931C23.0387 0.58861 22.6764 0.544401 22.3177 0.580511C21.0249 0.705816 19.8163 1.27776 18.8996 2.19793L14.8011 6.29645L4.20676 3.96715C3.89324 3.8993 3.56767 3.91169 3.26022 4.0032C2.95277 4.0947 2.6734 4.26234 2.44801 4.49059L1.20746 5.7259C1.05015 5.88095 0.932142 6.07133 0.863254 6.28119C0.794367 6.49105 0.776592 6.71433 0.811409 6.93245C0.846225 7.15057 0.932627 7.35722 1.06343 7.53521C1.19422 7.71319 1.36563 7.85737 1.5634 7.95575L9.27887 11.8239L6.2691 14.8337L3.09707 15.153C2.81934 15.1835 2.55728 15.2971 2.3452 15.4789C2.13312 15.6608 1.98091 15.9025 1.9085 16.1724C1.83608 16.4422 1.84685 16.7276 1.93938 16.9913C2.03191 17.2549 2.20189 17.4844 2.42707 17.6498L5.63051 19.9215L7.91269 23.1354C8.07663 23.3642 8.3063 23.5378 8.57119 23.6329C8.83609 23.7281 9.12367 23.7405 9.39574 23.6683C9.66782 23.5962 9.91151 23.443 10.0944 23.2291C10.2774 23.0152 10.3909 22.7506 10.42 22.4707L10.7393 19.2986L13.749 16.2889L17.6068 23.9991C17.7051 24.1954 17.8486 24.3655 18.0254 24.4955C18.2023 24.6255 18.4075 24.7116 18.6241 24.7469C18.8408 24.7822 19.0627 24.7655 19.2717 24.6983C19.4806 24.6311 19.6707 24.5152 19.8261 24.3603L21.0771 23.1354C21.3058 22.9103 21.4737 22.631 21.5653 22.3234C21.6568 22.0159 21.6689 21.6902 21.6006 21.3767L19.2765 10.7614L23.3646 6.66286C24.2847 5.74623 24.8567 4.53756 24.982 3.24481C25.0185 2.88605 24.9744 2.52368 24.8531 2.1841C24.7318 1.84452 24.5362 1.53631 24.2806 1.28192ZM22.2654 5.54793L18.0779 9.73543C17.9121 9.89906 17.7906 10.1021 17.7247 10.3254C17.6588 10.5488 17.6506 10.7852 17.701 11.0126L20.0407 21.7064C20.0539 21.762 20.0527 21.8201 20.0371 21.875C20.0215 21.93 19.9921 21.9801 19.9518 22.0205L18.9049 23.0674L15.0367 15.3519C14.9386 15.1558 14.7955 14.9857 14.619 14.8555C14.4424 14.7254 14.2376 14.639 14.0212 14.6034C13.9481 14.5973 13.8745 14.5973 13.8014 14.6034C13.4339 14.6045 13.0819 14.7513 12.8225 15.0117L9.5877 18.2465C9.36187 18.4732 9.22133 18.7709 9.18988 19.0893L8.91246 21.8373L6.90769 19.0055C6.81679 18.8796 6.70531 18.7699 6.57793 18.681L3.75137 16.6762L6.49941 16.3988C6.8178 16.3673 7.11552 16.2268 7.34215 16.001L10.577 12.7661C10.7319 12.6107 10.8478 12.4206 10.915 12.2117C10.9822 12.0027 10.9989 11.7808 10.9636 11.5641C10.9284 11.3475 10.8422 11.1423 10.7122 10.9654C10.5822 10.7886 10.4121 10.6451 10.2158 10.5468L2.49512 6.65762L3.54199 5.61075C3.58295 5.57118 3.63306 5.54235 3.68785 5.52682C3.74264 5.5113 3.80043 5.50956 3.85605 5.52176L14.5499 7.86153C14.7768 7.91253 15.013 7.90519 15.2363 7.8402C15.4597 7.77521 15.6629 7.65469 15.8271 7.48989L20.0146 3.30239C20.6776 2.63986 21.5518 2.23056 22.4852 2.14559C22.6111 2.13437 22.7378 2.1509 22.8566 2.19402C22.9754 2.23714 23.0832 2.30579 23.1726 2.39514C23.2619 2.48449 23.3306 2.59235 23.3737 2.71113C23.4168 2.8299 23.4334 2.95668 23.4221 3.08254C23.3358 4.01667 22.9246 4.89092 22.2601 5.55317L22.2654 5.54793Z" fill="#593E0E"/>
                  </svg>
                  <div className='absolute top-[100%] left-[0%] flex flex-col items-center'>
                  <span className='text-[#69696A] text-[12px] font-[400]'>{item?.depart_trip?.segments[0]?.durationInMinutes} min</span> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="10" viewBox="0 0 65 10" fill="none">
                  <path d="M60 1.25L63.75 5M63.75 5L60 8.75M63.75 5H1.25H45.75" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span className='text-[#69696A] text-[12px] font-[400]' >{item?.depart_trip?.segments?.length} stop</span>
                  </div>
               </div>

               <svg xmlns="http://www.w3.org/2000/svg" width="94" height="2" viewBox="0 0 94 2" fill="none">
                <path d="M0 1H93.5" stroke="url(#paint0_linear_2088_1234)" stroke-dasharray="2 2"/>
                <defs>
                <linearGradient id="paint0_linear_2088_1234" x1="0" y1="1.5" x2="93.5" y2="1.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D4CFBF"/>
                <stop offset="1" stop-color="#D5CC9F"/>
                </linearGradient>
                </defs>
                </svg>

                <div className='flex flex-col items-start '>
                  <span className='text-[#69696A] text-[16px] font-[400]'>{item?.depart_trip?.segments[0]?.destinationPlace?.iata}</span>
                  <span className='text-[#69696A] text-[12px] font-[400]'>{item?.depart_trip?.segments[0]?.departureDateTime?.substring(11)}</span>
                </div>
              </div>

            <hr className='mt-[40px]'></hr>

            <div className='flex justify-start w-full mt-3 text-[#1E1E1E] text-[16px] font-[400]'>
              <span className='mr-1'>{item?.return_trip?.segments[0]?.originPlace?.name}</span>
              <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M17.25 9L21 12.75M21 12.75L17.25 16.5M21 12.75H3" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className='mr-1'>{item?.return_trip?.segments[item?.return_trip?.segments.length -1]?.destinationPlace?.name}</span>
              <span className='mr-1'>{item?.return_trip?.arrivalDateTime}</span>
            </div>

              <div className='w-full flex justify-start'>
              <div className='w-[90%]  h-[100px] flex justify-between items-center  '>
                <img  src={item?.return_trip?.carriers[0]?.imageUrl} alt="image here " />

                <div className='flex justify-center ml-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.6086 4.05245V1.00659H6.39141V4.05241H0V18.9934H20V4.05241L13.6086 4.05245ZM7.56328 2.17847H12.4367V4.05241H7.56328V2.17847ZM3.53895 17.8215H1.17188V5.22425H3.53895V17.8215ZM15.2892 17.8215H4.71082V5.22425H15.2892V17.8215ZM18.8281 17.8215H16.4611V5.22425H18.8281V17.8215Z" fill="#69696A"/>
                </svg>
                <div className='flex flex-col items-start text-[#69696A] text-[12px] font-[400]'>
                  <span className='ml-2'>Baggage included:</span>
                  <span>1x 23kg</span>
                </div>
                </div>

              </div>

              
            </div>
            <div className='flex justify-around items-center w-full'>
              <div className='flex flex-col items-start ml-3'>
              <span className='text-[#69696A] text-[16px] font-[400]'>{item?.return_trip?.segments[0]?.destinationPlace?.iata}</span>
                  <span className='text-[#69696A] text-[12px] font-[400]'>{item?.return_trip?.segments[0]?.departureDateTime?.substring(11)}</span>
               
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="94" height="2" viewBox="0 0 94 2" fill="none">
                <path d="M0 1H93.5" stroke="url(#paint0_linear_2088_1234)" stroke-dasharray="2 2"/>
                <defs>
                <linearGradient id="paint0_linear_2088_1234" x1="0" y1="1.5" x2="93.5" y2="1.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D4CFBF"/>
                <stop offset="1" stop-color="#D5CC9F"/>
                </linearGradient>
                </defs>
                </svg>

               <div className='relative mb-10'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="67" height="51" viewBox="0 0 67 51" fill="none">
                  <path d="M61.9172 50.1567C62.2456 50.3463 62.6663 50.234 62.8491 49.9018C65.5703 44.9571 67 39.4014 67 33.75C67 27.8695 65.4521 22.0926 62.5118 17C59.5716 11.9074 55.3426 7.67839 50.25 4.73815C45.1574 1.79791 39.3805 0.249999 33.5 0.25C27.6195 0.250001 21.8426 1.79791 16.75 4.73815C11.6574 7.67839 7.42838 11.9074 4.48815 17C1.54791 22.0926 -1.12747e-06 27.8695 0 33.75C1.08355e-06 39.4014 1.42967 44.9571 4.1509 49.9018C4.33375 50.234 4.7544 50.3463 5.08283 50.1567C5.41127 49.967 5.52309 49.5474 5.34053 49.215C2.73967 44.4792 1.37336 39.1603 1.37336 33.75C1.37336 28.1106 2.85781 22.5706 5.67751 17.6867C8.49721 12.8028 12.5528 8.74722 17.4367 5.92752C22.3205 3.10781 27.8606 1.62336 33.5 1.62336C39.1394 1.62336 44.6795 3.10781 49.5633 5.92751C54.4472 8.74721 58.5028 12.8028 61.3225 17.6867C64.1422 22.5705 65.6266 28.1106 65.6266 33.75C65.6266 39.1603 64.2603 44.4792 61.6595 49.215C61.4769 49.5474 61.5887 49.967 61.9172 50.1567Z" fill="#FDB129"/>
                  </svg>
                  <svg className='absolute top-[48%] left-[32%]' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path d="M24.2806 1.28192C24.026 1.02664 23.7177 0.831252 23.3782 0.709931C23.0387 0.58861 22.6764 0.544401 22.3177 0.580511C21.0249 0.705816 19.8163 1.27776 18.8996 2.19793L14.8011 6.29645L4.20676 3.96715C3.89324 3.8993 3.56767 3.91169 3.26022 4.0032C2.95277 4.0947 2.6734 4.26234 2.44801 4.49059L1.20746 5.7259C1.05015 5.88095 0.932142 6.07133 0.863254 6.28119C0.794367 6.49105 0.776592 6.71433 0.811409 6.93245C0.846225 7.15057 0.932627 7.35722 1.06343 7.53521C1.19422 7.71319 1.36563 7.85737 1.5634 7.95575L9.27887 11.8239L6.2691 14.8337L3.09707 15.153C2.81934 15.1835 2.55728 15.2971 2.3452 15.4789C2.13312 15.6608 1.98091 15.9025 1.9085 16.1724C1.83608 16.4422 1.84685 16.7276 1.93938 16.9913C2.03191 17.2549 2.20189 17.4844 2.42707 17.6498L5.63051 19.9215L7.91269 23.1354C8.07663 23.3642 8.3063 23.5378 8.57119 23.6329C8.83609 23.7281 9.12367 23.7405 9.39574 23.6683C9.66782 23.5962 9.91151 23.443 10.0944 23.2291C10.2774 23.0152 10.3909 22.7506 10.42 22.4707L10.7393 19.2986L13.749 16.2889L17.6068 23.9991C17.7051 24.1954 17.8486 24.3655 18.0254 24.4955C18.2023 24.6255 18.4075 24.7116 18.6241 24.7469C18.8408 24.7822 19.0627 24.7655 19.2717 24.6983C19.4806 24.6311 19.6707 24.5152 19.8261 24.3603L21.0771 23.1354C21.3058 22.9103 21.4737 22.631 21.5653 22.3234C21.6568 22.0159 21.6689 21.6902 21.6006 21.3767L19.2765 10.7614L23.3646 6.66286C24.2847 5.74623 24.8567 4.53756 24.982 3.24481C25.0185 2.88605 24.9744 2.52368 24.8531 2.1841C24.7318 1.84452 24.5362 1.53631 24.2806 1.28192ZM22.2654 5.54793L18.0779 9.73543C17.9121 9.89906 17.7906 10.1021 17.7247 10.3254C17.6588 10.5488 17.6506 10.7852 17.701 11.0126L20.0407 21.7064C20.0539 21.762 20.0527 21.8201 20.0371 21.875C20.0215 21.93 19.9921 21.9801 19.9518 22.0205L18.9049 23.0674L15.0367 15.3519C14.9386 15.1558 14.7955 14.9857 14.619 14.8555C14.4424 14.7254 14.2376 14.639 14.0212 14.6034C13.9481 14.5973 13.8745 14.5973 13.8014 14.6034C13.4339 14.6045 13.0819 14.7513 12.8225 15.0117L9.5877 18.2465C9.36187 18.4732 9.22133 18.7709 9.18988 19.0893L8.91246 21.8373L6.90769 19.0055C6.81679 18.8796 6.70531 18.7699 6.57793 18.681L3.75137 16.6762L6.49941 16.3988C6.8178 16.3673 7.11552 16.2268 7.34215 16.001L10.577 12.7661C10.7319 12.6107 10.8478 12.4206 10.915 12.2117C10.9822 12.0027 10.9989 11.7808 10.9636 11.5641C10.9284 11.3475 10.8422 11.1423 10.7122 10.9654C10.5822 10.7886 10.4121 10.6451 10.2158 10.5468L2.49512 6.65762L3.54199 5.61075C3.58295 5.57118 3.63306 5.54235 3.68785 5.52682C3.74264 5.5113 3.80043 5.50956 3.85605 5.52176L14.5499 7.86153C14.7768 7.91253 15.013 7.90519 15.2363 7.8402C15.4597 7.77521 15.6629 7.65469 15.8271 7.48989L20.0146 3.30239C20.6776 2.63986 21.5518 2.23056 22.4852 2.14559C22.6111 2.13437 22.7378 2.1509 22.8566 2.19402C22.9754 2.23714 23.0832 2.30579 23.1726 2.39514C23.2619 2.48449 23.3306 2.59235 23.3737 2.71113C23.4168 2.8299 23.4334 2.95668 23.4221 3.08254C23.3358 4.01667 22.9246 4.89092 22.2601 5.55317L22.2654 5.54793Z" fill="#593E0E"/>
                  </svg>
                  <div className='absolute top-[100%] left-[0%] flex flex-col items-center'>
                  <span className='text-[#69696A] text-[12px] font-[400]'>{item?.return_trip?.segments[0]?.durationInMinutes} min</span> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="10" viewBox="0 0 65 10" fill="none">
                  <path d="M60 1.25L63.75 5M63.75 5L60 8.75M63.75 5H1.25H45.75" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span className='text-[#69696A] text-[12px] font-[400]' >{item?.return_trip?.segments?.length} stop</span>
                  </div>
               </div>

               <svg xmlns="http://www.w3.org/2000/svg" width="94" height="2" viewBox="0 0 94 2" fill="none">
                <path d="M0 1H93.5" stroke="url(#paint0_linear_2088_1234)" stroke-dasharray="2 2"/>
                <defs>
                <linearGradient id="paint0_linear_2088_1234" x1="0" y1="1.5" x2="93.5" y2="1.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#D4CFBF"/>
                <stop offset="1" stop-color="#D5CC9F"/>
                </linearGradient>
                </defs>
                </svg>

                <div className='flex flex-col items-start '>
                <span className='text-[#69696A] text-[16px] font-[400]'>{item?.depart_trip?.segments[0]?.originPlace?.iata}</span>
                  <span className='text-[#69696A] text-[12px] font-[400]'>{item?.depart_trip?.segments[0]?.arrivalDateTime?.substring(11)}</span>
                </div>
              </div>

             <div className='flex flex-col w-full items-center mt-[32px]'>
              <div className='w-[90%] flex justify-between items-center'>
              
                {flightClassState === "Business" && <div  className='flex justify-center items-center w-[145px] h-[39px] text-white bg-[#658FA9] rounded-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                <path d="M11.4375 0.812513C11.3159 0.69059 11.1687 0.59727 11.0065 0.539325C10.8444 0.481381 10.6714 0.460266 10.5 0.477513C9.8826 0.53736 9.30532 0.810526 8.86753 1.25001L6.91003 3.20751L1.85003 2.09501C1.70029 2.0626 1.5448 2.06853 1.39796 2.11223C1.25111 2.15593 1.11768 2.236 1.01003 2.34501L0.417534 2.93501C0.342401 3.00907 0.286039 3.09999 0.253137 3.20023C0.220236 3.30046 0.211746 3.4071 0.228375 3.51128C0.245004 3.61545 0.286271 3.71415 0.348741 3.79916C0.411212 3.88417 0.49308 3.95303 0.587534 4.00001L4.27253 5.84751L2.83503 7.28501L1.32003 7.43751C1.18739 7.45205 1.06222 7.50631 0.960932 7.59318C0.85964 7.68005 0.786942 7.79548 0.752357 7.92437C0.717773 8.05325 0.722914 8.18957 0.767107 8.31548C0.811301 8.44139 0.892487 8.55102 1.00003 8.63001L2.53003 9.71501L3.62003 11.25C3.69833 11.3593 3.80803 11.4422 3.93454 11.4876C4.06106 11.5331 4.19841 11.539 4.32836 11.5045C4.4583 11.4701 4.57469 11.3969 4.66207 11.2947C4.74944 11.1926 4.80366 11.0662 4.81753 10.9325L4.97003 9.41751L6.40753 7.98001L8.25003 11.6625C8.29699 11.7562 8.36552 11.8375 8.45 11.8996C8.53447 11.9617 8.63247 12.0028 8.73595 12.0197C8.83942 12.0365 8.94542 12.0286 9.04522 11.9964C9.14502 11.9643 9.23578 11.909 9.31003 11.835L9.90753 11.25C10.0167 11.1425 10.0969 11.0091 10.1407 10.8622C10.1844 10.7153 10.1902 10.5597 10.1575 10.41L9.04753 5.34001L11 3.38251C11.4395 2.94472 11.7127 2.36745 11.7725 1.75001C11.79 1.57867 11.7689 1.40559 11.711 1.24341C11.653 1.08122 11.5596 0.934012 11.4375 0.812513ZM10.475 2.85001L8.47503 4.85001C8.39588 4.92816 8.33785 5.02512 8.30637 5.1318C8.27489 5.23848 8.27099 5.35141 8.29503 5.46001L9.41253 10.5675C9.41883 10.5941 9.41823 10.6218 9.41079 10.648C9.40335 10.6743 9.38932 10.6982 9.37003 10.7175L8.87003 11.2175L7.02253 7.53251C6.97571 7.43883 6.90733 7.35758 6.82303 7.29544C6.73872 7.23329 6.64088 7.19202 6.53753 7.17501C6.50259 7.17211 6.46747 7.17211 6.43253 7.17501C6.25702 7.17552 6.08889 7.24565 5.96503 7.37001L4.42003 8.91501C4.31218 9.02325 4.24505 9.16545 4.23003 9.31751L4.09753 10.63L3.14003 9.27751C3.09662 9.21736 3.04337 9.16496 2.98253 9.12251L1.63253 8.16501L2.94503 8.03251C3.0971 8.01749 3.23929 7.95037 3.34753 7.84251L4.89253 6.29751C4.96654 6.22326 5.02187 6.1325 5.05397 6.0327C5.08607 5.9329 5.09403 5.8269 5.07719 5.72343C5.06035 5.61995 5.0192 5.52195 4.95711 5.43748C4.89502 5.353 4.81377 5.28447 4.72003 5.23751L1.03253 3.38001L1.53253 2.88001C1.5521 2.86111 1.57603 2.84734 1.6022 2.83993C1.62837 2.83251 1.65597 2.83168 1.68253 2.83751L6.79003 3.95501C6.89843 3.97937 7.01122 3.97587 7.1179 3.94483C7.22457 3.91379 7.32163 3.85622 7.40003 3.77751L9.40003 1.77751C9.7167 1.46108 10.1342 1.2656 10.58 1.22501C10.6401 1.21965 10.7007 1.22755 10.7574 1.24814C10.8142 1.26874 10.8657 1.30153 10.9083 1.3442C10.951 1.38688 10.9838 1.43839 11.0044 1.49512C11.025 1.55185 11.0329 1.6124 11.0275 1.67251C10.9863 2.11866 10.7899 2.53622 10.4725 2.85251L10.475 2.85001Z" fill="white"/>
                </svg>
                <span className='ml-2'>Business</span>
                </div> }

                {flightClassState === "Economy" && <div  className='flex justify-center items-center w-[145px] h-[39px] text-black bg-[#E8ECF2] rounded-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                <path d="M11.4375 1.06276C11.3159 0.940834 11.1687 0.847514 11.0065 0.789569C10.8444 0.731625 10.6714 0.71051 10.5 0.727757C9.8826 0.787604 9.30532 1.06077 8.86753 1.50026L6.91003 3.45776L1.85003 2.34526C1.70029 2.31285 1.5448 2.31877 1.39796 2.36247C1.25111 2.40618 1.11768 2.48624 1.01003 2.59526L0.417534 3.18526C0.342401 3.25931 0.286039 3.35024 0.253137 3.45047C0.220236 3.5507 0.211746 3.65734 0.228375 3.76152C0.245004 3.86569 0.286271 3.96439 0.348741 4.0494C0.411212 4.13441 0.49308 4.20327 0.587534 4.25026L4.27253 6.09776L2.83503 7.53526L1.32003 7.68776C1.18739 7.7023 1.06222 7.75655 0.960932 7.84342C0.85964 7.93029 0.786942 8.04573 0.752357 8.17461C0.717773 8.30349 0.722914 8.43981 0.767107 8.56572C0.811301 8.69163 0.892487 8.80126 1.00003 8.88026L2.53003 9.96526L3.62003 11.5003C3.69833 11.6095 3.80803 11.6924 3.93454 11.7379C4.06106 11.7833 4.19841 11.7892 4.32836 11.7548C4.4583 11.7203 4.57469 11.6471 4.66207 11.545C4.74944 11.4428 4.80366 11.3165 4.81753 11.1828L4.97003 9.66776L6.40753 8.23026L8.25003 11.9128C8.29699 12.0065 8.36552 12.0877 8.45 12.1498C8.53447 12.2119 8.63247 12.2531 8.73595 12.2699C8.83942 12.2868 8.94542 12.2788 9.04522 12.2467C9.14502 12.2146 9.23578 12.1593 9.31003 12.0853L9.90753 11.5003C10.0167 11.3927 10.0969 11.2593 10.1407 11.1124C10.1844 10.9656 10.1902 10.81 10.1575 10.6603L9.04753 5.59026L11 3.63276C11.4395 3.19497 11.7127 2.61769 11.7725 2.00026C11.79 1.82891 11.7689 1.65584 11.711 1.49365C11.653 1.33146 11.5596 1.18426 11.4375 1.06276ZM10.475 3.10026L8.47503 5.10026C8.39588 5.17841 8.33785 5.27536 8.30637 5.38204C8.27489 5.48873 8.27099 5.60166 8.29503 5.71026L9.41253 10.8178C9.41883 10.8443 9.41823 10.872 9.41079 10.8983C9.40335 10.9245 9.38932 10.9485 9.37003 10.9678L8.87003 11.4678L7.02253 7.78276C6.97571 7.68907 6.90733 7.60783 6.82303 7.54568C6.73872 7.48354 6.64088 7.44227 6.53753 7.42526C6.50259 7.42236 6.46747 7.42236 6.43253 7.42526C6.25702 7.42577 6.08889 7.4959 5.96503 7.62026L4.42003 9.16526C4.31218 9.2735 4.24505 9.41569 4.23003 9.56776L4.09753 10.8803L3.14003 9.52776C3.09662 9.46761 3.04337 9.41521 2.98253 9.37276L1.63253 8.41526L2.94503 8.28276C3.0971 8.26774 3.23929 8.20061 3.34753 8.09276L4.89253 6.54776C4.96654 6.4735 5.02187 6.38274 5.05397 6.28294C5.08607 6.18314 5.09403 6.07715 5.07719 5.97367C5.06035 5.8702 5.0192 5.77219 4.95711 5.68772C4.89502 5.60325 4.81377 5.53471 4.72003 5.48776L1.03253 3.63026L1.53253 3.13026C1.5521 3.11136 1.57603 3.09759 1.6022 3.09017C1.62837 3.08276 1.65597 3.08193 1.68253 3.08776L6.79003 4.20526C6.89843 4.22961 7.01122 4.22611 7.1179 4.19507C7.22457 4.16403 7.32163 4.10647 7.40003 4.02776L9.40003 2.02776C9.7167 1.71133 10.1342 1.51584 10.58 1.47526C10.6401 1.4699 10.7007 1.47779 10.7574 1.49839C10.8142 1.51898 10.8657 1.55177 10.9083 1.59445C10.951 1.63712 10.9838 1.68864 11.0044 1.74536C11.025 1.80209 11.0329 1.86265 11.0275 1.92276C10.9863 2.36891 10.7899 2.78646 10.4725 3.10276L10.475 3.10026Z" fill="#1E1E1E"/>
                </svg>
                <span className='ml-2'>Economy</span>
                </div> }

                {flightClassState === "Premium Economy" && <div  className='flex  justify-center items-center w-[170px] h-[39px] text-black bg-[#D4CFBF] rounded-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M11.4375 0.562497C11.3159 0.440574 11.1687 0.347254 11.0065 0.28931C10.8444 0.231366 10.6714 0.210251 10.5 0.227497C9.8826 0.287345 9.30532 0.560511 8.86753 0.999997L6.91003 2.9575L1.85003 1.845C1.70029 1.81259 1.5448 1.81851 1.39796 1.86221C1.25111 1.90592 1.11768 1.98598 1.01003 2.095L0.417534 2.685C0.342401 2.75905 0.286039 2.84998 0.253137 2.95021C0.220236 3.05044 0.211746 3.15708 0.228375 3.26126C0.245004 3.36544 0.286271 3.46413 0.348741 3.54914C0.411212 3.63415 0.49308 3.70301 0.587534 3.75L4.27253 5.5975L2.83503 7.035L1.32003 7.1875C1.18739 7.20204 1.06222 7.25629 0.960932 7.34316C0.85964 7.43004 0.786942 7.54547 0.752357 7.67435C0.717773 7.80323 0.722914 7.93955 0.767107 8.06546C0.811301 8.19137 0.892487 8.301 1.00003 8.38L2.53003 9.465L3.62003 11C3.69833 11.1093 3.80803 11.1922 3.93454 11.2376C4.06106 11.2831 4.19841 11.289 4.32836 11.2545C4.4583 11.2201 4.57469 11.1469 4.66207 11.0447C4.74944 10.9425 4.80366 10.8162 4.81753 10.6825L4.97003 9.1675L6.40753 7.73L8.25003 11.4125C8.29699 11.5062 8.36552 11.5875 8.45 11.6496C8.53447 11.7117 8.63247 11.7528 8.73595 11.7697C8.83942 11.7865 8.94542 11.7785 9.04522 11.7464C9.14502 11.7143 9.23578 11.659 9.31003 11.585L9.90753 11C10.0167 10.8925 10.0969 10.7591 10.1407 10.6122C10.1844 10.4653 10.1902 10.3097 10.1575 10.16L9.04753 5.09L11 3.1325C11.4395 2.69471 11.7127 2.11743 11.7725 1.5C11.79 1.32865 11.7689 1.15558 11.711 0.993391C11.653 0.831205 11.5596 0.683997 11.4375 0.562497ZM10.475 2.6L8.47503 4.6C8.39588 4.67815 8.33785 4.7751 8.30637 4.88179C8.27489 4.98847 8.27099 5.1014 8.29503 5.21L9.41253 10.3175C9.41883 10.344 9.41823 10.3718 9.41079 10.398C9.40335 10.4243 9.38932 10.4482 9.37003 10.4675L8.87003 10.9675L7.02253 7.2825C6.97571 7.18881 6.90733 7.10757 6.82303 7.04542C6.73872 6.98328 6.64088 6.94201 6.53753 6.925C6.50259 6.9221 6.46747 6.9221 6.43253 6.925C6.25702 6.92551 6.08889 6.99564 5.96503 7.12L4.42003 8.665C4.31218 8.77324 4.24505 8.91543 4.23003 9.0675L4.09753 10.38L3.14003 9.0275C3.09662 8.96735 3.04337 8.91495 2.98253 8.8725L1.63253 7.915L2.94503 7.7825C3.0971 7.76748 3.23929 7.70035 3.34753 7.5925L4.89253 6.0475C4.96654 5.97324 5.02187 5.88248 5.05397 5.78268C5.08607 5.68288 5.09403 5.57689 5.07719 5.47341C5.06035 5.36994 5.0192 5.27193 4.95711 5.18746C4.89502 5.10299 4.81377 5.03446 4.72003 4.9875L1.03253 3.13L1.53253 2.63C1.5521 2.6111 1.57603 2.59733 1.6022 2.58991C1.62837 2.5825 1.65597 2.58167 1.68253 2.5875L6.79003 3.705C6.89843 3.72936 7.01122 3.72585 7.1179 3.69481C7.22457 3.66377 7.32163 3.60621 7.40003 3.5275L9.40003 1.5275C9.7167 1.21107 10.1342 1.01558 10.58 0.974997C10.6401 0.969638 10.7007 0.977534 10.7574 0.998128C10.8142 1.01872 10.8657 1.05151 10.9083 1.09419C10.951 1.13686 10.9838 1.18838 11.0044 1.2451C11.025 1.30183 11.0329 1.36239 11.0275 1.4225C10.9863 1.86865 10.7899 2.2862 10.4725 2.6025L10.475 2.6Z" fill="#593E0E"/>
                </svg>
                <span className='ml-2 text-[14px]'>Premium Economy</span>
                </div> }

                {flightClassState === "First class" && <div  className='flex justify-center items-center w-[145px] h-[39px] text-black bg-[#BBBCBB] rounded-[10px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M11.4375 0.562497C11.3159 0.440574 11.1687 0.347254 11.0065 0.28931C10.8444 0.231366 10.6714 0.210251 10.5 0.227497C9.8826 0.287345 9.30532 0.560511 8.86753 0.999997L6.91003 2.9575L1.85003 1.845C1.70029 1.81259 1.5448 1.81851 1.39796 1.86221C1.25111 1.90592 1.11768 1.98598 1.01003 2.095L0.417534 2.685C0.342401 2.75905 0.286039 2.84998 0.253137 2.95021C0.220236 3.05044 0.211746 3.15708 0.228375 3.26126C0.245004 3.36544 0.286271 3.46413 0.348741 3.54914C0.411212 3.63415 0.49308 3.70301 0.587534 3.75L4.27253 5.5975L2.83503 7.035L1.32003 7.1875C1.18739 7.20204 1.06222 7.25629 0.960932 7.34316C0.85964 7.43004 0.786942 7.54547 0.752357 7.67435C0.717773 7.80323 0.722914 7.93955 0.767107 8.06546C0.811301 8.19137 0.892487 8.301 1.00003 8.38L2.53003 9.465L3.62003 11C3.69833 11.1093 3.80803 11.1922 3.93454 11.2376C4.06106 11.2831 4.19841 11.289 4.32836 11.2545C4.4583 11.2201 4.57469 11.1469 4.66207 11.0447C4.74944 10.9425 4.80366 10.8162 4.81753 10.6825L4.97003 9.1675L6.40753 7.73L8.25003 11.4125C8.29699 11.5062 8.36552 11.5875 8.45 11.6496C8.53447 11.7117 8.63247 11.7528 8.73595 11.7697C8.83942 11.7865 8.94542 11.7785 9.04522 11.7464C9.14502 11.7143 9.23578 11.659 9.31003 11.585L9.90753 11C10.0167 10.8925 10.0969 10.7591 10.1407 10.6122C10.1844 10.4653 10.1902 10.3097 10.1575 10.16L9.04753 5.09L11 3.1325C11.4395 2.69471 11.7127 2.11743 11.7725 1.5C11.79 1.32865 11.7689 1.15558 11.711 0.993391C11.653 0.831205 11.5596 0.683997 11.4375 0.562497ZM10.475 2.6L8.47503 4.6C8.39588 4.67815 8.33785 4.7751 8.30637 4.88179C8.27489 4.98847 8.27099 5.1014 8.29503 5.21L9.41253 10.3175C9.41883 10.344 9.41823 10.3718 9.41079 10.398C9.40335 10.4243 9.38932 10.4482 9.37003 10.4675L8.87003 10.9675L7.02253 7.2825C6.97571 7.18881 6.90733 7.10757 6.82303 7.04542C6.73872 6.98328 6.64088 6.94201 6.53753 6.925C6.50259 6.9221 6.46747 6.9221 6.43253 6.925C6.25702 6.92551 6.08889 6.99564 5.96503 7.12L4.42003 8.665C4.31218 8.77324 4.24505 8.91543 4.23003 9.0675L4.09753 10.38L3.14003 9.0275C3.09662 8.96735 3.04337 8.91495 2.98253 8.8725L1.63253 7.915L2.94503 7.7825C3.0971 7.76748 3.23929 7.70035 3.34753 7.5925L4.89253 6.0475C4.96654 5.97324 5.02187 5.88248 5.05397 5.78268C5.08607 5.68288 5.09403 5.57689 5.07719 5.47341C5.06035 5.36994 5.0192 5.27193 4.95711 5.18746C4.89502 5.10299 4.81377 5.03446 4.72003 4.9875L1.03253 3.13L1.53253 2.63C1.5521 2.6111 1.57603 2.59733 1.6022 2.58991C1.62837 2.5825 1.65597 2.58167 1.68253 2.5875L6.79003 3.705C6.89843 3.72936 7.01122 3.72585 7.1179 3.69481C7.22457 3.66377 7.32163 3.60621 7.40003 3.5275L9.40003 1.5275C9.7167 1.21107 10.1342 1.01558 10.58 0.974997C10.6401 0.969638 10.7007 0.977534 10.7574 0.998128C10.8142 1.01872 10.8657 1.05151 10.9083 1.09419C10.951 1.13686 10.9838 1.18838 11.0044 1.2451C11.025 1.30183 11.0329 1.36239 11.0275 1.4225C10.9863 1.86865 10.7899 2.2862 10.4725 2.6025L10.475 2.6Z" fill="#593E0E"/>
                </svg>
                <span className='ml-2'>First</span>
                </div> }

                <div className='flex flex-col'>
                  <span>{getMinimumPrice(item?.offers)} LE</span>
                  <span>Price per person</span>
                </div>
              </div>
              <div className='w-full flex justify-end items-center mb-3 mt-3'>
               
                <button  onClick={() => handleoffers(JSON.stringify(item))} className='ml-2 cursor-pointer flex justify-center items-center rounded-[10px] text-white bg-[#1D4179] w-[177px] h-[54px]'>select</button>
              </div>
            </div>

        </div>
       )
       })}

    </div>
    </div>
  )
 }
  return (
     
   <div>
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
     {screenSize.width > 850 ? Max_Screen() : Min_Midum_Screen()}
   </div>
  )
}

export default ListFlightTwoRound