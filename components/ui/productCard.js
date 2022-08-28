import { discountPrice } from "../../lib/helper";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";

export default function ProductCard({ setModalOpen, item, index, setIndex }) {
  function handleClick() {
    setModalOpen(true);
    setIndex(index);
    if (mobile) router.push(`/${item?.slug}`);
  }

  const router = useRouter();

  const mobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer relative hover:scale-105 transition-transform"
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100 rounded-t-md ">
        <Image
          priority
          placeholder="blur"
          blurDataURL="/blur.jpg"
          src={item.images[0]}
          className="w-full h-full object-contain"
          layout="fill"
        />
      </div>
      {/* Price and name */}
      <div className="bg-white shadow-md flex md:flex-row flex-col md:items-center justify-between p-2 md:p-4 gap-y-1  rounded-b-md">
        <p className="font-medium text-[18px] truncate">{item.name}</p>
        <p className="font-medium flex items-center gap-x-1">
          <CurrencyRupeeIcon className="h-5 md:h-6" />
          <span>{discountPrice(item.price, item.discount)}</span>
        </p>
      </div>
      {/* Discount clip */}
      {item.discount !== 0 && (
        <div className=" absolute inset-0 flex justify-end top-2 right-2">
          <div className="bg-black/80 px-2 py-1 text-white self-start rounded-md">
            <p className="text-xs">{item.discount}% OFF</p>
          </div>
        </div>
      )}
    </div>
  );
}
