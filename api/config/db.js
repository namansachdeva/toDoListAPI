import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from 'chalk';


dotenv.config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const connectDB = async () => {
  try {
    await client.connect();
    console.log(chalk.greenBright("Connected to DB"));
  } catch (error) {
    console.log(chalk.redBright(error));
  }
}

const db = client.db("Tododb");

export { connectDB, db };