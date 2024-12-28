/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { Recipe } from "../types";
import { transformRecipe } from "../transformers/RecipeTransformer";

const getRecipe = async (id: number): Promise<Recipe> => {
  const response = await api.get(`/recipes/${id}`);
  return transformRecipe(response.data);
};

export const useGetRecipe = (id: number) => {
  return useQuery<Recipe, Error>(["recipe", id], () => getRecipe(id));
};
