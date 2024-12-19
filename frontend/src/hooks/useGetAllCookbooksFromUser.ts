/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { Cookbook } from "../types";
import { transformCookbook } from "../transformers/CookbookTransformer";

// Fetch all cookbooks written by a specific user (author)
const getAllCookbooksFromUser = async (id: number): Promise<Cookbook[]> => {
  const response = await api.get(`/cookbooks/author/${id}`);
  return response.data.map((cookbook: any) => transformCookbook(cookbook));
};

export const useGetAllCookbooksFromUser = (id: number) => {
  return useQuery<Cookbook[], Error>(
    ["cookbooks", id],
    () => getAllCookbooksFromUser(id),
    {
      enabled: !!id,
    }
  );
};
