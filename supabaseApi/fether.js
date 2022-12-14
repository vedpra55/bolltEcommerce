import { toast } from "react-hot-toast";

export const productFetcher = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/productsApi/getAllProductsApi`
  );
  const data = res.json();
  return data;
};

export const categoryFetcher = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/productsApi/getAllCategoryApi`
  );
  const data = res.json();
  return data;
};

export const attributeProductsFetcher = async (attribute) => {
  console.log(attribute);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/productsApi/getAtributeProductsApi?name=${attribute}`
  );
  const data = res.json();
  return data;
};

export const singleProductFetcher = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/productsApi/getSingleProductApi?slug=${slug}`
  );
  const data = res.json();
  return data;
};

export const attributeProductsLimitedFetcher = async (attribute) => {
  console.log(attribute);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/productsApi/getAtributeProductsApiLimited?name=${attribute}`
  );
  const data = res.json();
  return data;
};
