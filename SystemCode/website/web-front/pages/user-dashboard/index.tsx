import { Box, Container, Typography } from "@mui/material";
import React from "react";

import ResultAndProgramTab from "../../components/user-dashboard/resultAndProgramTab";
import Title from "../../components/user-dashboard/title";

const UserDashBoard: React.FC = () => {
  return (
    <Box>
      <Title />
      <ResultAndProgramTab id = {null}/>
    </Box>
  );
};
export default UserDashBoard;
