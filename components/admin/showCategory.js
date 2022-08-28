import Card from "./card";

export default function ShowCategory({ category }) {
  return (
    <div>
      <h1 className="text-3xl font-medium">All Category</h1>
      <div className="flex  gap-20 flex-wrap items-center my-10">
        {category?.data?.map((data, i) => (
          <Card key={i} data={data} />
        ))}
      </div>
    </div>
  );
}
