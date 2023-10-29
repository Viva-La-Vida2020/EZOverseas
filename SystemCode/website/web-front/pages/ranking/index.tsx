import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import BackToTopButton from "../../components/backToTop";
import LoadingCard from "../../components/home/components/loading";
import ProgramAndRegionFilter from "../../components/ranking/filters/programAndRegionFilter";
import SchoolFilter from "../../components/ranking/filters/schoolFilter";
import ProgramRankingBySchool from "../../components/ranking/programRankingBySchool";
import SchoolRankingByProgram from "../../components/ranking/schoolRankingByProgram";
import Title from "../../components/ranking/title";
import { updateLoadingStatus } from "../../features/ranking/rankingSlice";
import { RootState } from "../../store";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const SchoolRanking: React.FC = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const loading: boolean = useSelector(
    (state: RootState) => state.ranking.loading,
  );

  useEffect(() => {
    dispatch(updateLoadingStatus(true));
    dispatch({ type: "FETCH_RANKING_DATA" });
  }, [dispatch]);

  const filterRef: any = useRef();

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setTabIndex(newValue);
  }

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Box sx={{ background: "#ffffff" }}>
      <Title />
      <Box sx={{ position: "relative" }}>
        <Container>
          <Grid container sx={{ pt: 5, pb: 5 }} justifyContent="center">
            <Grid item xl={8} lg={8} md={9} sm={10} xs={12}>
              <Box>
                <Card ref={filterRef} sx={{ background: "#f8f8f8" }}>
                  <CardContent>
                    <div>
                      <Tabs
                        value={tabIndex}
                        onChange={handleChange}
                        indicatorColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                        <Tab label="按专业搜索排名" {...a11yProps(0)} />
                        <Tab label="按学校搜索排名" {...a11yProps(1)} />
                      </Tabs>
                      <TabPanel value={tabIndex} index={0}>
                        <ProgramAndRegionFilter />
                      </TabPanel>
                      <TabPanel value={tabIndex} index={1}>
                        <SchoolFilter />
                      </TabPanel>
                    </div>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ mt: 2 }}>
                {loading ? (
                  <LoadingCard message="正在加载排名数据..." />
                ) : (
                  <Box>
                    <Box
                      key="schoolRankingBox"
                      hidden={tabIndex === 1 ? true : false}
                    >
                      <SchoolRankingByProgram />
                    </Box>
                    <Box
                      key="programRankingBox"
                      hidden={tabIndex !== 1 ? true : false}
                    >
                      <ProgramRankingBySchool />
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid container sx={{ pb: 5 }}>
            <Grid item sm={12} md={9}>
              {/* {sortedConsultants
                .filter(
                  (a: Consultant, index: number) =>
                    index < NUMBER_OF_CONSULTANTS_PER_PAGE * currentPage
                )
                .map((item: Consultant) => (
                  <ConsultantCard data={item} />
                ))}
              <Box textAlign="center" ref={cardRef} sx={{ pt: 1 }}>
                <Button
                  variant="text"
                  disabled={
                    sortedConsultants.length <=
                    currentPage * NUMBER_OF_CONSULTANTS_PER_PAGE
                  }
                  startIcon={<KeyboardArrowDownIcon />}
                  onClick={changePageNumber}
                >
                  {sortedConsultants.length <=
                  currentPage * NUMBER_OF_CONSULTANTS_PER_PAGE
                    ? "已加载全部"
                    : "加载更多"}
                </Button>
              </Box> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <BackToTopButton elementRef={filterRef} />
    </Box>
  );
};
export default SchoolRanking;
