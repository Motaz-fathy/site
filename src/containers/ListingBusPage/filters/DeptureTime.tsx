import Slider from "rc-slider";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  return `${month.toUpperCase()} ${day}`;
}
function formatTime(dateString?: string): string {
  if (!dateString) {
    return "--:--";
  }

  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const isAM = hours < 12;

  let formattedHours = (hours % 12).toString().padStart(2, "0");
  if (formattedHours === "00") {
    formattedHours = "12";
  }

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const amPmIndicator = isAM ? "AM" : "PM";

  return `${formattedHours}:${formattedMinutes} ${amPmIndicator}`;
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

function count_duplicate_time(trips: any[], depaturetime: String[]) {
  let count_times: any[] = [];
  depaturetime?.map((date: any) => {
    let count = 0;
    trips?.map((trip: any) => {
      if (trip?.travel_at === date) {
        count += 1;
      }
    });
    if (count > 0) {
      count_times.push({ date: date, count: count });
    }
  });
  return count_times;
}

function count_duplicate_arrival_time(trips: any[], arrivalTime: String[]) {
  let count_times: any[] = [];
  arrivalTime?.map((date: any) => {
    let count = 0;
    trips?.map((trip: any) => {
      if (trip?.arrival_at === date) {
        count += 1;
      }
    });
    if (count > 0) {
      count_times.push({ date: date, count: count });
    }
  });
  return count_times;
}

interface depture_time_props {
  DepatureTime: any;
  SetData: Function;
  City: number;
  RefactoredData: any;
  ArrivalTime: any;
}
export const DeptureTime: FC<depture_time_props> = ({
  DepatureTime,
  SetData,
  City,
  RefactoredData,
  ArrivalTime
}) => {
  const { t } = useTranslation();
  const [slider_depature_filter_data, set_slider_depature_filter_data]: any =
    useState(RefactoredData);
    const [slider_arrival_filter_data, set_slider_arrival_filter_data]: any =
    useState(RefactoredData);
  // depature hooks 

  const [start_depature_time, set_start_depature_time] = useState(
    count_duplicate_time(RefactoredData, DepatureTime)[0].date
  );
  const [start_depature_date, set_start_depature_date] = useState(
    count_duplicate_time(RefactoredData, DepatureTime)[0].date
  );
  const [end_depature_time, set_end_depature_time] = useState(
    count_duplicate_time(RefactoredData, DepatureTime)[
      count_duplicate_time(RefactoredData, DepatureTime).length - 1
    ].date
  );

  // arrival hooks
  
  const [start_Arrival_time, set_start_Arrival_time] = useState(
    count_duplicate_arrival_time(RefactoredData, ArrivalTime)[0].date
  );
  const [start_Arrival_date, set_start_Arrival_date] = useState(
    count_duplicate_arrival_time(RefactoredData, ArrivalTime)[0].date
  );
  const [end_Arrival_time, set_end_Arrival_time] = useState(
    count_duplicate_arrival_time(RefactoredData, ArrivalTime)[
      count_duplicate_arrival_time(RefactoredData, ArrivalTime).length - 1
    ].date
  );
  // filter arrival time 
  const handleSliderChandeInArrival = (e: any) => {
   
    set_start_Arrival_time(
      count_duplicate_arrival_time(RefactoredData, ArrivalTime).slice(e[0], e[1])[0].date
    );
    set_end_Arrival_time(
      count_duplicate_arrival_time(RefactoredData, ArrivalTime).slice(e[0], e[1])[
        count_duplicate_arrival_time(RefactoredData, ArrivalTime).slice(e[0], e[1]).length - 1
      ].date
    );
    set_start_Arrival_date(
      count_duplicate_arrival_time(RefactoredData, ArrivalTime).slice(e[0], e[1])[0].date
    );


    set_slider_arrival_filter_data([]);
    count_duplicate_arrival_time(RefactoredData, ArrivalTime)
      .slice(e[0], e[1])
      ?.map((date) => {
        RefactoredData?.map((trip: any) => {
          if (trip?.arrival_at === date?.date) {
            slider_depature_filter_data?.map((dep_trip: any) => {
              if(dep_trip === trip) {
                const update_filter = (trip:any) => {
                  set_slider_arrival_filter_data((prev: any) => [...prev , trip])
                }
                update_filter(trip)
              }
            })
         
  
          }
        });
      });
      set_start_depature_time(sortByTravelAt(slider_arrival_filter_data)[0].travel_at)
      set_end_depature_time(sortByTravelAt(slider_arrival_filter_data)[sortByTravelAt(slider_arrival_filter_data).length - 1].travel_at)
      set_start_depature_date(sortByTravelAt(slider_arrival_filter_data)[0].travel_at)

      SetData(sortByArrivalAt(slider_arrival_filter_data).reverse());

  };
  // filter depature time 
  const handleSliderChange = (e: any) => {
    set_start_depature_time(
      count_duplicate_time(RefactoredData, DepatureTime).slice(e[0], e[1])[0]
        .date
    );
    set_end_depature_time(
      count_duplicate_time(RefactoredData, DepatureTime).slice(e[0], e[1])[
        count_duplicate_time(RefactoredData, DepatureTime).slice(e[0], e[1])
          .length - 1
      ].date
    );
    set_start_depature_date(
      count_duplicate_time(RefactoredData, DepatureTime).slice(e[0], e[1])[0]
        .date
    );
    set_slider_depature_filter_data([]);
    count_duplicate_time(RefactoredData, DepatureTime)
      .slice(e[0], e[1])
      ?.map((date) => {
        RefactoredData?.map((trip: any) => {
          if (trip?.arrival_at === date?.date) {
          
            slider_arrival_filter_data?.map((arrival_trip: any) => {
              if(arrival_trip === trip) {
                const update_filter = (trip:any) => {
                  set_slider_depature_filter_data((prev: any) => [...prev , trip])
                }
                update_filter(trip)
              }
            })
          }
        });
      });

    SetData(sortByTravelAt(slider_depature_filter_data).reverse());
  };

  return (
    <div className="flex  w-full flex-col items-center gap-3 bg-white p-2">
      <div className="m-auto w-full">
        <h6 className="my-4 flex justify-between text-sm  text-slate-500">
          {t("Depart from")} "cairo"{" "}
          <span className="text-xm h-[18px] w-[60px] rounded-lg bg-blue-300 text-center  align-middle  font-bold  text-stone-900 ">
            {formatDate(start_depature_date)}
          </span>
        </h6>
        <div className="my-3 flex justify-between">
          <span className="text-xs">{formatTime(start_depature_time)}</span>

          <span className="text-xs">{formatTime(end_depature_time)}</span>
        </div>
        <Slider
          range
          pushable={true}
          className="text-red-400"
          min={0}
          max={count_duplicate_time(RefactoredData, DepatureTime).length - 1}
          defaultValue={[
            0,
            count_duplicate_time(RefactoredData, DepatureTime).length - 1
          ]}
          allowCross={false}
          step={1}
          onChange={(e: any) => handleSliderChange(e)}
        />
      </div>
      <div className="m-auto w-full">
        <h6 className="my-4 flex justify-between text-sm  text-slate-500">
          {t("Arrival to")} "alx"{" "}
          <span className="text-xm h-[18px] w-[60px] rounded-lg bg-blue-300 text-center  align-middle  font-bold  text-stone-900 ">
            {formatDate(start_Arrival_date)}
          </span>
        </h6>
        <div className="my-3 flex justify-between">
          <span className="text-xs">{formatTime(start_Arrival_time)}</span>

          <span className="text-xs">{formatTime(end_Arrival_time)}</span>
        </div>
        <Slider
          range
          pushable={true}
          className="text-red-400"
          min={0}
          max={count_duplicate_arrival_time(RefactoredData, ArrivalTime).length - 1}
          defaultValue={[
            5,
            count_duplicate_arrival_time(RefactoredData, ArrivalTime).length - 1]}
          allowCross={false}
          step={1}
          onChange={(e: any) => handleSliderChandeInArrival(e)}
        />
      </div>
    </div>
  );
};
