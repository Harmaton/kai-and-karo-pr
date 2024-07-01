
import CarPoster from "@/components/CarPoster";
import Header from "@/components/Header";
import db from "@/db";
import { Car } from "@/types";

// refresh cache every 24 hours
export const revalidate = 60 * 60 * 24;

export default async function Home() {
  const cars = db.collection("cars");

  const allCars = (await cars
    .find(
      {}
    )
    .toArray()) as Car[];

  return (
    <div className="m-2">
    <Header />
    <h1 className="font-serif text-2xl text-white text-center mb-2 mt-4 ">Your Custom Recommendations</h1>
    <div className="flex bg-gray-800 border border-b-4 rounded-lg m-4 items-center justify-center pb-24 pt-16">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {allCars.map((car) => (
          <CarPoster key={car._id} car={car} />
        ))}
      </div>
    </div>
    </div>
  );
}

