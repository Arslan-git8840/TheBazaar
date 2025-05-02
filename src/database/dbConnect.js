import mongoose from "mongoose";
import { DB_NAME } from "@/constants/constants";
export const dbConnect = async () => {
  try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
      connectionInstance.connection.on('connected', () => {
          console.log('Connected to MongoDB');
      })
      console.log('Connection successful at host', connectionInstance.connection.host)
  } catch (error) {
    console.log('Erorr at connecting to mongodb',error);
    process.exit(1);
  }
};