import { useMutation, useQueryClient } from "react-query";
import api from "../services/api";

const createCookbook = async (cookbookData: {
  title: string;
  authorId: number;
  description: string;
  isPrivate: boolean;
  coverImageUrl: string;
}) => {
  const response = await api.post("/cookbooks", cookbookData);
  return response.data;
};

export const useCreateCookbook = () => {
  const queryClient = useQueryClient();
  return useMutation(createCookbook, {
    onSuccess: (newCookbook) => {
      queryClient.invalidateQueries("cookbooks");
      console.log("Cookbook created successfully:", newCookbook);
    },
    onError: (error) => {
      console.error("Error creating cookbook:", error);
    },
  });
};
