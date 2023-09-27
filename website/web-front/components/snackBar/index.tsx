import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React from "react";

interface Prop {
  type: any;
  onClose: () => void;
  message: string;
  visible: boolean;
  vertical: any;
  horizontal: any;
}

function NotificationBar(props: Prop) {
  const {
    onClose,
    type,
    message,
    visible,
    vertical = "top",
    horizontal = "center",
  } = props;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    console.debug("click to close");
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={visible}
      onClose={handleClose}
      key="snackbar"
      autoHideDuration={5000}
    >
      <Alert
        severity={type || "info"}
        sx={{ width: "100%" }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
export default NotificationBar;
