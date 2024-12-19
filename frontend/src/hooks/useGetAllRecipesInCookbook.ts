/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { Recipe } from "../types";
import { transformRecipe } from "../transformers/RecipeTransformer";

// Fetch all cookbooks written by a specific user (author)
const getAllRecipesInCookbook = async (id: number): Promise<Recipe[]> => {
  const response = await api.get(`/recipes/cookbook/${id}`);
  return response.data.map((cookbook: any) => transformRecipe(cookbook));
};

export const useGetAllRecipesInCookbook = (id: number) => {
  return useQuery<Recipe[], Error>(
    ["recipes", id],
    () => getAllRecipesInCookbook(id),
    {
      enabled: !!id,
    }
  );
};
