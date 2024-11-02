const express = require("express");
const connection = require("./database/database");
const router = require("./routes/route");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

require("dotenv").config();
connection();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
});

