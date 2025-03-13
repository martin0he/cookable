import { useMutation } from "react-query";
import api from "../services/api";
import { queryClient } from "../main";

const deleteUser = async (): Promise<void> => {
  await api.delete("/users/delete");
};

export const useDeleteUser = () => {
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.removeQueries("currentUser");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};
