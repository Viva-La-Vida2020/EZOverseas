import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { orderBy } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Info, RelatedProgram } from "../../../features/programs/program";
import {
  setCurrentProgram,
  setCurrentProgramCategoryId,
} from "../../../features/programs/programSlice";
import { RootState } from "../../../store";

interface Prop {
  info: Info[];
  relatedPrograms: RelatedProgram[];
}

const Profile: React.FC<Prop> = (props) => {
  const dispatch = useDispatch();
  const { info, relatedPrograms } = props;
  const programDetails = useSelector(
    (state: RootState) => state.programs.details,
  );
  const profileParagraphs: Info[] = orderBy(
    info.filter((item: Info) => item.type === "brief"),
    ["index"],
    "asc",
  );
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    const chosenProgram: RelatedProgram | null = relatedPrograms[index];
    console.debug(chosenProgram);
    if (!chosenProgram) {
      return;
    }
    const foundDetails = programDetails.find(
      (item: any) => item.id === chosenProgram.programId,
    );

    dispatch(setCurrentProgram({ ...chosenProgram, details: foundDetails }));
    dispatch(setCurrentProgramCategoryId(chosenProgram.pcId));
  };
  return (
    <Box sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          <Typography variant="h5" gutterBottom sx={{ pb: 2 }}>
            专业简介
          </Typography>
          {profileParagraphs.map((item: Info) => (
            <Typography key={`overview_paragraph_${item.id}`} variant="body1">
              {item.content}
            </Typography>
          ))}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
                类似专业
              </Typography>
              <List>
                {relatedPrograms.map((item: RelatedProgram, index: number) => (
                  <ListItemButton
                    key={`related_program${item.programId}`}
                    onClick={(event) => handleListItemClick(event, index)}
                  >
                    {item.title}
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Profile;
