const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("DB Error:", error));

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Listenting to port ${PORT}`);
});
