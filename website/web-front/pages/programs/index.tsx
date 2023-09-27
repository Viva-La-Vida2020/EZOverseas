import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingCard from "../../components/home/components/loading";
import Details from "../../components/program/details/index";
import ProgramSelector from "../../components/program/details/programSelector";
import Title from "../../components/program/title";
import { ProgramDetails, ProgramItem } from "../../features/programs/program";
import {
  setCurrentProgram,
  setCurrentProgramCategoryId,
  updateLoadingStatus,
} from "../../features/programs/programSlice";
import { RootState } from "../../store";

const ProgramExplorer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentProgram = useSelector(
    (state: RootState) => state.programs.currentProgram,
  );
  const programDetails = useSelector(
    (state: RootState) => state.programs.details,
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.programs.loading,
  );
  const programs = useSelector((state: RootState) => state.programs.list);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const { query } = router;

  useEffect(() => {
    console.debug("is first useEffect");
    if (programs.length > 0 && query && query.title) {
      const foundProgramCategory: ProgramItem | undefined = programs.find(
        (item: ProgramItem) =>
          Array.isArray(item.details) &&
          item.details.find((d: ProgramDetails) => d.title === query.title),
      );
      if (!foundProgramCategory) {
        return;
      }
      const programInfo: ProgramDetails | undefined =
        foundProgramCategory.details.find(
          (d: ProgramDetails) => d.title === query.title,
        );
      if (!programInfo) {
        return;
      }
      const foundProgramDetails: any = programDetails.find(
        (item: any) => item.title === query.title,
      );
      dispatch(
        setCurrentProgram({ ...programInfo, details: foundProgramDetails }),
      );
      dispatch(setCurrentProgramCategoryId(foundProgramCategory.id));
    }
  }, [programs, dispatch]);

  useEffect(() => {
    console.debug("is second useEffect");
    if (
      currentProgram &&
      currentProgram.title &&
      !currentProgram.details &&
      !programDetails.find(
        (item: any) => item.programId === currentProgram.programId,
      )
    ) {
      dispatch(updateLoadingStatus(true));
      dispatch({
        type: "FETCH_PROGRAM_DETAILS",
        payload: { title: currentProgram?.title },
      });
    }
  }, [currentProgram, userInfo, dispatch]);

  console.debug("is re-rendering...");

  if (loading) {
    return (
      <Box
        sx={{
          pt: 3,
          pb: 3,
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingCard message="正在加载专业数据..." />
      </Box>
    );
  }
  return (
    <Box sx={{ position: "relative" }}>
      <Title />
      <Box>
        <ProgramSelector direction="horizontal" />
        <Details
          title={currentProgram ? currentProgram.title : ""}
          data={currentProgram ? currentProgram.details : null}
        />
      </Box>
    </Box>
  );
};
export default ProgramExplorer;
