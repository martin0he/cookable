/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { Cookbook } from "../types";
import { transformCookbook } from "../transformers/CookbookTransformer";

const getCookbook = async (id: number): Promise<Cookbook> => {
  const response = await api.get(`/cookbooks/${id}`);
  return transformCookbook(response.data);
};

export const useGetCookbook = (id: number) => {
  return useQuery<Cookbook, Error>(["cookbook", id], () => getCookbook(id));
};
