import { City } from "containers/ListingBusPage/ListingBusPage";
import changeFromHHmmFormatToDateFormate from "./changeFromHHmmFormatToDateFormate";
import { cityName } from "./findCityName";
import { getDuration } from "./getDuration";

const refactorData = (trips: any) => {
 
	
    const data = [...trips]
	 console.log("data" , data)
	return data.flatMap((trip: any ) =>
	   
			trip.stations_from.flatMap((itemFrom: any) =>
			trip.stations_to.map((itemTo: any) => ({
				travel_from: itemFrom.name,
				trip_url: `/checkout/?${trip.date}/${itemFrom.id}/${itemTo.id}/${trip.id}/${trip.price_start_with}/${itemFrom.city_id}/${itemTo.city_id}/${trip.company}/${trip.bus.category}`,
				travel_at: changeFromHHmmFormatToDateFormate(
					trip.date,
					itemFrom.arrival_at,
				),
				classes: trip.bus.category,
				city_from_name: cityName(trip.cities_from, itemFrom.city_id),
				city_from: itemFrom.city_id,
				city_to: itemTo.city_id,
				city_to_name: cityName(trip.cities_to, itemTo.city_id),
				travel_to: itemTo.name,
				arrival_at: changeFromHHmmFormatToDateFormate(
					trip.date,
					itemTo.arrival_at,
				),
				gateway_id: trip.gateway_id,
				duration: getDuration(itemFrom.arrival_at, itemTo.arrival_at),
				prices_start_with: trip.prices_start_with.original_price, //their is more than tis opj like offer and after offer price
				available_seats: trip.available_seats,
				avatar : trip.company_data.avatar ,
				comapny_name : trip.company_data.name,
				company_logo : trip.company_data.bus_image
				

			})),
		),
		
	
	);
};
export default refactorData;
