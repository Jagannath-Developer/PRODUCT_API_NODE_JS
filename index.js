require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
require("./db/connection");
const router = require("./router/product_router");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(
    `Server is run successfully at port => ${PORT}  and Time ${new Date()} http://localhost:8000/api`
  );
});
