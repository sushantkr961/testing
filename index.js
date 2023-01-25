require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connect = require("./db/connection");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(require("./routes/userRoute"));
app.use(require("./routes/jobsRoute"));

// require("./db/connection");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connect();
  console.log(`server started on http://localhost:${PORT}`);
});
