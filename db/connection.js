const mongoose = require("mongoose");
require("dotenv").config();

let connect = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(
    "mongodb+srv://mernyoutube:mernyoutube@cluster0.nj5g05u.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = connect;
