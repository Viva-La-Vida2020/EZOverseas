import { Box, Chip, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ProgramDetails,
  ProgramItem,
} from "../../../features/programs/program";
import {
  setCurrentProgram,
  setCurrentProgramCategoryId,
  updateLoadingStatus,
} from "../../../features/programs/programSlice";
import { RootState } from "../../../store";
import styles from "./details.module.css";

interface Prop {
  direction?: "horizontal" | "vertical" | undefined;
}

function ProgramSelector(props: Prop) {
  const { direction } = props;
  const dispatch = useDispatch();
  const programs = useSelector((state: RootState) => state.programs.list);
  const currentProgram = useSelector(
    (state: RootState) => state.programs.currentProgram,
  );
  const programDetails = useSelector(
    (state: RootState) => state.programs.details,
  );
  const currentProgramCategoryId: number = useSelector(
    (state: RootState) => state.programs.currentProgramCategoryId,
  );

  useEffect(() => {
    if (programs.length === 0) {
      dispatch(updateLoadingStatus(true));
      dispatch({
        type: "FETCH_PROGRAMS",
      });
    }
  }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setCurrentProgramCategoryId(newValue));
  };

  const a11yProps = (index: number) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  const foundProgramCategory: ProgramItem | undefined = programs.find(
    (item: ProgramItem) => item.id === currentProgramCategoryId,
  );

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    if (!foundProgramCategory) {
      return;
    }

    const chosenProgram: ProgramDetails | null = Array.isArray(
      foundProgramCategory.details,
    )
      ? foundProgramCategory.details[index]
      : null;
    console.debug(chosenProgram);
    if (!chosenProgram) {
      return;
    }
    const foundDetails = programDetails.find(
      (item: any) => item.programId === chosenProgram.programId,
    );
    dispatch(setCurrentProgram({ ...chosenProgram, details: foundDetails }));
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          orientation={direction}
          value={currentProgramCategoryId}
          onChange={handleChange}
          aria-label="Program Selector"
          variant="scrollable"
          scrollButtons="auto"
        >
          {programs.map((item: ProgramItem, index: number) => (
            <Tab
              key={`program_selector_tab_${index}`}
              label={item.name}
              {...a11yProps(0)}
              value={item.id}
            />
          ))}
        </Tabs>
      </Box>
      {foundProgramCategory ? (
        <div
          role="tabpanel"
          id={`full-width-programExplore-tabpanel`}
          aria-labelledby={`full-width-programExplore-tab`}
        >
          <Box className={styles.programOptions}>
            {Array.isArray(foundProgramCategory.details)
              ? foundProgramCategory.details.map(
                  (item: ProgramDetails, index: number) => (
                    <Chip
                      key={`program_list_item_${index}`}
                      onClick={(event) => handleListItemClick(event, index)}
                      clickable
                      color={
                        !!(
                          currentProgram && currentProgram.title === item.title
                        )
                          ? "primary"
                          : "default"
                      }
                      sx={{ m: 0.5 }}
                      label={item.title}
                    />
                  ),
                )
              : null}
          </Box>
        </div>
      ) : (
        <Box sx={{ pl: 3 }}>
          <Typography variant="body1">未找到任何数据</Typography>
        </Box>
      )}
    </Box>
  );
}
export default ProgramSelector;
