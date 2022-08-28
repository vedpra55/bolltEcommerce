import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { productFetcher, categoryFetcher } from "../../supabaseApi/fether";

const DynamicAddCategory = dynamic(
  () => import("../../components/admin/addCategory"),
  {
    suspense: false,
  }
);
const DynamicAddProducts = dynamic(
  () => import("../../components/admin/addproduct"),
  {
    suspense: false,
  }
);
const DynamicShowCategory = dynamic(
  () => import("../../components/admin/showCategory"),
  {
    suspense: false,
  }
);
const DynamicShowProduct = dynamic(
  () => import("../../components/admin/showProduct"),
  {
    suspense: false,
  }
);

export default function ManageProduct() {
  const { data: products, error: err } = useSWR("products", productFetcher);
  const { data: category, error: err2 } = useSWR("category", categoryFetcher);

  return (
    <div>
      <div className="flex flex-col gap-y-10 my-10">
        <Suspense fallback={"Loading.."}>
          <DynamicAddCategory />
          <DynamicAddProducts category={category} />
          <DynamicShowCategory category={category} />
          <DynamicShowProduct products={products} />
        </Suspense>
      </div>
    </div>
  );
}
