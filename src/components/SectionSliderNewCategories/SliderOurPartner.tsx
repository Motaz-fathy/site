import React from 'react'
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

export const SliderOurPartner = () => {
  return (
    <div className=' w-full '>
         <Swiper
        slidesPerView={4}
        spaceBetween={5}
        dir="rtl"
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,

        }}
        modules={[Autoplay]}
        className="  mySwiper "
      >
      
       
         <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px]'><img src={`${ paymob}`} />
          </div> 
       </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px]'><img src={`${swvel}`} />
          </div> 
       </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px]'><img src={`${webus}`} />
          </div> 
       </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px]'><img src={`${skyscanner}`} />
          </div> 
       </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px]'><img src={`${elgesrElAraby}`} /></div>

        </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center max-sm:w-[50px] max-sm:h-[50px]'><img src={`${ontimebus}`} />
          </div> 
       </SwiperSlide>
      

        
    
       

      
       
         </Swiper>
    </div>
  )
}
