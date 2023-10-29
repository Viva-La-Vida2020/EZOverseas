import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { ProgramRankingItem } from "../../features/ranking/ranking";

interface Prop {
  data: ProgramRankingItem;
}

const SchoolCard: React.FC<Prop> = (props) => {
  const { data } = props;
  useEffect(() => {
    console.debug("is init");
  }, []);
  const [imgSrc, setImgSrc] = useState(
    `${"/resources/asset/programming_ranking/images/"}${data.logoPath}`,
  );
  const fallbackSrc: string = `/images/logo/placeholderImg.png`;
  return (
    <Box sx={{ p: 2, background: "#ffffff" }}>
      <Grid container spacing={1}>
        <Grid item xs={3} sm={2} md={2}>
          <Typography variant="body1" sx={{ pt: 2, pl: 3 }}>
            {data.ranking}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={8} md={8}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={imgSrc}
              width="60"
              onError={() => {
                setImgSrc(fallbackSrc);
              }}
              style={{ paddingRight: 5 }}
            />
            <Box>
              <Typography variant="body1">{data.university}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} sm={2} md={2}>
          <Typography variant="body1" sx={{ pt: 2 }}>
            {data.country}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SchoolCard;
