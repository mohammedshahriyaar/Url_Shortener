const express = require("express");
const app = express();
const port = 3000;
const { connectMongodb } = require("./dbConnect");
const urlRoute = require("./routes/url");

// Connect to MongoDB
connectMongodb('mongodb+srv://mohammedshahriyaar:mongoshah@cluster0.btnpi.mongodb.net/')
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.log("Mongo connect failed", err));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route for URL shortening
app.use('/url', urlRoute);  // Keep this only, as /url is sufficient

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
