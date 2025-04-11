import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "config/config.env" });

//console.log(process.even.PORT)
const dbConnnection = async () => {
  try {
    await mongoose.connect(
      process?.env?.BD_URL,

      { dbName: "MY_PORT_FOLIO" }
    );
    console.log("db connection successfully");
  } catch (error) {
    console.log("Error while getting the connection of dataBase");
    throw new Error(error.message);
  }
};

export default dbConnnection;
