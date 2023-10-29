import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { orderBy } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Info } from "../../../features/programs/program";
import {
  sectionPaddingLeft,
  sectionPaddingRight,
  sectionPaddingTop,
} from "../../../helper/constants";
import { RootState } from "../../../store";
import styles from "./details.module.css";

interface Prop {
  info: Info[];
  title: String;
}

const Suitability: React.FC<Prop> = (props) => {
  const router = useRouter();
  const { info, title } = props;

  const suitableParagraphs: Info[] = orderBy(
    info.filter((item: Info) => item.type === "suitable"),
    ["index"],
    "asc",
  );
  const readyParagraphs: Info[] = orderBy(
    info.filter((item: Info) => item.type === "ready"),
    ["index"],
    "asc",
  );

  return (
    <Box
      sx={{
        pt: sectionPaddingTop,
        pl: sectionPaddingLeft,
        pr: sectionPaddingRight,
      }}
    >
      <Typography variant="h4" gutterBottom>
        你适合学{title}吗？
      </Typography>
      <Box sx={{ pb: 5 }}>
        {suitableParagraphs.map((item: Info) => (
          <Typography key={`suitability_p_${item.id}`} variant="body1">
            {item.content}
          </Typography>
        ))}
      </Box>
      <Box className={styles.readySection} sx={{ pb: 5, mb: 5 }}>
        <Box className={styles.readyList}>
          <div>
            <Typography variant="h5" textAlign="center" gutterBottom>
              你准备好了吗?
            </Typography>
            <List>
              {readyParagraphs.map((item: Info) => (
                <ListItem key={`ready_option_${item.id}`}>
                  <FiberManualRecordIcon
                    color="primary"
                    style={{ fontSize: "8px" }}
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body1">{item.content}</Typography>
                </ListItem>
              ))}
            </List>
            <Typography
              variant="h6"
              color="primary"
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginRight: "12px",
                paddingLeft: 10,
              }}
            >
              还没有做EZO测试？
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                size="large"
                color="primary"
                onClick={() => router.push("/tests/dimension-test")}
              >
                16人格测试
              </Button>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => router.push("/tests/holland-test")}
              >
                霍兰德职业兴趣测试
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
export default Suitability;
