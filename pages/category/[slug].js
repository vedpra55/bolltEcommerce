import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWR from "swr";
import LoaderSpinner from "../../components/ui/loader";

import SectionDetails from "../../components/ui/sectionDetails";

export default function CategoryProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  const categoryProductFetcher = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/productsApi/getCategoryProductApi?slug=${slug}`
    );
    const data = res.json();
    return data;
  };

  const { data: products, error } = useSWR(slug, categoryProductFetcher);
  if (error) toast.error("Something goes wrong");

  return products ? (
    <SectionDetails products={products} section={slug} />
  ) : (
    <LoaderSpinner />
  );
}
