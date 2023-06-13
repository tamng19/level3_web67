const express = require("express");
const { connectToDb, db } = require("./db");
const authRouter = require("./auth");

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("App is running at 3000");
  connectToDb();
});
