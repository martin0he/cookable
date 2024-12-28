/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cookbook } from "../types";

export const transformCookbook = (backendData: any): Cookbook => {
  return {
    id: backendData.id,
    authorId: backendData.author_id,
    title: backendData.title,
    description: backendData.description,
    coverImageUrl: backendData.cover_image_url,
    isPrivate: backendData.is_private,
    datePublished: new Date(backendData.date_published),
    dateUpdated: new Date(backendData.date_updated),
    viewsCount: backendData.views_count,
  };
};
