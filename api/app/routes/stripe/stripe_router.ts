import { Router } from "express";
import { cancelSubscriptionStripe, createCheckoutSession, createCustomerStripe, createPortalCustomer, createSubscriptionStripe, reactiveAccountStripe, updateCustomer } from "../../controllers/stripe";
import auth_middleware from "../../middlewares/auth_middleware";
import accountMiddleware from "../../middlewares/account_middleware";
const stripeRouter = Router();

stripeRouter.post("/create-subscription", auth_middleware, accountMiddleware, createSubscriptionStripe);
stripeRouter.post("/create-checkout-session", auth_middleware, accountMiddleware, createCheckoutSession);
stripeRouter.post("/create-customer-portal", auth_middleware, accountMiddleware, createPortalCustomer);
stripeRouter.post("/create-customer", createCustomerStripe)
stripeRouter.put("/reactive-customer/:id", auth_middleware, accountMiddleware, reactiveAccountStripe)
stripeRouter.put("/update-customer/:id", auth_middleware, accountMiddleware, updateCustomer)
stripeRouter.post("/cancel-subscription", auth_middleware, accountMiddleware, cancelSubscriptionStripe);

export default stripeRouter;