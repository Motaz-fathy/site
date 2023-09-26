import wordImg from "images/wordImg.png";
import rightImgPng from "images/our-features.png";
import { useTranslation } from "react-i18next";

const SectionSteps = ({
	className = "",
	rightImg = rightImgPng,
	type = "type1",
}) => {
	const { t, i18n } = useTranslation();
	return (
		<>
			<div
				className={`pb-10 nc-SectionOurFeatures  mx-0 pt-10 rtl:gap-2 sm:mx-4 lg:flex-row
          ${className} overflow-hidden`}
				data-nc-id="SectionOurFeatures"
			>
				<div className="flex flex-col items-center justify-center pb-8 text-2xl font-extrabold tracking-wide text-white lg:flex-row">
					<h2>{t("stepHeader")}</h2>
				</div>
				<div className="flex flex-col items-center justify-center gap-4 px-8 sm:flex-row sm:px-0 ">
					{[1, 2, 3, 4].map(i => (
						<div className="w-[285px] rounded-xl border-[1px] border-[#FFB229]">
							<div className="my-[4px] flex -translate-x-1 items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-1 pt-4 sm:pt-12  lg:p-4">
								<div className="text-gray-500 sm:pt-2">
									<div className="w-fit bg-[#FFF7EA]">
										<svg
											width="40"
											height="40"
											className="h-12 w-12 p-2 text-[#1D4078] sm:h-12 sm:w-12"
											viewBox="0 0 40 40"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M20.0128 8.21191C12.9665 8.21191 7.23389 13.9446 7.23389 20.991C7.23389 28.0373 12.9665 33.77 20.0128 33.77C27.059 33.77 32.7917 28.0373 32.7917 20.991C32.7917 13.9446 27.0591 8.21191 20.0128 8.21191ZM16.1329 11.3152C14.8283 12.9843 13.3213 15.7546 13.0719 19.814H9.65467C10.0909 15.9489 12.6488 12.7173 16.1329 11.3152ZM9.65467 22.1679H13.0719C13.3212 26.2275 14.828 28.9975 16.1327 30.6668C12.6487 29.2645 10.0909 26.033 9.65467 22.1679ZM18.8358 30.1793C18.5544 29.8962 18.2583 29.5669 17.9634 29.1871C16.4662 27.2587 15.616 24.9018 15.429 22.1679H18.8359V30.1793H18.8358ZM18.8358 19.814H15.4289C15.6159 17.0803 16.4661 14.7234 17.9633 12.795C18.2583 12.4151 18.5544 12.0857 18.8358 11.8028L18.8358 19.814ZM30.371 19.814H26.9536C26.7044 15.7545 25.1974 12.9843 23.8926 11.3152C27.3768 12.7173 29.9346 15.9489 30.371 19.814ZM21.1897 11.7986C22.5656 13.1853 24.3093 15.7201 24.5951 19.814H21.1897V11.7986ZM21.1897 30.1793V22.1679H24.5967C24.4097 24.9017 23.5595 27.2586 22.0622 29.1871C21.7673 29.5668 21.4713 29.8962 21.1897 30.1793ZM23.8929 30.6668C25.1975 28.9976 26.7044 26.2275 26.9536 22.1679H30.3709C29.9346 26.033 27.3769 29.2645 23.8929 30.6668Z"
												fill="#1D4078"
											/>
											<path
												d="M40 21.3889C40 10.3608 31.028 1.38879 20 1.38879C8.97195 1.38879 0 10.3608 0 21.3889C0 28.0575 3.31711 34.2675 8.87336 38.0005L10.1861 36.0467C5.28188 32.7516 2.35391 27.2721 2.35391 21.3889C2.35391 11.6588 10.2699 3.74278 20 3.74278C29.7301 3.74278 37.6461 11.6589 37.6461 21.389C37.6461 26.393 35.5269 31.1039 31.876 34.4281L32.0943 31.4325L29.7466 31.2614L29.2474 38.112L36.098 38.6111L36.2691 36.2634L33.5739 36.067C37.6426 32.3064 40 27.0106 40 21.3889Z"
												fill="#1D4078"
											/>
										</svg>
									</div>
									<p className="my-4 text-[12px] leading-4 sm:text-sm ">
										{t("stepDes")}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="relative mt-10 flex flex-col justify-center  rtl:gap-2 sm:flex-row lg:mt-[100px]  ">
					<div className="mt-18 relative order-2 max-w-2xl flex-shrink-0 sm:order-1 lg:mt-14 lg:w-2/5">
						<img
							className="absolute top-[30px] mx-auto hidden lg:block"
							src={wordImg}
						/>
					</div>

					<div
						className={`mt-18 order-1 mx-4  max-w-2xl flex-shrink-0 sm:order-2 sm:m-0 lg:mt-14 lg:w-2/5 ${
							type === "type1" ? "lg:pl-10" : "lg:pr-10"
						}`}
					>
						<h2 className="mt-5 text-4xl font-medium text-white ">
							{t("newsletterHeader")}
						</h2>
						<p className="mt-2 w-2/3 text-base text-white">
							{t("newsletterDesc")}
						</p>
						<label className="relative block pb-0 sm:pb-0 ">
							<span className="sr-only">Search</span>
							<span className="absolute inset-y-0 left-0 flex items-center pl-2 rtl:inset-x-0 rtl:right-0 ">
								<svg
								className="mx-1"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_522_3491)">
										<path
											d="M23.6612 4.12929C23.32 3.53838 22.7682 3.11937 22.1072 2.94954C21.4464 2.77966 20.7608 2.88077 20.177 3.23407L15.794 5.88635L10.5753 2.45679L6.24263 4.92607L10.2946 9.21415L6.45474 11.5378L4.11385 10.4797L0.646973 12.4813L5.00958 15.4576L8.14463 15.6L22.6945 7.59438C23.2924 7.26536 23.7226 6.72227 23.906 6.06499C24.0894 5.40771 24.0025 4.72024 23.6612 4.12929ZM22.5515 5.68708C22.4705 5.97733 22.2806 6.21715 22.0166 6.36237L7.81327 14.1773L5.47219 14.071L3.28749 12.5805L4.19208 12.0582L6.54975 13.1239L12.5136 9.51494L8.49418 5.26137L10.5231 4.10505L15.7631 7.54858L20.905 4.43702C21.1628 4.28107 21.4655 4.23649 21.7573 4.3114C22.0492 4.3864 22.2928 4.57137 22.4434 4.83232C22.5941 5.09332 22.6325 5.39688 22.5515 5.68708Z"
											fill="#B9C4D5"
										/>
										<path
											d="M21.3286 20.137H0V21.5432H21.3286V20.137Z"
											fill="#B9C4D5"
										/>
									</g>
									<defs>
										<clipPath id="clip0_522_3491">
											<rect width="24" height="24" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</span>
							<input
								className="border-1 before:content-before mt-5 block rounded-none border border-white bg-transparent bg-white px-6 py-4   text-base text-white placeholder-white placeholder-opacity-50 shadow-sm placeholder:text-slate-400 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:flex before:items-center before:pl-3 focus:border-transparent focus:outline-none focus:ring-1 rtl:before:inset-x-0 sm:w-3/5 sm:text-sm"
								placeholder={t("newsletterPlaceHolder") || "Enter your email"}
								type="email"
								name="search"
							/>
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default SectionSteps;
