
import CarPoster from "@/components/CarPoster";
import db from "@/db";
import { Car, SimilarCar } from "@/types";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
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
        limit: 4, // we will cut the first car and want to show  3 similar cars
        includeSimilarity: true,
      }
    )
    .toArray()) as SimilarCar[];

  // cut the first car because it is the same as the car we are looking for
  similarcars.shift();

  return (
    <div className="m-2 ">
        <div className="flex items-start justify-start mb-4 mt-4 p-2">
      <Link href={'/find'}>
        <ArrowsRightLeftIcon
          className="h-8 w-8 mr-4 text-yellow-800 cursor-pointer"
        />
        </Link>
        <h1 className="ml-4 mb-0 text-2xl font-serif text-white">
          Suggested results based on your search
        </h1>

      </div>
      <div className="flex flex-col md:flex-row items-center gap-y-10 p-10 pb-0 m-2 ">
        <Image
          src={car.Image}
          alt={car.Model}
          width={300}
          height={450}
          className="shrink-0 rounded-lg mb-2"
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