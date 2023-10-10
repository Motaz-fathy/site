import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";
// import logoImage from "images/logos/logo.png";
import logoImage from "images/logos/newLogo.png";
import { Logo } from "images/logos/newlogo";

import { useTranslation } from "react-i18next";

export interface WidgetFooterMenu {
	id: string;
	title: string;
	menus: CustomLink[];
}

const Footer: React.FC = () => {
	const { t, i18n } = useTranslation();

	const widgetMenus: any[] = [
		{
			id: "1",
			title: t("explore"),
			menus: [
				{ label: t("Flights") },
				{ label: t("Maritime transport") },
				{ label: t("Bus") },
				{ label: t("Cars") },
			],
		},
		{
			id: "2",
			title: t("resources"),
			menus: [
				{ href: "/terms", label: t("terms") },
				{ href: "/privacy", label: t("privacy") },
				{ href: "/faqs", label: t("faqs") },
			],
		},
		{
			id: "4",
			title: t("getInTouch"),
			menus: [
				{ href: "/contact", label: t("contactUs") },
				{ href: "/about", label: t("whoWeAre") },
				// {
				//   href: "mailto:info@telefreik.com",
				//   label: t("emailContact", { email: "info@telefreik.com" }),
				// },
				// {
				//   href: "tel:+(20) 10 6362 6268",
				//   label:
				//     i18n.language === "en"
				//       ? t("tel")
				//       : t("tel") + (201063626268).toLocaleString("ar-u-nu-arab") + "+",
				// },
				// { href: "#", label: t("location") },
			],
		},
	];

	const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
		return (
			<div key={index} className="text-sm">
				<h2 className="font-semibold text-white sm:mt-0">{menu.title}</h2>
				<ul className="space-y-4">
					{menu.menus.map((item, index) => (
						<li key={index} className="mt-3">
							{!!item?.href ? (
								<a
									key={index}
									className="text-[10px] text-white sm:text-[12px] "
									href={item?.href}
								>
									{item.label}
								</a>
							) : (
								<p className="text-[10px] text-white sm:text-[12px] ">
									{item.label}
								</p>
							)}
						</li>
					))}
				</ul>
				<div></div>
			</div>
		);
	};

	return (
		
			<div className="h-fit pt-[30px]  bg-[#0A162A] text-[#FFFFFF]   ">
				<div className="container gap-y-10 gap-x-5 sm:grid sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-10 ">
					<div className=" col-span-2 grid gap-5 sm:grid-cols-4 md:col-span-4 lg:md:col-span-1 lg:relative lg:flex lg:flex-col">
						<div className=" mx-auto  h-[174px] w-[285px] md:col-span-1 lg:absolute lg:top-[-25px]">
							<img src={logoImage} alt="logo footer" />
						</div>
					</div>
					{widgetMenus.map(renderWidgetMenuItem)}
				</div>
				<div className="flex flex-col items-center justify-center gap-4 px-4 py-8">
					<SocialsList1 className="flex flex-row items-center  space-x-3 lg:flex-row lg:items-center lg:space-x-0 lg:space-y-2.5" />
					<p className="text-sm text-white">{t("footerDec")} </p>
					<span>©{t("copyRight", { year: new Date().getFullYear() })}</span>
				</div>
			</div>
		
	);
};

export default Footer;
