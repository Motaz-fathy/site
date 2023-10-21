import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const EconomyBus = ({ setSelected, seats }: any) => {
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
			"45",
			"46",
			"47",
			"48",
			"49",
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
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"1"} id={"1"}>1</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"2"} id={"2"}>2</div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"3"} id={"3"}>3</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"4"} id={"4"}>4</div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"5"} id={"5"}>5</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"6"} id={"6"}>6</div>

								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"7"} id={"7"}>7</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"8"} id={"8"}>8</div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"9"} id={"9"}>9</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"10"} id={"10"}>10</div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"11"} id={"11"}>11</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"12"} id={"12"}>12</div>
							</div>
							<div className="row">
								<div className=" flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"13"} id={"13"}>13</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"14"} id={"14"}>14</div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"15"} id={"15"}>15</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"16"} id={"16"}>16</div>
							</div>

							<div className="row">
								<div className=" flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"17"} id={"17"}>17</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"18"} id={"18"}>18</div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"19"} id={"19"}>19</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"20"} id={"20"}>20</div>
							</div>

							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"21"} id={"21"}>21</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"22"} id={"22"}>22</div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"23"} id={"23"}>23</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"24"} id={"24"}>24</div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"25"} id={"25"}>25</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"26"} id={"26"}>26</div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"27"} id={"27"}>27</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"28"} id={"28"}>28</div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"29"} id={"29"}>29</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"30"} id={"30"}>30</div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"31"} id={"31"}>31</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"32"} id={"32"}>32</div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"33"} id={"33"}>33</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"34"} id={"34"}>34</div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"35"} id={"35"}>35</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"36"} id={"36"}>36</div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"37"} id={"37"}>37</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"38"} id={"38"}>38</div>
								<div className="seat opacity-0"></div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"39"} id={"39"}>39</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"40"} id={"40"}>40</div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"41"} id={"41"}>41</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"42"} id={"42"}>42</div>
								<div className="seat opacity-0"></div>
								<div className=" flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"43"} id={"43"}>43</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"44"} id={"44"}>44</div>
							</div>
							<div className="row">
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"45"} id={"45"}>45</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600] " title={"46"} id={"46"}>46</div>
								
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600]" title={"47"} id={"47"}>47</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600]" title={"48"} id={"48"}>48</div>
								<div className="flex justify-center items-center seat text-[16px] text-[#1D4179] font-[600]" title={"49"} id={"49"}>49</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
