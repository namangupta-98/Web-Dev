// imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

require("dotenv").config();

//bring routes
const authRoutes = require("./routes/auth");
const folderRoutes = require("./routes/folder");
const fileRoutes = require("./routes/file");

//app
const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("database created"));

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'));
//cors
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

//routes middleware
app.use("/api", authRoutes);
app.use("/api", folderRoutes);
app.use("/api", fileRoutes);

//server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening to port ${port}`));
