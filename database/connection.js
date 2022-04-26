const mongoose = require("mongoose");

class ConnectMongo {
  static connect() {
    mongoose
      .connect(
        "mongodb+srv://nhatdaica123:g4XUuMHww8d1fEBI@cluster0.gmx6b.mongodb.net/shopping-cart?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connected DB Successfully!");
      })
      .catch((err) => {
        console.log("===: err->", err);
      });
    const conn = mongoose.connection;
    conn.on("open", () => {
      this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "images",
      });
    });
  }
}

module.exports = ConnectMongo;
