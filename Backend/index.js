const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(
    cors({
        origin: ["https://discover-inr.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true,
    })
);

const mongoose = require("mongoose");
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
    .catch(() => {
        console.log("Not Connected ");
    });

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
Taste.createIndexes();

app.get("/", async (req, res) => {
    res.send("App is working");
    console.log("App working");
});

app.get("/result", async (req, res) => {
    const taste = await Taste.find({});
    console.log(taste);
    res.json(taste);
});

app.post("/store-info", async (req, res) => {
    try {
        console.log(req.body);
        const taste = new Taste(req.body);
        let result = taste.save();
        if (result) {
            console.log("Successfully Stored");
            res.send("Successfully Stored");
        }
    } catch (error) {
        console.log("Error occured");
    }
});

console.log("After listening");
