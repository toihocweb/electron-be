const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");

const productRoutes = require("./routes/productRoutes");
const path = require("path");

const mongoose = require("mongoose");
const ConnectMongo = require("./database/connection");

const app = express();

app.use(express.json());

app.use(cors());

// connect mongodb
ConnectMongo.connect();

// routes
app.get("/test", (req, res) => {
  res.send("route is working!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/sub-category", subCategoryRoutes);
app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  ConnectMongo.gfs.find({ filename }).toArray((err, files) => {
    if (!files || !files.length) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    ConnectMongo.gfs.openDownloadStreamByName(filename).pipe(res);
  });
});
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
