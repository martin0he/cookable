/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { Recipe } from "../types";
import { transformRecipe } from "../transformers/RecipeTransformer";

// Fetch all recipes
const getAllRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get(`/recipes`);
  return response.data.map((recipe: any) => transformRecipe(recipe));
};

export const useGetAllRecipes = () => {
  return useQuery<Recipe[], Error>("recipes", getAllRecipes);
};
