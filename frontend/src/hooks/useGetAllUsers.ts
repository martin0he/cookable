/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import api from "../services/api";
import { User } from "../types";
import { transformUser } from "../transformers/UserTransformer";

const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data.map((user: any) => transformUser(user));
};

export const useGetAllUsers = () => {
  return useQuery<User[], Error>("users", getAllUsers);
};
