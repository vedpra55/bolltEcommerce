import {
  EllipsisHorizontalCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { handleSort } from "../../lib/helper";

import ProductCard from "../ui/productCard";
import ProductModal from "../ui/productModal";

import { useMediaQuery } from "react-responsive";

export default function SectionDetails({ products, section }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const [showSort, setSort] = useState(false);
  const [sortIndex, setSortIndex] = useState(null);
  const [sortProducts, setSortProducts] = useState(null);

  const sortOptions = ["A-Z", "Z-A", "PRICE↑", "PRICE↓"];
  const mobile = useMediaQuery({ query: "(max-width: 1100px)" });

  useEffect(() => {
    setSortIndex(3);
    const sortProducts = handleSort(sortOptions[3], products);
    setSortProducts(sortProducts);
  }, []);

  function handleSortBtn(i) {
    setSortIndex(i);
    const sortProducts = handleSort(sortOptions[i], products);
    setSortProducts(sortProducts);
  }

  function SortComponent() {
    return (
      <div className="flex justify-between cursor-pointer">
        {sortOptions.map((item, i) => (
          <div
            onClick={() => handleSortBtn(i)}
            className={`${
              sortIndex === i
                ? "bg-black/70 rounded-md px-2 py-1 font-medium text-white"
                : "px-2 py-1"
            }`}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    );
  }

  function ShowOptions() {
    return (
      <div className="flex flex-col gap-y-5">
        {showSort && <SortComponent />}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-y-5 mt-10">
        <div className="flex justify-between">
          <h1 className=" uppercase text-3xl font-bold">{section}</h1>
          <div className="flex gap-x-5 cursor-pointer">
            <div className="hover:bg-gray-400 rounded-full p-2">
              {showSort ? (
                <XCircleIcon onClick={() => setSort(false)} className="h-8" />
              ) : (
                <EllipsisHorizontalCircleIcon
                  onClick={() => setSort(true)}
                  className="h-8"
                />
              )}
            </div>
          </div>
        </div>
        {/* Options */}
        <ShowOptions />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mt-5">
          {sortProducts?.map((item, i) => (
            <ProductCard
              index={i}
              setIndex={setIndex}
              setModalOpen={setModalOpen}
              item={item}
              key={i}
            />
          ))}
        </div>
      </div>
      {!mobile && products?.data && (
        <ProductModal
          isOpen={isModalOpen}
          setOpen={setModalOpen}
          item={products.data[index]}
        />
      )}
    </div>
  );
}
