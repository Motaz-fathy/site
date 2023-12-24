import React, { FC, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import removeDuplicates from "utils/removeDuplicates";
import { RefactoredData } from "./ListingBusPage";
import { each, filter, set } from "lodash";
import Styled from './page.module.css'
import i18next, { t } from "i18next";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import refactorData from "utils/refactorData";
//ingore ts

// toools
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
  
    return `${month.toUpperCase()} ${day}`;
  }
  function formatTime(dateString?: string): string {
    if (!dateString) {
      return '--:--';
    }
  
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isAM = hours < 12;
  
    let formattedHours = (hours % 12).toString().padStart(2, '0');
    if (formattedHours === '00') {
      formattedHours = '12';
    }
  
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const amPmIndicator = isAM ? 'AM' : 'PM';
  
    return `${formattedHours}:${formattedMinutes} ${amPmIndicator}`;
  }

  interface TripData {
    arrival_at: string;
    travel_at: string;
    // Other trip data...
  }
  
  interface FilteredTripData {
    arrivalDate: string;
    // Other filtered trip data...
  }
  
  function filterTrips(tripData: TripData[], startDate: string, endDate: string): TripData[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    return tripData.filter((trip) => {
      const arrivalDate = new Date(trip.arrival_at);
      return arrivalDate >= start && arrivalDate <= end;
    });
  }
  
  function filterTripsTravelTime(tripData: TripData[], startDate: string, endDate: string): TripData[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    return tripData.filter((trip) => {
      const arrivalDate = new Date(trip.travel_at);
      return arrivalDate >= start && arrivalDate <= end;
    });
  }
  interface CompanyData {
    name: string;
    avatar: string;
    bus_image: string;
  }
  
  interface TravelData {
    company_data: CompanyData;
    travel_from: string;
    trip_url: string;
    travel_at: string;
    classes: string;
    city_from_name: string;
    city_from: number;
    city_to: number;
    city_to_name: string;
    travel_to: string;
    arrival_at: string;
    gateway_id: string;
    duration: string;
    prices_start_with: number;
    available_seats: number;
    avatar: string;
    bus_img: string;
    comapny_name: string;
    company_logo: string;
  }
  function sortByTravelAt(arr: TravelData[]): TravelData[] {
    const sortedArr = [...arr].sort((a, b) => {
      const dateA = new Date(a.travel_at);
      const dateB = new Date(b.travel_at);
      return dateB.getTime() - dateA.getTime();
    });
  
    return sortedArr;
  }
  function sortByArrivalAt(arr: TravelData[]): TravelData[] {
    const sortedArr = [...arr].sort((a, b) => {
      const dateA = new Date(a.arrival_at);
      const dateB = new Date(b.arrival_at);
      return dateB.getTime() - dateA.getTime();
    });
  
    return sortedArr;
  }
// end tools

export interface RangeFilterProps {
    filterName: string;
    firstRangePoint: string;
    lastRangePoint: string;
    dataPointsArray: string[];
    departureRange?: any;
    setDepartureRange?: Function;
    arrivalRange?: any;
    setArrivalRange?: Function;
}

{
    /* // export const RangeFilter: FC<RangeFilterProps> = (props) => { */
}
//     const { filterName, dataPointsArray, firstRangePoint, lastRangePoint, arrivalRange, setArrivalRange, departureRange, setDepartureRange } = props
//     return (

//         </div >

//     )
// }
export interface Ranges {
    filterName: string;
    firstRangePoint: string;
    lastRangePoint: string;
}
export interface TripsProps {
    ranges: Ranges[];
    cardName: string;
    dataPointsArray: any;
}

// export const BusFilterCard: FC<TripsProps> = (props) => {
//     const { ranges, cardName, dataPointsArray } = props
//     return (
//         <div className='w-full flex flex-col rounded h-6 shadow-md h-fit p-3'>
//             <h5 className='p-2 border-b-2 border-w'>{cardName}</h5>
//             {ranges.map((range, i) => < RangeFilter dataPointsArray={dataPointsArray} {...range} key={i} />)}
//         </div>
//     )
// }
export interface CheckBoxTypes {
    checkBoxArray: string[];
    name: string;
    handleChange: Function;
    title: string,
    
}
export const CheckBox = (props: CheckBoxTypes) => {
    const [open , setOpen] = useState(false)
    const handleClick = (event : React.MouseEvent<HTMLElement>) => {
        if(event.currentTarget.id === "Classes") {
            const Classes = document.getElementById("Classesdiv") 
            Classes?.classList.toggle('hidden')
            setOpen(!open)
            }  
        if(event.currentTarget.id === "departure Stations") {
            const departure_Stations = document.getElementById("departure Stationsdiv") 
            departure_Stations?.classList.toggle('hidden')
            setOpen(!open)
            }   
            
            if(event.currentTarget.id === "Arrival Stations") {
                const Arrival_Stations = document.getElementById("Arrival Stationsdiv") 
                Arrival_Stations?.classList.toggle('hidden')
                setOpen(!open)
                }  
    }
    const { checkBoxArray, name, handleChange, title  } = props;
    return (
        <div className="mb-10 flex h-6 h-fit w-full flex-col rounded-lg bg-white p-3 shadow-md">
            <h5 className="border-w border-b-2 p-2 cursor-pointer flex justify-between items-center"  onClick={handleClick} id={title}><span>{`${t(title)}`}</span>
            <ChevronDownIcon
								className={`${open ? "-rotate-180" : "text-opacity-70"}
                  ml-2 h-4 w-4  transition duration-150 ease-in-out group-hover:text-opacity-80`}
								aria-hidden="true"
							/>
            </h5>
            <div className="flex h-fit w-full flex-col" id={`${title}div`}>
                {checkBoxArray.map((item, i) => (
                    
                    <div className="my-3 flex items-center gap-4" key={i}>
                        <input
                            type="checkbox"
                            className="rounded-[3px] focus:bg-transparent text-[#1D4179]"
                            id={item}
                            name={item}
                            value={item}
                            onChange={e => handleChange(name, e)}
                        />
                        <label htmlFor={item}>{item}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
export interface SimpleRange {
    [index: number]: number;
}
export interface SelectedCheckBoxesProps {
    seatsFilter: string[];
    departureFilter: string[];
    operatorFilter: string[];
    arrivalFilter: string[];
    
}
export interface BusResultsFiltersProps {
    RefactoredData: any;
    className: string;
    isLoading: boolean;
    // setRefactoredData: Function;
    // setFilterFunction: Function;
    setData: Function;
    TravleFrom : number ,
    TravleTo : number 

}

const BusResultsFilters: FC<BusResultsFiltersProps> = React.memo(props => {
    const {
        className,
        RefactoredData,
        isLoading,
        setData,
        TravleFrom,
        TravleTo
    } = props;
    const refactoredData: any[] = RefactoredData.filter((item: any) => {
		
        if(item.city_from === TravleFrom && item.city_to === TravleTo ) {
			return item
		} else{
			// console.log(item)
		}
		
	})
    const prices = [...refactoredData]
        .map((each: any) => each.prices_start_with)
        .sort();
    const data = [...refactoredData];
    const rawDataForArrival_at = [...refactoredData];
    const rawDataForTravel_at = [...refactoredData];
    const rawDataForprices = [...refactoredData];

    
    const sortedTravel_at = rawDataForTravel_at.sort(
        (a: RefactoredData, b: RefactoredData) =>
            new Date(a.travel_at).getTime() - new Date(b.travel_at).getTime(),
    );

    const sortedArrival_at = rawDataForArrival_at.sort(
        (a: RefactoredData, b: RefactoredData) =>
            new Date(a.arrival_at).getTime() - new Date(b.arrival_at).getTime()
    )
    const arrival_atTimes = removeDuplicates(sortedArrival_at, "arrival_at").map(each => each.arrival_at)
    const travel_atTimes = removeDuplicates(sortedTravel_at, "travel_at").map(
        (each: any) => each.travel_at
    );

     function remove (arr: any[])  {
        const resulte : any[] = [] 
        arr.forEach((item: any) => {
                 if(!resulte.includes(item)){
                    resulte.push(item)
                 }
        })
        
        return resulte
        
    }
    const Max_Min_prices = remove(prices)
    
    const [departureRange, setDepartureRange] = useState<[number, number]>([
        0,
        travel_atTimes.length,
    ]);
    const [arrivalRange, setArrivalRange] = useState<[number, number]>([
        0,
        arrival_atTimes.length,
    ]);
    const [pricelRange, setPriceRange] = useState<any | any[]>([
        
         Max_Min_prices[0],Max_Min_prices[Max_Min_prices.length -1],
    ]);
    const [selectedCheckboxes, setSelectedCheckboxes] =
        useState<SelectedCheckBoxesProps>({
            seatsFilter: [],
            departureFilter: [],
            operatorFilter: [],
            arrivalFilter: [],
        });
      
    //   const selectedCheckboxes = SelectedCheckboxes.filter((item: any) => {
		
        // if(item.city_from === TravleFrom && item.city_to === TravleTo ) {
        //     return item
        // } else{
        //     console.log(item)
        // }
        
    // })  


    // const [seatsFilter, setSeatsFilter] = useState<string[]>([])
    // const [departureFilter, setDepartureFilter] = useState<string[]>([])
    // const [operatorFilter, setOperatorFilter] = useState<string[]>([])
    // const [arrivalFilter, setArrivalFilter] = useState<string[]>([])
    const from = refactoredData[0].city_from_name;
    const to = refactoredData[0].city_to_name;
    
    const [f1 , setF1] = useState(false)
    const handleF1 = () => {
        setF1(!f1)
        setF2(false)
        setF3(false)
        setF4(false)
        setF5(false)
        setF6(false)
    }
    const [f2 , setF2] = useState(false)
    const handleF2 = () => {
        setF2(!f2)
        setF1(false)
        setF3(false)
        setF4(false)
        setF5(false)
        setF6(false)
    }
    const [f3 , setF3] = useState(false)
    const handleF3 = () => {
        setF3(!f3)
        setF2(false)
        setF1(false)
        setF4(false)
        setF5(false)
        setF6(false)
    }
    const [f4 , setF4] = useState(false)
    const handleF4 = () => {
        setF3(false)
        setF2(false)
        setF1(false)
        setF4(!f4)
        setF5(false)
        setF6(false)
    }
    const [f5 , setF5] = useState(false)
    const handleF5 = () => {
        setF5(!f5)
        setF6(false)
        setF3(false)
        setF2(false)
        setF1(false)
        setF4(false)
    }
    const [f6 , setF6] = useState(false)
    const handleF6 = () => {
        setF5(false)
        setF6(!f6)
        setF3(false)
        setF2(false)
        setF1(false)
        setF4(false)
    }
    const nonDuplicatedPrices = removeDuplicates(
        refactoredData,
        "prices_start_with",
    )?.map((each: any) => each.prices_start_with);
    
    const nonDuplicatedClasses = removeDuplicates(refactoredData, "classes");
    const classes = nonDuplicatedClasses?.map(each => each.classes);

    const nonDuplicatedOperators = removeDuplicates(refactoredData, "gateway_id");
    const operators = nonDuplicatedOperators?.map(each => each.gateway_id);
    const nonDuplicatedDepartureStation = removeDuplicates(
        refactoredData,
        "travel_from",
    );
    const departureStations = nonDuplicatedDepartureStation.map(
        each => each.travel_from,
    );

    const arrivalStation = removeDuplicates(
        refactoredData,
        "travel_to",
    );
    const arrivalStations = arrivalStation.map(
        each => each.travel_to,
    );

    const priceRangeFilterFunctionMoreThanFirstRangePoint = (
        each : RefactoredData
    ) => {
        if (each.prices_start_with <= pricelRange[1] ) {
            return true
        }
        return false  
    } 
    const priceRangeFilterFunctionMoreThanLastRangePoint = (
        each : RefactoredData
    ) => {
        if (each.prices_start_with >= pricelRange[0] ) {
            return true
        }
        return false  
    } 
    const arrivalRangeFilterFunctionMoreThanFirstRangePoint = (
        each: RefactoredData,
    ) => {
        if (
            new Date(each.arrival_at) >= new Date(arrival_atTimes[arrivalRange[0]])
        ) {
            return true;
        }
        return false;
    };
    const arrivalRangeFilterFunctionLessThanLastRangePoint = (
        each: RefactoredData,
    ) => {
        if (
            new Date(each.arrival_at) >=
            new Date(arrival_atTimes[arrivalRange[0] ])
        ) {
            return true;
        }
        return false;
    };
    const departureRangeFilterFunctionMoreThanFirstRangePoint = (
        each: RefactoredData,
    ) => {
        if (
            new Date(each.travel_at) >= new Date(travel_atTimes[departureRange[0]])
        ) {
            return true;
        }
        return false;
    };
    const departureRangeFilterFunctionLessThanLastRangePoint = (
        each: RefactoredData,
    ) => {
        if (
            new Date(each.travel_at) <=
            new Date(travel_atTimes[departureRange[1] - 1])
        ) {
            return true;
        }
        return false;
    };

    const rangeFilterFunction = (each: RefactoredData) => {
        return (
            departureRangeFilterFunctionLessThanLastRangePoint(each) &&
            arrivalRangeFilterFunctionLessThanLastRangePoint(each) &&
            arrivalRangeFilterFunctionMoreThanFirstRangePoint(each) &&
            departureRangeFilterFunctionMoreThanFirstRangePoint(each)&&
            priceRangeFilterFunctionMoreThanFirstRangePoint(each) &&
            priceRangeFilterFunctionMoreThanLastRangePoint(each)
        );
    };

    const handleChange = (
        name: string,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const checked = e.target.checked;
        const currentState = selectedCheckboxes;
        if (checked) {
            setSelectedCheckboxes({
                ...selectedCheckboxes,
                [name]: [
                    ...selectedCheckboxes[name as keyof SelectedCheckBoxesProps],
                    e.target.value,
                ],
            });
        } else {
            const filteredSeats = currentState[
                name as keyof SelectedCheckBoxesProps
            ].filter((each: string) => each !== e.target.value);
            setSelectedCheckboxes({ ...selectedCheckboxes, [name]: filteredSeats });
        }
    };
    const arrival_atFilterFunction = (each: any) => {
        if (selectedCheckboxes.arrivalFilter.length === 0) {
            return true;
        }
        if (selectedCheckboxes.arrivalFilter.includes(each.travel_to)) {
            return true;
        }
        return false;
    };

    const travel_atFilterFunction = (each: any) => {
        if (selectedCheckboxes.departureFilter.length === 0) {
            return true;
        }
        if (selectedCheckboxes.departureFilter.includes(each.travel_from)) {
            return true;
        }
        return false;
    };
    const gateway_idFilterFunction = (each: any) => {
        if (selectedCheckboxes.operatorFilter.length === 0) {
            return true;
        }
        if (selectedCheckboxes.operatorFilter.includes(each.gateway_id)) {
            return true;
        }
        return false;
    };
    const classesFilterFunction = (each: any) => {
        if (selectedCheckboxes.seatsFilter.length === 0) {
            return true;
        }
        if (selectedCheckboxes.seatsFilter.includes(each.classes)) {
            return true;
        }
        return false;
    };
    const checkBoxFilterFunction = (each: RefactoredData) => {
        return (
            arrival_atFilterFunction(each) &&
            travel_atFilterFunction(each) &&
            gateway_idFilterFunction(each) &&
            classesFilterFunction(each)
        );
    };

    const filterFunctionsCombinator = (each: any) => {
        return checkBoxFilterFunction(each) && rangeFilterFunction(each);
    };
    useEffect(() => {
        const filteredData: any = data.filter((each) => filterFunctionsCombinator(each))
        setData(filteredData)
    }, [filterFunctionsCombinator])

    const [openbusTime , setopenbusTime] = useState(false)
    const [openPrices , setopenPrices] = useState(false)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
         
         if(event.currentTarget.id === "1") {
          const busTime = document.getElementById("toggle1") 
          busTime?.classList.toggle('hidden')
          setopenbusTime(!openbusTime)
         } 

         if(event.currentTarget.id === "2") {
            const price = document.getElementById("toggle2") 
            price?.classList.toggle('hidden')
            setopenPrices(!openPrices)
           } 

        

       
          
      };
    //   mo tools
    // depart times handling
    const [filtered_by_mo_departure_date_start, setFiltered_by_mo_depature_date_start] = useState(sortByTravelAt(refactoredData)[0].travel_at);
    const [filtered_by_mo_departure_date_end, setFiltered_by_mo_depature_date_end] = useState(sortByTravelAt(refactoredData)[refactoredData.length-1].travel_at);
const handle_Date_changes=(e:any) =>{
      setDepartureRange(e)
    // filterTripsTravelTime(data,filtered_by_mo_departure_date_start,filtered_by_mo_departure_date_end)
      setFiltered_by_mo_depature_date_start(sortByTravelAt(refactoredData)[e[0]].travel_at)
      setFiltered_by_mo_depature_date_end(sortByTravelAt(refactoredData)[e[1]].travel_at)

      console.log(e ,"handle_Date_changes" ,RefactoredData,filtered_by_mo_departure_date_end , filtered_by_mo_departure_date_start)
      }
    //   arrival time handling
    const [filtered_by_mo_arrival_date_start, setFiltered_by_mo_arrival_date_start] = useState(sortByArrivalAt(refactoredData)[0].arrival_at);
    const [filtered_by_mo_arrival_date_end, setFiltered_by_mo_arrival_date_end] = useState(sortByArrivalAt(refactoredData)[travel_atTimes.length-1].arrival_at);
    const handle_Date_changes_arrival=(e:any) =>{
      setArrivalRange(e)
    
      setFiltered_by_mo_arrival_date_start(sortByArrivalAt(refactoredData)[e[0]].arrival_at)
      setFiltered_by_mo_arrival_date_end(sortByArrivalAt(refactoredData)[e[1]].arrival_at)
    
    // setData(filterTrips(refactoredData,filtered_by_mo_arrival_date_start,filtered_by_mo_arrival_date_end))
    //   console.log(e, "handle_Date_changes_arrival",sortByArrivalAt(refactoredData),
    //   filterTrips(refactoredData,filtered_by_mo_arrival_date_start,filtered_by_mo_arrival_date_end), 
    //    filtered_by_mo_arrival_date_start, filtered_by_mo_arrival_date_end,);

      }

    // end mo tools
    return (
        <>
            <form className={`${Styled.filter_items }  ${className} `}>
                <div className="mb-10 flex h-6 h-fit w-full flex-col rounded-lg bg-white p-3 shadow-md">
                    <h5 className="border-w border-b-2 p-2 cursor-pointer flex justify-between items-center" onClick={handleClick} id={"1"}>
                        <span>{t("Bus times")}</span>
                    <span>
                    <ChevronDownIcon
								className={`${openbusTime ? "-rotate-180" : "text-opacity-70"}
                  ml-2 h-4 w-4  transition duration-150 ease-in-out group-hover:text-opacity-80`}
								aria-hidden="true"
							/>
                    </span>
                    </h5>
                    <div className={'   h-fit w-full'} id="toggle1">
                        <h6 className="my-4 text-sm text-slate-500 flex  justify-between">{t("Depart from")}{` (${from})`}  <span className="bg-blue-300 w-[60px] h-[18px] text-stone-900 text-center font-bold  align-middle  rounded-lg  text-xm ">
                             {formatDate(filtered_by_mo_departure_date_end)}
                            </span></h6>
                        <div className="my-3 flex justify-between">
                            <span className="text-xs">{formatTime(filtered_by_mo_departure_date_start)}</span>
                            
                           
                            
                            <span className="text-xs">
                                {
                                   formatTime(filtered_by_mo_departure_date_end)
                                }
                            </span>
                        </div>
                        <Slider
                            range
                            pushable={true}
                            className="text-red-400"
                            min={0}
                            max={travel_atTimes.length}
                            defaultValue={[0, travel_atTimes.length]}
                            allowCross={false}
                            step={1}
                            onChange={(e: any) => handle_Date_changes(e)}
                        />
                        <div className="h-fit w-full ">
                            <h6 className="my-4 text-sm text-slate-500 flex  justify-between">{t("arrival to")}{`(${to})`}
                            <span className="bg-blue-300 w-[60px] h-[18px] text-stone-900 text-center font-bold  align-middle  rounded-lg  text-xm ">
                             {formatDate(filtered_by_mo_arrival_date_end)}
                            </span>
                            </h6>
                            <div className="my-3 flex justify-between">
                                <span className="text-xs">
                                    {formatTime(filtered_by_mo_arrival_date_start)}
                                </span>
                                <span className="text-xs">
                                    {formatTime(filtered_by_mo_arrival_date_end)}
                                </span>
                            </div>
                            <Slider
                                range
                                pushable={true}
                                className="text-red-400"
                                min={0}
                                max={arrival_atTimes.length}
                                defaultValue={[0, arrival_atTimes.length]}
                                allowCross={false}
                                step={1}
                                onChange={(e: any) => handle_Date_changes_arrival(e)}
                            />
                        </div>
                    </div>
                </div>
                
                {
                    nonDuplicatedPrices.length > 1 &&
                    <div className="mb-10 flex h-6 h-fit w-full flex-col rounded-lg bg-white p-3 shadow-md">
                        <h5 className="border-w border-b-2 p-2 cursor-pointer flex justify-between items-center" onClick={handleClick} id={"2"}>
                            <span>{t("Price")}</span>
                        <span>
                    <ChevronDownIcon
								className={`${openPrices ? "-rotate-180" : "text-opacity-70"}
                  ml-2 h-4 w-4  transition duration-150 ease-in-out group-hover:text-opacity-80`}
								aria-hidden="true"
							/>
                    </span>
                        </h5>
                        <div className="h-fit w-full " id="toggle2">
                            <div className="my-3 flex justify-between">
                            {
                                i18next.language === "en" ? 
                                <>
                                 <span className="text-xs"> {pricelRange[0]}   </span>
                                <span className="text-xs">
                                {pricelRange[1]}
                                </span>
                                </> : 
                                <>
                                 <span className="text-xs">  {pricelRange[1]}  </span>
                                <span className="text-xs">
                                 {pricelRange[0]}
                                </span>
                                </>
                               }
                            </div>
                            <Slider
                                range
                                pushable={true}
                                className="bg-red-300"
                                min={Max_Min_prices[0]}
                                max={Max_Min_prices[Max_Min_prices.length -1]}
                                defaultValue={[Max_Min_prices[0],Max_Min_prices[Max_Min_prices.length -1]]}
                                allowCross={false}
                                step={1}
                                onChange={e => setPriceRange(e)}
                            />
                        </div>
                    </div>
                }

                {classes.length > 1 && <CheckBox
                    
                    handleChange={handleChange}
                    name="seatsFilter"
                    checkBoxArray={classes}
                    title="Classes"
                />}
                {operators.length > 1 && <CheckBox
                    handleChange={handleChange}
                    name="operatorFilter"
                    checkBoxArray={operators}
                    title="Operators"

                />}
                {departureStations.length > 1 && <CheckBox
                    handleChange={handleChange}
                    name="departureFilter"
                    checkBoxArray={departureStations}
                    title="departure Stations"


                />}
                {arrivalStations.length > 1 && <CheckBox
                    handleChange={handleChange}
                    name="arrivalFilter"
                    checkBoxArray={arrivalStations}
                    title="Arrival Stations"

                />}

            </form>

            <div className={`  ${Styled.scroll}  xl:hidden lg:hidden   `}>
            <form className={` flex justify-around items-center ml-[365px] mr-[365px] `}>

                    
       
            <div className={`${Styled.f4}`}>
                <div className={`${Styled.f4_icon} ml-[5px]`} onClick={handleF4}>
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1C12.755 1 15.455 1.232 18.083 1.678C18.616 1.768 19 2.234 19 2.774V3.818C19 4.11348 18.9418 4.40606 18.8287 4.67904C18.7157 4.95203 18.5499 5.20007 18.341 5.409L12.909 10.841C12.7001 11.0499 12.5343 11.298 12.4213 11.571C12.3082 11.8439 12.25 12.1365 12.25 12.432V15.359C12.2501 15.777 12.1337 16.1867 11.914 16.5423C11.6943 16.8978 11.3799 17.1851 11.006 17.372L7.75 19V12.432C7.75 12.1365 7.69181 11.8439 7.57874 11.571C7.46566 11.298 7.29993 11.0499 7.091 10.841L1.659 5.409C1.45007 5.20007 1.28434 4.95203 1.17126 4.67904C1.05819 4.40606 0.999997 4.11348 1 3.818V2.774C1 2.234 1.384 1.768 1.917 1.678C4.58757 1.22586 7.29143 0.999058 10 1Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>  {t("Operator")}</div>
                <div className={`${f4 ?  Styled.f4_container : Styled.f4_dis}`}>
                {operators.length > 1 && <CheckBox
                    handleChange={handleChange}
                    name="operatorFilter"
                    checkBoxArray={operators}
                    title="Operators"
                />}
            <div>

            </div>

                </div>
            </div>
            
            <div className={`${Styled.f1}`}>
                <div className={`${Styled.f1_icon}` }  onClick={handleF1}> {t("time Bus")} </div>

                <div className={`${ f1 ?  Styled.f1_container : Styled.f1_dis } mb-10 flex h-6 h-fit  flex-col rounded-lg bg-white p-3 shadow-md`}>
                    <h5 className="border-w border-b-2 p-2">{t("Bus times")}</h5>
                    <div className="h-fit w-full ">
                        <h6 className="my-4 text-sm text-slate-500">{`${t("Depart from")} (${from})`}</h6>
                        <div className="my-3 flex justify-between">
                            <span className="text-xs">{travel_atTimes[0]}</span>
                            <span className="text-xs">
                                {
                                    travel_atTimes[
                                    travel_atTimes.length - 1
                                    ]
                                }
                            </span>
                        </div>
                        <Slider
                            range
                            pushable={true}
                            className="text-red-400"
                            min={0}
                            max={travel_atTimes.length}
                            defaultValue={[0, travel_atTimes.length -1]}
                            allowCross={false}
                            step={1}
                            onChange={(e: any) => setDepartureRange(e)}
                        />
                        <div className="h-fit w-full ">
                            <h6 className="my-4 text-sm text-slate-500">{`${t("arrival to")} (${to})`}</h6>
                            <div className="my-3 flex justify-between">
                                <span className="text-xs">
                                    {arrival_atTimes[0]}
                                </span>
                                <span className="text-xs">
                                    {
                                        arrival_atTimes[
                                        arrival_atTimes.length - 1
                                        ]
                                    }
                                </span>
                            </div>
                            <Slider
                                range
                                pushable={true}
                                className="text-red-400"
                                min={0}
                                max={arrival_atTimes.length}
                                defaultValue={[0, arrival_atTimes.length -1]}
                                allowCross={false}
                                step={1}
                                onChange={(e: any) => setArrivalRange(e)}
                            />
                        </div>
                    </div>
                </div>

            </div>


            <div className={`${Styled.f2}`}>
            <div className={`${Styled.f2_icon}`} onClick={handleF2}>{t("Price")}</div>
                <div className={`${ f2 ? Styled.f2_container : Styled.f2_dis}`}>
                {
                    nonDuplicatedPrices.length > 1 &&
                    <div className="mb-10 flex h-6 h-fit w-full flex-col rounded-lg bg-white p-3 shadow-md">
                        <h5 className="border-w border-b-2 p-2">{t("Price")}</h5>
                        <div className="h-fit w-full ">
                            <div className="my-3 flex justify-between">
                               {
                                i18next.language === "en" ? 
                                <>
                                 <span className="text-xs">  {pricelRange[0]}    </span>
                                <span className="text-xs">
                                 {pricelRange[1]} 
                                </span>
                                </> : 
                                <>
                                 <span className="text-xs">   {pricelRange[1]}   </span>
                                <span className="text-xs">
                                  {pricelRange[0]} 
                                </span>
                                </>
                               }
                            </div>
                            <Slider
                                range
                                pushable={true}
                                className="text-red-400"
                                min={Max_Min_prices[0]}
                                max={Max_Min_prices[Max_Min_prices.length -1]}
                                defaultValue={[Max_Min_prices[0],Max_Min_prices[Max_Min_prices.length -1]]}
                                allowCross={false}
                                step={1}
                                onChange={e => setPriceRange(e)}
                            />
                        </div>
                    </div>
                }
                </div>
            </div>

            <div className={`${Styled.f3}`}>
                <div className={`${Styled.f3_icon}`} onClick={handleF3}>{t("Seat classes")}</div>
                <div className={`${f3 ? Styled.f3_container : Styled.f3_dis}`}>

                {classes.length > 1 && <CheckBox
                    handleChange={handleChange}
                    name="seatsFilter"
                    checkBoxArray={classes}
                    title="Classes"
                />}

                </div>
            </div>

       

            <div className={`${Styled.f5}`}>
                <div className={`${Styled.f5_icon}`} onClick={handleF5}>{t("Departure station")}</div>
                <div className={`${f5 ? Styled.f5_container : Styled.f5_dis}`}>

                {departureStations.length > 1 && <CheckBox
                    handleChange={handleChange}
                    name="departureFilter"
                    checkBoxArray={departureStations}
                    title="departure Stations"

                />}
                </div>
            </div>

            <div className={`${Styled.f6}`}>
                <div className={`${Styled.f6_icon}`} onClick={handleF6}>{t("arrival station")}</div>
                <div className={`${f6 ? Styled.f6_container : Styled.f6_dis}`}>

                {arrivalStations.length > 1 && <CheckBox
                    handleChange={handleChange}
                    name="arrivalFilter"
                    checkBoxArray={arrivalStations}
                    title="Arrival Stations"
                />}
                </div>
            </div>



            </form>
            </div>
        </>
    );
})

export default BusResultsFilters;
