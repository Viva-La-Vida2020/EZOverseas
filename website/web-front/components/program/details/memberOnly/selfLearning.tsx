import { Box, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import {
  SelfLearningInfo,
  SelfLearningInfoDetails,
} from "../../../../features/programs/program";
import styles from "./selfLearning.module.css";

interface Prop {
  selfLearningInfo: SelfLearningInfo[];
}

const SelfLearning: React.FC<Prop> = (props) => {
  const { selfLearningInfo } = props;

  return (
    <Box sx={{ pb: 6 }}>
      <Box>
        <Typography variant="h4" align="center" sx={{ pb: 3 }}>
          自学推荐
        </Typography>
        {selfLearningInfo.map((item: SelfLearningInfo, index: number) => {
          console.debug(item.image);
          const convertedIconUrl: string = "/images/resources/" + item.image;
          return (
            <Box key={`self_learning_box_${index}`} sx={{ pb: 2, mb: 2 }}>
              <Box sx={{ pt: 2, pb: 1, mb: 1 }} className={styles.subTitleDiv}>
                {item.image ? (
                  <Image
                    src={convertedIconUrl}
                    width={30}
                    height={30}
                    alt={item.title}
                  />
                ) : null}
                <Typography variant="subtitle1" sx={{ pl: 1 }}>
                  {item.title}
                </Typography>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  {Array.isArray(item.details)
                    ? item.details.map((d: SelfLearningInfoDetails) => (
                        <Grid
                          key={`self_learning_info_details_${d.id}`}
                          item
                          md={6}
                          sm={6}
                        >
                          <Box sx={{ pl: 2 }}>
                            {d.author && d.douban ? (
                              <div>
                                <Link
                                  variant="body1"
                                  href={d.url}
                                  target="_blank"
                                >
                                  {d.title}
                                </Link>{" "}
                                {d.author}
                                <br />
                                <Typography variant="body1">
                                  豆瓣: {d.douban}
                                </Typography>
                              </div>
                            ) : (
                              <></>
                            )}
                            {!d.author && !d.douban && !d.image ? (
                              <div>
                                {d.url ? (
                                  <Link
                                    variant="body1"
                                    href={d.url}
                                    target="_blank"
                                  >
                                    {d.title}
                                  </Link>
                                ) : (
                                  <Typography variant="body1">
                                    {d.title}
                                  </Typography>
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                          </Box>
                        </Grid>
                      ))
                    : null}
                </Grid>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
export default SelfLearning;
