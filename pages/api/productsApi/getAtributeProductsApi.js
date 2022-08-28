import { getAtributeProducts } from "../../../supabaseApi/getProductHandler";

export default async function handler(req, res) {
  const data = await getAtributeProducts(req.query.name);
  res.json({ data });
}
