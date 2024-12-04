import express from "express";
import cors from "cors";
import { stripeWebhook } from "../controllers/stripe";
import router from "../routes/router";

const app = express();

// Middlewares
app.use(cors());
app.post("/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(router);

export default app;
