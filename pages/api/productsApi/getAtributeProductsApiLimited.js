import { getAttributeLimitedProducts } from "../../../supabaseApi/getProductHandler";

export default async function handler(req, res) {
  const data = await getAttributeLimitedProducts(req.query.name);
  res.json({ data });
}
