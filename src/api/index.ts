import axios from "axios";
import i18n from "i18n";

export function getCities(): Promise<any> {
	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/locations`,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
			},
		},
	);
}
export function getCitiesMaritime(): Promise<any> {
	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/locations/maritime`,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
			},
		},
	);
}
export function getCitiesPrivate(): Promise<any> {
	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/locations/private`,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
			},
		},
	);
}
export function getAddressList(): Promise<any> {
	const token = localStorage.getItem("token");

	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/profile/address-book`,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
				Authorization: "Bearer " + token,
			},
		},
	);
}
export function getSeats(data: any): Promise<any> {
	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/trips/${data?.id}/available-seats?from_location_id=${data?.from_location_id}&date=${data?.date}&from_city_id=${data?.cityFrom}&to_city_id=${data?.cityTo}&to_location_id=${data?.to_location_id}`,

		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
			},
		},
	);
}
export function searchTrip(data: any, page: number): Promise<any> {
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/trips?city_from=${data?.city_from}&city_to=${data?.city_to}&date=${data?.date}&page=${page}`,
		{},
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
			},
		},
	);
}
export const createTrip = async (
	data: any,
	id: string | number,
): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/trips/${id}/create-ticket`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};


export const createOneRoundTrip = async (
	data: any
	
): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v2/transports/buses/create-ticket`,
		data,
		{
			headers: {
				"Content-Type": " application/json",
				"Accept-Language": i18n?.language,
				
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};

export const createFirstTrip = async (
	data: any
	
): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v2/transports/buses/create-ticket`,
		data,
		{
			headers: {
				"Content-Type": " application/json",
				"Accept-Language": i18n?.language,
				
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};

export const createReturnTrip = async (
	data: any,
	id: any,
): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v2/transports/buses/orders/${id}/return-ticket`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};
export const createPrivateTrip = async (
	data: any,
	id: string | number,
): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/private/trips/${id}/create-ticket`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};
export const createTripMaritime = async (
	data: any,
	id: string | number,
): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/maritime/trips/${id}/create-ticket`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};
export const createPayment = async (id: string | number): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/orders/${id}/pay`,
		{},
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};

export const updateProfile = async (body: object): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/profile`,
		body,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};

export const cancelTripApi = async (id: string | number): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/orders/${id}/cancel`,
		{},
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};
export const addAddress = async (data: any): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/profile/address-book`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};
export const editAddress = async (
	data: any,
	id: string | number,
): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.put(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/profile/address-book/${id}`,
		JSON.stringify(data),
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};
export const deleteAddress = async (id: string | number): Promise<any> => {
	const token = localStorage.getItem("token");
	const res = axios.delete(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/profile/address-book/${id}`,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
				Authorization: "Bearer " + token,
			},
		},
	);
	return res;
};
export function searchTripsMaritime(data: any, page: number): Promise<any> {
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/maritime/trips?from_location_id=${data?.city_from}&to_location_id=${data?.city_to}&date=${data?.date}&page=${page}`,
		{},
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
			},
		},
	);
}
export function listMaritime(): Promise<any> {
	const token = localStorage.getItem("token");

	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/profile/orders/maritime`,

		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
				Authorization: "Bearer " + token,
			},
		},
	);
}
export function listBus(): Promise<any> {
	const token = localStorage.getItem("token");

	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/profile/orders`,

		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
				Authorization: "Bearer " + token,
			},
		},
	);
}
export function listPrivates(): Promise<any> {
	const token = localStorage.getItem("token");

	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/profile/orders/private`,

		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
				Authorization: "Bearer " + token,
			},
		},
	);
}
export function searchTripsPrivate(data: any, page: number): Promise<any> {
	return axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/private/trips?from_location_id=${data?.city_from}&to_location_id=${data?.city_to}&date=${data?.date}&page=${page}`,

		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n.language,
			},
		},
	);
}
export const sendContact = async (data: any): Promise<any> => {
	const res = await axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/contact`,
		data,
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
			},
		},
	);
	return res;
};
export const getPartners = async (): Promise<any> => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/partners`,
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
			},
		},
	);
	return res;
};
export const getFlightsLocation = async (data: string): Promise<any> => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/flights/locations?term=${data}`,
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
			},
		},
	);
	return res;
};
export const getFlightsMarkets = async (): Promise<any> => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/flights/markets`,
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
			},
		},
	);
	return res;
};
export const getFlightsClasses = async (): Promise<any> => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/flights/cabin-classes`,
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
			},
		},
	);
	return res;
};
export const getFlightsTrips = async (data: any): Promise<any> => {
	const res = await axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/flights/search`,
		data,
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
			},
		},
	);
	console.log(data)
	return res;
};
export const getFlightsCountries = async (value:any): Promise<any> => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/flights/locations?term=${value}`,
		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
			},
		},
	);
	return res;
};
export const getFlightsTripsSession = async (
	page: number,
	tokenSession: string,
): Promise<any> => {
	const res = await axios.get(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/flights/pull/${tokenSession}?filter_dir=desc&filter_by=cheapest&page=${page}`,

		{
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": i18n?.language,
			},
		},
	);
	return res;
};
