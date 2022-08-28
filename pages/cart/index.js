import { useCart } from "react-use-cart";
import CardProductCard from "../../components/cart/cardProductCard";
import PriceInfo from "../../components/cart/priceInfo";
import { discountPrice } from "../../lib/helper";
import Link from "next/link";
import { useAuth } from "../../context/authContext";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "../../components/ui/button";
import { useEffect, useState } from "react";
import { PayBtn } from "../../components/ui/PayBtn";

import { useRouter } from "next/router";

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [checkoutName, setName] = useState(null);

  const { totalUniqueItems, cartTotal, items, updateItemQuantity } = useCart();

  const dis = items.map((item) => item.discount);

  function AllDiscount(arr) {
    let sum = 0; // initialize sum
    for (let i = 0; i < arr.length; i++) sum += arr[i];
    return sum;
  }

  function AllName(arr) {
    let sum = ""; // initialize sum
    for (let i = 0; i < arr.length; i++) {
      sum += "" + arr[i];
    }
    return sum;
  }

  const totalPrice = discountPrice(cartTotal, AllDiscount(dis));
  const savePrice = (cartTotal - totalPrice).toFixed(2);
  useEffect(() => {
    const allName = items.map((item) => item.name);
    setName(AllName(allName));
    console.log(AllName(allName));
  }, [items]);

  function handleCheckoutBtn() {
    if (!user) return router.push("/profile");
    makePayment(user, checkoutName, totalPrice, items);
  }

  return (
    <div>
      {totalUniqueItems ? (
        <div className="mt-10 flex flex-col gap-y-5">
          <h2 className="text-3xl font-medium">Your Cart</h2>
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col md:flex-row gap-y-1 justify-between">
              <div className="flex flex-col gap-y-1 items-start  justify-start md:flex-row gap-x-20 md:items-center">
                <PriceInfo name="Total Price" price={totalPrice} total />
                <PriceInfo name="Total Save" price={savePrice} save total />
              </div>
              <div className=" self-start">
                <PayBtn totalPrice={totalPrice} type="checkout" />
              </div>
            </div>
            {items.map((item, i) => (
              <CardProductCard
                key={i}
                item={item}
                updateItemQuantity={updateItemQuantity}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="cursor-pointer flex h-screen w-full items-center justify-center">
          <Link href="/">
            <p className="text-2xl font-medium">No items Countinue Shopping</p>
          </Link>
        </div>
      )}
    </div>
  );
}
