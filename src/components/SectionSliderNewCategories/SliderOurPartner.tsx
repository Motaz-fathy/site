import React, { useEffect, useState } from 'react'
import swvel from "images/image 4.png";
import paymob from "images/image 2.png";
import webus from "images/image 6 (1).png";
import skyscanner from "images/image 3.png";
import elgesrElAraby from "images/image 5.png";
import ontimebus from "images/image 8.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import i18next from 'i18next';
import { getPartners } from 'api';

export const SliderOurPartner = () => {
  const [partener , set_partener] = useState([])
  console.log("partener" , partener)
  useEffect(() => {
    getPartners().then((res) => {
      set_partener(res?.data?.data)
    }).catch((err) => {
     console.log(err)
    }) 
  } , [])

  return (
    <div className=' w-full '>
         <Swiper
        slidesPerView={4}
        spaceBetween={5}
        dir="rtl"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,

        }}
        modules={[Autoplay]}
        className="  mySwiper "
      >
      
       
        {
          partener?.map((item: any) => {
            console.log(item, "partner");
            
            return (
              <SwiperSlide key={item?.id}>
              <div className='w-[150px] h-[150px] flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px] ease-in-out'><img src={item?.image} />
              </div> 
             </SwiperSlide>
       
            )
          })
        }

        
    
       

      
       
         </Swiper>
    </div>
  )
}
