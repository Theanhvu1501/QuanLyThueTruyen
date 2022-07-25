require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/api", require("./routes/staffRouter"));
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/bockstoreRouter"));
app.use("/api", require("./routes/bookRouter"));
app.use("/api", require("./routes/customerRouter"));
app.use("/api", require("./routes/rentRouter"));
app.use("/api", require("./routes/storeRouter"));
app.use("/api", require("./routes/upload"));






if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});


