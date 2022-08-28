import { getUserFromProfiles } from "../../supabaseApi/userHandler";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.json({ data: "no id" });
  const data = await getUserFromProfiles(id);
  res.json({ data });
}
