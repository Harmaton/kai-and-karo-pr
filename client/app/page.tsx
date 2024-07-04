// pages/index.tsx

import {
  DocumentMagnifyingGlassIcon,
  EnvelopeIcon,
  CameraIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Header from "./_components/head";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const Home = () => {
  const items = [
    {
      href: "/find",
      icon: DocumentMagnifyingGlassIcon,
      text: "Describe & Discover Cars",
      color: "text-yellow-500",
    },
    {
      href: "/agent",
      icon: EnvelopeIcon,
      text: "AI Car Booking Agent",
      color: "text-green-500",
    },
    {
      href: "/lens",
      icon: CameraIcon,
      text: "Capture with Car Lens AI",
      color: "text-red-500",
    },
    {
      href: "/faq",
      icon: MagnifyingGlassIcon,
      text: "Ask About Us (FAQ) and our OPS",
      color: "text-violet-500",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center  text-white">
        <main className="flex flex-col items-center justify-center flex-1 w-full px-4">
          <Header />
          <div>
            <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-yellow-300 my-8">
              Discover Your Perfect Car
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Use Our Advanced{" "}
              <span className="text-yellow-300 text-2xl font-serif ">AI </span>{" "}
              System to Self-
              <span className="text-yellow-300 text-2xl font-serif ">
                Recommend
              </span>{" "}
              Cars Without Being an Expert
            </p>
          </div>
          <div className="text-3xl font-serif mb-2 text-center font-bold">Features</div>
          <div className="w-full max-w-4xl mb-2 ">
            <div className="grid grid-cols-1 md:grid-cols-2  justify-center lg:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <Link
                  href={item.href}
                  className="group items-center shadow-lg  dark:bg-dot-white/[0.2] bg-dot-black/[0.8] hover:bg-gray-500 flex flex-row border p-4 rounded-lg"
                  key={index}
                >
                  <div className="rounded-full p-2 mr-2 bg-yellow-300">
                  <item.icon
                    className={`h-8 w-8 m-auto items-center text-gray-800 group-hover:text-white`}
                  />
                  </div>
                  <div className="text-xl font-semibold text-center">
                    {item.text}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
