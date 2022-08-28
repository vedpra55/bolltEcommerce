import {
  ArchiveBoxIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import { discountPrice } from "../../lib/helper";
import PriceInfo from "./priceInfo";
import Link from "next/link";
import { useCart } from "react-use-cart";
import toast from "react-hot-toast";

export default function CardProductCard({ item, updateItemQuantity }) {
  const { removeItem } = useCart();

  function handleQty(symbol) {
    if (symbol === "plus") {
      updateItemQuantity(item.id, item.quantity + 1);
    } else {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  }
  const disPrice = discountPrice(item.price, item.discount);
  const totalDiscountPrice = discountPrice(item.itemTotal, item.discount);
  const savedPrice = (item.itemTotal - totalDiscountPrice).toFixed(2);

  function UpadetQtyBtn() {
    return (
      <div className="bg-black/70 text-white rounded-md px-2 py-1 flex gap-x-5">
        <button
          onClick={() => handleQty("plus")}
          className=" hover:bg-black  px-2"
        >
          <PlusIcon className="h-5" />
        </button>
        <p>{item.quantity}</p>
        <button onClick={() => handleQty()} className=" hover:bg-black  px-2">
          <MinusIcon className="h-5" />
        </button>
      </div>
    );
  }

  function handleRemove() {
    removeItem(item.id);
    toast.success(`${item.name} is removed from cart`);
  }

  return (
    <div className="bg-white shadow-md px-3 rounded-md md:px-5 py-2 w-full h-auto items-center flex gap-y-3 justify-between gap-x-5 flex-wrap">
      <div className="flex gap-x-20 items-center md:flex-col gap-y-2 lg:w-28">
        <div>
          <Link href={`/${item.slug}`}>
            <div className="bg-gray-100 cursor-pointer px-2 py-2 rounded-md relative  w-16 h-16">
              <Image
                priority
                placeholder="blur"
                blurDataURL="/blur.jpg"
                src={item.images[0]}
                className="w-full h-full object-contain"
                layout="fill"
              />
            </div>
          </Link>
        </div>
        <p>{item.name}</p>
      </div>
      <PriceInfo name="Price" price={disPrice} />
      <UpadetQtyBtn />
      <ArchiveBoxIcon
        onClick={handleRemove}
        className="h-7 cursor-pointer hover:scale-110 transition-transform"
      />
      <PriceInfo name="Total Price" price={totalDiscountPrice} />
      <PriceInfo name="You Save" price={savedPrice} save />
    </div>
  );
}
