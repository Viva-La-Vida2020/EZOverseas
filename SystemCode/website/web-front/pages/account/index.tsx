import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";

const AccountCenter: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return <></>;
};
export default AccountCenter;
