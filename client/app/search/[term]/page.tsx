
import CarPoster from "@/components/CarPoster";
import db from "@/db";
import { Car } from "@/types";

// refresh cache every 24 hours
export const revalidate = 60 * 60 * 24;

async function SearchTerm({
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
        limit: 10,
        // Do not include vectors in the output.
        projection: { $vector: 0 },
      }
    )
    .toArray()) as Car[];

  return (
    <div className="flex flex-col items-center justify-center p-20 pt-10">
      <h1 className="mb-10 text-xl text-gray-100">
        Suggested results based on your search
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {similarCars.map((car, i) => (
          <div className="flex space-x-2 relative">
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

export default SearchTerm;