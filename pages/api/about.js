import { connectToDatabase } from "../../utils/mongodb";

export default async function about(req, res) {
  const { db } = await connectToDatabase();

  let collections = await db.collections();
  let documents = await Promise.all(collections.map(async (collection) => {
  let documents = await collection.find({}).toArray();
    return Promise.resolve([collection.collectionName, documents]); // Retain collectionName
  }));

  // Format into an object that looks like `collectionName: documents`
  let formatted = documents.reduce((obj, collection) => {
      obj[collection[0]] = collection[1];
      return obj;
  }, {});

  return res.json(formatted);
};