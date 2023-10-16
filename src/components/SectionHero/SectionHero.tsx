import React, { FC, useLayoutEffect } from "react";
import homeBg1 from "images/homeBg1.png";
import homeBg2 from "images/homeBg2.png";
import homeBg3 from "images/homeBg3.png";
import homeBg4 from "images/homeBg4.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import { useTranslation } from "react-i18next";

export interface SectionHeroProps {
	className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	const slides = [
		{
			url: homeBg3,
			progress: "25%",
		},
		{
			url: homeBg2,
			progress: "50%",
		},
		{
			url: homeBg1,
			progress: "75%",
		},

		{
			url: homeBg4,
			progress: "100%",
		},
	];

	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [openTab, setOpenTab] = React.useState("");
	useLayoutEffect(() => {
		window.addEventListener("storage", () => {
			const sessionTab = sessionStorage.getItem("currentActiveTab");
			if (sessionTab) {
				setOpenTab(sessionTab);
			}
			// ...
		});
		switch (openTab) {
			case "Flights":
				setCurrentIndex(2);
				break;
			case "Bus":
				setCurrentIndex(0);

				break;
			case "Cars":
				setCurrentIndex(3);

				break;
			case "Maritime transport":
				setCurrentIndex(1);
				break;
		}
		return () => {
			window.removeEventListener("storage", () => {});
		};
	}, [openTab]);
	// const prevSlide = () => {
	// 	const isFirstSlide = currentIndex === 0;
	// 	const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
	// 	setCurrentIndex(newIndex);
	// };

	const nextSlide = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex: any) => {
		setCurrentIndex(slideIndex);
	};
	return (
		<div
			className={`nc-SectionHero  relative flex w-full   bg-cover bg-center lg:flex-col ${className} h-[80vh]  
			
			bg-black max-md:mt-0 max-md:h-[484px] 
			 
			max-sm:mt-0 max-sm:h-[484px] max-sm:flex-col 
			sm:flex-col
			`}
			data-nc-id="SectionHero"
			style={{
				backgroundImage: `url(${slides[currentIndex].url})`,
				// WebkitBorderBottomLeftRadius:"0"
			}}
		>
			{/* slider */}
			<div
				className="relative flex-row-reverse items-center max-md:mx-auto
			
			max-md:mt-10
			max-md:mb-44 max-sm:mx-auto max-sm:mt-24
			max-sm:mb-44 md:mx-auto md:mt-10
			md:mb-44 lg:right-[-20%] lg:flex
			"
			>
				<div
					className=" z-0  mt-[-60px] flex  h-[220px] w-full max-w-[400px] flex-col py-1  px-4
				max-sm:max-w-[400px]

				"
				>
					<div
						className="h-full w-[512px] flex justify-center items-center rounded-[4px] bg-[#FFFFFF1A] bg-cover bg-center pl-4 duration-500
						max-sm:max-w-[380px]
					
					"
					>
					<div>
					<div className="text-white">
							<span>{currentIndex + 1}/4</span>
							<div
								className="mb-6 h-1  w-[400px] bg-[#FFFFFF1A] 
								max-sm:max-w-[340px]
							
							"
							>
								<div
									className="h-1 bg-white"
									style={{ width: slides[currentIndex].progress }}
								></div>
							</div>
						</div>
						<h4 className="pb-2 text-2xl text-white ">Your First Title</h4>
						<p
							className="pb-6 text-base text-white 
				max-sm:max-w-[300px]
						
						"
						>
							Lorem , consectetur adipiscing elit. Vestibulum porta ipsum
						</p>
					</div>
					</div>
					<div
						className="absolute top-[20%] right-[-48px] rtl:right-[500px] flex h-[42px] max-sm:right-[28%]
						max-sm:rtl:right-[98%]
						 w-[42px] translate-y-[-100%]	 translate-x-[70px] cursor-pointer 
						 items-center justify-center rounded-full bg-[#EBEBEC70]  p-2 text-2xl text-white"
						onClick={nextSlide}
					>
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</button>
					</div>
					<div className="mt-2 flex cursor-pointer justify-center gap-3 ">
						{slides.map((slide, slideIndex) => (
							<button
								key={slideIndex}
								className=" z-0 cursor-pointer text-2xl text-white  "
								onClick={() => {
									goToSlide(slideIndex);
								}}
							>
								<img
									className="h-[64px] w-[64px] cursor-pointer rounded-[4px] "
									src={slide.url}
									alt=""
								/>
							</button>
						))}
					</div>
				</div>
			</div>
			<div
				className="relative z-10 mb-12 flex w-full flex-col items-center justify-center text-center lg:mb-0 lg:mt-40 lg:justify-end
			
			"
			>
				<div
					className="mb-48 flex h-[60vh] w-full justify-center text-justify sm:h-min sm:px-5 lg:mt-[-300px] 
				"
				>
					<HeroSearchForm />
				</div>
			</div>
		</div>
	);
};

export default SectionHero;
