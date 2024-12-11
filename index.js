const db = require("./db/connection.js");
const logger = require("morgan");
const express = require("express");
const { default: helmet } = require("helmet");

const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");

const app = express();

const port = process.env.PORT;

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(helmet());

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("hello from home ");
});

//Start server when DB is connected.
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
