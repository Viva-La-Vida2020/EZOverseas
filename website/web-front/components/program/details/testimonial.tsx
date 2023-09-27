import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { Testimonial } from "../../../features/programs/program";

interface Prop {
  data: Testimonial[];
  currentProgram: string;
}

const Testinomial: React.FC<Prop> = (props) => {
  const { data, currentProgram } = props;
  const router = useRouter();

  return (
    <Box sx={{ pb: 6 }}>
      {data[0] ? (
        <Box sx={{ pt: 8, pb: 8, backgroundColor: "#f9f9f9" }}>
          <Typography variant="h4" align="center" gutterBottom>
            学长学姐说啥？
          </Typography>
          <Box sx={{ textAlign: "center", pl: 5, pr: 5 }}>
            <Typography variant="subtitle1">{data[0].feedback}</Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, p: 2 }}
              component="p"
            >
              {data[0].name}
            </Typography>
            <Typography variant="body1" sx={{ pb: 3 }}>
              {`${data[0].school} ${data[0].program} ${data[0].grade}`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push(`/consult?program=${currentProgram}`)}
            >
              咨询学长学姐
            </Button>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default Testinomial;
