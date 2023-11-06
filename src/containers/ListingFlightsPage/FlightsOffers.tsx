import React, { useEffect, useState } from 'react'
import { FlightHeader } from './FlightHeader'

export const FlightsOffers = () => {

    const flight_item: any = window.localStorage.getItem("flight_item") 
    const Flight_Offers = JSON.parse(flight_item)
    const URLS = Flight_Offers?.offers
    console.log("Flight_Offers" , Flight_Offers)
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

 
  const Max_screen = () => {
    return (
        <div>
        <div className='container flex flex-col w-full h-[200px] bg-white pt-3 mt-20 mb-3 rounded-[10px]' >
        <div className='flex justify-start w-full mt-3 text-[#1E1E1E] text-[16px] font-[400]'>
            <span className='mr-1'>{Flight_Offers?.depart_trip?.segments[0]?.originPlace?.name}</span>
            <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M17.25 9L21 12.75M21 12.75L17.25 16.5M21 12.75H3" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span className='mr-1'>{Flight_Offers?.depart_trip?.segments[0]?.destinationPlace?.name}</span>
            <span className='mr-1'>{Flight_Offers?.depart_trip?.arrivalDateTime}</span>
        </div>

        <div className='w-full flex justify-start'>
            <div className='w-[90%]  h-[100px] flex justify-between items-center  '>
            <img  src={Flight_Offers?.depart_trip?.carriers[0]?.imageUrl} alt="image here " />

            <div className='flex flex-col items-start ml-3'>
            <span className='text-[#69696A] text-[16px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.originPlace?.iata}</span>
                <span className='text-[#69696A] text-[12px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.arrivalDateTime?.substring(11)}</span>
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
                <span className='text-[#69696A] text-[12px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.durationInMinutes} min</span> 
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="10" viewBox="0 0 65 10" fill="none">
                <path d="M60 1.25L63.75 5M63.75 5L60 8.75M63.75 5H1.25H45.75" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='text-[#69696A] text-[12px] font-[400]' >1 stop</span>
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
                <span className='text-[#69696A] text-[16px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.destinationPlace?.iata}</span>
                <span className='text-[#69696A] text-[12px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.departureDateTime?.substring(11)}</span>
            </div>

            <div className='flex justify-center '>
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

      
       </div>
       <span className='flex justify-start w-full text-[20px] font-[400] text-[#1E1E1E]'>Book your ticket</span>
            <span className='flex justify-start w-full text-[#69696A] text-[16px] font-[400] ' >Economy class, 1 adult</span>
            {
                Flight_Offers?.offers?.map((item: any , index: any) => {
                   return (
                    <div key={index} className='w-full flex justify-between items-center mt-3 border-b-2 border-[#B9C4D5] pb-2' >

               <div className='flex justify-start items-center '>
               <img  src={item?.agent?.imageUrl} alt="image here " />
                <div className='flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                </div>
               </div>
                <div className='flex justify-end items-center '>
                    <span className='text-[24px] text-[#1D4179] font-[500]'>{item?.price}</span>
                    <a  href={`${item?.url}`}
                     className='ml-2 cursor-pointer flex justify-center items-center rounded-[10px] text-white btn-hover w-[177px] h-[54px]'>select</a>
                </div>
                    </div>
                   )
                })
            }
    </div>
    )
  }  

  const Min_Midum_Screen = () => {
    return (
        <div>

        <div className='container flex flex-col w-full h-auto pb-[32px] bg-white pt-3 mt-20 mb-3 rounded-[10px]' >
        <div className='flex justify-start w-full mt-3 text-[#1E1E1E] text-[16px] font-[400]'>
            <span className='mr-1'>{Flight_Offers?.depart_trip?.segments[0]?.originPlace?.name}</span>
            <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M17.25 9L21 12.75M21 12.75L17.25 16.5M21 12.75H3" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span className='mr-1'>{Flight_Offers?.depart_trip?.segments[0]?.destinationPlace?.name}</span>
            <span className='mr-1'>{Flight_Offers?.depart_trip?.arrivalDateTime}</span>
        </div>

        <div className='w-full flex flex-col'>
            <div className='w-[90%]  h-[100px] flex justify-between  items-center  '>
            <img  src={Flight_Offers?.depart_trip?.carriers[0]?.imageUrl} alt="image here " />   

            <div className='flex justify-center '>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13.6086 4.05245V1.00659H6.39141V4.05241H0V18.9934H20V4.05241L13.6086 4.05245ZM7.56328 2.17847H12.4367V4.05241H7.56328V2.17847ZM3.53895 17.8215H1.17188V5.22425H3.53895V17.8215ZM15.2892 17.8215H4.71082V5.22425H15.2892V17.8215ZM18.8281 17.8215H16.4611V5.22425H18.8281V17.8215Z" fill="#69696A"/>
            </svg>
            <div className='flex flex-col items-start text-[#69696A] text-[12px] font-[400]'>
                <span className='ml-2'>Baggage included:</span>
                <span>1x 23kg</span>
            </div>
            </div>
            </div>
            <div className='w-full flex justify-around mb-10'>
            <div className='flex flex-col items-start ml-3'>
            <span className='text-[#69696A] text-[16px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.originPlace?.iata}</span>
                <span className='text-[#69696A] text-[12px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.arrivalDateTime?.substring(11)}</span>
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
                <span className='text-[#69696A] text-[12px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.durationInMinutes} min</span> 
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="10" viewBox="0 0 65 10" fill="none">
                <path d="M60 1.25L63.75 5M63.75 5L60 8.75M63.75 5H1.25H45.75" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='text-[#69696A] text-[12px] font-[400]' >1 stop</span>
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
                <span className='text-[#69696A] text-[16px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.destinationPlace?.iata}</span>
                <span className='text-[#69696A] text-[12px] font-[400]'>{Flight_Offers?.depart_trip?.segments[0]?.departureDateTime?.substring(11)}</span>
            </div>
            </div>
        </div>

    

        </div>

        <span className='flex justify-start w-full text-[20px] font-[400] text-[#1E1E1E]'>Book your ticket</span>
            <span className='flex justify-start w-full text-[#69696A] text-[16px] font-[400] ' >Economy class, 1 adult</span>
            {
                Flight_Offers?.offers?.map((item: any , index: any) => {
                   return (
                    <div key={index} className='w-full flex justify-between items-end mt-3 border-b-2 border-[#B9C4D5] pb-2' >

               <div className='flex flex-col items-center '>
               <img  src={item?.agent?.imageUrl} alt="image here "  />
                <div className='flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21697L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21697L10.788 3.20997Z" fill="#FFB229"/>
                </svg>
                </div>
                <span className='text-[24px] text-[#1D4179] font-[500] mt-2'>{item?.price}</span>
               </div>
                    <a  href={`${item?.url}`}
                     className='ml-2 cursor-pointer flex justify-center items-center rounded-[10px] text-white btn-hover w-[177px] h-[54px]'>select</a>
                    </div> 
                   )
                })
            }
        </div>
    )
  }  
  return (
    <div>
      <FlightHeader To={Flight_Offers?.depart_trip?.segments[0]?.destinationPlace?.name} From={Flight_Offers?.depart_trip?.segments[0]?.originPlace?.name} />
     
        
        <div className='container flex flex-col w-full mt-10 mb-10'>
        {screenSize.width > 850 ? Max_screen() : Min_Midum_Screen()}
            
           
        </div>

      </div>
  )
}




