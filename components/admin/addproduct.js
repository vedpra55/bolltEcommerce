import { useForm } from "react-hook-form";
import { handleAddProduct } from "../../supabaseApi/addProductHandler";

export default function Addproduct({ category }) {
  const { register, handleSubmit } = useForm();

  async function handleForm(data) {
    await handleAddProduct(data);
    window.location.reload();
  }

  return (
    <div>
      <h1 className="text-3xl font-medium">Add Product</h1>
      {/* Inputs */}
      <div className=" mt-10">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex gap-x-5 flex-wrap gap-y-5 items-center"
        >
          <input
            {...register("productName")}
            defaultValue={""}
            type="text"
            placeholder="product name"
          />
          <input
            {...register("productDescription")}
            defaultValue={""}
            type="text"
            placeholder="product description"
          />
          <input
            {...register("productPrice")}
            defaultValue={0}
            type="number"
            placeholder="product price"
          />
          <input
            {...register("productDiscount")}
            defaultValue={0}
            type="number"
            placeholder="product discount"
          />
          <input
            {...register("productImages")}
            defaultValue={""}
            type="file"
            placeholder="product Images"
          />

          <select
            defaultValue={"New"}
            className="cursor-pointer"
            {...register("attribute")}
          >
            <option value="New">New</option>
            <option value="Best Seller">Best Seller</option>
            <option value="Our Pick">Our Pick</option>
          </select>

          <select
            defaultValue={category?.data[0].slug}
            className="cursor-pointer"
            {...register("category")}
          >
            {category?.data?.map((data, i) => (
              <optgroup key={i}>
                <option key={i} value={data.slug}>
                  {data.slug}
                </option>
              </optgroup>
            ))}
          </select>

          <input
            className="bg-black px-4 py-2 rounded-md text-white cursor-pointer"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
