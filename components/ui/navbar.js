import {
  UserIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "react-use-cart";
import { useAuth } from "../../context/authContext";

export default function Navbar({ setSearchModal }) {
  const { totalUniqueItems } = useCart();

  const [hover, setHover] = useState(null);

  const { Login, user } = useAuth();

  const data = [
    {
      href: "/profile",
      Icons: UserIcon,
      profile: true,
    },
    {
      href: "/search",
      Icons: MagnifyingGlassIcon,
      search: true,
    },
    {
      href: "/cart",
      Icons: ShoppingCartIcon,
      cart: true,
    },
  ];

  function CartNo() {
    return (
      totalUniqueItems > 0 && (
        <div className="absolute flex items-start justify-end  inset-0 z-50">
          <p className="bg-black/70 rounded-md text-xs text-white top-1 px-1 self-start font-bold">
            {totalUniqueItems}
          </p>
        </div>
      )
    );
  }

  function ProfileLink({ item, i }) {
    return user ? (
      <div className="relative cursor-pointer">
        <Link href={"/profile"}>
          <div>
            <item.Icons className="h-8 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </Link>
      </div>
    ) : (
      <div
        onMouseLeave={(e) => setHover(null)}
        onMouseOver={(e) => setHover("ihifhhdf")}
        key={i}
        className="relative cursor-pointer hover:scale-105 transition-transform z-50"
      >
        <div>
          <item.Icons className="h-8 cursor-pointer" />
          {item.profile && hover && (
            <div className="absolute bg-white shadow-md rounded-md px-1">
              <button onClick={Login} className="relative w-48 h-20">
                <Image
                  priority
                  src="/googleBtn.png"
                  className=" object-contain"
                  layout="fill"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="-mb-5 md:-mt-5">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <div className="relative w-16 h-16 md:w-24 md:h-24 cursor-pointer">
            <Image
              priority
              src="/logo.png"
              className=" object-contain"
              layout="fill"
            />
          </div>
        </Link>
        <div className="flex items-center gap-x-5">
          {data.map((item, i) => (
            <div key={i}>
              {item.profile ? (
                <ProfileLink item={item} i={i} />
              ) : (
                <div key={i} className="relative cursor-pointer">
                  <Link href={item?.search ? "#" : item.href}>
                    <div>
                      {item?.cart && <CartNo />}
                      <item.Icons
                        onClick={() =>
                          item?.search ? setSearchModal(true) : null
                        }
                        className="h-8 cursor-pointer hover:scale-110 transition-transform"
                      />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
