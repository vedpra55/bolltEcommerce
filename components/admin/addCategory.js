import { useForm } from "react-hook-form";

import { handleAddCatgeory } from "../../supabaseApi/addProductHandler";

export default function AddCategory() {
  const { register, handleSubmit } = useForm();

  async function handleForm(data) {
    await handleAddCatgeory(data);
    window.location.reload();
  }

  return (
    <div>
      <h1 className="text-3xl font-medium">Add Category</h1>
      <div className="mt-10">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex gap-x-5 items-end"
        >
          <input
            {...register("categoryName")}
            type={"text"}
            placeholder="category name"
          />
          <input {...register("categoryImage")} type={"file"} />
          <input
            className="bg-black px-4 py-2 rounded-md text-white cursor-pointer"
            type={"submit"}
          />
        </form>
      </div>
    </div>
  );
}
