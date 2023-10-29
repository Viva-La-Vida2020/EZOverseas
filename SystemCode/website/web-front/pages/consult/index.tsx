import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Fab,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConsultantCard from "../../components/consult/consultantCard";
import ContactForm from "../../components/consult/contactForm";
import Filters from "../../components/consult/filters";
import JoinUs from "../../components/consult/joinUs";
import SearchBar from "../../components/consult/searchBar";
import Title from "../../components/consult/title";
import LoadingCard from "../../components/home/components/loading";
import NotificationBar from "../../components/snackBar";
import {
  Consultant,
  ConsultantDetails,
} from "../../features/consult/consult.d";
import {
  receiveInquiryResponse,
  toggleContactModal,
  updateLoadingStatus,
  updatePage,
} from "../../features/consult/consultSlice";
import { ProgramDetails, ProgramItem } from "../../features/programs/program";
import { StandardResponse } from "../../helper/commonTypes";
import {
  NUMBER_OF_CONSULTANTS_PER_PAGE,
  divDefaultPadding,
} from "../../helper/constants";
import { RootState } from "../../store";

const Consulting: React.FC = () => {
  const dispatch = useDispatch();
  const programs = useSelector((state: RootState) => state.programs.list);
  const consultants = useSelector(
    (state: RootState) => state.consulting.consultants,
  );
  const currentPage: number = useSelector(
    (state: RootState) => state.consulting.currentPage,
  );
  const { regionId, programCategoryId, educationLevel, keyword } = useSelector(
    (state: RootState) => state.consulting.filters,
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.consulting.loading,
  );
  const inquiryResponse: StandardResponse | null = useSelector(
    (state: RootState) => state.consulting.inquiryResponse,
  );
  const [sortedConsultants, sortConsultants] = useState<Consultant[]>([]);
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(updateLoadingStatus(true));
    dispatch({ type: "FETCH_CONSULTING_DATA" });
  }, [dispatch]);

  const cardRef: any = useRef();
  const filterRef: any = useRef();

  useEffect(() => {
    let newConsultants: Consultant[] = [...consultants];
    newConsultants = newConsultants.filter((item: Consultant) => {
      if (!Array.isArray(item.details)) {
        return false;
      }
      if (programCategoryId) {
        const currentProgramCategory: ProgramItem | undefined = programs.find(
          (program: ProgramItem) => program.id === programCategoryId,
        );
        if (!currentProgramCategory) {
          return false;
        }
        const currentProgramDetails: number[] =
          currentProgramCategory.details.map(
            (programDetails: ProgramDetails) => programDetails.programId,
          );
        return item.details.find((details: ConsultantDetails) =>
          currentProgramDetails.includes(details.programId),
        );
      }
      return true;
    });
    newConsultants = newConsultants.filter((item: Consultant) => {
      return item.details.find(
        (details: ConsultantDetails) =>
          (regionId ? details.schoolRegionId === regionId : 1) &&
          (educationLevel ? details.education === educationLevel : 1),
      );
    });
    newConsultants = newConsultants.filter((item: Consultant) => {
      return keyword
        ? item.nickName.indexOf(keyword) > -1 ||
            item.educationLevel.indexOf(keyword) > -1 ||
            item.introduction.indexOf(keyword) > -1
        : 1;
    });
    sortConsultants(newConsultants);

    return () => {
      if (inquiryResponse) {
        dispatch(receiveInquiryResponse(null));
      }
    };
  }, [
    regionId,
    programCategoryId,
    educationLevel,
    keyword,
    consultants,
    dispatch,
  ]);

  useEffect(() => {
    console.debug("inquiry response", inquiryResponse);
    if (inquiryResponse) {
      if (inquiryResponse.success) {
        dispatch(
          toggleContactModal({
            visible: false,
            consultant: null,
          }),
        );
      }
    }
    setNotificationVisible(!!inquiryResponse);
  }, [inquiryResponse, dispatch]);

  function closeNotificationBar() {
    dispatch(receiveInquiryResponse(null));
  }

  function changePageNumber() {
    dispatch(updatePage({}));
  }

  function backToTop() {
    window.scrollTo({
      top: parseInt(filterRef.current.offsetTop) - 80,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    window.scrollTo({
      top: parseInt(cardRef.current?.offsetTop) - 700,
      behavior: "smooth",
    });
  }, [currentPage]);

  const isLoadMoreButtonDisabled: boolean =
    sortedConsultants.length <= currentPage * NUMBER_OF_CONSULTANTS_PER_PAGE;

  return (
    <Box sx={{ background: "#ffffff" }}>
      <Title />
      <Box sx={{ position: "relative" }}>
        <Container>
          <Grid container sx={{ pt: 5, pb: 5 }}>
            <Grid item sm={12} md={9} xs={12}>
              <Box sx={{ background: "#f2f2f2" }}>
                <Card ref={filterRef} sx={{ background: "#f8f8f8" }}>
                  <CardContent sx={{ p: divDefaultPadding }}>
                    <SearchBar />
                    <Filters />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <JoinUs />
          </Grid>
          <Grid container sx={{ pb: 5 }}>
            <Grid item sm={12} md={9}>
              {!loading ? (
                <Box sx={{ background: "#ffffff" }}>
                  {sortedConsultants
                    .filter(
                      (a: Consultant, index: number) =>
                        index < NUMBER_OF_CONSULTANTS_PER_PAGE * currentPage,
                    )
                    .map((item: Consultant, index: number) => (
                      <Box key={`consultant_card_${item.id}`}>
                        <ConsultantCard data={item} />
                      </Box>
                    ))}
                  <Box textAlign="center" ref={cardRef} sx={{ pt: 1 }}>
                    <Button
                      variant="text"
                      disabled={isLoadMoreButtonDisabled}
                      startIcon={
                        isLoadMoreButtonDisabled ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )
                      }
                      onClick={changePageNumber}
                    >
                      {isLoadMoreButtonDisabled ? "已加载全部" : "加载更多"}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <LoadingCard message="正在加载导师库数据..." />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ContactForm />
      <Box className="backTopButton">
        <Fab color="primary" aria-label="backToTop" onClick={backToTop}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
      <NotificationBar
        type={
          inquiryResponse && inquiryResponse.success ? "success" : "warning"
        }
        message={inquiryResponse ? inquiryResponse.message : ""}
        visible={notificationVisible}
        onClose={closeNotificationBar}
        vertical="top"
        horizontal="center"
      />
    </Box>
  );
};
export default Consulting;
