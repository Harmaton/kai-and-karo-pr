
import CarPoster from "@/components/CarPoster";
import db from "@/db";
import { Car, SimilarCar } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

// refresh cache every 24 hours
export const revalidate = 60 * 60 * 24;

async function CarPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const cars = db.collection("cars");

  const search = await cars.find({ $and: [{ _id: id }] });

  if (!(await search.hasNext())) {
    return notFound();
  }

  const car = (await search.next()) as Car;

  const similarcars = (await cars
    .find(
      {},
      {
        vector: car.$vector,
        limit: 5, // we will cut the first car and want to show 5 similar cars
        includeSimilarity: true,
      }
    )
    .toArray()) as SimilarCar[];

  // cut the first car because it is the same as the car we are looking for
  similarcars.shift();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-y-10 p-10 pb-0">
        <Image
          src={car.Image}
          alt={car.Model}
          width={300}
          height={450}
          className="shrink-0 rounded-lg "
        />
        <div className="px-2 md:px-10 flex flex-col gap-y-2">
          <h1 className="text-6xl font-bold">{car.Name}</h1>
          <p className="text-gray-600">{car.Description}</p>
          <p className="font-light">{car.$vectorize}</p>

          <div className="mt-auto grid grid-cols-2">
           
           
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-3xl pt-10 pl-10 font-bold ">
          Similar Cars you may like
        </h2>
        <div className="flex justify-between items-center lg:flex-row gap-x-20 gap-y-10 pl-20 pr-10 py-10 overflow-x-scroll">
          {similarcars.map((car, i) => (
            <CarPoster
              key={car._id}
              index={i + 1}
             
              car={car}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarPage;