import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
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

import { updateUserLoading } from "../../features/user/userSlice";
import {
  sectionPaddingBottom,
  sectionPaddingTop,
} from "../../helper/constants";
import { RootState } from "../../store";
import LoadingCard from "../loadingCard";
import MessageCard from "../messageCard";
import DimensionTestResult from "../test/dimension-test/result";
import HollandTestResult from "../test/holland-test/result";
import MBTI from "./programBookingTable";

interface Prop {
  id: any;
}
const ResultAndProgramTab: React.FC<Prop> = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);
  // const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const results = useSelector((state: RootState) => state.user.testResults);
  const [tabVal, setTabVal] = useState<number>(0);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  // console.log('userInfo: ',userInfo)
  console.log('results: ',results)
  //userInfo这个参数似乎并不起作用
  // useEffect(() => {
  //   dispatch(updateUserLoading(true));
  //   dispatch({
  //     type: "FETCH_TEST_RESULTS",
  //   });
  // }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(updateUserLoading(true));
      dispatch({
        type: "FETCH_TEST_RESULTS_BY_ID",
        payload: {
          id: id,
        }
      });
    }
    else {
      dispatch(updateUserLoading(true));
      dispatch({
        type: "FETCH_TEST_RESULTS",
      });
    }

  }, [dispatch]);

  useEffect(() => {
    if (
      results &&
      Array.isArray(results.data) &&
      results.data.length > 0 &&
      tabVal != 2 &&
      results.data.filter((item: any) => item.title === tests[tabVal]).length >
        0
    ) {
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
  const tests: string[] = ["MBTI性格测试", "霍兰德职业兴趣测试"];
  if (loading) {
    <Box sx={{ pt: sectionPaddingTop, pb: sectionPaddingBottom }}>
      <Container>
        <LoadingCard message="正在加载您的过往测试记录" />
      </Container>
    </Box>;
  }

  return (
    <Box sx={{ pt: sectionPaddingTop, pb: sectionPaddingBottom }}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xl={10} lg={10} md={10} sm={12}>
            <Box>
              <Tabs
                value={tabVal}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                // aria-label="secondary tabs example"
                aria-label="full width tabs example"
                variant="fullWidth"
                centered
              >
                <Tab
                  icon={<MoodOutlinedIcon />}
                  iconPosition="start"
                  label="MBTI测试报告"
                  {...a11yProps(0)}
                />
                <Tab
                  icon={<CardTravelOutlinedIcon />}
                  iconPosition="start"
                  label="霍兰德测试报告"
                  {...a11yProps(1)}
                />
                <Tab
                  icon={<StarOutlineOutlinedIcon />}
                  iconPosition="start"
                  label={"专业收藏"}
                  {...a11yProps(2)}
                />
              </Tabs>
              {tabVal == 2 ? (
                <MBTI /> //专业收藏
              ) : (
                <Box>
                  {results &&
                  results.success &&
                  Array.isArray(results.data) && //成功返回测试结果
                  results.data.filter(
                    (item: any) => item.title === tests[tabVal],
                  ).length > 0 ? (
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
                                        {tests[tabVal] === "MBTI性格测试" ? (
                                          <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            style={{
                                              fontWeight: "400",
                                              fontSize: "20px",
                                            }}
                                          >
                                            {r.details.code}
                                          </Typography>
                                        ) : null}
                                        <Typography
                                          variant="subtitle1"
                                          sx={{ pr: 1 }}
                                          style={{
                                            fontWeight: "400",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {r.details.title}
                                        </Typography>
                                        <Typography
                                          variant="subtitle2"
                                          color="text.alert"
                                          sx={{ pt: 0.9, pl: 3 }}
                                        >
                                          适合专业:
                                          {r.details.programs[0].title +
                                            "," +
                                            r.details.programs[1].title +
                                            "," +
                                            r.details.programs[2].title}
                                          ..
                                        </Typography>
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
                    <MessageCard
                      icon={
                        <SentimentDissatisfiedIcon
                          sx={{ fontSize: 42 }}
                          color="primary"
                        />
                      }
                      message={"暂无测试记录"}
                    />
                  )}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default ResultAndProgramTab;
