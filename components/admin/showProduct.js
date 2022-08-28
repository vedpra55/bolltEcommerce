import Card from "./card";

export default function ShowProduct({ products }) {
  return (
    <div>
      <h1 className="text-3xl font-medium">All Products</h1>
      <div className="flex gap-20 my-10 flex-wrap">
        {products?.data?.map((data, i) => (
          <Card key={i} data={data} />
        ))}
      </div>
    </div>
  );
}
