
import CarPoster from "@/components/CarPoster";
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
    <div className="flex bg-white border border-b-4 rounded-lg m-4 items-center justify-center pb-24 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {allCars.map((car) => (
          <CarPoster key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}

// if you need to create custom embeddings
async function embedding(prompt: string) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input: prompt,
      model: "text-embedding-3-large",
      dimensions: 512,
    }),
  });

  const result = await response.json();

  return result.data[0].embedding;
}