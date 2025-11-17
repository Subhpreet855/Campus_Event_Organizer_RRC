import { Router } from "express";
import { featuredEventController } from "../controllers/featuredeventController";
import { validateFeaturedEvent } from "../../v1/validations/FeaturedEventValidation";

const router = Router();

// GET /api/featured-events
router.get("/", featuredEventController.list);

// GET /api/featured-events/:id
router.get("/:id", featuredEventController.getOne);

// POST /api/featured-events
router.post("/", validateFeaturedEvent, featuredEventController.create);

// PUT /api/featured-events/:id
router.put("/:id", validateFeaturedEvent, featuredEventController.update);

// DELETE /api/featured-events/:id
router.delete("/:id", featuredEventController.remove);

export default router;
