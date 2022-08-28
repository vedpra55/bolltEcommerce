import { getAllProducts } from "../../../supabaseApi/getProductHandler";

export default async function handler(req, res) {
  const data = await getAllProducts();
  res.json({ data });
}
