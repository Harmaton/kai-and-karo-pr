import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

function SearchInput() {
  async function searchAction(formData: FormData) {
    "use server";

    const searchTerm = formData.get("searchTerm") as string;

    redirect(`/search/${searchTerm}`);
  }

  return (
    <form
      action={searchAction}
      className="w-full flex text-black border-gray-800 items-center px-5 rounded-full bg-white border shadow-lg"
    >
      <Link href="/">
        <HomeIcon className="h-10 w-10 text-gray-800" />
      </Link>
      <input
        type="text"
        className="flex-1 p-5 outline-none"
        name="searchTerm"
         placeholder="What type of car do you like? e.g. turbo charged, muscle car, affordable luxury ..."
      />
    </form>
  );
}

export default SearchInput;