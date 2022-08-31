import { ArrowRightIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ProductCard from "../ui/productCard";
import ProductModal from "../ui/productModal";

export default function ProductsList({ products, attributeOpt, heading }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const mobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className="my-10 flex flex-col gap-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{heading}</h1>
        <Link href={`products/${attributeOpt}`}>
          <button className="hover:bg-black/70 hover:text-white px-2 py-1 rounded-md flex gap-x-1 items-center transition-transform">
            <p className="text-xs md:text-xl font-medium">More</p>
            <ArrowRightIcon className="h-5 md:h-8" />
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {products?.map((item, i) => (
          <ProductCard
            index={i}
            setIndex={setIndex}
            setModalOpen={setModalOpen}
            item={item}
            key={i}
          />
        ))}
      </div>
      {!mobile && (
        <ProductModal
          isOpen={isModalOpen}
          setOpen={setModalOpen}
          item={products[index]}
        />
      )}
    </div>
  );
}
