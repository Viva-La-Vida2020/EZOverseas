import { Grid, Typography } from "@mui/material";
import React from "react";

interface Prop {
  message: string;
  icon: any;
}

const MessageCard: React.FC<Prop> = (props) => {
  const { message, icon } = props;

  return (
    <Grid container sx={{ p: 2 }}>
      <Grid item sm={12}>
        <Typography sx={{ textAlign: "center", pt: 4, pb: 6 }} variant="h5">
          {icon || null}
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default MessageCard;
