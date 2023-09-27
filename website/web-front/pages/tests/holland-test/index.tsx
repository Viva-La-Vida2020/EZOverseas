import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageCard from "../../../components/messageCard/index";
import Questions from "../../../components/test/holland-test/questions";
import Tips from "../../../components/test/holland-test/tips";
import { ResultResponse } from "../../../features/tests/holland.d";
import {
  resetCurrentTest,
  resetHollandTest,
} from "../../../features/tests/hollandTestSlice";
import { RootState } from "../../../store";
import styles from "./index.module.css";

const NUMBER_OF_QUESTIONS_PER_PAGE = 10;

const DimensionTest: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user.userInfo);
  const questions = useSelector(
    (state: RootState) => state.hollandTest.questions,
  );
  const currentPage: number = useSelector(
    (state: RootState) => state.hollandTest.currentPage,
  );
  const numberOfPage: number = Math.ceil(
    questions.length / NUMBER_OF_QUESTIONS_PER_PAGE,
  );
  const resultResponse: ResultResponse | null = useSelector(
    (state: RootState) => state.hollandTest.resultResponse,
  );
  const [isBegin, beginTest] = useState<boolean>(false);
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(true);

  useEffect(() => {
    if (resultResponse) {
      dispatch(resetHollandTest({}));
    }
    return () => {
      dispatch(resetCurrentTest({}));
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch({
        type: "FETCH_HOLLAND_TEST_DATA",
        payload: { title: "holland-test" },
      });
    }
  }, [currentUser, dispatch]);

  const [currentQuestions, setQuestions] = useState<Array<any>>([]);

  useEffect(() => {
    if (questions.length > 0) {
      if (currentPage <= numberOfPage - 1) {
        const startFrom: number = currentPage * NUMBER_OF_QUESTIONS_PER_PAGE;
        setQuestions(
          questions.filter(
            (item: any, index: number) =>
              index >= startFrom &&
              index < startFrom + NUMBER_OF_QUESTIONS_PER_PAGE,
          ),
        );
      }
    }
  }, [questions, currentPage]);

  useEffect(() => {
    if (resultResponse && resultResponse.success && resultResponse.data) {
      router.push(
        `/tests/holland-test/result/${resultResponse.data.newResultId}`,
      );
      return;
    }
  }, [resultResponse, router]);

  return (
    <div>
      {isBegin ? null : (
        <Box>
          <div className={styles.mainTitle}>
            <Box>
              <Typography variant="h3" sx={{ pb: 2 }}>
                霍兰德职业兴趣测试
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ p: 1 }}>
                “我的兴趣点在哪里？” “有哪些符合我兴趣的专业？”
                “又有哪些符合我兴趣的职业？”
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ p: 1 }}>
                霍兰德职业性格测试是全球认可度最高的兴趣评测工具之一，可以为个人生涯规划作为有效参考
              </Typography>
            </Box>
          </div>
          <Container>
            <Tips />
          </Container>
        </Box>
      )}

      {currentUser ? (
        <Box sx={{ pb: 5 }}>
          {isBegin ? (
            <Box>
              <Questions
                questionItems={currentQuestions}
                isLastPage={currentPage === numberOfPage - 1}
              />
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", pt: 8, pb: 8 }}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => beginTest(true)}
                sx={{ mr: 1 }}
              >
                开始测试
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => router.push("/tests/results")}
              >
                查看过往测试结果
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box width={1} sx={{ pt: 4 }}>
          <MessageCard
            icon={<LockOpenIcon />}
            message="测试需要登录账号，请点击右上角登录。"
          />
        </Box>
      )}
      {resultResponse ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarVisible}
          autoHideDuration={6000}
          onClose={() => setSnackBarVisible(false)}
          message={resultResponse.message}
          key="alertMsg"
        >
          <Alert
            onClose={() => setSnackBarVisible(false)}
            severity={resultResponse.success ? "success" : "warning"}
          >
            {resultResponse.message}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};
export default DimensionTest;
