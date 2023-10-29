import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import { ProgramRankingItem } from "../../features/ranking/ranking";

interface Prop {
  data: ProgramRankingItem;
}

const ProgramCard: React.FC<Prop> = (props) => {
  const { data } = props;

  return (
    <Box sx={{ p: 2, background: "#ffffff" }}>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={8}>
          <Typography variant="body1" sx={{ pt: 2 }}>
            {data.programTitle}
          </Typography>
        </Grid>
        <Grid item xs={3} sm={2}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ pt: 2 }}>
              {data.ranking}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sm={2}>
          <Typography variant="body1" sx={{ pt: 2 }}>
            {data.rankingBy}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProgramCard;
