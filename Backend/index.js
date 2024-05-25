const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["https://discover-inr.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// Mongoose connection (improved error handling)
mongoose
  .connect(
    "mongodb+srv://nagaraja6050266:Inr6050266@cluster0.qwxcxia.mongodb.net/",
    {
      dbName: "TasteCalculator",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
   // process.exit(1); // Exit the server process on connection failure
  });

// Data Schema
const TasteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  answerArray: [
    {
      type: String,
      required: true,
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

const Taste = mongoose.model("tastes", TasteSchema);

// Improved error handling for all routes
const handleError = (err, res) => {
  console.error(err);
  res.status(500).send("Internal Server Error"); // Generic error message
};

// Routes
app.get("/", async (req, res) => {
  try {
    res.send("App is working");
    console.log("App working");
  } catch (err) {
    handleError(err, res);
  }
});

app.get("/result", async (req, res) => {
  try {
    const taste = await Taste.find({});
    console.log(taste);
    res.json(taste);
  } catch (err) {
    handleError(err, res);
  }
});

app.post("/store-info", async (req, res) => {
  try {
    console.log(req.body);
    const taste = new Taste(req.body);
    const savedTaste = await taste.save();
    if (savedTaste) {
      console.log("Successfully Stored");
      res.send("Successfully Stored");
    }
  } catch (err) {
    // Handle specific errors (e.g., validation errors)
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      res.status(400).json({ errors }); // Send specific validation errors
    } else {
      handleError(err, res);
    }
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
