import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
//import logo from "../../../public/main-logo.png";
import { useDispatch, useSelector } from "react-redux";

import NotificationBar from "../../../components/snackBar";
import {
  receiveSignupResponse,
  toggleLoginModal,
} from "../../../features/user/userSlice";
import { RootState } from "../../../store";
import LoginModal from "../login";
import AccountMenu from "./components/accountMenu";
import MobileNav from "./components/mobile";
import styles from "./nav.module.css";

function NavBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const screenWidth = useSelector(
    (state: RootState) => state.settings.screenWidth,
  );
  const response: any = useSelector(
    (state: RootState) => state.user.signupResponse,
  );

  const [testAnchorEl, setTestAnchorEl] = useState<null | HTMLElement>(null);
  const testMenuVisible = Boolean(testAnchorEl);
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch({ type: "FETCH_USER" });
    }
    console.log("fetch_user");
  }, []);

  const handleTestMenuClick = (menu: string) => {
    router.push(menu);
    setTestAnchorEl(null);
  };

  useEffect(() => {
    if (response && response.success) {
      dispatch(toggleLoginModal(false));
    }
    setNotificationVisible(!!response);
  }, [response]);

  const closeNotificationBar = () => {
    dispatch(receiveSignupResponse(null));
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarItems}>
        <Image
          onClick={() => router.push("/")}
          src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/main-logo1.png`}
          alt="logo"
          width={100}
          height={48}
        />
        {screenWidth > 850 ? (
          <ul>
            <li>
              <Button
                variant="text"
                color="info"
                sx={{ color: "#2b2b2b" }}
                onClick={() => router.push("/")}
              >
                Home
              </Button>
            </li>
            <li>
              <Button
                variant="text"
                color="info"
                sx={{ color: "#2b2b2b" }}
                id="testsButton"
                aria-controls="testsMenu"
                aria-haspopup="true"
                aria-expanded={testMenuVisible ? "true" : undefined}
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                  setTestAnchorEl(event.currentTarget)
                }
              >
                Free test
              </Button>
              <Menu
                id="testsMenu"
                anchorEl={testAnchorEl}
                aria-labelledby="testsButton"
                open={testMenuVisible}
                onClose={() => setTestAnchorEl(null)}
              >
                <MenuItem
                  sx={{ width: "100%" }}
                  onClick={() => handleTestMenuClick("/tests/dimension-test")}
                >
                  MBTI Personality Test
                </MenuItem>
                <MenuItem
                  sx={{ width: "100%" }}
                  onClick={() => handleTestMenuClick("/tests/holland-test")}
                >
                  The Holland Occupational Interest Test.
                </MenuItem>
              </Menu>
            </li>
            <li>
              <Button
                color="info"
                sx={{ color: "#2b2b2b" }}
                variant="text"
                onClick={() => router.push("/one-on-one")}
              >
                AI clarifies
              </Button>
            </li>
            <li>
              <Button
                color="info"
                sx={{ color: "#2b2b2b" }}
                variant="text"
                onClick={() => router.push("/acceptance-rate")}
              >
                Admission rate evaluation
              </Button>
            </li>
            <li>
              <Button
                color="info"
                sx={{ color: "#2b2b2b" }}
                variant="text"
                onClick={() => router.push("/programs")}
              >
                Professional database
              </Button>
            </li>
            {/* <li>
              <Button
                color="info"
                sx={{ color: "#2b2b2b" }}
                variant="text"
                onClick={() => router.push("/consult")}
              >
                导师库
              </Button>
            </li> */}
            <li>
              <Button
                color="info"
                sx={{ color: "#2b2b2b" }}
                variant="text"
                onClick={() => router.push("/ranking")}
              >
                Ranking database
              </Button>
            </li>
            <li>
              <Button
                color="info"
                sx={{ color: "#2b2b2b" }}
                variant="text"
                onClick={() => router.push("/aboutUs")}
              >
                About EZO
              </Button>
            </li>
            {/* <li>
              <Button
                color="info"
                sx={{ color: "#2b2b2b" }}
                variant="text"
                href="https://jinshuju.net/f/Q1suVd"
                target="_blank"
                rel="noopener noreferrer"
              >
                成为导师
              </Button>
            </li> */}
            <li>
              <AccountMenu />
            </li>
          </ul>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountMenu />
            <MobileNav />
          </Box>
        )}
      </div>
      <LoginModal />
      <NotificationBar
        type={response && response.success ? "success" : "warning"}
        message={response ? response.message : ""}
        visible={notificationVisible}
        onClose={closeNotificationBar}
        vertical="top"
        horizontal="center"
      />
    </div>
  );
}
export default NavBar;
