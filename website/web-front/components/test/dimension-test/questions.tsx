import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCurrentAnswers,
  updateLoadingStatus,
} from "../../../features/tests/dimensionTestSlice";
import {
  Answer,
  CurrentAnswer,
  Question,
} from "../../../helper/dataTypes/dimensionTest";
import mockData from "../../../mock/dimensionTestMock1";
import { RootState } from "../../../store";
import ProgressBar from "../progress";
import ContactForm from "../userInfoForm";

interface Prop {
  questionItems: Array<any>;
  isLastPage: boolean;
  title: string;
  questionTypeIndex: number;
}

const Questions: React.FC<Prop> = (props) => {
  const { questionItems, isLastPage, title, questionTypeIndex } = props;
  const dispatch = useDispatch();
  const currentAnswers: CurrentAnswer[] = useSelector(
    (state: RootState) => state.dimensionTest.currentAnswers,
  );
  const totalNumberOfQuestions: number = useSelector(
    (state: RootState) => state.dimensionTest.totalQuestions,
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.dimensionTest.loading,
  );
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [onEditAnswers, setOnEditAnswers] = useState<CurrentAnswer[]>([]);

  const MainTitleRef: any = useRef();

  function backToTop() {
    window.scrollTo({
      top: parseInt(MainTitleRef.current.offsetTop) - 120,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setOnEditAnswers([]);
    reset();
    backToTop();
  }, [currentAnswers]);

  const onSubmit = (data: any) => {
    if (isLastPage) {
      setOpen(true);
    } else {
      dispatch(updateCurrentAnswers(onEditAnswers));
    }
  };

  const onError = (
    errors: FieldErrors<any>,
    event?: React.BaseSyntheticEvent,
  ) => console.debug(errors);

  const handleSelectAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: number,
  ) => {
    clearErrors(`question_${questionId}`);
    setValue(`question_${questionId}`, event.target.value);
    const foundOnEditAnswerIndex: number = onEditAnswers.findIndex(
      (item: any) => item.id === questionId,
    );
    const foundQuestion: Question | undefined = questionItems.find(
      (item) => item.id === questionId,
    );
    if (!foundQuestion) {
      return;
    }
    const convertedAnswerId: number = parseInt(event.target.value);
    const foundAnswer: Answer | undefined = Array.isArray(foundQuestion.answers)
      ? foundQuestion.answers.find(
          (item: Answer) => item.id === convertedAnswerId,
        )
      : undefined;
    if (!foundAnswer) {
      return;
    }
    if (foundOnEditAnswerIndex < 0) {
      setOnEditAnswers([
        ...onEditAnswers,
        {
          questionId: foundQuestion.id,
          topicId: foundQuestion.topicId,
          answerId: convertedAnswerId,
          dimensionId: foundAnswer.dimensionId,
        },
      ]);
    } else {
      const clonedOnEditAnswers = [...onEditAnswers];
      clonedOnEditAnswers[foundOnEditAnswerIndex] = {
        questionId: foundQuestion.id,
        topicId: foundQuestion.topicId,
        answerId: convertedAnswerId,
        dimensionId: foundAnswer.dimensionId,
      };
      setOnEditAnswers(clonedOnEditAnswers);
    }
  };

  const renderAnswerGroup = (question: any, index: number) => (
    <div>
      <Controller
        render={({ field }) => (
          <FormControl
            error={errors[`question_${question.id}`]}
            variant="standard"
          >
            {question.subject ? (
              <FormLabel id="demo-error-radios">
                <Typography variant="subtitle1" gutterBottom>
                  {index + 1 + ". " + question.subject}
                </Typography>
              </FormLabel>
            ) : null}

            <RadioGroup
              aria-label="answer-label"
              {...field}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleSelectAnswer(event, question.id)
              }
              //value={getValues(`question_${questionId}`)}
            >
              {question.answers.map((item: any) => (
                <FormControlLabel
                  key={`dimension_test_answer_${item.id}`}
                  value={item.id}
                  control={<Radio />}
                  label={item.subject}
                />
              ))}
            </RadioGroup>
            <FormHelperText>
              {errors[`question_${question.id}`]?.message}
            </FormHelperText>
          </FormControl>
        )}
        control={control}
        {...register(`question_${question.id}`)}
        defaultValue=""
        rules={{ required: true }}
      />
      <Typography variant="body1" color="error">
        {errors[`question_${question.id}`]?.type === "required" &&
          "请回答该问题"}
      </Typography>
    </div>
  );
  //dialog控制器
  const [open, setOpen] = React.useState(false);

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <Box sx={{ pb: 10 }}>
      <ProgressBar
        answered={currentAnswers.length + onEditAnswers.length}
        total={totalNumberOfQuestions}
        fixed={false}
      />
      <Grid container justifyContent="center">
        <Grid item lg={6} md={8} sm={12} xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
              <Box>
                {title ? (
                  <Typography
                    variant="h5"
                    sx={{ pb: 4 }}
                    textAlign="center"
                    ref={MainTitleRef}
                  >
                    {title}
                  </Typography>
                ) : null}
                <Grid container spacing={questionTypeIndex === 1 ? 3 : 0}>
                  {questionItems.map((item: any, index: number) => (
                    <Grid
                      key={`dimension_test_question_grid_${index}`}
                      item
                      lg={questionTypeIndex === 1 ? 4 : 12}
                      md={questionTypeIndex === 1 ? 4 : 12}
                      sm={questionTypeIndex === 1 ? 6 : 12}
                      xs={12}
                    >
                      <Box sx={{ pb: 4 }}>
                        {/* <Typography variant="subtitle1" gutterBottom>
                  {index + 1 + ". " + item.subject}
                </Typography> */}
                        {renderAnswerGroup(item, index)}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
            <Box width={1} textAlign="center" pt={3}>
              <LoadingButton
                variant="contained"
                size="large"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                loading={loading}
                loadingIndicator="正在提交..."
              >
                {isLastPage ? "下一页" : "下一页"}
              </LoadingButton>
              {/* <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{ ml: 1 }}
                onClick={() =>
                  dispatch({
                    type: "SUBMIT_DIMENSION_TEST",
                    payload: mockData,
                  })
                }
              >
                直接提交【测试用】
              </Button> */}
              <Dialog onClose={handleClose} open={open}>
                <ContactForm
                  answers={[...currentAnswers].concat(onEditAnswers)}
                />
              </Dialog>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Questions;
