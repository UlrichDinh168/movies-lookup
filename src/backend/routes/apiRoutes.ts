import express, { Router } from "express";
const router: Router = express.Router();

import {
  getAddressLookup,
  getAddressSearch,
  getItineraryPlan,
} from "../controllers/apiRoutes.js";

router.post("/get-address-lookup", getAddressLookup);
router.post("/get-address-search", getAddressSearch);
router.post("/get-itinerary-plan", getItineraryPlan);

export { router as apiRoutes };
