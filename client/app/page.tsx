// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import {
  DocumentMagnifyingGlassIcon,
  EnvelopeIcon,
  CameraIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Header from "./_components/head";


const Home = () => {
  const items = [
    { href: '/find', icon: DocumentMagnifyingGlassIcon, text: 'Describe & Discover Cars', color: 'text-yellow-500' },
    { href: '/agent', icon: EnvelopeIcon, text: 'AI Car Booking Agent', color: 'text-green-500' },
    { href: '/lens', icon: CameraIcon, text: 'Capture with Car Lens AI', color: 'text-red-500' },
    { href: '/faq', icon: MagnifyingGlassIcon, text: 'Ask About Us (FAQ) and our OPS', color: 'text-violet-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center  text-white">
     <main className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <Header />
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <a href={item.href} className="group items-center hover:bg-gray-500 flex flex-row border p-4 rounded-lg" key={index}>
                <item.icon className={`h-12 w-12 mb-4 mr-2 ${item.color} group-hover:text-white`} />
                <div className="text-xl font-semibold text-center">{item.text}</div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
