import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getMyRecipes,
  updateRecipe,
  getRecipes,
  getRecipeById,
} from "../controllers/recipe.controller.js";
import {
  getFavorites,
  toggleFavorite,
} from "../controllers/favorite.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/my", protectRoute, getMyRecipes);
router.get("/favorites", protectRoute, getFavorites);
router.post("/", protectRoute, createRecipe);
router.put("/:id", protectRoute, updateRecipe);
router.delete("/:id", protectRoute, deleteRecipe);

router.post("/:id/favorite", protectRoute, toggleFavorite);
router.get("/:id", getRecipeById);

export default router;
