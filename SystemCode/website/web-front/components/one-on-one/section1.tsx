//import aboutProgramIcon from "../../public/images/pics/1-on-1/experiment.svg";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import {
  divDefaultPadding,
  sectionPaddingLeft,
  sectionPaddingRight,
  sectionPaddingTop,
} from "../../helper/constants";
import styles from "./oneOnOne.module.css";

interface Section1DataItem {
  title: string;
  icon: string;
  content: string[];
  splitIndex: number;
}

const Section1: React.FC = () => {
  const ABOUT_PROGRAMS: string[] = [
    "Which major from the recommended list might suit me best?",
    "These majors sound similar, what's the difference?",
    // "这个专业有什么书和资料我可以提前了解的？",
    // "这个专业通常有哪些必修和选修课？",
    // "假期的实习工作或者课外活动一般怎么找？",
    // "这个专业对应的行业是什么样的发展趋势？",
    // "有没有什么跨行业的机会？比如心理学应用在金融方面",
  ];

  const ABOUT_JOB: string[] = [
    "Which industries and fields do students typically enter after graduating from this major?",
    "How much is the starting salary in different jobs after graduating from this major?",
    // "这个专业毕业的学生都一般会进入什么行业和领域？",
    // "这个专业毕业后在不同的工作上起薪有多少？",
    // "这个专业，行业有哪些公司，他们都在做什么？",
    // "我能从这个专业获得什么样的技能？",
    // "这个专业有哪些选课技巧？",
    // "这个专业如果学不下去有没有可能转到其他专业，比如哪些？",
  ];

  const ABOUT_UNIVERSITY: string[] = [
    "Why did you choose this major initially, professor?",
    "What's the experience like studying the XX major at XX University?"
    // "大学里除了学好专业课，还需要锻炼哪些能力才能更好适应未来社会？",
    // "在大学如何平衡GPA和课外活动经历？",
    // "如果真要进入这个专业，导师您还能给我其他什么忠告？",
    // "如果不推荐这个专业，有什么别的专业可能更适合我？",
  ];

  return (
    <Grid container spacing={2} sx={{ pt: sectionPaddingTop }}>
      <Grid item sm={12}>
        <Box
          className={styles.section1}
          sx={{
            pt: sectionPaddingTop,
            pl: sectionPaddingLeft,
            pr: sectionPaddingRight,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom component="h3">
            Which doubts can AI robots clarify for you?
          </Typography>
          <div className={styles.section1Subtitle}>
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/1-on-1/experiment.svg`}
              width={35}
              height={35}
              alt="experiment image"
            />
            <Typography
              sx={{ pl: 1, fontWeight: "700", marginBottom: "-10px" }}
              variant="h6"
              gutterBottom
              component="h4"
            >
              About the profession.
            </Typography>
          </div>
          <div>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <List>
                  {ABOUT_PROGRAMS.map((item: string, index: number) =>
                    index < 1 ? (
                      <ListItem key={`one-on-one-about-job-less-4-${index}`}>
                        <FiberManualRecordIcon
                          color="primary"
                          style={{ fontSize: "6px" }}
                          sx={{ mr: 1, ml: 1 }}
                        />
                        {item}
                      </ListItem>
                    ) : null,
                  )}
                </List>
              </Grid>
              <Grid item md={6} sm={12}>
                <List>
                  {ABOUT_PROGRAMS.map((item: string, index: number) =>
                    index >= 1 ? (
                      <ListItem key={`one-on-one-about-job-greater-4-${index}`}>
                        <FiberManualRecordIcon
                          color="primary"
                          style={{ fontSize: "8px" }}
                          sx={{ mr: 1 }}
                        />
                        {item}
                      </ListItem>
                    ) : null,
                  )}
                </List>
              </Grid>
            </Grid>
          </div>
          <Box className={styles.section1Subtitle} sx={{ pt: 5 }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/1-on-1/experiment.svg`}
              width={35}
              height={35}
              alt="experiment image 2"
            />
            <Typography
              sx={{ pl: 1, fontWeight: "700", marginBottom: "-10px" }}
              variant="h6"
              gutterBottom
            >
              About the occupation.
            </Typography>
          </Box>
          <div>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <List>
                  {ABOUT_JOB.map((item: string, index: number) =>
                    index < 1 ? (
                      <ListItem key={`one-on-one-about-job-less-3-${index}`}>
                        <FiberManualRecordIcon
                          color="primary"
                          style={{ fontSize: "6px" }}
                          sx={{ mr: 1, ml: 1 }}
                        />
                        {item}
                      </ListItem>
                    ) : null,
                  )}
                </List>
              </Grid>
              <Grid item md={6} sm={12}>
                <List>
                  {ABOUT_JOB.map((item: string, index: number) =>
                    index >= 1 ? (
                      <ListItem key={`one-on-one-about-job-greater-3-${index}`}>
                        <FiberManualRecordIcon
                          color="primary"
                          style={{ fontSize: "6px" }}
                          sx={{ mr: 1, ml: 1 }}
                        />
                        {item}
                      </ListItem>
                    ) : null,
                  )}
                </List>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Section1;
