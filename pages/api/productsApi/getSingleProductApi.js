import { getSingleProduct } from "../../../supabaseApi/getProductHandler";

export default async function handler(req, res) {
  const data = await getSingleProduct(req.query.slug);
  res.json({ data });
}
