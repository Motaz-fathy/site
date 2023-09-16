import React, { useEffect, useState } from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Logo from "shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "data/navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SocialsList from "shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "components/Header/LangDropdown";

import logoImage from "images/logos/logo.png";
import { useTranslation } from "react-i18next";

export interface NavMobileProps {
	data?: NavItemType[];
	onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
	data = NAVIGATION_DEMO,
	onClickClose,
}) => {
	const { t } = useTranslation();
	const [token, setToken] = useState("");

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("email");
		localStorage.removeItem("phone");
		window.location.reload();
	};
	useEffect(() => {
		let tokenLocal = localStorage.getItem("token") ?? "";
		if (!!tokenLocal) setToken(tokenLocal);
	}, [localStorage.getItem("token")]);
	const _renderMenuChild = (item: NavItemType) => {
		return (
			<ul className="nav-mobile-sub-menu pb-1 pl-6 text-base">
				{item.children?.map((i, index) => (
					<Disclosure key={i.href + index} as="li">
						<NavLink
							end
							to={{
								pathname: i.href || undefined,
							}}
							className={({ isActive }) =>
								`mt-0.5 flex rounded-lg px-4 text-sm font-medium text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 ${
									isActive ? "text-secondary" : ""
								}`
							}
						>
							<span
								className={`py-2.5 pr-3 text-white ${!i.children ? "block w-full" : ""}`}
							>
								{i.name}
							</span>
							{i.children && (
								<span className="flex flex-1" onClick={e => e.preventDefault()}>
									<Disclosure.Button
										as="span"
										className="flex flex-1 justify-end py-2.5 "
									>
										<ChevronDownIcon
											className="ml-2 h-4 w-4 text-neutral-500"
											aria-hidden="true"
										/>
									</Disclosure.Button>
								</span>
							)}
						</NavLink>
						{i.children && (
							<Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
						)}
					</Disclosure>
				))}
			</ul>
		);
	};

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure
				key={item.id}
				as="li"
				className="text-neutral-900 dark:text-white"
			>
				<NavLink
					end
					className={({ isActive }) =>
						`flex w-full rounded-lg text-sm font-medium uppercase tracking-wide first:pt-0 dark:hover:bg-neutral-800 ${
							isActive ? "text-secondary" : ""
						}`
					}
					to={{
						pathname: item.href || undefined,
					}}
				>
					<span
						className={`py-2.5 px-5 pr-3 relative text-white after:block after:absolute after:w-full after:content-[""] after:left-0 after:bottom-0 after:bg-white after:h-[2px] ${!item.children ? "block w-full" : ""}`}
					>
						{t(`${item.name}`)}
					</span>
					{item.children && (
						<span className="flex flex-1" onClick={e => e.preventDefault()}>
							<Disclosure.Button
								as="span"
								className="flex flex-1 items-center justify-end py-2.5 "
							>
								<ChevronDownIcon
									className="ml-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</Disclosure.Button>
						</span>
					)}
				</NavLink>
				{item.children && (
					<Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
				)}
			</Disclosure>
		);
	};

	return (
		<div className="h-screen w-full transform divide-y-2 divide-neutral-100 overflow-y-auto bg-[#1d4179] shadow-lg ring-1 transition dark:divide-neutral-800 dark:bg-neutral-900 dark:ring-neutral-700">
			<div className="w-full h-fit bg-white ">

			<div className="w-full overflow-hidden bg-white flex justify-between px-4">
				<img src={logoImage} alt="logo" className="px-5 py-6 w-[40%] cursor-pointer " />
				{!token && 	<div className="flex gap-2 items-center">
					
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 17" fill="none">
<path d="M1.18177 14.0102L1.1818 14.0102L1.17658 14.0062C1.05119 13.9114 0.959763 13.7786 0.915919 13.6276C0.872245 13.4772 0.878108 13.3167 0.932612 13.1699C1.4037 11.943 2.23553 10.8877 3.31845 10.143C4.40201 9.39794 5.68602 8.99891 7.00104 8.99861C8.31605 8.99831 9.60025 9.39675 10.6841 10.1413C11.768 10.8859 12.6007 11.9417 13.0722 13.1693L13.0726 13.1703C13.1846 13.46 13.0896 13.7996 12.8248 14.0047L12.8241 14.0052C11.2157 15.2555 9.19492 16 6.99995 16L6.9992 16C4.89256 16.0032 2.84516 15.3029 1.18177 14.0102ZM8.76772 5.26777C8.29888 5.73661 7.663 6 6.99995 6C6.33691 6 5.70103 5.73661 5.23219 5.26777C4.76335 4.79893 4.49996 4.16304 4.49996 3.5C4.49996 2.83696 4.76335 2.20107 5.23219 1.73223C5.70103 1.26339 6.33691 1 6.99995 1C7.663 1 8.29888 1.26339 8.76772 1.73223C9.23656 2.20107 9.49996 2.83696 9.49996 3.5C9.49996 4.16304 9.23656 4.79893 8.76772 5.26777Z" fill="#B9C4D5" stroke="#B9C4D5"/>
</svg>
<Link  to={'/signup'} className=" cursor-pointer bg-[#1D4179] flex justify-center text-white pl-3 pr-3 pt-1 pb-1 rounded-[9px] text-[14px]" >Sign Up</Link>
<Link  to={'/login'} className=" cursor-pointer bg-[#1D4179] flex justify-center text-white pl-3 pr-3 pt-1 pb-1 rounded-[9px] text-[14px] " >Login</Link>
				</div>
}
				{/* <div className="mt-5 flex flex-col text-sm text-neutral-700 dark:text-neutral-300">
					<span>{t("navMobileDec")}</span>

					<div className="mt-4 flex items-center justify-between">
						<SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
						<span className="block">
							<SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
						</span>
					</div>
				</div> */}
				<span className="absolute top-2 p-1 ltr:right-2 rtl:left-2">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			</div>
			<ul className="flex flex-col space-y-1  py-6  ">
				{data.map(_renderItem)}
				{/* {!!token && (
					<li
						className=" py-2.5 px-5 pr-3 cursor-pointer text-white after:block after:absolute after:w-full after:absolute after:w-full after:h-[2px] after:left-0 after:bottom:0 after:bg-white after:content=['']"
						onClick={logout}
					>
						{t("logout")}
					</li>
				)} */}
			</ul>
			{/* <div className="flex items-center justify-between px-5 py-6">
				<LangDropdown panelClassName="z-10 w-screen max-w-[280px] px-4 mb-3 ltr:-left-3 rtl:-right-3 bottom-full sm:px-0" />
			</div> */}
		</div>
	);
};

export default NavMobile;
