/* eslint-disable @typescript-eslint/no-explicit-any */
import { Recipe } from "../types";

export const transformRecipe = (backendData: any): Recipe => {
  return {
    id: backendData.id,
    authorId: backendData.author_id,
    cookbookId: backendData.cookbook_id,
    title: backendData.title,
    description: backendData.description,
    instructions: backendData.instructions,
    tags: backendData.tags,
    imageUrl: backendData.image_url,
    expectedDuration: backendData.expected_duration,
    ingredients: backendData.ingredients,
    datePublished: backendData.date_published,
    dateUpdated: backendData.date_updated,
    viewsCount: backendData.views_count,
  };
};
