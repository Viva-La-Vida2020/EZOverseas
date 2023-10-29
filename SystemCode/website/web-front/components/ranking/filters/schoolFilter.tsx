import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { SchoolRankingItem } from "../../../features/ranking/ranking";
import { updateSchoolFilter } from "../../../features/ranking/rankingSlice";
import { RootState } from "../../../store";

export interface Option {
  id: string;
  group: string;
  name: string;
  value: any;
}

const SchoolFilter: React.FC = () => {
  const dispatch = useDispatch();

  const filter: string | null = useSelector(
    (state: RootState) => state.ranking.schoolRankingFilter,
  );

  const schoolRankingList: SchoolRankingItem[] = useSelector(
    (state: RootState) => state.ranking.schoolRankings,
  );

  function chooseSchool(
    event: React.SyntheticEvent,
    value: string | null,
    reason: any,
    details?: any,
  ) {
    dispatch(updateSchoolFilter(value));
  }

  return (
    <Box>
      <Grid container sx={{ pt: 1, pb: 1, justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={7}>
          <Autocomplete
            id="schoolPicker"
            options={schoolRankingList.map(
              (item: SchoolRankingItem) => item.university,
            )}
            onChange={chooseSchool}
            value={filter}
            getOptionLabel={(option) => option}
            sx={{ width: "100%", background: "#fff" }}
            renderInput={(params) => <TextField {...params} label="学校名" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default SchoolFilter;
