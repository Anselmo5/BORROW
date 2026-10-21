import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createItemController } from "../controllers/items/create-item.controller.js";
import {
	listItemsController,
	listMyItemsController,
} from "../controllers/items/list-items.controller.js";
import { getItemController } from "../controllers/items/get-item.controller.js";
import { updateItemController } from "../controllers/items/update-item.controller.js";
import { deleteItemController } from "../controllers/items/delete-item.controller.js";

const itemsRoutes = Router();

itemsRoutes.post("/", authMiddleware, createItemController);
itemsRoutes.get("/", listItemsController);
itemsRoutes.get("/my", authMiddleware, listMyItemsController);
itemsRoutes.get("/:id", getItemController);
itemsRoutes.put("/:id", authMiddleware, updateItemController);
itemsRoutes.delete("/:id", authMiddleware, deleteItemController);

export default itemsRoutes;
