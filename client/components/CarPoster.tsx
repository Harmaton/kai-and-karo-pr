import { Car, SimilarCar } from "@/types";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";


function CarPoster({
  index,
  similarityRating,
  car,
}: {
  index?: number;
  similarityRating?: number;
  car: Car |  SimilarCar;
}) {
  return (
    <Link key={car._id} href={`/car/${car._id}`} className="">
      <div className="relative">
        <ImageWithFallback
          className="min-w-64 max-w-64 h-60 object-cover rounded-lg shadow-lg"
          src={car.Image}
          alt={car.Name}
        />

        {similarityRating && (
          <div className="absolute w-14 h-14 flex items-center justify-center bottom-0 right-0 bg-opacity-90 p-2 rounded-full m-5 font-bold">
            {similarityRating}%
          </div>
        )}

        {index && (
          <div className="absolute text-gray-100 top-32 -left-10 text-9xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {index}
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-lg text-white font-semibold line-clamp-1 w-64">{car.Name}</p>
        <p className="text-white line-clamp-1">{car.Year}</p>
      </div>
    </Link>
  );
}

export default CarPoster;