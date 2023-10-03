import React from 'react'
import swvel from "images/image 4.png";
import paymob from "images/image 2.png";
import webus from "images/image 6 (1).png";
import skyscanner from "images/image 3.png";
import elgesrElAraby from "images/image 5.png";
import ontimebus from "images/image 8.png";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export const SliderOurPartner = () => {
  return (
    <>
         <Swiper
        slidesPerView={4}
        spaceBetween={5}
        
        className="mySwiper"
      >
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center'><img src={`${ paymob}`} />
          </div> 
       </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center'><img src={`${swvel}`} />
          </div> 
       </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center'><img src={`${webus}`} />
          </div> 
       </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center'><img src={`${skyscanner}`} />
          </div> 
       </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center'><img src={`${elgesrElAraby}`} /></div>

        </SwiperSlide>
        <SwiperSlide>
          <div className='w-[150px] h-[150px] flex justify-center items-center'><img src={`${ontimebus}`} />
          </div> 
       </SwiperSlide>
       
       
      </Swiper>
    </>
  )
}
