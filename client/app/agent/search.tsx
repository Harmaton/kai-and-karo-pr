import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

function SearchWithButton() {
  async function searchAction(formData: FormData) {
    "use server";

    const searchTerm = formData.get("searchTerm") as string;

    // redirect(`/agent/${searchTerm}`);
    console.log(searchTerm);
  }

  return (
    <form
      action={searchAction}
      className="flex text-white  border-gray-800 items-center px-5 border "
    >
      <input
        type="text"
        className="flex-1 p-4 outline-none rounded-md"
        name="searchTerm"
        placeholder="Search Agent .."
      />
    </form>
  );
}

export default SearchWithButton;
