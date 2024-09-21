import { Router } from "express";
import { stripeWebhook } from "../../controllers/stripe/stripe_webhook";
import bodyParser from "body-parser";
import { cancelSubscriptionStripe, createCustomerStripe, createSubscriptionStripe } from "../../controllers/stripe";
const stripeRouter = Router();

stripeRouter.post("/create-subscription", createSubscriptionStripe);
stripeRouter.post("/create-customer", createCustomerStripe)
stripeRouter.post("/cancel-subscription", cancelSubscriptionStripe);
stripeRouter.post("/webhook", bodyParser.raw({ type: "application/json" }), stripeWebhook);

export default stripeRouter;