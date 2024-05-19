const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to Database Successfully");
  })
  .catch(() => {
    console.log("Failed to connect");
  });
