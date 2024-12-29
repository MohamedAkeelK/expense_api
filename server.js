import db from "./db/connection.js";
import express from "express";
import cors from "cors";
import logger from "morgan";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// app.use("/api", routes);

db.on("connected", () => {
  console.log("Connected to MongoDB!");
  app.listen(port, () =>
    process.env.NODE_ENV === "production"
      ? console.log(`Express server running in production on port ${port}\n\n`)
      : console.log(
          `Express server running in development on: http://localhost:${port}`
        )
  );
});
