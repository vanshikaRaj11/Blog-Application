const express = require("express");
const connection = require("./database/database");
const router = require("./routes/route");

const app = express();
app.use(express.json());

app.use("/api/v1", router);

require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
});
connection();
