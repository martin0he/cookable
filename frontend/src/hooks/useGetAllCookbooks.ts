/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { Cookbook } from "../types";
import { transformCookbook } from "../transformers/CookbookTransformer";

// Fetch all cookbooks
const getAllCookbooks = async (): Promise<Cookbook[]> => {
  const response = await api.get(`/cookbooks`);
  return response.data.map((recipe: any) => transformCookbook(recipe));
};

export const useGetAllCookbooks = () => {
  return useQuery<Cookbook[], Error>("cookbooks", getAllCookbooks);
};
