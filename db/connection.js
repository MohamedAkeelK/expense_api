import mongoose from "mongoose";
import "dotenv/config";

let url = process.env.MONGO_URL || "";

mongoose.set("returnOriginal", false);

mongoose
  .connect(url)
  .catch((error) =>
    console.error("Error connecting to MongoDB: ", error.message)
);
  
mongoose.connection.on("disconnected", () =>
  console.log(`Disconnected from MongoDB!`)
);

mongoose.connection.on("error", (error) =>
  console.error(`MongoDB connection error: ${error}`)
);

export default mongoose.connection;
