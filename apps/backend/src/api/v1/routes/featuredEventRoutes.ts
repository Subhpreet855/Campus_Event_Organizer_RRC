import { Router } from "express";
import { featuredEventController } from "../controllers/featuredeventController";
import { validateFeaturedEvent } from "../../v1/validations/FeaturedEventValidation";

const router = Router();

router.get("/", featuredEventController.list);

router.get("/:id", featuredEventController.getOne);

router.post("/", validateFeaturedEvent, featuredEventController.create);

router.put("/:id", validateFeaturedEvent, featuredEventController.update);

router.delete("/:id", featuredEventController.remove);

export default router;
