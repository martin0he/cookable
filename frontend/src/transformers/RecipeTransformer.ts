/* eslint-disable @typescript-eslint/no-explicit-any */
import { Recipe } from "../types";

export const transformRecipe = (backendData: any): Recipe => {
  return {
    id: backendData.id,
    authorId: backendData.author_id,
    cookbookId: backendData.cookbook_id,
    title: backendData.title,
    description: backendData.description || null,
    imageUrl: backendData.image_url || null,

    // Safely handle ingredients
    ingredients: Array.isArray(backendData.ingredients)
      ? backendData.ingredients // Already an array
      : typeof backendData.ingredients === "string"
      ? JSON.parse(backendData.ingredients) // Parse JSON string
      : [],

    // Safely handle instructions
    instructions: Array.isArray(backendData.instructions)
      ? backendData.instructions // Already an array
      : typeof backendData.instructions === "string"
      ? JSON.parse(backendData.instructions) // Parse JSON string
      : [],

    // Safely handle tags
    tags: Array.isArray(backendData.tags)
      ? backendData.tags // Already an array
      : typeof backendData.tags === "string"
      ? JSON.parse(backendData.tags) // Parse JSON string
      : [],

    expectedDuration: backendData.expected_duration || null,
    datePublished: new Date(backendData.date_published),
    dateUpdated: new Date(backendData.date_updated),
    viewsCount: backendData.views_count || 0,
  };
};
