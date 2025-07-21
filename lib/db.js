import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = MongoClient.connect(
    "mongodb+srv://faithfulservent18:jason18..com@cluster0.ppdzhsx.mongodb.net/auth-demo?retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}
