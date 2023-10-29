import { Box } from "@mui/material";
import React from "react";

import Advantages from "./advantages";
import BasicAnalysis from "./basicAnalysis";
import DimensionDesc from "./dimensionDesc";
import Disadvantages from "./disadvantages";
import ReportHeader from "./header";
import ProgramsAndJobs from "./programsAndJobs";

interface Prop {
  data: any;
}

function DimensionTestResult(props: Prop) {
  const { data } = props;

  return (
    <Box sx={{ position: "relative" }}>
      <ReportHeader
        code={data.code}
        title={data.title}
        description={data.description}
        imgUrl={data.characterImg}
        weights={data.weights}
        tags={data.tags}
      />
      <DimensionDesc majorDimensions={data.dimensions} />
      <BasicAnalysis content={data.basicAnalysis} />
      <Advantages
        advantageList={data.characteristics.filter(
          (item: any) => item.type === "优势",
        )}
      />
      <Disadvantages
        disadvantageList={data.characteristics.filter(
          (item: any) => item.type !== "优势",
        )}
      />
      <ProgramsAndJobs programs={data.programs} jobs={data.jobs} />
    </Box>
  );
}
export default DimensionTestResult;
