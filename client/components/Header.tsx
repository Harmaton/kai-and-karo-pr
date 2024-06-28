import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import SearchInput from './SearchInput'

function Header() {
  return (
    <header className="p-10 pb-0  flex flex-col items-center sticky top-0 ">
      <SearchInput />
    </header>
  );
}

export default Header;