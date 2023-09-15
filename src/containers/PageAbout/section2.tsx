
import salonPic from "images/Yellow.png";
import searchPic2 from "images/Yellow2.png";
import card_flight from "images/card_flight.png";
import card_flight2 from "images/small_card flyu.png";



export  const Section2  =()=> {
return (
    <div className="w-[99vw]  flex flex-col  justify-between mt-[100px]">
            
            
            <div className=" flex flex-row items-center justify-around w-[80%] sm:w-[90%] max-sm:w-[90%]   m-auto  max-sm:flex-col max-md:flex-col  ">
                <div className="flex flex-col  items-center   max-sm:w-[80%] max-md:w-full">
                    <div className="flex flex-row h-[244px] w-[216px] justify-center">
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
                    <h4 className="text-center text-[16px] text-[400] text-black ">Making it easier to experience the travel.</h4>
                    <p className="text-[16px] text-center text-[400]  text-[#1E1E1E]" >
                    Find tickets for flight, bus and private car you won’t see anywhere else. Check out our
                    </p>
                    <h4 className="text-center text-[16px] text-[400] text-[#1D4078]">Mobile app</h4>
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
                    <h4 className="text-center text-[16px] text-[400] text-black">Making it easier to experience the travel.</h4>
                    <p className="text-[16px] text-center text-[400] w-[419px] text-[#1E1E1E] max-sm:w-[80%]" >
                    Find tickets for flight, bus and private car you won’t see anywhere else. Check out our
                    </p>
                    <h4 className="text-center text-[16px] text-[400] text-[#1D4078]">Mobile app</h4>
                </div>
            </div>
            <div className="  flex flex-col items-start justify-around max-sm:container ">
                {/* title and p  */}
                <h4 className="text-[24px] text-[500] text-[#1E1E1E] mb-[16px]">What we do</h4>
                <p className="text-20 text-400 text-[#69696A]">
                    Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
            </div>
            
            <div className=" flex flex-col items-start justify-around  w-[80%]  m-auto my-[60px]">
                {/* title and p  */}
                <h4 className="text-[24px] text-[500] text-[#1E1E1E] mb-[16px]">Our vision</h4>
                <p className="text-20 text-400 text-[#69696A]">
                    Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
            </div>
            




    </div>

)
}