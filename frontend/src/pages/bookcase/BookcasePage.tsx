import { Box, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PageLayout from "../PageLayout";
import { Cookbook } from "../../types";
import { useEffect, useState } from "react";
import { useGetAllCookbooksFromUser } from "../../hooks/useGetAllCookbooksFromUser";
import { useAuth } from "../../AuthContext";
import CookbookCard from "../../components/bookcase/CookbookCard";
import { GiQuillInk } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

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

  const nav = useNavigate();

  return (
    <PageLayout>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection={{ xs: "column", md: "row" }}
        padding="45px"
        paddingTop={12}
        sx={{
          borderRadius: "7px",
          border: 1,
          borderStyle: "dashed",
          borderWidth: 2.2,
          borderColor: "primary.main",
        }}
      >
        {/* Grid */}
        <Box width={{ xs: "100%", md: "64%" }} height="100%">
          <Grid width="fit-content" container rowSpacing={3} columns={3}>
            {cookbooks.map((cookbook) => (
              <Grid size={1} key={cookbook.id}>
                <CookbookCard cookbook={cookbook} onClick={() => {}} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Create new cookbook */}
        <Box
          width={{ xs: "100%", md: "36%" }}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderRadius: "7px",
              border: 1,
              borderStyle: "dashed",
              borderWidth: 2.2,
              borderColor: "primary.main",
              backgroundColor: "#EFECEC",
              transition: "all 0.3s ease-in-out",
              opacity: 0.79,
              "&:hover": {
                backgroundColor: "#EFECEC",
                opacity: 1,
              },
            }}
          >
            <IconButton
              onClick={() => nav("/bookcase/create-cookbook")}
              sx={{
                fontSize: 50,
                color: "text.main",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                borderRadius: "0px",
              }}
            >
              <GiQuillInk />
              <Typography fontSize={{ lg: 37, md: 32, sm: 28, xs: 24 }}>
                new cookbook
              </Typography>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default BookcasePage;
