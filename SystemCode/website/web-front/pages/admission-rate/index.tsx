import { Box, Container, Typography } from "@mui/material";
import React from "react";

import Title from "../../components/admission-rate/title";
import EvaluationForm from "../../components/admission-rate/evaluationForm";

const AdmissionRate: React.FC = () => {
  return (
    <Box>
      <Title />
      <Container>
        <EvaluationForm />
      </Container>
    </Box>
  );
};
export default AdmissionRate;
