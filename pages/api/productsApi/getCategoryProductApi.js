import { getCategoryProduct } from "../../../supabaseApi/getProductHandler";

export default async function handler(req, res) {
  const { slug } = req.query;
  const data = await getCategoryProduct(slug);
  res.json({ data });
}
