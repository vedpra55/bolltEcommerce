import toast from "react-hot-toast";
import { supabase } from "../lib/supabase-client";

export const handleAddCatgeory = async (formData) => {
  const { data, error } = await supabase.storage
    .from("ecommerce")
    .upload(
      `/category/${formData.categoryImage[0].name}`,
      formData.categoryImage[0]
    );

  if (error) toast.error(error.message);

  if (data) {
    const { publicURL, error } = supabase.storage
      .from("ecommerce")
      .getPublicUrl(`/category/${formData.categoryImage[0].name}`);

    if (error) toast.error(error.message);

    if (publicURL) {
      const { data, error } = await supabase.from("category").insert([
        {
          name: formData.categoryName,
          slug: slugify(formData.categoryName),
          image: publicURL,
        },
      ]);

      if (error) toast.error(error.message);
      toast.success(`${formData.categoryName} category added`);
    }
  }
};

export const handleAddProduct = async (formData) => {
  const { data, error } = await supabase.storage
    .from("ecommerce")
    .upload(
      `/product/${formData.productImages[0].name}`,
      formData.productImages[0]
    );

  if (error) toast.error(error.message);

  if (data) {
    const { publicURL, error } = supabase.storage
      .from("ecommerce")
      .getPublicUrl(`/product/${formData.productImages[0].name}`);

    if (error) toast.error(error.message);

    if (publicURL) {
      const { data, error } = await supabase.from("products").insert({
        name: formData.productName,
        description: formData.productDescription,
        price: formData.productPrice,
        discount: formData.productDiscount,
        images: [publicURL],
        attribute: formData.attribute,
        slug: slugify(formData.productName),
        category: formData.category,
      });

      if (error) toast.error(error.message);
      toast.success(`${formData.productName} added sucessfully`);
    }
  }
};

export const slugify = (str) =>
  str
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
