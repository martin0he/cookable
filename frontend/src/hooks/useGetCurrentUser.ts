import { useQuery } from "react-query";
import api from "../services/api";
import { User } from "../types";
import { transformUser } from "../transformers/UserTransformer";

const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/me");
  return transformUser(response.data);
};

export const useGetCurrentUser = () => {
  return useQuery<User, Error>("currentUser", getCurrentUser);
};
