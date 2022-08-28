import { getCategory } from "../../../supabaseApi/getProductHandler";

export default async function handler(req, res) {
  const data = await getCategory();
  res.json({ data });
}
