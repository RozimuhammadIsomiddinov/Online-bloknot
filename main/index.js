const express = require("express");
const categoryApi = require("./categories");
const userRouter = require("../routers/userRouter");
const createrUser = require("../routers/createUser");
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/categories", categoryApi);
app.use("/api/user", userRouter);
app.use("/api/create", createrUser);

app.listen(port, () => {
  console.log(`${port} - started to hear port...`);
});
