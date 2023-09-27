import CircleIcon from "@mui/icons-material/Circle";
import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";

import { Characteristic } from "../../../../features/tests/holland";

//mport AbilityIcon from "../../../../public/icons/holland/ability.png";
//import QualityIcon from "../../../../public/icons/holland/quality.png";
//import InterestIcon from "../../../../public/icons/holland/interest.png";
//import ValueIcon from "../../../../public/icons/holland/value.png";

interface Prop {
  data: Characteristic[];
  title: string;
}

interface CategoryItem {
  title: string;
  icon: any;
  width: number;
  height: number;
}

function Characteristics(props: Prop) {
  const { data, title } = props;

  const CATEGORY: CategoryItem[] = [
    {
      title: "兴趣上，你喜欢",
      icon: `${process.env.NEXT_PUBLIC_URL_PREFIX}/icons/holland/interest.png`,
      width: 20,
      height: 40,
    },
    {
      title: "价值观上，你认同",
      icon: `${process.env.NEXT_PUBLIC_URL_PREFIX}/icons/holland/value.png`,
      width: 45,
      height: 34,
    },
    {
      title: "能力上，你擅长",
      icon: `${process.env.NEXT_PUBLIC_URL_PREFIX}/icons/holland/ability.png`,
      width: 27,
      height: 40,
    },
    {
      title: "品质上，你倾向",
      icon: `${process.env.NEXT_PUBLIC_URL_PREFIX}/icons/holland/quality.png`,
      width: 37,
      height: 38,
    },
  ];

  return (
    <Box sx={{ background: "#f2f2f2", pb: 4, pt: 4 }} pt={8} pb={8}>
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ pb: 3 }}>
          如果你是{title}的人，你可能有如下特征:
        </Typography>
        <Grid container spacing={3}>
          {CATEGORY.map((item: CategoryItem, index: number) => (
            <Grid
              key={`characteristic_group_${index}`}
              item
              xl={3}
              lg={3}
              md={3}
              sm={6}
              xs={6}
            >
              <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    height: "50px",
                  }}
                >
                  <Image
                    src={item.icon}
                    width={item.width}
                    height={item.height}
                    alt="characteristic"
                  />
                </Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  {item.title}
                </Typography>
                <List>
                  {data
                    .filter((d: Characteristic) => d.category === item.title)
                    .map((d1: Characteristic, index2: number) => (
                      <ListItem
                        disablePadding
                        key={`characteristic_list_item${index2}`}
                      >
                        <CircleIcon
                          sx={{ fontSize: 6, color: "grey", mr: 1 }}
                        />
                        <ListItemText primary={d1.value} />
                      </ListItem>
                    ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
export default Characteristics;
