import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const mongodbUser = process.env.mongodb_username
const mongodbPWD = process.env.mongodb_pwd
const mongodbCluster = process.env.mongodb_cluster

export async function connectToDB() {

  if (mongoose.connection.readyState === 1)
    return mongoose.connection.asPromise()

  return await mongoose.connect(`mongodb+srv://${mongodbUser}:${mongodbPWD}@${mongodbCluster}.cmkfv0j.mongodb.net/?retryWrites=true&w=majority`)
}

export async function disconnectFromDB() {

  return mongoose.connection.close()
}