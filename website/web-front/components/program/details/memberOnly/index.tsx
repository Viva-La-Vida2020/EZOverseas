import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ChildProgram,
  Course,
  RelatedProgram,
  SelfLearningInfo,
} from "../../../../features/programs/program";
import { toggleLoginModal } from "../../../../features/user/userSlice";
import { RootState } from "../../../../store";
import ChildPrograms from "./childPrograms";
import CourseList from "./courses";
import styles from "./index.module.css";
import SelfLearning from "./selfLearning";

interface Prop {
  courses: Course[];
  relatedPrograms: RelatedProgram[];
  childPrograms: ChildProgram[];
  selfLearningInfo: SelfLearningInfo[];
}

const MemberOnly: React.FC<Prop> = (props) => {
  const { courses, relatedPrograms, childPrograms, selfLearningInfo } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.userInfo);

  return (
    <Box sx={{ pb: 5 }}>
      {currentUser ? (
        <Box sx={{ pt: 8, pb: 4 }} width={1}>
          <SelfLearning selfLearningInfo={selfLearningInfo} />
          <Grid container spacing={2} alignItems="stretch">
            <Grid item md={6} sm={6} xs={12}>
              <CourseList courses={courses} />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <ChildPrograms childPrograms={childPrograms} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Box className={styles.loginDiv}>
            <PersonIcon fontSize="large" />
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              如果想了解推荐自学内容，专业课程简介和子专业等更多信息，请登录或注册。
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => dispatch(toggleLoginModal(true))}
              >
                登录 | 注册
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default MemberOnly;
