import {
  ArrowLongRightIcon,
  CurrencyRupeeIcon,
  HeartIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { discountPrice } from "../../lib/helper";
import Button from "./button";
import { useCart } from "react-use-cart";
import toast from "react-hot-toast";
import { useState } from "react";
import { PayBtn } from "./PayBtn";

export default function ProductModal({ isOpen, setOpen, item }) {
  const { getItem, addItem } = useCart();
  const [isMobile, setMobile] = useState(false);

  const cartItem = getItem(item?.id);

  function handleAddCart() {
    console.log("dd");
    addItem(item);
    toast.success(`${item.name} is added to cart`);
  }

  // Product Info
  function ProductInfo() {
    return (
      <div className="px-5">
        <div className="flex justify-end pt-2 py-2">
          <XMarkIcon
            onClick={() => setOpen(false)}
            className="h-6 hover:bg-gray-400 hover:rounded-full cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-y-5">
          <p className=" uppercase text-2xl font-medium truncate">
            {item?.name}
          </p>
          {/* Price */}
          <div className="flex  items-center justify-between">
            <div className="bg-green-300 px-2 py-1 rounded-md">
              <p>{item.attribute}</p>
            </div>
            <div className="flex gap-x-2 items-center">
              <CurrencyRupeeIcon className="h-6" />
              <p className="font-medium">
                {discountPrice(item?.price, item?.discount)}
              </p>
              {item.discount !== 0 && (
                <p className="text-xs text-gray-600 line-through font-medium">
                  {item?.price}
                </p>
              )}
            </div>
          </div>
          <hr />
          {/* Description */}
          <div className="h-16 w-full">
            <p className="h-full overflow-hidden">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              eaque sint recusandae pariatur ducimus nostrum amet corporis
              laborum ad ratione nemo deleniti maiores incidunt debitis a,
              impedit numquam natus magni.
            </p>
          </div>
          <hr />
          {/* Buttons */}
          <div className="flex gap-x-5 items-center">
            <PayBtn totalPrice={discountPrice(item.price, item.discount)} />
            {cartItem ? (
              <Link href="/cart">
                <div>
                  <Button
                    handleClick={null}
                    text="Go to cart"
                    Icon={ShoppingCartIcon}
                  />
                </div>
              </Link>
            ) : (
              <Button
                handleClick={handleAddCart}
                Icon={ShoppingCartIcon}
                item={item}
                cart
              />
            )}
          </div>
        </div>
        {/* Detail Button */}
        <div className="flex justify-end pt-10">
          <Link href={`/${item.slug}`}>
            <ArrowLongRightIcon className="h-7 hover:bg-gray-400 hover:rounded-full cursor-pointer" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    isOpen && (
      <div className="fixed flex justify-center items-center inset-0  bg-slate-100  bg-opacity-50 backdrop-blur-sm z-50  h-screen w-screen">
        <div className="bg-white h-96 w-[65%] rounded-md">
          <div className="grid grid-cols-2">
            {/* Image */}
            <Link href={`/${item.slug}`}>
              <div className="cursor-pointer relative h-96 w-full  bg-gray-100">
                <Image
                  priority
                  placeholder="blur"
                  blurDataURL="/blur.jpg"
                  src={item.images[0]}
                  className="object-contain"
                  layout="fill"
                />
                {item.discount !== 0 && (
                  <div className="absolute inset-0 flex justify-end top-5 right-5  self-start">
                    <div className="bg-black/70 rounded-md px-2 py-1 self-start">
                      <p className="text-white">{item?.discount}% OFF</p>
                    </div>
                  </div>
                )}
              </div>
            </Link>
            <ProductInfo />
          </div>
        </div>
      </div>
    )
  );
}
