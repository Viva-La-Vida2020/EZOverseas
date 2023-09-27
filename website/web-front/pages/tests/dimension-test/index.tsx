import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingCard from "../../../components/loadingCard";
import MessageCard from "../../../components/messageCard";
import Questions from "../../../components/test/dimension-test/questions";
import Tips from "../../../components/test/dimension-test/tips";
import Title from "../../../components/test/dimension-test/title";
import {
  resetCurrentPage,
  resetCurrentTest,
  resetDimensionTest,
  updateLoadingStatus,
} from "../../../features/tests/dimensionTestSlice";
import { RootState } from "../../../store";

const DimensionTest: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isBegin, beginTest] = useState<boolean>(false);
  const [currentQuestions, setQuestions] = useState<Array<any>>([]);
  const [questionTypeIndex, setQuestionTypeIndex] = useState<number>(0);
  const currentUser = useSelector((state: RootState) => state.user.userInfo);
  const questions = useSelector(
    (state: RootState) => state.dimensionTest.questions,
  );
  const currentAnswers = useSelector(
    (state: RootState) => state.dimensionTest.currentAnswers,
  );
  const totalQuestions = useSelector(
    (state: RootState) => state.dimensionTest.totalQuestions,
  );

  const currentPage = useSelector(
    (state: RootState) => state.dimensionTest.currentPage,
  );

  const loading = useSelector(
    (state: RootState) => state.dimensionTest.loading,
  );
  const resultResponse = useSelector(
    (state: RootState) => state.dimensionTest.resultResponse,
  );

  useEffect(() => {
    if (currentUser) {
      if (resultResponse) {
        dispatch(resetDimensionTest({}));
      }
      dispatch(updateLoadingStatus(true));
      dispatch({
        type: "FETCH_DIMENSION_TEST_DATA",
        payload: { title: "dimension-test" },
      });
    }
    return () => {
      dispatch(resetCurrentTest({}));
    };
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (questions.length > 0) {
      const numberOfPage: number = questions[questionTypeIndex]
        ? Math.ceil(
            questions[questionTypeIndex].questions.length /
              questions[questionTypeIndex].questionsPerPage,
          )
        : 0;
      if (currentPage <= numberOfPage - 1) {
        const startFrom: number =
          currentPage * questions[questionTypeIndex].questionsPerPage;
        setQuestions(
          questions[questionTypeIndex].questions.filter(
            (item: any, index: number) =>
              index >= startFrom &&
              index < startFrom + questions[questionTypeIndex].questionsPerPage,
          ),
        );
      } else {
        setQuestionTypeIndex(questionTypeIndex + 1);
      }
    }
  }, [questions, currentPage]);

  useEffect(() => {
    if (resultResponse && resultResponse.success && resultResponse.data) {
      router.push(
        `/tests/dimension-test/result/${resultResponse.data.newResultId}`,
      );
      return;
    }
  }, [resultResponse, router]);

  useEffect(() => {
    console.debug("is in question type index hook");
    dispatch(resetCurrentPage(null));
  }, [questionTypeIndex, dispatch]);

  const isLastPage: boolean = questions[questionTypeIndex]
    ? currentAnswers.length + questions[questionTypeIndex].questionsPerPage >=
      totalQuestions
    : false;

  return (
    <div>
      <Title />
      <Container>
        <Tips />
        {currentUser ? (
          loading ? (
            <LoadingCard message="正在加载测试数据..." />
          ) : isBegin ? (
            <Box>
              <Questions
                questionItems={currentQuestions}
                isLastPage={isLastPage}
                questionTypeIndex={questionTypeIndex}
                title={
                  questions[questionTypeIndex]
                    ? questions[questionTypeIndex].name
                    : ""
                }
              />
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", pt: 7, pb: 10 }}>
              <Button
                variant="contained"
                size="large"
                sx={{ mr: 1 }}
                onClick={() => beginTest(true)}
              >
                开始测试
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/tests/results")}
              >
                查看过往结果
              </Button>
            </Box>
          )
        ) : (
          <Box sx={{ pt: 4 }}>
            <MessageCard
              message="测试需要登录账号，请点击右上角登录。"
              icon={<LockOpenIcon />}
            />
          </Box>
        )}
        {/* {isBegin ? (
          <Box>
            <Questions
              questionItems={currentQuestions}
              isLastPage={isLastPage}
            />
          </Box>
        ) : null} */}
      </Container>
    </div>
  );
};
export default DimensionTest;
