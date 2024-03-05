const express = require("express");
const router = express.Router();
const { Categories, validater } = require("../connectDB/connectDBCategory");
const auth = require("../middlewares/auth");
const logger = require("../middlewares/logger");
//creator+
async function creator(name) {
  const newCatogory = new Categories({
    categoryName: name,
  });
  const savedCategory = await newCatogory.save();
  return savedCategory;
}
//clenear
async function clenear(id) {
  await Categories.deleteOne({ _id: id });
}
//API
router
  .get("/", logger)
  .post("/", async (req, res) => {
    const { error } = validater(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = req.body.categoryName;
    const getter = await Categories.find({ categoryName: category }); //find return array
    if (getter.length != 0)
      return res
        .status(400)
        .send("This information is available in the Database");

    await creator(category);
  })
  .delete("/:id", auth, async (req, res) => {
    const deleteNumber = req.params.id;
    await clenear(deleteNumber);
    const getter = await Categories.find().select({ _id: 0, __v: 0 });
    res.status(200).send(getter);
  });
module.exports = router;
