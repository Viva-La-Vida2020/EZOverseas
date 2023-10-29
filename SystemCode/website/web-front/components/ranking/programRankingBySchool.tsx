import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ListHeaderData,
  ProgramRankingItem,
  SchoolRankingItem,
} from "../../features/ranking/ranking";
import { updatePage } from "../../features/ranking/rankingSlice";
import { NUMBER_OF_RANKING_PER_PAGE } from "../../helper/constants";
import { RootState } from "../../store";
import ListHeader from "./listHeader";
import ProgramCard from "./programCard";

const ProgramRankingBySchool: React.FC = () => {
  const dispatch = useDispatch();

  const schoolProgramRankings: ProgramRankingItem[] = useSelector(
    (state: RootState) => state.ranking.schoolProgramRankings,
  );

  const overallList: SchoolRankingItem[] = useSelector(
    (state: RootState) => state.ranking.schoolRankings,
  );

  const currentPage: number = useSelector(
    (state: RootState) => state.ranking.currentPageOfProgramRanking,
  );

  const filter: string | null = useSelector(
    (state: RootState) => state.ranking.schoolRankingFilter,
  );
  const [sortedProgramList, sortProgramList] = useState<ProgramRankingItem[]>(
    [],
  );
  const fallbackSrc: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/images/logo/placeholderImg.png`;
  const [imgSrc, setImgSrc] = useState(fallbackSrc);
  const [schoolData, setSchoolData] = useState<SchoolRankingItem | undefined>(
    undefined,
  );

  useEffect(() => {
    console.log(overallList);
    if (Array.isArray(overallList) && overallList.length > 0) {
      setSchoolData(
        overallList.find(
          (item: SchoolRankingItem) => item.university === filter,
        ),
      );
      if (filter) {
        dispatch({
          type: "FETCH_PROGRAM_RANKING_DATA_BY_SCHOOL",
          payload: { name: filter },
        });
      }
    }
  }, [overallList, filter]);
  console.log(schoolData);

  useEffect(() => {
    if (schoolData && schoolData.logoPath) {
      setImgSrc(
        `${"/resources/asset/programming_ranking/images/"}${
          schoolData.logoPath
        }`,
      );
    }
  }, [schoolData]);

  function changePageNumber() {
    dispatch(
      updatePage({
        name: "currentPageOfProgramRanking",
        newPageNumber: currentPage + 1,
      }),
    );
  }

  const isLoadMoreButtonDisabled: boolean =
    schoolProgramRankings.length <= currentPage * NUMBER_OF_RANKING_PER_PAGE;

  const listHeaderData: ListHeaderData[] = [
    {
      title: "Majors",
      xs: 6,
      sm: 8,
      md: 8,
      lg: 8,
    },
    {
      title: "Global rankings",
      xs: 3,
      sm: 2,
      md: 2,
      lg: 2,
    },
    {
      title: "Sources",
      xs: 3,
      sm: 2,
      md: 2,
      lg: 2,
    },
  ];

  return (
    <Box>
      {schoolData ? (
        <Box
          sx={{
            mt: 2,
            mb: 2,
            p: 4,
            bgcolor: "#f8f8f8",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={7}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                <img
                  src={imgSrc}
                  width="80"
                  onError={() => {
                    setImgSrc(fallbackSrc);
                  }}
                  style={{ marginRight: 20 }}
                  alt="school logo"
                />
                <Typography variant="h6" sx={{ pr: 4 }}>
                  {schoolData.university}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "right",
                }}
              >
                <Box sx={{ pl: 2, pr: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" color="#555">
                      Global overall ranking:
                    </Typography>
                    <Typography component="div">
                      <Box
                        sx={{
                          color: "primary",
                          fontSize: "body1.fontSize",
                          pl: 2,
                        }}
                      >
                        {schoolData.ranking}
                      </Box>
                    </Typography>
                  </Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box sx={{ pl: 2, pr: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" color="#555">
                      Regions:
                    </Typography>
                    <Typography component="div">
                      <Box
                        sx={{
                          color: "primary",
                          fontSize: "body1.fontSize",
                          pl: 2,
                        }}
                      >
                        {schoolData.country}
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
      <Box sx={{ width: "100%", bgcolor: "#f8f8f8" }}>
        <Box sx={{ p: 2 }}>
          <ListHeader data={listHeaderData} />
        </Box>
        {schoolProgramRankings.length > 0 ? (
          <>
            <Box>
              {schoolProgramRankings
                .filter(
                  (a: ProgramRankingItem, index: number) =>
                    index < NUMBER_OF_RANKING_PER_PAGE * currentPage,
                )
                .map((item: ProgramRankingItem) => (
                  <ProgramCard
                    key={`program_ranking_item_card_${item.id}`}
                    data={item}
                  />
                ))}
            </Box>
            <Box textAlign="center">
              <Button
                variant="text"
                disabled={isLoadMoreButtonDisabled}
                startIcon={
                  isLoadMoreButtonDisabled ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
                onClick={changePageNumber}
              >
                {isLoadMoreButtonDisabled ? "All loaded" : "Click Load more"}
              </Button>
            </Box>
          </>
        ) : (
          <Box>
            <Typography variant="h6" textAlign="center" sx={{ color: "#555" }}>
              Enter the school you're interested in to see how it ranks in each subject
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default ProgramRankingBySchool;
