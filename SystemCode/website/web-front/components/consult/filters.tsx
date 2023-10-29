import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Region } from "../../features/consult/consult.d";
import { updateFilters } from "../../features/consult/consultSlice";
import { ProgramItem } from "../../features/programs/program";
import { RootState } from "../../store";

interface CombinedFilter {
  filterName: string;
  value: string | number;
  label: string | undefined;
}

const Filters: React.FC = () => {
  const dispatch = useDispatch();

  const programs: ProgramItem[] = useSelector(
    (state: RootState) => state.programs.list,
  );
  const regions: Region[] = useSelector(
    (state: RootState) => state.consulting.regions,
  );
  const educationLevels: string[] = useSelector(
    (state: RootState) => state.consulting.educationLevels,
  );

  const filters = useSelector((state: RootState) => state.consulting.filters);

  useEffect(() => {
    if (Array.isArray(programs) && programs.length === 0) {
      dispatch({
        type: "FETCH_PROGRAMS",
      });
    }
  }, [dispatch, programs]);

  const changeFilter = (filterName: string, value: number | string) => {
    dispatch(updateFilters({ ...filters, [filterName]: value }));
  };

  const combinedFilterChips: CombinedFilter[] = [
    {
      filterName: "regionId",
      value: filters.regionId,
      label: regions.find((item: Region) => item.id === filters.regionId)?.name,
    },
    {
      filterName: "programCategoryId",
      value: filters.programCategoryId,
      label: programs.find(
        (item: ProgramItem) => item.id === filters.programCategoryId,
      )?.name,
    },
    {
      filterName: "educationLevel",
      value: filters.educationLevel,
      label: filters.educationLevel,
    },
  ].filter((item: CombinedFilter) => item.value);

  return (
    <Box>
      <Box
        sx={{
          pt: 3,
          pb: 1,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          background: "#f8f8f8",
        }}
      >
        <Typography variant="subtitle1" sx={{ pr: 1 }}>
          地区
        </Typography>
        <Button
          size="small"
          onClick={() => changeFilter("regionId", 0)}
          variant={!filters.regionId ? "contained" : "text"}
          color="primary"
        >
          不限
        </Button>
        {regions.map((item: Region) => (
          <Button
            key={`region_filter_btn_${item.id}`}
            size="small"
            onClick={() => changeFilter("regionId", item.id)}
            variant={filters.regionId === item.id ? "contained" : "text"}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box
        sx={{ pb: 1, display: "flex", alignItems: "center", flexWrap: "wrap" }}
      >
        <Typography variant="subtitle1" sx={{ pr: 1 }}>
          专业
        </Typography>
        <Button
          size="small"
          onClick={() => changeFilter("programCategoryId", 0)}
          variant={!filters.programCategoryId ? "contained" : "text"}
          color="primary"
        >
          不限
        </Button>
        {programs.map((item: ProgramItem) => (
          <Button
            key={`program_filter_btn_${item.id}`}
            size="small"
            onClick={() => changeFilter("programCategoryId", item.id)}
            variant={
              filters.programCategoryId === item.id ? "contained" : "text"
            }
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", pb: 2 }}
      >
        <Typography variant="subtitle1" sx={{ pr: 1 }}>
          学历
        </Typography>
        <Button
          size="small"
          onClick={() => changeFilter("educationLevel", "")}
          variant={!filters.educationLevel ? "contained" : "text"}
          color="primary"
        >
          不限
        </Button>
        {educationLevels.map((item: string) => (
          <Button
            key={`certificate_filter_btn_${item}`}
            size="small"
            onClick={() => changeFilter("educationLevel", item)}
            variant={filters.educationLevel === item ? "contained" : "text"}
          >
            {item}
          </Button>
        ))}
      </Box>
      {combinedFilterChips.length > 0 ? (
        <Box sx={{ display: "flex", pt: 2 }}>
          <Stack direction="row" spacing={1}>
            {combinedFilterChips.map((item: CombinedFilter, index: number) => (
              <Chip
                key={`filter_value_chip_${item.label}`}
                label={item.label || `过滤器${index + 1}`}
                onDelete={() =>
                  changeFilter(
                    item.filterName,
                    item.filterName === "educationLevel" ? "" : 0,
                  )
                }
              />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
export default Filters;
