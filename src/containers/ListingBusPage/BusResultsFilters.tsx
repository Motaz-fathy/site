import React, { FC, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import removeDuplicates from "utils/removeDuplicates";
import { RefactoredData } from "./ListingBusPage";
import { each, filter, set } from "lodash";
//ingore ts
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
    const { checkBoxArray, name, handleChange, title } = props;
    return (
        <div className="mb-10 flex h-6 h-fit w-full flex-col rounded-lg bg-white p-3 shadow-md">
            <h5 className="border-w border-b-2 p-2">{title}</h5>
            <div className="flex h-fit w-full flex-col">
                {checkBoxArray.map((item, i) => (
                    <div className="my-3 flex items-center gap-4" key={i}>
                        <input
                            type="checkbox"
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
    refactoredData: any;
    className: string;
    isLoading: boolean;
    // setRefactoredData: Function;
    // setFilterFunction: Function;
    setData: Function;
}

const BusResultsFilters: FC<BusResultsFiltersProps> = React.memo(props => {
    const {
        className,
        refactoredData,
        isLoading,
        setData,
    } = props;
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

    const [departureRange, setDepartureRange] = useState<[number, number]>([
        0,
        travel_atTimes.length,
    ]);
    const [arrivalRange, setArrivalRange] = useState<[number, number]>([
        0,
        arrival_atTimes.length,
    ]);
    const [pricelRange, setPriceRange] = useState<Number | Number[]>([
        0,
        prices.length - 1,
    ]);
    const [selectedCheckboxes, setSelectedCheckboxes] =
        useState<SelectedCheckBoxesProps>({
            seatsFilter: [],
            departureFilter: [],
            operatorFilter: [],
            arrivalFilter: [],
        });
    // const [seatsFilter, setSeatsFilter] = useState<string[]>([])
    // const [departureFilter, setDepartureFilter] = useState<string[]>([])
    // const [operatorFilter, setOperatorFilter] = useState<string[]>([])
    // const [arrivalFilter, setArrivalFilter] = useState<string[]>([])
    const from = refactoredData[0].city_from_name;
    const to = refactoredData[0].city_to_name;

    const nonDuplicatedPrices = removeDuplicates(
        refactoredData,
        "prices_start_with",
    ).map((each: any) => each.prices_start_with);
    const nonDuplicatedClasses = removeDuplicates(refactoredData, "classes");
    const classes = nonDuplicatedClasses.map(each => each.classes);

    const nonDuplicatedOperators = removeDuplicates(refactoredData, "gateway_id");
    const operators = nonDuplicatedOperators.map(each => each.gateway_id);

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
            new Date(each.arrival_at) <=
            new Date(arrival_atTimes[arrivalRange[1] - 1])
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
            departureRangeFilterFunctionMoreThanFirstRangePoint(each)
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
            ].filter((each: string) => each != e.target.value);
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

    return (
        <>
            <form className={`${className}`}>
                <div className="mb-10 flex h-6 h-fit w-full flex-col rounded-lg bg-white p-3 shadow-md">
                    <h5 className="border-w border-b-2 p-2">Bus times</h5>
                    <div className="h-fit w-full ">
                        <h6 className="my-4 text-sm text-slate-500">{`Depart from (${from})`}</h6>
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
                            defaultValue={[0, travel_atTimes.length]}
                            allowCross={false}
                            step={1}
                            onChange={(e: any) => setDepartureRange(e)}
                        />
                        <div className="h-fit w-full ">
                            <h6 className="my-4 text-sm text-slate-500">{`arrival to (${to})`}</h6>
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
                                defaultValue={[0, arrival_atTimes.length]}
                                allowCross={false}
                                step={1}
                                onChange={(e: any) => setArrivalRange(e)}
                            />
                        </div>
                    </div>
                </div>
                {
                    nonDuplicatedPrices.length > 1 &&
                    <div className="mb-10 flex h-6 h-fit w-full flex-col rounded-lg bg-white p-3 shadow-md">
                        <h5 className="border-w border-b-2 p-2">Price</h5>
                        <div className="h-fit w-full ">
                            <div className="my-3 flex justify-between">
                                <span className="text-xs">{nonDuplicatedPrices[0]}</span>
                                <span className="text-xs">
                                    {nonDuplicatedPrices[nonDuplicatedPrices.length - 1]}
                                </span>
                            </div>
                            <Slider
                                range
                                pushable={true}
                                className="text-red-400"
                                min={0}
                                max={nonDuplicatedPrices.length}
                                defaultValue={[0, nonDuplicatedPrices.length - 1]}
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
        </>
    );
})

export default BusResultsFilters;
