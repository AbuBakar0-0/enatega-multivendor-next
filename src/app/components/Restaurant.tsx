import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { useEffect } from "react";
import { restaurantQuery } from "../apollo/queries";
import { Coordinates, Restaurants } from "../utils/interfaces";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

export const Restaurant = ({ latitude, longitude }: Coordinates) => {
  const [fetchRestaurants, { data, loading, error }] = useLazyQuery(
    restaurantQuery,
    {
      variables: { latitude, longitude },
    }
  );

  useEffect(() => {
    if (latitude && longitude) {
      fetchRestaurants();
    }
  }, [latitude, longitude, fetchRestaurants]);

  if (loading)
    return (
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="6"
        className="my-4"
      />
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.nearByRestaurants?.restaurants.length)
    return <p>No restaurants found.</p>;

  return (
    <div className="container mx-auto py-8  px-5 md:px-0" id="restaurants">
      <h2 className="w-full text-2xl font-bold text-left mb-6">
        Explore Restaurants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.nearByRestaurants.restaurants
          .filter((restaurant: Restaurants) => restaurant.isAvailable)
          .map((restaurant: Restaurants) => (
            <Card
              key={restaurant._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              title={restaurant.name}
            >
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="">
                <p className="text-gray-600 mt-2">
                  Delivery Time: 
                  <span className="font-semibold ml-1">
                    {restaurant.deliveryTime} Minutes
                  </span>
                </p>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};
