import CarPoster from "@/components/CarPoster";
import db from "@/db";
import { Car } from "@/types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// refresh cache every 24 hours
export const revalidate = 60 * 60 * 24;

async function Page({
  params: { term },
}: {
  params: {
    term: string;
  };
}) {
  const cars = db.collection("cars");

  const similarCars = (await cars
    .find(
      {},
      {
        vectorize: term,
        limit: 4,
        // Do not include vectors in the output.
        projection: { $vector: 1 },
      }
    )
    .toArray()) as Car[];

  return (
    <div className="flex flex-col bg-gray-800 border rounded-lg m-4 items-center justify-center p-20 pt-10">
      <div className="flex items-start justify-start mb-8">
        <Link href={"/find"}>
          <ChevronLeftIcon className="h-8 w-8 mr-4 text-blue-800 cursor-pointer" />
        </Link>
        <h1 className="ml-4 mb-0 text-2xl font-serif text-white">
          Suggested results based on your search
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {similarCars.map((car, i) => (
          <div key={car._id} className="flex space-x-2 relative">
            <p className="absolute flex items-center justify-center left-4 top-2 text-white font-extrabold text-xl z-40 rounded-full bg-indigo-500/80 w-10 h-10">
              {i + 1}
            </p>

            <CarPoster key={car._id} car={car} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
