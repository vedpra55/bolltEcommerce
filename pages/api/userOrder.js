import { getUserOrders } from "../../supabaseApi/orderHandler";

export default async function handler(req, res) {
  const { userId } = req.query;
  if (!userId) return res.json({ data: "no id" });
  const data = await getUserOrders(userId);
  res.json({ data });
}
