import { Popover, Transition } from "@headlessui/react";
import {
	UserCircleIcon,
	ArrowRightOnRectangleIcon,
	LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useTranslation } from "react-i18next";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function AvatarDropdown() {
	const { t } = useTranslation();
	const [name, setName] = useState("");
	const navigate = useNavigate();

	const solutionsFoot = [
		{
			name: t("help"),
			href: "/contact",
			icon: LifebuoyIcon,
		},

		{
			name: t("logout"),
			href: "##",
			icon: ArrowRightOnRectangleIcon,
		},
	];

	const solutions = [
		{
			name: t("accountDetails"),
			href: "/profile",
			icon: UserCircleIcon,
		},
	];
	useEffect(() => {
		const lName: any = localStorage.getItem("name");
		setName(lName);
	}, []);
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("email");
		localStorage.removeItem("phone");
		navigate("/");
		window.location.reload();
	};
	return (
		<div className="AvatarDropdown font-messiri">
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button
							className={`flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<div onClick={() => navigate("/profile")} className="bg-red">
								<Avatar
									name={name}
									round="30px"
									size="40"
									value="20%"
									textSizeRatio={2}
								/>
							</div>
						</Popover.Button>
						{/* <Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute z-10 mt-4 w-screen max-w-[260px] px-4 ltr:-right-10 rtl:left-8 sm:px-0 ltr:sm:right-0 rtl:sm:left-0">
								<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-6 bg-white p-7 dark:bg-neutral-800">
										{solutions.map((item, index) => (
											<Link
												key={index}
												to={item.href}
												className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
											>
												<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
													<item.icon
														aria-hidden="true"
														className="h-6 w-6 rtl:ml-1"
													/>
												</div>
												<div className="ml-4">
													<p className="font-messiri text-sm font-medium">
														{item.name}
													</p>
												</div>
											</Link>
										))}
									</div>
									<hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
									<div className="relative grid gap-6 bg-white p-7 dark:bg-neutral-800">
										{solutionsFoot.map((item, index) => {
											if (item?.icon === ArrowRightOnRectangleIcon) {
												return (
													<button
														key={index}
														className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
														onClick={logout}
													>
														<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
															<item.icon
																aria-hidden="true"
																className="h-6 w-6 rtl:ml-1"
															/>
														</div>
														<div className="ml-4">
															<p className="font-messiri text-sm font-medium">
																{item.name}
															</p>
														</div>
													</button>
												);
											}
											return (
												<a
													key={index}
													href={item.href}
													className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
												>
													<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
														<item.icon
															aria-hidden="true"
															className="h-6 w-6 rtl:ml-1"
														/>
													</div>
													<div className="ml-4">
														<p className="font-messiri text-sm font-medium">
															{item.name}
														</p>
													</div>
												</a>
											);
										})}
									</div>
								</div>
							</Popover.Panel>
						</Transition> */}
					</>
				)}
			</Popover>
		</div>
	);
}
