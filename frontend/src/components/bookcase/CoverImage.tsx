import { Box, Dialog } from "@mui/material";

interface CoverImageProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

const CoverImage = ({ url, onClose, open }: CoverImageProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={url} alt="Cover" style={{ maxWidth: "100%" }} />
      </Box>
    </Dialog>
  );
};

export default CoverImage;
