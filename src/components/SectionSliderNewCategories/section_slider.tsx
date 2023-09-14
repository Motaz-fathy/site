import React, { useState, useRef, SyntheticEvent, useEffect } from "react";

interface ScrollableListProps {
	items: string[];
}

const ScrollableList: React.FC<ScrollableListProps> = ({ items }) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft -=
				scrollContainerRef.current.offsetWidth;
			scrollContainerRef.current.scrollTo({
				left: scrollContainerRef.current.scrollLeft,
				behavior: "smooth",
			});
		}
	};

	const handleScrollRight = () => {
		if (scrollContainerRef.current) {
			const scrollWidth = scrollContainerRef.current.scrollWidth;
			const containerWidth = scrollContainerRef.current.offsetWidth;
			const maxScrollLeft = scrollWidth - containerWidth;

			let newScrollLeft =
				scrollContainerRef.current.scrollLeft + containerWidth;
			if (newScrollLeft <= maxScrollLeft) {
				newScrollLeft = 0; // Scroll back to the beginning
			}

			scrollContainerRef.current.scrollTo({
				left: newScrollLeft,
				behavior: "smooth",
			});
		}
	};

	const handleScroll = (e: SyntheticEvent<HTMLDivElement>) => {
		if (e.currentTarget && e.currentTarget.scrollLeft) {
			setScrollPosition(e.currentTarget.scrollLeft);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			handleScrollRight();
		}, 3000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="relative flex h-[150px] w-full flex-row items-center">
			<button
				className="absolute left-1 bottom-[-50px] rounded-full"
				disabled={scrollPosition === 0}
				onClick={handleScrollLeft}
			>
				<svg
					width="42"
					height="43"
					viewBox="0 0 42 43"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						opacity="0.2"
						cx="21"
						cy="21"
						r="21"
						transform="matrix(-1 0 0 1 42 0.5)"
						fill="#EBEBEC"
					/>
					<path
						d="M24 14.5L17 21.5L24 28.5"
						stroke="#B9C4D5"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<div
				ref={scrollContainerRef}
				className="no-scrollbar absolute right-2  bottom-0 flex w-full flex-nowrap space-x-4 overflow-x-scroll align-middle"
				onScroll={handleScroll}
			>
				{items.map((item, index) => (
					<div
						key={index}
						className="flex w-[20vw] flex-shrink-0 items-end justify-center rounded-lg"
					>
						<img
							className="mr-[42px] w-fit rounded-lg object-cover"
							src={item}
							alt="hero"
						/>
					</div>
				))}
			</div>
			<button
				className="absolute right-0 bottom-[-50px] rounded-full px-4"
				onClick={handleScrollRight}
			>
				<svg
					width="42"
					height="43"
					viewBox="0 0 42 43"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle opacity="0.2" cx="21" cy="21.5" r="21" fill="#EBEBEC" />
					<path
						d="M18 14.5L25 21.5L18 28.5"
						stroke="#B9C4D5"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
};

export default ScrollableList;
