import { Router } from "express";
import { cancelSubscriptionStripe, createCheckoutSession, createCustomerStripe, createPortalCustomer, createSubscriptionStripe, reactiveAccountStripe, updateCustomer } from "../../controllers/stripe";
const stripeRouter = Router();

stripeRouter.post("/create-subscription", createSubscriptionStripe);
stripeRouter.post("/create-checkout-session", createCheckoutSession);
stripeRouter.post("/create-customer-portal", createPortalCustomer);
stripeRouter.post("/create-customer", createCustomerStripe)
stripeRouter.put("/reactive-customer/:id", reactiveAccountStripe)
stripeRouter.put("/update-customer/:id", updateCustomer)
stripeRouter.post("/cancel-subscription", cancelSubscriptionStripe);

export default stripeRouter;