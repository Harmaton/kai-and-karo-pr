import { DeleteXtic } from "@/_actions/session";
import { prismadb } from "@/lib/prisma";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { ChatbotCharacteristic } from "@prisma/client";
import { useRouter } from "next/navigation";

function Characterisctic({
  characteristic,
}: {
  characteristic: ChatbotCharacteristic;
}) {
    const router = useRouter()
  const handleReoveCharacteristic = async () => {
   await DeleteXtic(characteristic.id)
  };
  return (
    <li className="relative p-10 bg-white border rounded-md">
      {characteristic.content}

      <XCircleIcon
        className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 hover:opacity-20"
        onClick={handleReoveCharacteristic}
      />
    </li>
  );
}

export default Characterisctic;
