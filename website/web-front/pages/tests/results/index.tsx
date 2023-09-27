import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import lodash from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingCard from "../../../components/loadingCard";
import MessageCard from "../../../components/messageCard";
import DimensionTestResult from "../../../components/test/dimension-test/result";
import HollandTestResult from "../../../components/test/holland-test/result";
import { updateUserLoading } from "../../../features/user/userSlice";
import {
  sectionPaddingBottom,
  sectionPaddingTop,
} from "../../../helper/constants";
import { RootState } from "../../../store";

function TestResults() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const results = useSelector((state: RootState) => state.user.testResults);
  const programBooking = useSelector(
    (state: RootState) => state.user.programBooking,
  );
  const [tabVal, setTabVal] = useState<number>(0);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    dispatch(updateUserLoading(true));
    dispatch({
      type: "FETCH_TEST_RESULTS",
    });
  }, [userInfo, dispatch]);

  useEffect(() => {
    dispatch(updateUserLoading(true));
    dispatch({
      type: "FETCH_PROGRAM_BOOKING",
    });
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (results && Array.isArray(results.data) && results.data.length > 0) {
      const defaultExpandedItem: string = results.data.filter(
        (item: any) => item.title === tests[tabVal],
      )[0].id;
      setExpanded(defaultExpandedItem);
    }
  }, [results, tabVal]);

  const a11yProps = (index: number) => {
    return {
      id: `user-test-title-tab-${index}`,
      "aria-controls": `user-test-result-panel-${index}`,
    };
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabVal(newValue);
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const tests: string[] =
    results && Array.isArray(results.data)
      ? lodash.uniq(results.data.map((item: any) => item.title))
      : [];

  if (loading) {
    <Box sx={{ pt: sectionPaddingTop, pb: sectionPaddingBottom }}>
      <Container>
        <LoadingCard message="正在加载您的过往测试记录" />
      </Container>
    </Box>;
  }

  if (results && !results.success) {
    console.debug("results: ", results);
    return (
      <Box sx={{ pt: sectionPaddingTop, pb: sectionPaddingBottom }}>
        <Container>
          <MessageCard
            icon={
              <SentimentDissatisfiedIcon
                sx={{ fontSize: 42 }}
                color="primary"
              />
            }
            message={results.message}
          />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: sectionPaddingTop, pb: sectionPaddingBottom }}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xl={10} lg={10} md={10} sm={12}>
            {results && results.success && Array.isArray(results.data) ? (
              <Box>
                <Tabs
                  orientation="horizontal"
                  centered
                  value={tabVal}
                  onChange={handleTabChange}
                  aria-label="Program Selector"
                >
                  {tests.map((item: string) => (
                    <Tab
                      key={`test_result_tab_${item}`}
                      label={item}
                      {...a11yProps(0)}
                    />
                  ))}
                </Tabs>
                {results.data.find(
                  (item: any) => item.title === tests[tabVal],
                ) ? (
                  <div
                    role="tabpanel"
                    id={`full-width-test-result-tabpanel-${tabVal}`}
                    aria-labelledby={`full-width-test-result-tab-${tabVal}`}
                  >
                    <Box>
                      {results.data
                        .filter((item: any) => item.title === tests[tabVal])
                        .map((r: any) => (
                          <Accordion
                            key={`test_result_accordion_${r.id}`}
                            expanded={expanded === r.id}
                            onChange={handleAccordionChange(r.id)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel${r.id}-content`}
                              id={`panel${r.id}`}
                            >
                              <Box width={1}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={7} md={6} lg={6}>
                                    <Box sx={{ display: "flex" }}>
                                      <Typography
                                        variant="subtitle1"
                                        sx={{ pr: 1 }}
                                        color="text.alert"
                                      >
                                        测试结果:
                                      </Typography>
                                      <Typography
                                        variant="subtitle1"
                                        sx={{ pr: 1 }}
                                      >
                                        {r.details.title}
                                      </Typography>
                                      {tests[tabVal] === "MBTI性格测试" ? (
                                        <Typography
                                          variant="subtitle1"
                                          color="primary"
                                          sx={{ pr: 1 }}
                                        >
                                          {r.details.code}
                                        </Typography>
                                      ) : null}
                                    </Box>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={5}
                                    md={6}
                                    lg={6}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      color="text.alert"
                                      sx={{ pr: 3 }}
                                    >
                                      {moment(r.createDate).format(
                                        "YYYY-MM-DD HH:mm:ss",
                                      )}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                              {tests[tabVal] === "MBTI性格测试" ? (
                                <DimensionTestResult data={r.details} />
                              ) : (
                                <HollandTestResult data={r.details} />
                              )}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </Box>
                  </div>
                ) : (
                  <Typography variant="h5">未找到相关数据</Typography>
                )}
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default TestResults;
