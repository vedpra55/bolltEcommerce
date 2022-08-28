import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";

export default function PriceInfo({ name, price, save, total }) {
  return (
    <div
      className={`flex gap-x-2 font-medium ${
        save ? "text-green-600 " : "text-black"
      }`}
    >
      {total ? (
        <p className="text-[16px] md:text-xl">{name} : </p>
      ) : (
        <p>{name} : </p>
      )}
      <div className="flex gap-x-1 items-center">
        <CurrencyRupeeIcon className="h-4" />
        {total ? (
          <span className="text-[16px] md:text-xl">{price}</span>
        ) : (
          <span>{price}</span>
        )}
      </div>
    </div>
  );
}
