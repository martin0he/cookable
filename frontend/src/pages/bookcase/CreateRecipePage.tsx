import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../PageLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import api from "../../services/api";
import { IoIosCamera } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";
import { useCreateRecipe } from "../../hooks/useCreateRecipe";

const CreateRecipePage = () => {
  const nav = useNavigate();
  const { id: cookbookId } = useParams();
  const cookbookIdNumber = parseInt(cookbookId || "1");
  const { user } = useAuth();
  const authorId = user?.id;
  const { mutate } = useCreateRecipe();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [expectedDuration, setExpectedDuration] = useState(0);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<
    { summary: string; details: string }[]
  >([{ summary: "", details: "" }]);

  const [formValues, setFormValues] = useState({
    authorId: authorId || 1,
    cookbookId: cookbookIdNumber,
    title: title,
    description: description,
    imageUrl: imageUrl,
    ingredients: ingredients,
    instructions: instructions,
    tags: tags,
    expectedDuration: expectedDuration,
  });

  useEffect(() => {
    setFormValues({
      authorId: authorId || 1,
      cookbookId: cookbookIdNumber,
      title,
      description,
      imageUrl,
      ingredients,
      instructions,
      tags,
      expectedDuration,
    });
  }, [
    title,
    tags,
    imageUrl,
    description,
    ingredients,
    instructions,
    expectedDuration,
    authorId,
    cookbookId,
    cookbookIdNumber,
  ]);

  const handleSave = async () => {
    try {
      await mutate(formValues);
      nav(`/bookcase/cookbooks/${cookbookId}`);
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) {
      alert("No file selected. Please choose an image to upload.");
      return;
    }

    const form = new FormData();
    form.append("image", file);
    try {
      const response = await api.post("/cookbooks/uploadImage", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      setTags([...tags, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleInstructionChange = (
    index: number,
    field: "summary" | "details",
    value: string
  ) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index][field] = value;
    setInstructions(updatedInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { summary: "", details: "" }]);
  };

  console.log(formValues);

  return (
    <PageLayout>
      <Box
        width={{ lg: "65%", md: "70%", sm: "80%", xs: "90%" }}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        rowGap="25px"
      >
        {/* Title Input */}
        <Box width="100%">
          <Typography fontSize={{ lg: 33, md: 30, sm: 27, xs: 24 }}>
            <input
              name="title"
              type="text"
              required
              value={formValues.title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type In Recipe Name"
              style={{
                width: "100%",
                color: "inherit",
                fontSize: "inherit",
                fontFamily: "inherit",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            />
          </Typography>
        </Box>

        {/* Tags Input */}
        <Box
          width="100%"
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          sx={{
            border: "2px",
            borderColor: "primary.main",
            borderStyle: "dashed",
            borderRadius: "7px",
            padding: "10px",
            gap: "4px",
          }}
        >
          <Typography fontSize={{ lg: 17, md: 16, sm: 15, xs: 14 }} flex={1}>
            <input
              type="text"
              placeholder="add tags..."
              onKeyDown={handleAddTag}
              style={{
                flex: "inherit",
                border: "none",
                outline: "none",
                fontSize: "inherit",
                fontFamily: "inherit",
                backgroundColor: "transparent",
                color: "inherit",
                width: "100%",
              }}
            />
          </Typography>

          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{
                fontSize: { lg: 15, md: 14, sm: 13, xs: 12 },
                backgroundColor: "primary.light",
                borderRadius: "5px",
                color: "background.default",
              }}
            />
          ))}
        </Box>

        {/* Image Upload */}
        <Box width="100%">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{ width: "100%", borderRadius: "7px", contain: "cover" }}
            />
          ) : (
            <label htmlFor="file-input">
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  display: "none",
                }}
              />
              <Button
                component="span"
                sx={{
                  fontSize: { lg: 80, md: 70, sm: 60, xs: 50 },
                  textTransform: "none",
                  fontWeight: "bold",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ceaea1",
                  color: "#6f5449",
                  borderRadius: "7px",
                  height: "40vh",
                  "&:hover": {
                    backgroundColor: "#bc998a",
                    color: "#56453e",
                  },
                }}
              >
                <IoIosCamera />
              </Button>
            </label>
          )}
        </Box>

        {/* Description Input */}
        <Box width="100%">
          <Typography
            fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
            sx={{
              "::first-letter": {
                textTransform: "capitalize",
                fontSize: { lg: 24, md: 22, sm: 18, xs: 16 },
              },
            }}
          >
            <textarea
              name="description"
              required
              value={formValues.description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a brief description of your recipe. Share what makes it special, the inspiration behind it, or tips for serving. For example, 'A quick and easy pasta dish perfect for weeknights, with a rich tomato-basil sauce.'"
              style={{
                width: "100%",
                height: "15vh",
                lineHeight: "1.5",
                fontSize: "inherit",
                fontFamily: "inherit",
                border: "none",
                resize: "none",
                outline: "none",
                overflow: "auto",
                backgroundColor: "transparent",
                color: "inherit",
              }}
            />
          </Typography>
        </Box>

        {/* Ingredients Input */}
        <Box width="100%">
          <Typography
            fontSize={{ lg: 26, md: 23, sm: 20, xs: 18 }}
            color="primary"
          >
            Ingredients
          </Typography>
          {ingredients.map((ingredient, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              flexDirection="row"
              gap="10px"
              width="100%"
              sx={{
                marginBottom: "10px",
                border: "2px",
                borderColor: "primary.main",
                borderStyle: "dashed",
                borderRadius: "7px",
                padding: "10px",
              }}
            >
              <Typography
                fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
                width="100%"
              >
                <span>{index + 1}. </span>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder="Enter an ingredient with the appropriate quantity"
                  style={{
                    width: "95%",
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    outline: "none",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "inherit",
                  }}
                />
              </Typography>
            </Box>
          ))}
          <Button
            onClick={handleAddIngredient}
            sx={{
              textTransform: "none",
              color: "#6f5449",
              fontSize: { lg: 18, md: 16, sm: 14, xs: 12 },
              border: "2px",
              borderColor: "primary.main",
              borderStyle: "dashed",
              borderRadius: "7px",
              padding: "10px",
              width: "100%",
              backgroundColor: "transparent",
              "&:hover": {
                borderStyle: "solid",
              },
            }}
          >
            Add another...
          </Button>
        </Box>
        {/* Instructions */}
        <Box width="100%">
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              fontSize={{ lg: 26, md: 23, sm: 20, xs: 18 }}
              color="primary"
            >
              Instructions
            </Typography>
            <Box display="flex" flexDirection="row" columnGap="10px">
              <Typography fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}>
                Expected Duration:{" "}
              </Typography>
              <Typography fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}>
                <input
                  type="number"
                  value={expectedDuration}
                  onChange={(e) => setExpectedDuration(e.target.valueAsNumber)}
                  style={{
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    outline: "none",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "inherit",
                    width: "60px",
                    height: "fit-content",
                  }}
                />{" "}
                minutes
              </Typography>
            </Box>
          </Box>

          {instructions.map((instruction, index) => (
            <Accordion
              sx={{
                marginBottom: "10px",
                width: "100%",
                border: 2,
                borderStyle: "dashed",
                borderColor: "primary.main",
                backgroundColor: "background.default",
                boxShadow: 0,
                borderRadius: "7px",
              }}
              key={index}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                sx={{
                  width: "100%",
                  "&.Mui-expanded": {
                    backgroundColor: "inherit",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "inherit",
                  },
                }}
              >
                <Typography
                  fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
                  width="100%"
                >
                  {index + 1}.{" "}
                  <input
                    type="text"
                    placeholder="Insert Summary"
                    value={instruction.summary}
                    onChange={(e) =>
                      handleInstructionChange(index, "summary", e.target.value)
                    }
                    style={{
                      width: "90%",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: "inherit",
                    }}
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontSize={{ lg: 18, md: 16, sm: 14, xs: 13 }}>
                  <textarea
                    placeholder="Insert description..."
                    value={instruction.details}
                    onChange={(e) =>
                      handleInstructionChange(index, "details", e.target.value)
                    }
                    style={{
                      width: "100%",
                      height: "7vh",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      border: "none",
                      outline: "none",
                      resize: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Add New Instruction Button */}
          <Button
            onClick={addInstruction}
            sx={{
              textTransform: "none",
              color: "#6f5449",
              fontSize: { lg: 18, md: 16, sm: 14, xs: 12 },
              border: "2px",
              borderColor: "primary.main",
              borderStyle: "dashed",
              borderRadius: "7px",
              padding: "10px",
              width: "100%",
              backgroundColor: "transparent",
              "&:hover": {
                borderStyle: "solid",
              },
              marginTop: "5px",
            }}
          >
            Add another...
          </Button>
        </Box>
        {/* Action buttons */}
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          gap="10px"
        >
          <Button
            onClick={() => nav(-1)}
            variant="contained"
            color="secondary"
            sx={{
              borderColor: "secondary.main",
              color: "background.default",
              "&:hover": {
                borderColor: "secondary.dark",
              },
              textTransform: "lowercase",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "primary.main",
              color: "background.default",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              textTransform: "lowercase",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default CreateRecipePage;
