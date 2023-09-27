import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import {
  Alert,
  IconButton,
  Link,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import copy from "copy-to-clipboard";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BookedProgram } from "../../features/programs/program";
import { updateUserLoading } from "../../features/user/userSlice";
import { RootState } from "../../store";
import styles from "./userDashboard.module.css";

export default function BasicTable() {
  const router = useRouter();
  const dispatch = useDispatch();
  const programBooking = useSelector(
    (state: RootState) => state.user.programBooking,
  );
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const [open, setOpen] = React.useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(updateUserLoading(true));
    dispatch({
      type: "FETCH_PROGRAM_BOOKING",
    });
  }, [userInfo, dispatch]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {programBooking ? (
          <TableBody>
            {programBooking.data.map((row: BookedProgram) => (
              <TableRow key={row.programTitle}>
                <TableCell
                  align="left"
                  sx={{ width: 180, height: 90 }}
                  className={styles.secondColumn}
                >
                  <Typography
                    sx={{ ml: 0, mr: 0 }}
                    style={{ fontWeight: "500", fontSize: "20px" }}
                  >
                    {row.programTitle}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {row.programDescription.slice(0, 150)}...
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() =>
                      router.push(`/programs?title=${row.programTitle}`)
                    }
                  >
                    了解详情
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={() => {
                      copy(
                        `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/programs?title=${row.programTitle}`,
                      );
                      setOpen(true);
                    }}
                  >
                    <IosShareOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            链接已复制到剪切板，快去分享吧！
          </Alert>
        </Snackbar>
      </Table>
    </TableContainer>
  );
}
