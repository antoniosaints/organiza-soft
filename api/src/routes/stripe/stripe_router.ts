import express, { Router } from "express";
import { stripeWebhook } from "../../controllers/stripe/stripe_webhook";
import { cancelSubscriptionStripe, createCheckoutSession, createCustomerStripe, createPortalCustomer, createSubscriptionStripe } from "../../controllers/stripe";
import auth_middleware from "../../middlewares/auth_middleware";
const stripeRouter = Router();

stripeRouter.post("/create-subscription", auth_middleware, createSubscriptionStripe);
stripeRouter.post("/create-checkout-session", auth_middleware, createCheckoutSession);
stripeRouter.post("/create-customer-portal", auth_middleware, createPortalCustomer);
stripeRouter.post("/create-customer", auth_middleware, createCustomerStripe)
stripeRouter.post("/cancel-subscription", auth_middleware, cancelSubscriptionStripe);
stripeRouter.post("/webhook-organizasoft", express.raw({type: 'application/json'}), stripeWebhook);

export default stripeRouter;