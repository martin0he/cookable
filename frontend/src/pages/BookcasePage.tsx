import { Box } from "@mui/material";
import PageLayout from "./PageLayout";
import { Cookbook } from "../types";
import { useEffect, useState } from "react";
import { useGetAllCookbooksFromUser } from "../hooks/useGetAllCookbooksFromUser";
import { useAuth } from "../AuthContext";
import CookbookCard from "../components/bookcase/CookbookCard";

const BookcasePage = () => {
  const [cookbooks, setCookbooks] = useState<Cookbook[]>([]);
  const { user } = useAuth();

  const { data } = useGetAllCookbooksFromUser(user ? user.id : 1);
  useEffect(() => {
    if (data) {
      setCookbooks(data);
    }
  }, [data]);
  console.log("Cookbooks:", cookbooks);

  return (
    <PageLayout>
      <Box
        width="100%"
        minHeight="94%"
        height="fit-content"
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="row"
        padding="25px"
        sx={{
          borderRadius: "7px",
          border: 1,
          borderStyle: "dashed",
          borderWidth: 2.2,
          borderColor: "primary.main",
        }}
      >
        {/* Grid */}
        <Box width="64%">
          {cookbooks.map((cookbook) => (
            <CookbookCard
              key={cookbook.id}
              cookbook={cookbook}
              onClick={() => {}}
            />
          ))}
        </Box>
        {/* Create new cookbook */}
        <Box width="36%"></Box>
      </Box>
    </PageLayout>
  );
};

export default BookcasePage;
