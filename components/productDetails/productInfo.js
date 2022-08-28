import { discountPrice } from "../../lib/helper";
import {
  CurrencyRupeeIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useMediaQuery } from "react-responsive";
import Button from "../ui/button";
import { useCart } from "react-use-cart";
import Link from "next/link";
import toast from "react-hot-toast";
import { PayBtn } from "../ui/PayBtn";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

export default function ProductInfo({
  name,
  description,
  price,
  discount,
  attribute,
  item,
}) {
  const { user } = useAuth();

  const { getItem, addItem } = useCart();
  const cartItem = getItem(item?.id);
  const mobile = useMediaQuery({ query: "(max-width: 600px)" });
  const priceD = discountPrice(price, discount);

  const router = useRouter();

  function handleAddCart() {
    addItem(item);
    toast.success(`${item.name} is added to cart`);
  }

  function handleBuyBtnClick() {
    router.push(`/orderConfirmation?slug=${item.slug}`);
  }

  function MobileButton() {
    return (
      <div className="">
        <div className="flex  items-center gap-x-5">
          <div className="">
            <Button
              handleClick={() => makePayment(user, name, priceD)}
              text="Buy Now"
              Icon={HeartIcon}
              item={item}
            />
          </div>
          <div className="">
            {cartItem ? (
              <Link href="/cart">
                <div>
                  <Button
                    text="Go to cart"
                    Icon={ShoppingCartIcon}
                    item={item}
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
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        {/* Name & attribute */}
        <div className="flex justify-between flex-wrap gap-y-3">
          <h2 className="text-2xl md:text-3xl font-medium uppercase">{name}</h2>
          <div className="bg-green-300 font-medium px-3 py-1 rounded-md">
            <p>{attribute}</p>
          </div>
        </div>
        <hr />
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <CurrencyRupeeIcon className="h-6" />
            <p className="font-medium text-xl">{priceD}</p>
            {discount !== 0 && (
              <p className=" text-gray-600 line-through font-medium">{price}</p>
            )}
          </div>
          {discount !== 0 && (
            <div className="bg-black/70 rounded-md px-3 py-1 self-start">
              <p className="text-white">{discount}% OFF</p>
            </div>
          )}
        </div>
        <hr />
        {/* description */}
        <p className=" tracking-tighter font-medium">{description}</p>
        <hr />
        <div className="flex gap-x-5 self-start flex-wrap gap-y-5">
          <PayBtn totalPrice={priceD} />
          {cartItem ? (
            <Link href="/cart">
              <div>
                <Button text="Go to cart" Icon={ShoppingCartIcon} item={item} />
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
    </div>
  );
}
