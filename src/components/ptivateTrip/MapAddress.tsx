import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AddressCard.module.css";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import Autocomplete from "react-google-autocomplete";
import i18next from "i18next";
import { addAddress, getAddressList, getCitiesPrivate } from "api";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
const MapAddress: FC<any> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState({
    lat: 30.033333,
    lng: 31.233334
  });
  console.log("location", location);
  const [name, setName] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [cityName, setCityName] = useState("");
  const [address_details, setAddress_details] = useState("");
  const phone_number = window.localStorage.getItem("phone");
  const [AddressfromMarker,setAddressfromMarker]: any =useState()
  console.log("AddressfromMarker" , AddressfromMarker)
  const navigate = useNavigate();

  const mapStyles = {
    height: "45%",
    width: "80%",
    margin: "auto",
    marginTop: 0,
    marginBottom: 10
  };

  const addAdressHandler = async () => {
    const body = {
      name: address_details,
      phone: phone_number,
      city_id: cityName,
      map_location: {
        ...location,
        address_name: address_details
      }
    };
    if (!!body) {
      await addAddress(body)
        .then((res) => {
          setLoading(false);
          toast.success("add address done");
          window.location.reload();
        })
        .catch((err: any) => {
          setLoading(false);
          if (Object.keys(err?.response?.data?.errors)?.length) {
            setLoading(false);
            showApiErrorMessages(err.response.data.errors);
          } else {
            setLoading(false);
            toast.error(err?.response?.data?.message);
          }
          if (err.response.status === 401) {
            navigate("/login");
          }
        });
    } else {
      toast.error("notValidData");
      setLoading(false);
    }
  };

  const fetchAddress = async (lat:any, lng:any) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_MAP_KEY!}`);
      const data = await response.json();
      setAddressfromMarker(data);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  }; 

  return (
    <div className={`  ${classes.addressCard}`}>
      <div className={classes.layout}></div>
      <div className={`container ${classes.layout}`}>
        <button className={` ${classes.Edit}`} onClick={addAdressHandler}>
          confirm address
        </button>
        <div className={` ${classes.input}`}>
          <label>Location Search *</label>

          <Autocomplete
            className="z-[2736289347203] h-[50px] w-full"
            apiKey={process.env.REACT_APP_MAP_KEY!}
            onPlaceSelected={(place: any) => {
              setAddress_details(place?.formatted_address);
              setLocation({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              });
            }}
            language={i18next.language}
            options={{
              types: ["address"],
              componentRestrictions: { country: "EG" }
            }}
          />
        </div>
      </div>
      <div className=" flex justify-center  md:ml-[8%] md:mt-[30px] lg:ml-[10%] lg:mt-[30px] ">
        {/* @ts-ignore */}
        <Map
          google={props.google}
          onClick={(mapProps, map, clickEvent) => {
            setLocation({
              lat: clickEvent.latLng.lat(),
              lng: clickEvent.latLng.lng()
            });
            fetchAddress(location.lat , location.lng)
          }}
          zoom={16}
          style={mapStyles}
          initialCenter={location}
          center={location}
        >
          {/* @ts-ignore */}
          <Marker position={location} />
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY!,
  libraries: ["places"]
})(MapAddress);
