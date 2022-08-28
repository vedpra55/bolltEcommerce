export default function Card({ data }) {
  return (
    <div className="flex flex-col gap-y-2 w-32 h-32 bg-gray-100 rounded-md p-1">
      <img
        className="w-full h-full"
        src={data?.image ? data?.image : data?.images[0]}
      />
      <p>{data?.name}</p>
    </div>
  );
}
