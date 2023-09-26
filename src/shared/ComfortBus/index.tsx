import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const ComfortBus = ({ setSelected, seats }: any) => {
	const { t } = useTranslation();
	const [selectedList, setSelectedList] = useState<any>([]);

	const setContainer = (e: any) => {
		if (
			e.target.classList.contains("seat") &&
			!e.target.classList.contains("occupied")
		) {
			e.target.classList.toggle("selected");
			const seat: any = {};
			if (e.target?.id) {
				seat[`seat_${e.target?.id}`] = e.target?.id;
				if (selectedList[`seat_${e.target?.id}`] === undefined) {
					setSelectedList({ ...selectedList, ...seat });
					setSelected({ ...selectedList, ...seat });
				} else {
					const seats = selectedList;

					delete seats[`seat_${e.target?.id}`];
					setSelectedList({ ...seats });
					setSelected({ ...seats });
				}
			}
		}
	};

	const setSelectedSeats = () => {
		// const seats = document.querySelectorAll(".row .seat:not(.occupied)");
		const list = [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31",
			"32",
			"33",
			"34",
			"35",
			"36",
			"37",
			"38",
			"39",
			"40",
			"41",
			"42",
			"43",
			"44",
		];
		list.forEach(item => {
			const ele: any = document.getElementById(item);
			const filterSeats = seats.filter((seat: any) => seat?.id + "" === item);
			if (filterSeats?.length === 0) {
				ele.classList.add("occupied");
			} else {
				ele.classList.remove("occupied");
			}
		});
	};
	const setOccupiedSeats = () => {
		// const seats = document.querySelectorAll(".row .seat:not(.occupied)");
		const list = [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31",
			"32",
			"33",
			"34",
			"35",
			"36",
			"37",
			"38",
			"39",
			"40",
			"41",
			"42",
			"43",
			"44",
		];
		list.forEach(item => {
			const ele: any = document.getElementById(item);
			ele.classList.add("occupied");
		});
	};
	useEffect(() => {
		if (seats?.length > 0) {
			setSelectedSeats();
		} else {
			setOccupiedSeats();
		}
	}, [JSON.stringify(seats)]);
	return (
		<div className="mt-4 " dir="ltr">
			<h3 className="w-full text-2xl font-semibold">{t("selectSeats")}</h3>
			<div className="mt-2 w-full">
				<div
					className={`my-5 inline-block w-full transform overflow-hidden rounded-2xl border border-black border-opacity-5 bg-white text-left align-middle text-neutral-900 transition-all dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 sm:my-8`}
				>
					<div className="movie-container  px-1 sm:px-0">
						<ul className="showcase">
							<li>
								<div className="seat"></div>
								<small>{t("availableSeat")}</small>
							</li>
							<li>
								<div className="seat selected"></div>
								<small>{t("ownSelect")}</small>
							</li>
							<li>
								<div className="seat occupied"></div>
								<small>{t("notAvailable")}</small>
							</li>
						</ul>

						<div className="container" onClick={(e: any) => setContainer(e)}>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"1"} id={"1"}><span className="text-[12px] text-white mt-3">1</span></div>
								<div className="flex justify-center items-center seat " title={"2"} id={"2"}><span className="text-[12px] text-white mt-3">2</span></div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat " title={"3"} id={"3"}><span className="text-[12px] text-white mt-3">3</span></div>
								<div className="flex justify-center items-center seat " title={"4"} id={"4"}><span className="text-[12px] text-white mt-3">4</span></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"5"} id={"5"}><span className="text-[12px] text-white mt-3">5</span></div>
								<div className="flex justify-center items-center seat " title={"6"} id={"6"}><span className="text-[12px] text-white mt-3">6</span></div>

								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat " title={"7"} id={"7"}><span className="text-[12px] text-white mt-3">7</span></div>
								<div className="flex justify-center items-center seat " title={"8"} id={"8"}><span className="text-[12px] text-white mt-3">8</span></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"9"} id={"9"}><span className="text-[12px] text-white mt-3">9</span></div>
								<div className="flex justify-center items-center seat " title={"10"} id={"10"}><span className="text-[12px] text-white mt-3">10</span></div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat " title={"11"} id={"11"}><span className="text-[12px] text-white mt-3">11</span></div>
								<div className="flex justify-center items-center seat " title={"12"} id={"12"}><span className="text-[12px] text-white mt-3">12</span></div>
							</div>
							<div className="row">
								<div className=" flex justify-center items-center seat " title={"13"} id={"13"}><span className="text-[12px] text-white mt-3">13</span></div>
								<div className="flex justify-center items-center seat " title={"14"} id={"14"}><span className="text-[12px] text-white mt-3">14</span></div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat " title={"15"} id={"15"}><span className="text-[12px] text-white mt-3">15</span></div>
								<div className="flex justify-center items-center seat " title={"16"} id={"16"}><span className="text-[12px] text-white mt-3">16</span></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"17"} id={"17"}><span className="text-[12px] text-white mt-3">17</span></div>
								<div className="flex justify-center items-center seat " title={"18"} id={"18"}><span className="text-[12px] text-white mt-3">18</span></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"19"} id={"19"}><span className="text-[12px] text-white mt-3">19</span></div>
								<div className="flex justify-center items-center seat " title={"20"} id={"20"}><span className="text-[12px] text-white mt-3">20</span></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"21"} id={"21"}><span className="text-[12px] text-white mt-3">21</span></div>
								<div className="flex justify-center items-center seat " title={"22"} id={"22"}><span className="text-[12px] text-white mt-3">22</span></div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat " title={"23"} id={"23"}><span className="text-[12px] text-white mt-3">23</span></div>
								<div className="flex justify-center items-center seat " title={"24"} id={"24"}><span className="text-[12px] text-white mt-3">24</span></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"25"} id={"25"}><span className="text-[12px] text-white mt-3">25</span></div>
								<div className="flex justify-center items-center seat " title={"26"} id={"26"}><span className="text-[12px] text-white mt-3">26</span></div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat " title={"27"} id={"27"}><span className="text-[12px] text-white mt-3">27</span></div>
								<div className="flex justify-center items-center seat " title={"28"} id={"28"}><span className="text-[12px] text-white mt-3">28</span></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"29"} id={"29"}><span className="text-[12px] text-white mt-3">29</span></div>
								<div className="flex justify-center items-center seat " title={"30"} id={"30"}><span className="text-[12px] text-white mt-3">30</span></div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat " title={"31"} id={"31"}><span className="text-[12px] text-white mt-3">31</span></div>
								<div className="flex justify-center items-center seat " title={"32"} id={"32"}><span className="text-[12px] text-white mt-3">32</span></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"33"} id={"33"}><span className="text-[12px] text-white mt-3">33</span></div>
								<div className="flex justify-center items-center seat " title={"34"} id={"34"}><span className="text-[12px] text-white mt-3">34</span></div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat " title={"35"} id={"35"}><span className="text-[12px] text-white mt-3">35</span></div>
								<div className="flex justify-center items-center seat " title={"36"} id={"36"}><span className="text-[12px] text-white mt-3">36</span></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"37"} id={"37"}><span className="text-[12px] text-white mt-3">37</span></div>
								<div className="flex justify-center items-center seat " title={"38"} id={"38"}><span className="text-[12px] text-white mt-3">38</span></div>
								<div className="seat opacity-0"></div>
								<div className=" flex justify-center items-center seat " title={"39"} id={"39"}><span className="text-[12px] text-white mt-3">39</span></div>
								<div className="flex justify-center items-center seat " title={"40"} id={"40"}><span className="text-[12px] text-white mt-3">40</span></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat " title={"41"} id={"41"}><span className="text-[12px] text-white mt-3">41</span></div>
								<div className="flex justify-center items-center seat " title={"42"} id={"42"}><span className="text-[12px] text-white mt-3">42</span></div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat" title={"43"} id={"43"}><span className="text-[12px] text-white mt-3">43</span></div>
								<div className="flex justify-center items-center seat" title={"44"} id={"44"}><span className="text-[12px] text-white mt-3">44</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
