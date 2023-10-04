//MICROSERVICES ARCHITECTURE
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 9000;
const cors = require("cors");
require("dotenv").config();

const { DB_HOST, DB_NAME, DB_PORT } = process.env;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

app.use(express.json());

app.use(cors());
app.use(express.static("uploads"));
app.use("/users", require("./api/users"));
app.use("/post", require("./api/blog"));
app.use("/likes", require("./api/likes"));
app.use("/photos", require("./api/photos"));
app.use("/comments", require("./api/comments"));

app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));
// module.exports = router;
