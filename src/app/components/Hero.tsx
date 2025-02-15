"use client";

import Image from "next/image";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface HeroProps {
  address: string;
  setAddress: (address: string) => void;
  getCurrentLocation: () => void;
  handleFindRestaurants: () => void;
}

export const Hero = ({ address, setAddress, getCurrentLocation, handleFindRestaurants } : HeroProps) => {
  return (
    <section className="relative w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3324.0589193798637!2d73.03331707645346!3d33.577819442630975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM0JzQwLjEiTiA3M8KwMDInMDkuMiJF!5e0!3m2!1sen!2s!4v1739526298348!5m2!1sen!2s"
        className="w-full h-[60vh] object-cover"
        loading="lazy"
      ></iframe>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-3/5 p-4 bg-black rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4">
        {/* Address Input */}
        <div className="relative w-full md:w-3/4">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <i className="pi pi-map-marker"></i>
          </span>
          <InputText
            placeholder="Enter Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-10 py-2 rounded-md"
          />
          <button
            onClick={getCurrentLocation}
            className="absolute inset-y-0 right-1 px-3 py-1 text-sm flex items-center gap-2 rounded-md bg-gray-100"
          >
            <Image
              src={"/assets/icons/focus.png"}
              alt="Share Location"
              width={20}
              height={20}
            />
            <span className="hidden md:inline">Share Location</span>
          </button>
        </div>

        {/* Search Button */}
        <Button
          label="Find Restaurants"
          className="bg-primary w-full md:w-1/4 border-0 text-black"
          rounded
          onClick={handleFindRestaurants} // UPDATED
        />
      </div>
    </section>
  );
};
