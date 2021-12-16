import { connectToDatabase } from "../../../utils/mongodb";
const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const _idObj = ObjectId(req.body._id);

    let response = await db.collection("widgets").deleteOne({
      _id: _idObj,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
