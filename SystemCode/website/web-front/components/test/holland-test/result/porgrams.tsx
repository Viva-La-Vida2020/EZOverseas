import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

import { HollandResultProgram } from "../../../../features/tests/holland";

interface Prop {
  data: HollandResultProgram[];
}

function Programs(props: Prop) {
  const { data } = props;

  return (
    <Box>
      <Container maxWidth="md">
        <Paper elevation={0}>
          <Typography variant="h5" sx={{ pb: 2 }}>
            可能适合你的专业:
          </Typography>
          <Grid container spacing={3}>
            {data.map((item: HollandResultProgram, index: number) => (
              <Grid
                key={`holland_result_program_$${index}`}
                item
                xl={4}
                lg={4}
                md={4}
                sm={6}
              >
                <Box sx={{ display: "flex" }}>
                  <Link
                    variant="body2"
                    component="a"
                    href={`/programs?title=${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </Link>
                  <Typography variant="body1" sx={{ pl: 1 }}>
                    ({item.codeGroup})
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
export default Programs;
