"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

type MapFormProps = {
  values: any;
  setFieldValue?: any;
  searchField?: boolean;
};

const MapForm = ({
  values,
  setFieldValue,
  searchField = true,
}: MapFormProps) => {
  const searchRef = useRef<any>(null);
  const markerRef = useRef<google.maps.Marker | undefined | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "e-menu-script",
    googleMapsApiKey: process.env.API_MAP_KEY || "",
    libraries: ["places"],
  });
  const [map, setMap] = useState<google.maps.Map | undefined | null>(null);

  const onLoad = useCallback(
    function callback(map: any) {
      const currentPostion = {
        lat: Number(values.latitude) || 11.5564,
        lng: Number(values.longitude) || 104.9282,
      };
      const bounds = new window.google.maps.LatLngBounds(currentPostion);
      map.setZoom(14);

      if (markerRef.current) {
        markerRef.current.setPosition(currentPostion);
        map.panTo(currentPostion);
      } else {
        const marker = new window.google.maps.Marker({
          position: currentPostion,
          map,
          draggable: !!setFieldValue,
        });
        marker.addListener("dragend", (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            setFieldValue("latitude", e.latLng.lat());
            setFieldValue("longitude", e.latLng.lng());
            map.panTo(marker.getPosition() as google.maps.LatLng);
          }
        });

        markerRef.current = marker;
        setMap(map);
      }
    },
    [setFieldValue, values.latitude, values.longitude]
  );

  const onLoadSearch = (ref: any) => {
    searchRef.current = ref;
  };

  const onPlacesChanged = () => {
    if (searchRef.current) {
      const place = searchRef.current.getPlace();
      if (place && place.geometry) {
        setFieldValue("latitude", place.geometry.location.lat());
        setFieldValue("longitude", place.geometry.location.lng());
        markerRef.current?.setPosition(place.geometry.location);
        map?.panTo(place.geometry.location);
      }
    }
  };

  return isLoaded ? (
    <>
      {searchField && (
        <Autocomplete
          onPlaceChanged={onPlacesChanged}
          onLoad={onLoadSearch}
          options={{ componentRestrictions: { country: "kh" } }}
        >
          <>
            <input
              className="p-3 border w-full focus:outline-none mt-3"
              placeholder="Search your location ...."
            />
          </>
        </Autocomplete>
      )}
      <GoogleMap
        mapContainerClassName="w-full h-[567px] mt-4 relative"
        zoom={14}
        onLoad={onLoad}
      ></GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default MapForm;
