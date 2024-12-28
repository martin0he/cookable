/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { User } from "../types";
import { transformUser } from "../transformers/UserTransformer";

const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return transformUser(response.data);
};

export const useGetUser = (id: number) => {
  return useQuery<User, Error>(["user", id], () => getUser(id));
};
