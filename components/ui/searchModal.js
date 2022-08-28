import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase-client";
import Image from "next/image";
import Link from "next/link";

export default function SearchModal({ setSearchModal }) {
  const [search, setSearch] = useState("");
  const [searchResult, setResult] = useState(null);

  async function handleSearch() {
    const { data, error } = await supabase
      .from("products")
      .select("name,slug,images")
      .textSearch("slug", search);
    setResult(data);
    console.log(data);
  }

  useEffect(() => {
    if (search.length > 0) {
      handleSearch();
    }
  }, [search]);

  function SearchResultComponent() {
    return (
      <div className="my-2 rounded-md bg-white shadow-md px-5 py-5">
        <div className="flex flex-col gap-y-1">
          {searchResult?.map((item, i) => (
            <div onClick={() => setSearchModal(false)} key={i}>
              <Link href={`/${item.slug}`}>
                <div className="flex gap-x-5 hover:bg-gray-100 cursor-pointer">
                  <div className=" relative w-16 h-16 bg-gray-100 px-1 py-1">
                    <Image
                      priority
                      placeholder="blur"
                      blurDataURL="/blur.jpg"
                      src={item?.images[0]}
                      className="object-contain"
                      layout="fill"
                    />
                  </div>
                  <p className="font-medium">{item?.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed flex justify-center items-center inset-0  bg-slate-100  bg-opacity-50 backdrop-blur-sm z-50  h-screen w-screen">
      <div className="bg-white h-[50%] w-[80%]  md:h-400px md:w-[60%]  overflow-y-scroll rounded-md px-5 py-10">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl font-medium">Search</h4>
          <XMarkIcon
            onClick={() => setSearchModal(false)}
            className="h-6 cursor-pointer"
          />
        </div>
        <div className="mt-5">
          <input
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </div>
        {!searchResult || searchResult?.length == 0 ? (
          <div className="mt-5">
            <p className=" font-medium">
              {search.length > 2 ? "No Result Found" : ""}
            </p>
          </div>
        ) : (
          <SearchResultComponent />
        )}
      </div>
    </div>
  );
}
