const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
    "sk_test_51ObbapSBksgtTRoW2kfx3J6uaSUkoXvGjFWXMbUNW0ZkEQjNOO7fjahuFNZGT15lSe9tF6TErpNWglRZhDuUySFx0093KemL3S");

// API

// API config
const app = express();

// Middleware
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
app.post("/payments/create", async (req, res) => {
    const total = req.query.total;
    
    console.log("Payment request recieved....", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "usd",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
// Listen command
exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/clone-c9b22/us-central1/api, firebase emulators:start --only functions
