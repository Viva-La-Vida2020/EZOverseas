import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout, toggleLoginModal } from "../../../../features/user/userSlice";
import { RootState } from "../../../../store";

function AccountMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentUser = useSelector((state: RootState) => state.user.userInfo);

  const handleClose = (event: any) => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout(null));
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentUser) {
      dispatch(toggleLoginModal(true));
      return;
    }
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {!currentUser ? (
        <Button size="small" color="primary" onClick={handleClick}>
          登录 | 注册
        </Button>
      ) : (
        <Box>
          <IconButton
            id="userMenuBtn"
            color="primary"
            aria-controls="userMenu"
            aria-haspopup="true"
            size="small"
            aria-expanded={open ? "true" : undefined}
            onClick={handleUserMenuClick}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 24, height: 24 }}
              src={currentUser.headImg || null}
            >
              {currentUser.headImg ? (
                <AccountCircleIcon color="primary" />
              ) : null}
            </Avatar>
          </IconButton>
          <Menu
            id="userMenu"
            anchorEl={anchorEl}
            MenuListProps={{
              "aria-labelledby": "userMenuBtn",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              sx={{ width: "100%" }}
              onClick={() => router.push("/user-dashboard")}
            >
              个人中心
            </MenuItem>
            <MenuItem sx={{ width: "100%" }} onClick={handleLogout}>
              登出
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}
export default AccountMenu;
