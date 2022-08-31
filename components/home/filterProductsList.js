import ProductsList from "./productsList";

export default function FilterProductsList({
  newProducts,
  bestSellerProducts,
  ourPickProducts,
}) {
  return (
    <div>
      <ProductsList
        products={newProducts[0] ? newProducts : newProducts.data}
        heading="New"
        attributeOpt="New"
      />
      <ProductsList
        products={
          bestSellerProducts[0] ? bestSellerProducts : bestSellerProducts.data
        }
        heading="Best Seller"
        attributeOpt="Best Seller"
      />
      <ProductsList
        products={ourPickProducts[0] ? ourPickProducts : ourPickProducts.data}
        heading="Our Pick"
        attributeOpt="Our Pick"
      />
    </div>
  );
}
