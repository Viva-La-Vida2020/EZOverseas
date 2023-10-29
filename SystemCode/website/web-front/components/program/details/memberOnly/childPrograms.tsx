import {
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { ChildProgram } from "../../../../features/programs/program";

interface Prop {
  childPrograms: ChildProgram[];
}

const CourseList: React.FC<Prop> = (props) => {
  const { childPrograms } = props;

  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Card sx={{ backgroundColor: "#f9f9f9", p: 5, height: "100%" }}>
      <CardContent>
        <Box>
          <Box>
            <Typography variant="h4" align="center" sx={{ pb: 3 }}>
              子专业列表
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={currentTab}
                  onChange={handleChange}
                  aria-label="child program tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {childPrograms.map((item: ChildProgram, index: number) => (
                    <Tab
                      key={`program_child_programs_tab_${index}`}
                      label={item.name}
                      id={`child-program-tab-${index}`}
                      aria-controls={`child-program-tabpanel-${index}`}
                    />
                  ))}
                </Tabs>
              </Box>
              <Box sx={{ pt: 3 }}>
                <Typography variant="body1" gutterBottom>
                  {childPrograms[currentTab]?.content}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default CourseList;
