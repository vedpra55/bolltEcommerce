import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWR from "swr";
import Image from "next/image";
import { singleProductFetcher } from "../supabaseApi/fether";
import ProductImage from "../components/productDetails/productImage";
import ProductInfo from "../components/productDetails/productInfo";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [showImageModal, setImageModal] = useState(false);

  const { data: product, error } = useSWR(slug ? slug : null, (slug) =>
    singleProductFetcher(slug)
  );

  if (error) toast.error("Something goes wrong");

  useEffect(() => {}, [product]);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 gap-x-10">
        <ProductImage
          setImageModal={setImageModal}
          images={product?.data.images}
        />
        <ProductInfo
          item={product?.data}
          name={product?.data.name}
          description={product?.data.description}
          price={product?.data.price}
          discount={product?.data.discount}
          attribute={product?.data.attribute}
        />
      </div>
      {showImageModal && (
        <div className="fixed  flex justify-center items-center inset-0  bg-slate-100  bg-opacity-50 backdrop-blur-sm z-50  h-screen w-screen">
          <div className="bg-white w-full h-full md:h-[80%] md:w-[80%] rounded-md p-5">
            <div className=" relative w-full h-full">
              <Image
                priority
                placeholder="blur"
                blurDataURL="/blur.jpg"
                src={product?.data.images[0]}
                className="object-contain cursor-pointer"
                layout="fill"
              />
              <div className=" absolute inset-0 flex justify-end">
                <XMarkIcon
                  className="h-8 cursor-pointer"
                  onClick={() => setImageModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
