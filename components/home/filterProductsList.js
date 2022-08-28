import ProductsList from "./productsList";

export default function FilterProductsList({
  newProducts,
  bestSellerProducts,
  ourPickProducts,
  setOpenModal,
  isOpenModal,
}) {
  return (
    <div>
      <ProductsList
        setOpenModal={setOpenModal}
        products={newProducts}
        heading="New"
        attributeOpt="New"
      />
      <ProductsList
        setOpenModal={setOpenModal}
        products={bestSellerProducts}
        heading="Best Seller"
        attributeOpt="Best Seller"
      />
      <ProductsList
        setOpenModal={setOpenModal}
        products={ourPickProducts}
        heading="Our Pick"
        attributeOpt="Our Pick"
      />
    </div>
  );
}
