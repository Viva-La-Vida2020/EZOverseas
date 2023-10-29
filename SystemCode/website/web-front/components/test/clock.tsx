import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const [second, setSecond] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);

  useEffect(() => {
    const autoIncrement = setInterval(() => {
      setSecond((second) => second + 1);
    }, 1000);

    return () => {
      clearInterval(autoIncrement);
    };
  }, []);

  useEffect(() => {
    if (second > 59) {
      setMinute(minute + 1);
    }
  }, [second, minute]);

  useEffect(() => {
    if (minute > 0) {
      setSecond(0);
    }
  }, [minute]);

  const displayMinute: string =
    minute < 10 ? "0" + minute.toString() : minute.toString();

  const displaySecond: string =
    second < 10 ? "0" + second.toString() : second.toString();
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="body1">
        {`${displayMinute} : ${displaySecond}`}
      </Typography>
    </Box>
  );
};
export default Clock;
