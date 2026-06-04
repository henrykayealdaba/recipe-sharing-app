import { create } from 'zustand';
import api from '../api/axios.js';

export const useRecipeStore = create((set) => ({
  loading: false,
  recipes: [],

  fetchRecipes: async (ingredient = '') => {
    set({ loading: true });

    try {
      const res = await api.get('/recipes', {
        params: ingredient ? { ingredient } : {},
      });

      set({ recipes: res.data.recipes });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  createRecipe: async (recipeData) => {
    set({ loading: true });

    try {
      const res = await api.post('/recipes', recipeData);

      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateRecipe: async (id, recipeData) => {
    set({ loading: true });

    try {
      const res = await api.put(`/recipes/${id}`, recipeData);
      return res.data;
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  toggleFavorite: async (id) => {
    const res = await api.post(`/recipes/${id}/favorite`);
    return res.data;
  },

  getFavorites: async () => {
    const res = await api.get(`/recipes/favorites`);
    return res.data.favorites;
  },
}));
