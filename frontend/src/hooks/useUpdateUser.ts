import { useMutation, useQueryClient } from "react-query";
import api from "../services/api";
import { User } from "../types";
import { transformUser } from "../transformers/UserTransformer";

const updateUser = async (userData: {
  userId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  profilePic?: string | null;
  email?: string;
  bio?: string | null;
}): Promise<User> => {
  const response = await api.put("/users/update", userData);
  return transformUser(response.data);
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User>("currentUser", updatedUser);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
};
