import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWR from "swr";
import SectionDetails from "../../components/ui/sectionDetails";
import LoaderSpinner from "../../components/ui/loader";
import { attributeProductsFetcher } from "../../supabaseApi/fether";

export default function AttributeProductsPage() {
  const router = useRouter();
  const { attribute } = router.query;

  const { data: products, error } = useSWR(
    attribute ? attribute : null,
    (attribute) => attributeProductsFetcher(attribute)
  );

  if (error) toast.error("Something goes wrong");

  return products ? (
    <SectionDetails products={products} section={attribute} />
  ) : (
    <LoaderSpinner />
  );
}
