import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

import ResultAndProgramTab from "../../components/user-dashboard/resultAndProgramTab";
import Title from "../../components/user-dashboard/title";

const UserDashBoard: React.FC = () => {
    const router: any = useRouter();
    const id: number =
    router.query && router.query.id ? parseInt(router.query.id) : 0;
  return (
    <Box>
      <Title />
      <ResultAndProgramTab id = {id} />
    </Box>
  );
};
export default UserDashBoard;
