import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  Box,
} from "@mui/material";

const ConfirmButton = ({
  handler,
  text,
  isConfirm,
}: {
  handler: () => void;
  text: string;
  isConfirm?: boolean;
}) => {
  return (
    <Button
      sx={{
        borderRadius: "8px",
        paddingX: "8px",
        paddingY: "5px",
        marginTop: "5px",
        "&:hover": {
          backgroundColor: isConfirm ? "primary.main" : "secondary.main",
          color: "white",
        },
      }}
      onClick={handler}
      color={isConfirm ? "primary" : "secondary"}
    >
      <Typography
        textTransform="lowercase"
        fontSize={{ lg: 17, md: 15, sm: 17, xs: 15 }}
      >
        {text}
      </Typography>
    </Button>
  );
};

interface ConfirmChangesModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmChangesModal = ({
  isOpen,
  handleClose,
  handleConfirm,
}: ConfirmChangesModalProps) => {
  return (
    <Dialog
      fullWidth
      PaperProps={{
        style: { border: "1.7px dashed rgb(87, 74, 71)", borderRadius: "14px" },
      }}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle fontSize={{ lg: 28, md: 25, sm: 20, xs: 21 }}>
        Confirm Changes
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={{ lg: 21, md: 19, sm: 17, xs: 17 }}>
          Are you sure you want to save the changes?
        </DialogContentText>
        <Box display="flex" justifyContent="space-between">
          <ConfirmButton handler={handleClose} text="Cancel" />
          <ConfirmButton handler={handleConfirm} text="Confirm" isConfirm />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmChangesModal;
