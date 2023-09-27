import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button } from "@mui/material";
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
import SchoolCard from "./schoolCard";

const SchoolRankingByProgram: React.FC = () => {
  const dispatch = useDispatch();

  const rankingList: ProgramRankingItem[] = useSelector(
    (state: RootState) => state.ranking.programRankings,
  );
  const overallList: SchoolRankingItem[] = useSelector(
    (state: RootState) => state.ranking.schoolRankings,
  );
  const { region, programFilterValue } = useSelector(
    (state: RootState) => state.ranking.programFilters,
  );
  const currentPage: number = useSelector(
    (state: RootState) => state.ranking.currentPageOfSchoolRanking,
  );
  const [sortedList, sortList] = useState<ProgramRankingItem[]>([]);
  useEffect(() => {
    let toSortRankingList: Array<any> = [];
    if (!programFilterValue || programFilterValue.value === "default") {
      toSortRankingList = [...overallList].filter((item: SchoolRankingItem) =>
        region && region.value !== "all" ? item.country === region.value : true,
      );
    } else {
      toSortRankingList = [...rankingList].filter(
        (item: ProgramRankingItem) =>
          (region && region.value !== "all"
            ? item.country === region.value
            : true) && item.nameForRanking === programFilterValue.value,
      );
    }

    sortList(toSortRankingList);
  }, [rankingList, region, programFilterValue, overallList]);

  function changePageNumber() {
    dispatch(
      updatePage({
        name: "currentPageOfSchoolRanking",
        newPageNumber: currentPage + 1,
      }),
    );
  }

  const isLoadMoreButtonDisabled: boolean =
    sortedList.length <= currentPage * NUMBER_OF_RANKING_PER_PAGE;

  const listHeaderData: ListHeaderData[] = [
    {
      title: "全球排名",
      xs: 3,
      sm: 2,
      md: 2,
      lg: 2,
    },
    {
      title: "学校名",
      xs: 6,
      sm: 8,
      md: 7,
      lg: 8,
    },
    {
      title: "地区",
      xs: 3,
      sm: 2,
      md: 3,
      lg: 2,
    },
  ];

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Box sx={{ p: 2, background: "#f8f8f8" }}>
        <ListHeader data={listHeaderData} />
      </Box>
      <Box>
        {sortedList
          .filter(
            (a: ProgramRankingItem, index: number) =>
              index < NUMBER_OF_RANKING_PER_PAGE * currentPage,
          )
          .map((item: ProgramRankingItem) => (
            <SchoolCard key={`school_card_${item.id}`} data={item} />
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
          {isLoadMoreButtonDisabled ? "已加载全部" : "点击加载更多"}
        </Button>
      </Box>
    </Box>
  );
};
export default SchoolRankingByProgram;
