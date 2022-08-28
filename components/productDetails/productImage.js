import Image from "next/image";
import LoaderSpinner from "../../components/ui/loader";

export default function ProductImage({ images, setImageModal }) {
  return (
    <div className="">
      <div className="relative h-96 w-full bg-gray-100 rounded-md">
        {images ? (
          <Image
            onClick={() => setImageModal(true)}
            priority
            placeholder="blur"
            blurDataURL="/blur.jpg"
            src={images[0]}
            className="object-contain cursor-pointer"
            layout="fill"
          />
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
}
