/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { Cookbook, Recipe } from "../types";

import { transformCookbook } from "../transformers/CookbookTransformer";
import { transformRecipe } from "../transformers/RecipeTransformer";

// get a mapping of cookbooks and the number of recipes in each
const getCookbookRecipeTally = async (): Promise<Record<string, number>> => {
  // fetch all cookbooks
  const cookbooksRes = await api.get(`/cookbooks`);
  const cookbooks: Cookbook[] = cookbooksRes.data.map((cookbook: any) =>
    transformCookbook(cookbook)
  );

  // fetch all recipes
  const recipesRes = await api.get("/recipes");
  const recipes: Recipe[] = recipesRes.data.map((recipe: any) =>
    transformRecipe(recipe)
  );

  const cookbookRecipeTally: Record<string, number> = {};

  cookbooks.forEach((cookbook) => {
    const count = recipes.filter(
      (recipe) => recipe.cookbookId === cookbook.id
    ).length;
    cookbookRecipeTally[cookbook.id] = count;
  });

  return cookbookRecipeTally;
};

export const useGetCookbookRecipeTally = () => {
  return useQuery<Record<string, number>, Error>(
    "cookbookRecipeTally",
    getCookbookRecipeTally
  );
};
