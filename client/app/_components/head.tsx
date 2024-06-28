
import Image from 'next/image';

const Header = () => {
      
  return (
    <div className="relative w-full flex flex-col items-center mb-8">
      <svg
        className="absolute inset-0 w-full h-full z-0"
        style={{
          maskImage: 'radial-gradient(100% 100% at center, white, transparent)',
        }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={100}
            height={100}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" stroke="gray" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <h1 className="relative z-10 text-6xl font-bold text-white mb-4 font-serif font-family:ui-monospace" >Kai and Karo AI </h1>
      <div className="relative z-10 w-80 h-60 md:w-[36rem] md:h-60 p-4">
      <Image
        src="/range.jpeg" 
        alt="Car"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    </div>
  );
};

export default Header;
