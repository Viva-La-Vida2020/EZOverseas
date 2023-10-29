import { yupResolver } from "@hookform/resolvers/yup";
import InfoIcon from "@mui/icons-material/Info";
import RestoreIcon from "@mui/icons-material/Restore";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { ConsultingFilter } from "../../features/consult/consult.d";
import { updateFilters } from "../../features/consult/consultSlice";
import { RootState } from "../../store";
import styles from "./consult.module.css";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    keyword: yup.string().required("请输入有效的关键字"),
  });
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open: boolean = Boolean(anchorEl);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const filters: ConsultingFilter = useSelector(
    (state: RootState) => state.consulting.filters,
  );

  const onSubmit = (data: any) => {
    dispatch(updateFilters({ ...filters, keyword: data.keyword }));
  };

  const resetInput = () => {
    resetField("keyword");
    dispatch(updateFilters({ ...filters, keyword: "" }));
  };

  return (
    <div>
      <Box>
        <form name="searchForm" onSubmit={handleSubmit(onSubmit)}>
          <Paper className={styles.searchBar}>
            <IconButton
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-label="helper"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <InfoIcon />
            </IconButton>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>
                搜索的结果是在您所选择的地区，学历和专业类型的基础上进行的。
              </Typography>
            </Popover>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="输入关键词"
              inputProps={{ "aria-label": "输入关键词" }}
              {...register("keyword", { required: true })}
            />
            <Button
              aria-label="search"
              startIcon={<SearchIcon />}
              onClick={handleSubmit(onSubmit)}
            >
              搜索
            </Button>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button
              aria-label="reset"
              startIcon={<RestoreIcon />}
              onClick={resetInput}
            >
              重置
            </Button>
          </Paper>
        </form>
      </Box>
    </div>
  );
};
export default SearchBar;
