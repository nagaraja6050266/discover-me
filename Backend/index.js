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
        allowedHeaders: ["Content-Type"],
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
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
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
    res.status(500).json({ error: "Internal Server Error" });
};

// Routes
app.get("/", async (req, res) => {
    try {
        res.send("App is working");
    } catch (err) {
        handleError(err, res);
    }
});

app.get("/result", async (req, res) => {
    try {
        const taste = await Taste.find().sort({ score: -1 });
        res.json(taste);
    } catch (err) {
        handleError(err, res);
        console.log("Error is ", err);
    }
});

app.post("/store-info", async (req, res) => {
    try {
        const taste = new Taste(req.body);
        const savedTaste = await taste.save();
        if (savedTaste) {
            res.json({ message: "Successfully Stored" });
        }
    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(
                (error) => error.message
            );
            res.status(400).json({ errors }); // Send specific validation errors
        } else {
            handleError(err, res);
        }
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
