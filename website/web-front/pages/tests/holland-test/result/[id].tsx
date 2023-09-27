import LockOpenIcon from "@mui/icons-material/LockOpen";
import ReportIcon from "@mui/icons-material/Report";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageCard from "../../../../components/messageCard";
import HollandTestResult from "../../../../components/test/holland-test/result";
import { HollandTestResult as HollandTestResultData } from "../../../../features/tests/holland.d";
import { toggleLoading } from "../../../../features/tests/hollandTestSlice";
import { RootState } from "../../../../store";

interface Prop {}

const HollandTestResultPage: React.FC<Prop> = (props) => {
  const router: any = useRouter();
  const dispatch: any = useDispatch();
  const testId: number =
    router.query && router.query.id ? parseInt(router.query.id) : 0;
  const loading: boolean = useSelector(
    (state: RootState) => state.hollandTest.loading,
  );
  const { success, status, message, data }: HollandTestResultData = useSelector(
    (state: RootState) => state.hollandTest.testResult,
  );

  useEffect(() => {
    if (testId) {
      dispatch(toggleLoading(true));
      dispatch({
        type: "FETCH_HOLLAND_TEST_RESULT",
        payload: { testId },
      });
    }
  }, [testId, dispatch]);

  if (loading) {
    return (
      <Box sx={{ pt: 5, pb: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            m: 2,
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h3">加载中...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ pb: 5 }}>
        {success ? (
          <Box>
            <Grid container justifyContent="center" direction={"row"}>
              <Grid item xl={10} lg={10} md={12} sm={12}>
                <HollandTestResult data={data} />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <MessageCard
            icon={status === 401 ? <LockOpenIcon /> : <ReportIcon />}
            message={message}
          />
        )}
      </Box>
    </Box>
  );
};
export default HollandTestResultPage;
