import { connectToDatabase } from "../../../utils/mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const { user } = await getSession(req, res);

    let response = await db
      .collection("widgets")
      .insertOne({
        api_name: req.body.api_name,
        auth_required: req.body.auth_required,
        user_id: `${user.email}`,
        params: req.body.params
      });

    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  } 
};