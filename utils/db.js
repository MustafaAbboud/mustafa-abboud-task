import { MongoClient } from 'mongodb';

const mongodbUser = process.env.mongodb_username
const mongodbPWD = process.env.mongodb_pwd
const mongodbCluster = process.env.mongodb_cluster

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${mongodbUser}:${mongodbPWD}@${mongodbCluster}.cmkfv0j.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
