import Stripe from "stripe";
import env from "../configs/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20"
});