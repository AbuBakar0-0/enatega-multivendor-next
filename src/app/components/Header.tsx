"use client";

import Image from "next/image";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

interface Location {
  name: string;
  city: string;
}

interface HeaderProps {
  locations: Location[];
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
}

export function Header({
  locations,
  selectedLocation,
  setSelectedLocation,
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center w-full p-4 bg-white shadow-md">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
          <div className="text-2xl font-bold">ENATEGA</div>
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center gap-4">
          <i className="pi pi-map-marker bg-gray-100 p-2 rounded-full"></i>
          <Dropdown
            value={selectedLocation}
            options={locations}
            onChange={(e) => setSelectedLocation(e.value)}
            placeholder="Select Location"
            className=""
            optionLabel="city" // Used for sorting/filtering
            valueTemplate={(option) =>
              option ? `${option.city}, ${option.name}` : "Select Location"
            }
            itemTemplate={(option) => (
              <div>
                {option.city}, {option.name}
              </div>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button label="Login" className="text-black" outlined rounded />
          <Button
            label="Sign Up"
            rounded
            className="bg-primary border-0 text-black"
          />
          <i className="pi pi-shopping-bag"></i>
        </div>
      </div>
    </header>
  );
}
