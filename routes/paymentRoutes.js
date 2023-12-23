import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { buySubcription, cancelSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentControllers.js";

const router = express.Router();

// Buy subscription 
 router.route("/subscribe").get(isAuthenticated, buySubcription)

//  Payment verification
 router.route("/paymentverification").post(isAuthenticated, paymentVerification)
 
// Get Razorpay key
router.route("/razorpaykey").get(getRazorPayKey);

// Cancel Subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;