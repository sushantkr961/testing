const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://mernyoutube:mernyoutube@cluster0.nj5g05u.mongodb.net/?retryWrites=true&w=majority",
    {
      // userNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    }
  )
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((e) => console.log(`no connection`));
