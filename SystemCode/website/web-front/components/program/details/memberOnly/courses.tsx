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

import { Course } from "../../../../features/programs/program";

interface Prop {
  courses: Course[];
}

const CourseList: React.FC<Prop> = (props) => {
  const { courses } = props;

  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  console.debug(courses);
  return (
    <Card sx={{ backgroundColor: "#f9f9f9", p: 5, height: "100%" }}>
      <CardContent>
        <Box>
          <Box>
            <Typography variant="h4" align="center" sx={{ pb: 3 }}>
              相关课程
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={currentTab}
                  onChange={handleChange}
                  aria-label="course tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {courses.map((item: Course, index: number) => (
                    <Tab
                      key={`program_course_tab_${index}`}
                      label={item.name}
                      id={`course-tab-${index}`}
                      aria-controls={`course-tabpanel-${index}`}
                    />
                  ))}
                </Tabs>
              </Box>
              <Box sx={{ pt: 3 }}>
                <Typography variant="body1" gutterBottom>
                  {courses[currentTab]?.content}
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
