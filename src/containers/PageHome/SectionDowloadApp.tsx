import downloadImg from "images/download.svg";
import download1Img from "images/iphone1.svg";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SectionDowloadApp = ({
	className = "",
	rightImg = rightImgPng,
	type = "type1",
}) => {
	const { t } = useTranslation();
	return (
		<div
			className={`nc-SectionOurFeatures relative mt-10  `}
			data-nc-id="SectionOurFeatures"
		>
			<span
				className={`mt-5 flex justify-center text-center text-xl font-extrabold text-[#1E1E1E] sm:hidden  `}
			>
				{t("downLoadHeader")}
			</span>
			<div
				className={`flex  h-[317px]  gap-3 px-4 rtl:flex-row-reverse sm:h-full lg:mt-[100px] ${
					type === "type1"
						? "flex-row rtl:gap-2 "
						: "rtl:gap-2 lg:flex-row-reverse "
				} ${className}`}
			>
				<div className="hidden pb-[15px] sm:block">
					<NcImage className="mx-auto  h-[550px] w-[550px]" src={downloadImg} />
				</div>
				<div className="block h-full w-2/4 sm:hidden">
					<NcImage
						className="mx-auto  h-[418px] w-[550px]"
						src={download1Img}
					/>
				</div>

				<div
					className={`mt-18 w-2/4 sm:w-2/5 sm:max-w-2xl  sm:flex-shrink-0 lg:mt-14 ${
						type === "type1" ? "lg:pl-10" : "lg:pr-10"
					}`}
				>
					<span className="mt-5 hidden text-4xl  text-[#1E1E1E] sm:flex font-[500]">
						{t("downLoadHeader")}
					</span>
					<p className="mt-5 text-[12px] text-[#69696A] sm:text-base">
						{t("downLoadDes")}
					</p>
					<span className="mt-5 text-[12px]  text-[#1E1E1E] sm:text-lg">
						{t("downloadApp")}
					</span>

					<div className="relative flex ">
						<div className="w-full ">
							<div className="mt-5 flex flex-col justify-start gap-2 sm:mt-7 sm:flex-row">
								<a className="flex w-[120px] items-center justify-center gap-2 rounded-lg  py-2 px-2 text-white 
							    btn-hover
								rtl:flex-row-reverse sm:w-[200px] sm:py-4 sm:px-10"
								href={'https://apps.apple.com/us/app/telefreik/id6447812019'}
								target="_blank" rel="noopener noreferrer"
								>
									<span>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 sm:h-8 sm:w-8"
										>
											<g clip-path="url(#clip0_522_2378)">
												<path
													d="M16.499 0C15.2195 0.0884995 13.724 0.907495 12.8525 1.97399C12.0575 2.94148 11.4035 4.37847 11.6585 5.77497C13.0565 5.81847 14.501 4.97997 15.338 3.89548C16.121 2.88598 16.7135 1.45799 16.499 0Z"
													fill="white"
												/>
												<path
													d="M21.5553 8.05192C20.3268 6.51143 18.6003 5.61743 16.9698 5.61743C14.8174 5.61743 13.9069 6.64793 12.4114 6.64793C10.8694 6.64793 9.69789 5.62043 7.8364 5.62043C6.00791 5.62043 4.06092 6.73792 2.82643 8.64891C1.09094 11.3399 1.38794 16.3994 4.20042 20.7088C5.20692 22.2508 6.55091 23.9848 8.3089 23.9998C9.87339 24.0148 10.3144 22.9963 12.4339 22.9858C14.5534 22.9738 14.9554 24.0133 16.5169 23.9968C18.2763 23.9833 19.6938 22.0618 20.7003 20.5198C21.4218 19.4144 21.6903 18.8579 22.2498 17.6099C18.1803 16.0604 17.5278 10.2734 21.5553 8.05192Z"
													fill="white"
												/>
											</g>
											<defs>
												<clipPath id="clip0_522_2378">
													<rect width="24" height="24" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</span>
									<span className="sm:text-2xl">{t("iphone")}</span>
								</a>
								<a className="flex w-[120px] items-center   btn-hover justify-center gap-2 rounded-lg bg-[#1D4179] py-2 px-2
								 text-white rtl:flex-row-reverse sm:w-[200px] sm:py-4 sm:px-10"
								 href={'https://play.google.com/store/apps/details?id=com.teleferik'}
								 target="_blank" rel="noopener noreferrer"
								 >
									<span>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 sm:h-8 sm:w-8"
										>
											<g clip-path="url(#clip0_522_4277)">
												<path
													d="M5.23849 0.383825C4.29955 -0.135145 3.19711 -0.123146 2.26416 0.391325L13.1985 10.4783L16.8718 6.80496L5.23849 0.383825Z"
													fill="white"
												/>
												<path
													d="M1.17046 1.42334C0.90348 1.85982 0.750488 2.35929 0.750488 2.88876V21.1067C0.750488 21.6197 0.88998 22.1087 1.14197 22.5361L12.1378 11.5403L1.17046 1.42334Z"
													fill="white"
												/>
												<path
													d="M21.7419 9.49284L18.2381 7.55945L14.3008 11.4952L19.126 15.9455L21.7434 14.5011C22.6853 13.9791 23.2493 13.0431 23.2493 11.9962C23.2478 10.9493 22.6853 10.0133 21.7419 9.49284Z"
													fill="white"
												/>
												<path
													d="M13.2402 12.5571L2.21436 23.583C2.69283 23.856 3.2178 24 3.74577 24C4.25574 24 4.76871 23.871 5.23818 23.6115L17.743 16.7104L13.2402 12.5571Z"
													fill="white"
												/>
											</g>
											<defs>
												<clipPath id="clip0_522_4277">
													<rect width="24" height="24" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</span>
									<span className="sm:text-2xl">{t("Android")}</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SectionDowloadApp;
