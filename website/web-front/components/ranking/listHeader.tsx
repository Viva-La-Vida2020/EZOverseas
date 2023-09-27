import { Grid, Typography } from "@mui/material";
import React from "react";

import { ListHeaderData } from "../../features/ranking/ranking";

interface Prop {
  data: ListHeaderData[];
}

const ListHeader: React.FC<Prop> = (props) => {
  const { data } = props;
  return (
    <Grid container spacing={1}>
      {Array.isArray(data)
        ? data.map((item: ListHeaderData, index: number) => (
            <Grid
              key={`ranking_list_header_grid${index}`}
              item
              xs={item.xs}
              sm={item.sm}
              md={item.md}
              lg={item.lg}
            >
              <Typography
                key={`ranking_list_header_column_title_${index}`}
                variant="subtitle1"
                sx={{ pt: 2, color: "#555" }}
              >
                {item.title}
              </Typography>
            </Grid>
          ))
        : null}
    </Grid>
  );
};
export default ListHeader;
