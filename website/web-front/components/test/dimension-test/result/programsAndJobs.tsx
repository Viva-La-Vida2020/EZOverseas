import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

import styles from "./../../test.module.css";

interface Prop {
  programs: Array<any>;
  jobs: Array<any>;
}

const ProgramsAndJobs: React.FC<Prop> = (props) => {
  const { programs, jobs } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#fdf7f2",
        pt: 5,
        pb: 4,
        pl: 3,
        pr: 3,
        mt: 3,
      }}
    >
      <Typography variant="h4" color="#2F4858" sx={{ pb: 1 }}>
        专业和职业分析
      </Typography>
      <Typography variant="body1" sx={{ pb: 4 }}>
        不同的人格类型没有好坏之分，每个人都是独一无二的个体，都有其特别的优势和劣势，但问题关键在于如何认识这些优势和劣势。“取已之长，补已之短”，学会了这一点将会影响你的成败及你对未来专业和工作的喜好。
      </Typography>
      <Typography variant="h5" color="#2F4858" sx={{ pb: 1 }}>
        可能适合的专业:
      </Typography>
      <Box sx={{ pb: 4 }}>
        {programs.map((item: any, index: number) => (
          <Chip
            key={`recommend_program_${index}`}
            label={`${item.title}`}
            component="a"
            sx={{ m: 0.5 }}
            href={`/programs?title=${encodeURIComponent(item.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            clickable
          />
        ))}
      </Box>
      <Typography variant="h5" color="#2F4858" sx={{ pb: 1 }}>
        你适合的职业:
      </Typography>
      <List>
        {jobs.map((item: any, index: number) => (
          <ListItem
            disablePadding
            sx={{ alignItems: "flex-start" }}
            key={`suitable_job_list_item${index}`}
          >
            <CircleIcon color="primary" sx={{ fontSize: 8, mt: 1.5, mr: 1 }} />
            <ListItemText primary={item.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default ProgramsAndJobs;
