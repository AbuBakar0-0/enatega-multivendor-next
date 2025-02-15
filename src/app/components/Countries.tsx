interface Location {
  name: string;
  city: string;
}

interface CountriesProps {
  location: Location[];
}

export const Countries = ({ location }: CountriesProps) => {
  return (
    <div className="container mx-auto px-5 md:px-0">
      <h2 className="w-full text-2xl font-bold text-left my-8">
        Explore Countries
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {location.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white flex flex-row justify-between items-center"
          >
            <p className="text-gray-600">{item.name}</p>
            <i className="pi pi-angle-right text-gray-600"></i>
          </div>
        ))}
      </div>
    </div>
  );
};
