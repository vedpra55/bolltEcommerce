import { supabase } from "../lib/supabase-client";
import toast from "react-hot-toast";

export async function getCategory() {
  const { data, error } = await supabase.from("category").select("*");

  if (error) toast.error(error.message);

  return data;
}

export async function getAttributeLimitedProducts(attribute) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("attribute", attribute)
    .limit(4)
    .order("id", { ascending: false });

  if (error) toast.error(error.message);

  return data;
}

export async function getAtributeProducts(attribute) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("attribute", attribute)
    .order("id", { ascending: false });

  if (error) toast.error(error.message);

  return data;
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) toast.error(error.message);

  return data;
}

export async function getSingleProduct(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) toast.error(error.message);

  return data;
}

export async function getCategoryProduct(category) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (error) toast.error(error.message);

  return data;
}

export async function getProductsByContainsId(id) {
  const { data, error } = await supabase
    .from("products")
    .select("price, name, images, slug")
    .in("id", id);
  if (error) toast.error(error.message);
  return data;
}
