import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
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

import { OnEditAnswer } from "../../../features/tests/holland.d";
import {
  toggleLoading,
  updateCurrentAnswers,
} from "../../../features/tests/hollandTestSlice";
import mockData from "../../../mock/hollandTestMock";
import { RootState } from "../../../store";
import ProgressBar from "../progress";
import ContactForm from "../userInfoFormHolland";

interface Prop {
  questionItems: Array<any>;
  isLastPage: boolean;
}

const Questions: React.FC<Prop> = (props) => {
  const { questionItems, isLastPage } = props;
  const dispatch = useDispatch();
  const currentAnswers = useSelector(
    (state: RootState) => state.hollandTest.currentAnswers,
  );
  const totalNumberOfQuestions = useSelector(
    (state: RootState) => state.hollandTest.questions.length,
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.hollandTest.loading,
  );
  console.debug("Questions on page: ", questionItems);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [onEditAnswers, setOnEditAnswers] = useState<any>([]);
  const boxRef: any = useRef();

  useEffect(() => {
    setOnEditAnswers(currentAnswers);
    reset();
  }, [currentAnswers]);
  const [convevtedAnswersFinal, setconvevtedAnswersFinal] = useState<
    OnEditAnswer[]
  >([]);
  const onSubmit = (data: any) => {
    console.debug(data);
    let newAddedAnswers: OnEditAnswer[] = [];

    for (const [key, value] of Object.entries(data)) {
      const foundQuestionId: number = parseInt(key.replace("question_", ""));
      const foundQuestion: any = questionItems.find(
        (item) => item.id === foundQuestionId,
      );
      newAddedAnswers.push({
        id: foundQuestionId,
        value: data[key],
        topicId: foundQuestion ? foundQuestion.topicId : 0,
      });
    }
    if (isLastPage) {
      dispatch(updateCurrentAnswers(newAddedAnswers));
      let convevtedAnswers = [...currentAnswers].concat(newAddedAnswers);
      convevtedAnswers = convevtedAnswers.map((item) => {
        return {
          ...item,
          value:
            item.value === "很认同"
              ? "2"
              : item.value === "较认同"
              ? "1"
              : item.value === "中立"
              ? "0"
              : item.value === "较不认同"
              ? "-1"
              : "-2",
        };
      });
      setconvevtedAnswersFinal(convevtedAnswers);
      setOpen(true);
    } else {
      dispatch(updateCurrentAnswers(newAddedAnswers));
      window.scrollTo({
        top: parseInt(boxRef.current.offsetTop) - 80,
        behavior: "smooth",
      });
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
    setValue(`question_${questionId}`, event.target.value);

    if (!onEditAnswers.find((item: OnEditAnswer) => item.id === questionId)) {
      const foundQuestion: any = questionItems.find(
        (item) => item.id === questionId,
      );
      setOnEditAnswers([
        ...onEditAnswers,
        {
          id: questionId,
          value: event.target.value,
          topicId: foundQuestion ? foundQuestion.topicId : 0,
        },
      ]);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = (value: string) => {
    setOpen(false);
  };

  const renderAnswerGroup = (question: any, index: number) => (
    <div>
      <Controller
        render={({ field }) => (
          <FormControl
            error={errors[`question_${question.id}`]}
            variant="standard"
          >
            <FormLabel id="demo-error-radios">
              <Typography variant="subtitle1" gutterBottom>
                {index + 1 + ". " + question.subject}
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-label="answer-label"
              {...field}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleSelectAnswer(event, question.id)
              }
              //value={getValues(`question_${questionId}`)}
            >
              <FormControlLabel
                value="很认同"
                control={<Radio size="small" />}
                label="很认同"
                sx={{ pr: 4 }}
              />
              <FormControlLabel
                value="较认同"
                control={<Radio size="small" />}
                label="较认同"
                sx={{ pr: 4 }}
              />
              <FormControlLabel
                value="中立"
                control={<Radio size="small" />}
                label="中立"
                sx={{ pr: 4 }}
              />
              <FormControlLabel
                value="较不认同"
                control={<Radio size="small" />}
                label="较不认同"
                sx={{ pr: 4 }}
              />
              <FormControlLabel
                value="很不认同"
                control={<Radio size="small" />}
                label="很不认同"
              />
            </RadioGroup>
            <FormHelperText>
              {errors[`question_${question.id}`]?.message}
            </FormHelperText>
          </FormControl>
        )}
        control={control}
        {...register(`question_${question.id}`)}
        defaultValue={""}
        rules={{ required: true }}
      />
      <Typography variant="body1" color="error">
        {errors[`question_${question.id}`]?.type === "required" &&
          "请回答该问题"}
      </Typography>
    </div>
  );

  return (
    <Box sx={{ pb: 10 }}>
      <ProgressBar
        answered={onEditAnswers.length}
        total={totalNumberOfQuestions}
        fixed={true}
      />
      <Grid container justifyContent="center">
        <Grid item lg={6} md={8} sm={12} xs={12}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Box
              sx={{ display: "flex", justifyContent: "center", pt: 5 }}
              ref={boxRef}
            >
              <Box sx={{ pl: 2, pr: 2 }}>
                {questionItems.map((item: any, index: number) => (
                  <Box
                    key={`holland_test_question_box_${item.id}`}
                    sx={{ pb: 4 }}
                  >
                    {/* <Typography variant="subtitle1" gutterBottom>
                  {index + 1 + ". " + item.subject}
                </Typography> */}
                    {renderAnswerGroup(item, index)}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box width={1} textAlign="center" pt={3}>
              <LoadingButton
                variant="contained"
                size="large"
                color="primary"
                onClick={handleSubmit(onSubmit, onError)}
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
            // onClick={() =>
            //   dispatch({ type: "SUBMIT_HOLLAND_TEST", payload: mockData })
            // }
                onClick={() =>
                  dispatch({
                    // type: "SUBMIT_HOLLAND_TEST",
                    // payload: mockData,
                    type: "SUBMIT_HOLLAND_TEST_AND_SEND_EMAIL",
                    payload: {
                      OnEditAnswers: convevtedAnswers,
                      userName: "Leo",
                      age: 20,
                      phoneNumber: "16637616126",
                      source: "知乎",
                      reason: "做着玩",
                    }
                  })
                }
          >
            直接提交【测试用】
          </Button> */}
              <Dialog onClose={handleClose} open={open}>
                <ContactForm answers={convevtedAnswersFinal} />
              </Dialog>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Questions;
