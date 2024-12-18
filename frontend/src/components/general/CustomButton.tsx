import { Button } from "@mui/material";

interface CustomButtonProps {
  text: string;
  fontSize: number;
  onClick: () => void;
}

const CustomButton = ({ text, onClick, fontSize }: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        borderRadius: "10px",
        textTransform: "none",
        fontSize: {
          lg: fontSize,
          md: fontSize - 3,
          sm: fontSize - 5,
          xs: fontSize - 7,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
