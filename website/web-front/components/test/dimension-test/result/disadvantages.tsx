import CircleIcon from "@mui/icons-material/Circle";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

import styles from "./../../test.module.css";

interface Prop {
  disadvantageList: Array<any>;
}

const Disadvantages: React.FC<Prop> = (props) => {
  const { disadvantageList } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        pt: 2,
        pb: 4,
        pl: 3,
        pr: 3,
        mt: 3,
      }}
    >
      <Typography variant="h4" color="#2F4858" sx={{ pb: 2 }}>
        你的盲点
      </Typography>
      <List>
        {disadvantageList.map((item: any, index: number) => (
          <ListItem
            disablePadding
            sx={{ alignItems: "flex-start" }}
            key={`disadvantage_list_item${index}`}
          >
            <CircleIcon color="primary" sx={{ fontSize: 8, mt: 1.5, mr: 1 }} />
            <ListItemText primary={item.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default Disadvantages;
