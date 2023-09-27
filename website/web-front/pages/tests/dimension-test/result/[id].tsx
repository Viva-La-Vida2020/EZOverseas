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

import MessageCard from "../../../../components/home/components/messageCard/index";
import DimensionTestResult from "../../../../components/test/dimension-test/result/index";
import { updateLoadingStatus } from "../../../../features/tests/dimensionTestSlice";
import { RootState } from "../../../../store";

const DimensionTestResultPage: React.FC = () => {
  const router: any = useRouter();
  const dispatch: any = useDispatch();
  const testId: number =
    router.query && router.query.id ? parseInt(router.query.id) : 0;
  const loading: boolean = useSelector(
    (state: RootState) => state.dimensionTest.loading,
  );
  const { success, message, status, data }: any = useSelector(
    (state: RootState) => state.dimensionTest.testResult,
  );
  const userInfo: any = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (testId && userInfo) {
      dispatch(updateLoadingStatus(true));
      dispatch({
        type: "FETCH_DIMENSION_TEST_RESULT",
        payload: { testId },
      });
    }
  }, [testId, userInfo, dispatch]);

  return (
    <div>
      <Container>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xl={9} lg={9} md={10} sm={12}>
            {loading ? (
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
            ) : (
              <Box sx={{ pt: 6, pb: 6 }}>
                {success ? (
                  <DimensionTestResult data={data} />
                ) : (
                  <MessageCard
                    icon={
                      status && status === 401 ? (
                        <LockOpenIcon />
                      ) : (
                        <ReportIcon />
                      )
                    }
                    message={message}
                  />
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default DimensionTestResultPage;
