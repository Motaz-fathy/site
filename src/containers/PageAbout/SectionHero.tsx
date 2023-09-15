import { AppContext } from "components/context/AppContext";
import React, { FC, ReactNode, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface SectionHeroProps {
	className?: string;
	rightImg: string;
	heading: ReactNode;
	subHeading: string;
	btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
	className = "",
	rightImg,
	heading,
	subHeading,
	btnText,
}) => {
	const { token } = useContext(AppContext);
	return (
		<div
			className={`nc-SectionHero flex  flex-col lg:justify-center ${className}  h-[667px] w-[99vw] bg-gradient-to-r from-[#242932] to-[#2B356E] max-sm:justify-center sm:justify-center `}
			data-nc-id="SectionHero"
		>
			<div className=" flex items-center text-center align-middle max-sm:m-0  max-sm:flex-col-reverse max-sm:justify-between sm:m-0  sm:flex-col-reverse sm:justify-between  lg:mt-20  lg:flex-row lg:justify-around ">
				<div className="max-sm:mx-auto-28 m-auto w-[50vw] max-sm:mt-10 p-8 rtl:mr-[15vw] rtl:text-right max-md:mx-auto  max-sm:w-full max-sm:p-3 sm:p-3 lg:ml-80">
					<h2 className="flex w-full   text-center  font-semibold !leading-tight text-white max-sm:text-[16px] lg:text-[24px] ">
						{heading}
					</h2>
					<span className=" flex justify-center text-left text-base text-white  rtl:text-right max-sm:text-[12px] lg:text-[20px]">
						{subHeading}
					</span>
					{!!btnText && !token && (
						<ButtonPrimary href="/login">{btnText}</ButtonPrimary>
					)}
				</div>
				<div className="  max-sm:w-[600px] lg:w-[100vw] ">
					<img className=" object-fit" src={rightImg} alt="" />
				</div>
			</div>
		</div>
	);
};

export default SectionHero;
