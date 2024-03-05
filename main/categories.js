const express = require("express");
const router = express.Router();
const routerCategories = require("../routers/categoriesRoute");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/", routerCategories);
module.exports = router;
