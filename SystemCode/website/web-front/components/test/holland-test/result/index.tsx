import { Box, Container, Typography } from "@mui/material";
import React from "react";

import { HollandTestResultDetails } from "../../../../features/tests/holland.d";
import { divDefaultPadding } from "../../../../helper/constants";
import Characteristics from "./characteristics";
import Charts from "./chart";
import Consulting from "./consulting";
import DeviationRate from "./deviationRate";
import Jobs from "./jobs";
import CodeDesc from "./majorCodes";
import Programs from "./porgrams";
import Summary from "./summary";

interface Prop {
  data: any;
}

function HollandTestResult(props: Prop) {
  const { data } = props;

  const topScoreDetails: HollandTestResultDetails | undefined = data
    ? data.resultDetails.find(
        (details: HollandTestResultDetails) =>
          details.codeId === data.codes[0].id,
      )
    : undefined;

  return (
    <Box>
      <Box sx={{ backgroundColor: "#2F4858", p: 0 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ pt: 3, pb: 4 }}
            align="center"
            color="white"
          >
            你的测试结果为: {data ? data.title : ""}
          </Typography>
          <Charts topScoreDetails={topScoreDetails} data={data} />
          <DeviationRate rate={data.overallDeviation} />
        </Container>
      </Box>
      <Box sx={{ pb: 2 }}>
        <CodeDesc
          majorCodes={data && Array.isArray(data.codes) ? data.codes : []}
        />
      </Box>
      <Box sx={{ pb: 6 }}>
        <Characteristics
          data={data.characteristics}
          title={data.codes[0].name}
        />
      </Box>
      <Box sx={{ pb: 6 }}>
        <Programs data={data.programs} />
      </Box>
      <Box sx={{ pb: 6 }}>
        <Consulting />
      </Box>
      <Box sx={{ pb: 6 }}>
        <Jobs data={data.jobs} />
      </Box>
      <Box sx={{ pb: 6 }}>
        <Summary />
      </Box>
    </Box>
  );
}
export default HollandTestResult;
