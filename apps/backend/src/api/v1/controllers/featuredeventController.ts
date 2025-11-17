import type { Request, Response } from "express";
import {
  featuredEventService,
  type FeaturedEventInput,
} from "../services/featuredEventService";

export const featuredEventController = {
  async list(_req: Request, res: Response) {
    try {
      const events = await featuredEventService.listAll();
      return res.json(events);
    } catch (error) {
      console.error(" Error in featuredEventController.list:", error);
      return res.status(500).json({ error: "Could not load featured events" });
    }
  },

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      console.warn(" Invalid featured event ID received in getOne:", req.params.id);
      return res.status(400).json({ error: "Invalid featured event id" });
    }

    try {
      const event = await featuredEventService.getById(id);

      if (!event) {
        console.warn(` Featured event not found with ID: ${id}`);
        return res.status(404).json({ error: "Featured event not found" });
      }

      return res.json(event);
    } catch (error) {
      console.error(` Error in featuredEventController.getOne (ID: ${id}):`, error);
      return res.status(500).json({ error: "Could not load featured event" });
    }
  },

  async create(req: Request, res: Response) {
    const data = req.body as FeaturedEventInput;

    try {
      const created = await featuredEventService.create(data);
      console.log("Featured event successfully created:", created);
      return res.status(201).json(created);
    } catch (error) {
      console.error(" Error in featuredEventController.create:", error);
      console.error(" Request data:", data);
      return res.status(500).json({ error: "Could not create featured event" });
    }
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      console.warn(" Invalid featured event ID received in update:", req.params.id);
      return res.status(400).json({ error: "Invalid featured event id" });
    }

    const data = req.body as FeaturedEventInput;

    try {
      const updated = await featuredEventService.update(id, data);
      console.log(` Featured event updated (ID: ${id}):`, updated);
      return res.json(updated);
    } catch (error) {
      console.error(` Error in featuredEventController.update (ID: ${id}):`, error);
      console.error(" Request data:", data);
      return res.status(500).json({ error: "Could not update featured event" });
    }
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      console.warn(" Invalid featured event ID received in delete:", req.params.id);
      return res.status(400).json({ error: "Invalid featured event id" });
    }

    try {
      await featuredEventService.remove(id);
      console.log(` Successfully deleted featured event with ID: ${id}`);
      return res.status(204).send();
    } catch (error) {
      console.error(` Error in featuredEventController.remove (ID: ${id}):`, error);
      return res.status(500).json({ error: "Could not delete featured event" });
    }
  },
};
