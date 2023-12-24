import Slider from "rc-slider";
import React, { FC, useEffect, useState } from "react";
import removeDuplicates from "utils/removeDuplicates";
import { RefactoredData } from "./ListingBusPage";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
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
export interface BusResultsFiltersProps {
  RefactoredData: any;
  className: string;
  isLoading: boolean;
  setData: Function;
  TravleFrom: number;
  TravleTo: number;
  filters : any
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

export const Filters: FC<BusResultsFiltersProps> = React.memo((props) => {
  const { t } = useTranslation();
  const {
    className,
    RefactoredData,
    isLoading,
    setData,
    TravleFrom,
    TravleTo,
    filters
  } = props;

  console.log("filters" , filters , typeof filters)
  return (
    <div>

    </div>
  );
});
