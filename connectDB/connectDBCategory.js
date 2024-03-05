const mongoose = require("mongoose");
const Joi = require("joi");
const { winstonWrite } = require("../connectWinston/winstonConnector");
const winston = require("winston");
mongoose
  .connect("mongodb://localhost/ApiUser")
  .then(() => {
    winston.info("Created connection to mongodb ...\nfor categories");
  })
  .catch((err) => {
    console.log("A connection error occurred!!!");
  });

const categoriesSchema = new mongoose.Schema({
  categoryName: String,
});

const Categories = mongoose.model("categories", categoriesSchema);
function validaterCategories(val) {
  const valid = Joi.object({
    categoryName: Joi.string().required(),
  });
  return valid.validate(val);
}
module.exports.Categories = Categories;
module.exports.validater = validaterCategories;
