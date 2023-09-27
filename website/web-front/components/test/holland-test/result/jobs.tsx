import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import { HollandResultJob } from "../../../../features/tests/holland";

interface Prop {
  data: HollandResultJob[];
}

function Jobs(props: Prop) {
  const { data } = props;

  return (
    <Box>
      <Container maxWidth="md">
        <Paper elevation={0}>
          <Typography variant="h5" sx={{ pb: 2 }}>
            可能适合你的职业:
          </Typography>
          <Grid container spacing={3}>
            {data.map((item: HollandResultJob, index: number) => (
              <Grid
                key={`holland_result_job_${index}`}
                item
                xl={4}
                lg={4}
                md={4}
                sm={6}
              >
                <Typography variant="body1" sx={{ pl: 1 }}>
                  {item.title} ({item.codeGroup})
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
export default Jobs;
