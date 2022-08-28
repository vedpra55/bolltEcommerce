import Image from "next/image";
import Link from "next/link";

export default function CategoryList({ category }) {
  const colors = [
    "bg-orange-100",
    "bg-lime-100 ",
    "bg-cyan-100 ",
    "bg-purple-100",
  ];

  function CategoryCard({ item, i }) {
    return (
      <div>
        <Link href={`/category/${item?.slug}`}>
          <div
            className={`${colors[i]} relative w-full h-48 md:h-72 p-2  rounded-lg cursor-pointer hover:shadow-md hover:scale-105 transition-transform`}
          >
            <Image
              priority={true}
              placeholder="blur"
              blurDataURL="/blur.jpg"
              src={item.image}
              className="object-contain"
              layout="fill"
            />
            <div className="absolute top-2 right-2 md:top-5 md:right-5 inset-0 flex justify-end">
              <div className="bg-black/80 px-2 md:px-3 py-1 text-white rounded-lg self-start">
                <p className="uppercase text-xs md:text-xl  font-medium">
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        {category?.map((item, i) => (
          <CategoryCard item={item} key={i} i={i} />
        ))}
      </div>
    </div>
  );
}
