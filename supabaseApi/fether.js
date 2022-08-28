export const productFetcher = async () => {
  const res = await fetch(
    "http://localhost:3000/api/productsApi/getAllProductsApi"
  );
  const data = res.json();
  return data;
};

export const categoryFetcher = async () => {
  const res = await fetch(
    "http://localhost:3000/api/productsApi/getAllCategoryApi"
  );
  const data = res.json();
  return data;
};

export const attributeProductsFetcher = async (attribute) => {
  const res = await fetch(
    `http://localhost:3000/api/productsApi/getAtributeProductsApi?name=${attribute}`
  );
  const data = res.json();
  return data;
};

export const singleProductFetcher = async (slug) => {
  const res = await fetch(
    `http://localhost:3000/api/productsApi/getSingleProductApi?slug=${slug}`
  );
  const data = res.json();
  return data;
};
