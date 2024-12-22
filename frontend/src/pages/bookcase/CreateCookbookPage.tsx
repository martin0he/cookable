/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "../../AuthContext";
import PageLayout from "../PageLayout";
import { useCreateCookbook } from "../../hooks/useCreateCookbook";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateCookbookPage = () => {
  const { user } = useAuth();
  const [formValues, setFormValues] = useState({
    title: "",
    authorId: user?.id || 1,
    description: "",
    isPrivate: true,
  });

  const { mutate, isLoading, isError, error } = useCreateCookbook();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formValues);
  };

  const nav = useNavigate();

  return (
    <PageLayout>
      <Box
        width={{ xs: "95%", sm: "65%", md: "40%", lg: "27%" }}
        minHeight="90%"
        position="relative"
        sx={{
          backgroundColor: "#EBCECC",
          padding: "15px",
          borderRadius: 2,
          border: 1.6,
          borderColor: "secondary.dark",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "10px",
            right: "15px",
            fontSize: "18px",
          }}
        >
          {new Date().toLocaleDateString()}
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
          {/* Title Input */}
          <input
            name="title"
            type="text"
            required
            value={formValues.title}
            onChange={handleChange}
            placeholder="Title"
            style={{
              marginTop: "25px",
              width: "100%",
              backgroundColor: "transparent",
              fontFamily: "inherit",
              fontSize: "40px",
              border: "none",
              outline: "none",
              color: "#403D3D",
            }}
          />

          {/* Description Textarea */}
          <textarea
            name="description"
            required
            value={formValues.description}
            onChange={handleChange}
            placeholder="Add a descriptive overview of your cookbook, including its intended use, time of year, special occasion/s, the story behind the food, or simply what motivated you to write it..."
            style={{
              marginTop: "25px",
              width: "100%",
              height: "50%",
              backgroundColor: "transparent",
              fontFamily: "inherit",
              fontSize: "23px",
              border: "none",
              outline: "none",
              color: "#403D3D",
              resize: "none",
              overflow: "auto",
            }}
          />

          <Box width="100%" display="flex" justifyContent="center">
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.isPrivate}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      isPrivate: e.target.checked,
                    }))
                  }
                />
              }
              label="make private?"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            position="absolute"
            bottom="16px"
            right="16px"
            gap="10px"
          >
            <Button
              type="reset"
              variant="contained"
              color="secondary"
              onClick={() => nav(-1)}
              sx={{
                textTransform: "none",
                marginTop: "15px",
              }}
            >
              <Typography color="white">cancel</Typography>
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                marginTop: "15px",
              }}
            >
              {formValues.isPrivate ? (
                <Typography color="white">save</Typography>
              ) : (
                <Typography color="white">publish</Typography>
              )}
            </Button>
          </Box>

          {/* Error Message */}
          {isError && (
            <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
              Error: {(error as any).message}
            </p>
          )}
        </form>
      </Box>
    </PageLayout>
  );
};

export default CreateCookbookPage;
