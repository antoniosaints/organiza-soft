import "dotenv/config";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
    throw new Error("Stripe secret key not found");
}

export const stripe = new Stripe(secretKey, {
    apiVersion: "2024-06-20"
});