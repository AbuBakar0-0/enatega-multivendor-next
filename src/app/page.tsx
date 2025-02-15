"use client";

import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { client } from "./apollo";
import { Countries } from './components/Countries';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Restaurant } from "./components/Restaurant";

export default function Home() {
  const initialLocations = [
    { name: "Germany", city: "Berlin" },
    { name: "Cyprus", city: "Nicosia" },
    { name: "Georgia", city: "Tbilisi" },
    { name: "Estonia", city: "Tallinn" },
    { name: "Denmark", city: "Copenhagen" },
    { name: "Greece", city: "Athens" },
  ];

  const [locations, setLocations] = useState(initialLocations);
  const [selectedLocation, setSelectedLocation] = useState(initialLocations[0]);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [showRestaurants, setShowRestaurants] = useState(false); // NEW STATE

  const getCurrentLocation = () => {
    toast.loading("Fetching Location...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            if (data && data.address) {
              const { road, suburb, city, town, village, state, country } =
                data.address;
              const detectedCity = city || town || village || "";
              const detectedCountry = country || "";
              const minifiedAddress = `${
                road || suburb || ""
              }, ${detectedCity}, ${state || ""}, ${detectedCountry}`.trim();

              setAddress(minifiedAddress);
              toast.dismiss();
              toast.success("Location Fetched Successfully");

              let foundLocation = locations.find(
                (loc) =>
                  loc.name.toLowerCase() === detectedCountry.toLowerCase() &&
                  loc.city.toLowerCase() === detectedCity.toLowerCase()
              );

              if (!foundLocation) {
                const newLocation = {
                  name: detectedCountry,
                  city: detectedCity,
                };
                setLocations((prev) => [...prev, newLocation]);
                foundLocation = newLocation;
              }

              setSelectedLocation(foundLocation);
            } else {
              setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.dismiss();
          toast.error(
            "Unable to retrieve location. Please enable location services."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Function to trigger restaurant search
  const handleFindRestaurants = () => {
    if (!latitude || !longitude) {
      toast.error("Please share your location first!");
      return;
    }
    setShowRestaurants(true);
  };

  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col items-center w-full">
        {/* Header */}
        <Header
          locations={locations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {/* Hero Section */}
        <Hero
          address={address}
          getCurrentLocation={getCurrentLocation}
          handleFindRestaurants={handleFindRestaurants}
          setAddress={setAddress}
        />

        <Countries location={initialLocations}/>

        {/* Render Restaurants Only When Button is Clicked */}
        {showRestaurants && latitude !== null && longitude !== null && (
          <Restaurant latitude={latitude} longitude={longitude} />
        )}
      </div>
    </ApolloProvider>
  );
}
