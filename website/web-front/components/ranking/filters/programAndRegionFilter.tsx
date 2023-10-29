import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import lodash from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ProgramDetails,
  ProgramItem,
} from "../../../features/programs/program";
import {
  ProgramRankingFilterOption,
  ProgramRankingItem,
} from "../../../features/ranking/ranking";
import { updateProgramFilters } from "../../../features/ranking/rankingSlice";
import { POPULAR_REGIONS_FOR_RANKING } from "../../../helper/constants";
import { RootState } from "../../../store";

const ProgramAndRegionFilter: React.FC = () => {
  const dispatch = useDispatch();

  const programs: ProgramItem[] = useSelector(
    (state: RootState) => state.programs.list,
  );

  const regions: string[] = useSelector(
    (state: RootState) => state.ranking.regions,
  );

  const filters = useSelector(
    (state: RootState) => state.ranking.programFilters,
  );

  const programRankings = useSelector(
    (state: RootState) => state.ranking.programRankings,
  );

  useEffect(() => {
    if (Array.isArray(programs) && programs.length === 0) {
      dispatch({
        type: "FETCH_PROGRAMS",
      });
    }
  }, [dispatch, programs]);

  function generateRegionOptions(data: string[]) {
    let options: string[] = [...data];
    const defaultOption: ProgramRankingFilterOption = {
      id: "defaultRegion",
      group: "",
      name: "All",
      value: "all",
    };
    const popularOptions: ProgramRankingFilterOption[] = options
      .filter((item: string) => POPULAR_REGIONS_FOR_RANKING.includes(item))
      .map((r: string, index: number) => {
        return {
          id: `popularRegion${index}`,
          group: "Popular areas",
          name: r,
          value: r,
        };
      });
    const otherOptions: ProgramRankingFilterOption[] = options
      .filter((item: string) => !POPULAR_REGIONS_FOR_RANKING.includes(item))
      .map((r: string, index: number) => {
        return {
          id: `popularRegion${index}`,
          group: "Other regions",
          name: r,
          value: r,
        };
      });
    return [defaultOption, ...popularOptions, ...otherOptions];
  }

  function generateProgramOptions(data: ProgramItem[]) {
    let options: ProgramItem[] = [...data];
    const defaultOption: ProgramRankingFilterOption = {
      id: `defaultProgram`,
      group: "",
      name: "Overall ranking",
      value: "default",
    };
    let mainOptions: ProgramRankingFilterOption[] = [defaultOption];
    options.forEach((item: ProgramItem, index: number) => {
      const details: ProgramDetails[] = lodash.uniqBy(
        item.details,
        "nameForRanking",
      );
      mainOptions = mainOptions.concat(
        details.map((d: ProgramDetails, i: number) => {
          return {
            id: `programOption${index}_${i}`,
            group: item.name,
            name: `${d.nameForRanking} - ${d.rankingBy}`,
            value: d.nameForRanking,
          };
        }),
      );
    });
    return mainOptions;
  }

  function chooseRegion(
    event: React.SyntheticEvent,
    value: ProgramRankingFilterOption | null,
    reason: any,
    details?: any,
  ) {
    dispatch(updateProgramFilters({ ...filters, region: value }));
  }

  function chooseProgram(
    event: React.SyntheticEvent,
    value: ProgramRankingFilterOption | null,
    reason: any,
    details?: any,
  ) {
    dispatch(updateProgramFilters({ ...filters, programFilterValue: value }));
    if (
      value &&
      value.value !== "default" &&
      !programRankings.find(
        (item: ProgramRankingItem) => item.nameForRanking === value.value,
      )
    ) {
      dispatch({
        type: "FETCH_PROGRAM_RANKING_DATA_BY_NAME_FOR_RANKING",
        payload: {
          name: value.value,
        },
      });
    }
  }

  return (
    <Box>
      <Grid container spacing={3} sx={{ pt: 1, pb: 1 }}>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <Autocomplete
            id="programPicker"
            options={generateProgramOptions(programs)}
            onChange={chooseProgram}
            isOptionEqualToValue={(option: any, value: any) =>
              option.value === value.value
            }
            groupBy={(option: ProgramRankingFilterOption) => option.group}
            getOptionLabel={(option: any) => option.name}
            value={filters.programFilterValue}
            sx={{ width: "100%", background: "#fff" }}
            renderInput={(params: any) => (
              <TextField {...params} label="专业分类" />
            )}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <Autocomplete
            id="regionPicker"
            options={generateRegionOptions(regions)}
            onChange={chooseRegion}
            value={filters.region}
            isOptionEqualToValue={(option: any, value: any) =>
              option.value === value.value
            }
            groupBy={(option: ProgramRankingFilterOption) => option.group}
            getOptionLabel={(option) => option.name}
            sx={{ width: "100%", background: "#fff" }}
            renderInput={(params) => <TextField {...params} label="国家地区" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProgramAndRegionFilter;
