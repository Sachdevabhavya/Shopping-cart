require("dotenv").config();
require("./server/db");
const express = require("express");
const cartItem = require("./server/model/cartItem");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", async (req, res) => {
  const n = new cartItem({
    name: req.body.taskName,
    qty: req.body.qty,
    price: req.body.price,
  });
  try {
    await n.save();
    console.log("save done");
    res.redirect("/");
  } catch (e) {
    console.error(e);
  }
});

app.get("/", async (req, res) => {
  var finds = await cartItem.find();
  if (finds.length === 0) {
    await cartItem.insertMany([
      { name: "Cool", qty: 1, price: 5 },
      { name: "abcd", qty: 17, price: 20 },
    ]);
    console.log("seed successful");
  }
  finds = await cartItem.find();
  res.render("home", { items: finds });
});

app.post("/delete", async (req, res) => {
  const id = req.body.itemId;
  console.log(`abt to del ${id}`);
  try {
    await cartItem.findByIdAndRemove(id);
  } catch (e) {
    console.error(e);
    res.json({ status: "error" });
  }
  res.json({ status: "success" });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
