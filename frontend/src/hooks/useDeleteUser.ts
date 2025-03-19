import { useQueryClient, useMutation } from "react-query";
import api from "../services/api";

const deleteUser = async (): Promise<void> => {
  await api.delete("/users/delete");
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.removeQueries("currentUser");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};
