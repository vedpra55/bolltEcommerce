import { useState } from "react";
import SearchModal from "../ui/searchModal";
import Navbar from "../ui/navbar";

export default function Layout({ children }) {
  const [searchModal, setSearchModal] = useState(false);
  return (
    <div className="conatainer mx-auto max-w-[1360px] p-5 md:px-16 md:py-10">
      <Navbar setSearchModal={setSearchModal} />
      {children}
      {searchModal && <SearchModal setSearchModal={setSearchModal} />}
    </div>
  );
}
