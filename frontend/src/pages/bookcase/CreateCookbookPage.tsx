/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "../../AuthContext";
import PageLayout from "../PageLayout";
import { useCreateCookbook } from "../../hooks/useCreateCookbook";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { IoMdEye } from "react-icons/io";
import CoverImage from "../../components/bookcase/CoverImage";

const CreateCookbookPage = () => {
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [seePreview, setSeePreview] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    authorId: user?.id || 1,
    description: "",
    isPrivate: true,
    imageUrl: "",
  });

  const { mutate, isLoading, isError, error } = useCreateCookbook();
  const nav = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      await handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) {
      alert("No file selected. Please choose an image to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await api.post("/cookbooks/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploading(false);
      setUploadedUrl(response.data.url);
      console.log("Uploaded Image URL:", response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedUrl) {
      return alert("Please upload an image before submitting.");
    }
    mutate(formValues);
  };

  return (
    <PageLayout>
      <>
        {seePreview && preview && (
          <CoverImage
            url={preview}
            onClose={() => setSeePreview(false)}
            open={seePreview}
          />
        )}
        <Box
          width={{ xs: "95%", sm: "65%", md: "40%", lg: "27%" }}
          minHeight="100%"
          position="relative"
        >
          <Box
            position="absolute"
            top="10px"
            left="10px"
            width="100%"
            height="100%"
            sx={{
              backgroundColor: "secondary.dark",
              borderRadius: 2,
              border: 1.6,
              borderColor: "secondary.dark",
            }}
          />

          <Box
            position="absolute"
            top="5px"
            left="5px"
            width="100%"
            height="100%"
            sx={{
              backgroundColor: "#D0ABA9",
              borderRadius: 2,
              border: 1.6,
              borderColor: "secondary.dark",
            }}
          />
          <Box
            width="100%"
            height="100%"
            minHeight="100%"
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

            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", height: "100%" }}
            >
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
                  height: "45%",
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

              {/* Image Upload */}
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                flexDirection="row"
              >
                <label htmlFor="file-input">
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    disabled={uploading}
                    sx={{
                      textTransform: "none",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "6px 12px",
                    }}
                  >
                    {uploading
                      ? "Uploading..."
                      : image
                      ? "Image Uploaded"
                      : "Upload a Cover Image"}
                  </Button>
                </label>
                <IconButton
                  disabled={!image}
                  onClick={() => setSeePreview((prev) => !prev)}
                >
                  <IoMdEye />
                </IconButton>
              </Box>

              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                marginTop="15px"
              >
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
                <p
                  style={{
                    color: "red",
                    marginTop: "15px",
                    textAlign: "center",
                  }}
                >
                  Error: {(error as any).message}
                </p>
              )}
            </form>
          </Box>
        </Box>
      </>
    </PageLayout>
  );
};

export default CreateCookbookPage;
