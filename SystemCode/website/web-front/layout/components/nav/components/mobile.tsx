import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import QuizIcon from "@mui/icons-material/Quiz";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkIcon from "@mui/icons-material/Work";
import {
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function MobileNav() {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleSubMenu, setVisibleSubMenu] = useState<string>("");

  function handleSubmenu(name: string) {
    setVisibleSubMenu(visibleSubMenu === name ? "" : name);
  }

  function handleRouting(url: string) {
    router.push(url);
    setVisible(false);
  }

  return (
    <Box sx={{ pl: 1 }}>
      <Button
        variant="text"
        startIcon={<MenuIcon />}
        onClick={() => setVisible(true)}
      >
        菜单
      </Button>
      <Drawer anchor="right" open={visible} onClose={() => setVisible(false)}>
        <Box sx={{ p: 2 }}>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={() => setVisible(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem disablePadding onClick={() => handleRouting("/")}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItemButton onClick={() => handleSubmenu("test")}>
            <ListItemIcon>
              <QuizIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Free test" />
            {visibleSubMenu === "test" ? (
              <ArrowDropUpIcon color="disabled" />
            ) : (
              <ArrowDropDownIcon color="disabled" />
            )}
          </ListItemButton>
          <Collapse in={visibleSubMenu === "test"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => handleRouting("/tests/dimension-test")}
              >
                <ListItemText primary="16 personality tests" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => handleRouting("/tests/holland-test")}
              >
                <ListItemText primary="Holland's Occupational Interest Test" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem disablePadding onClick={() => handleRouting("/one-on-one")}>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="AI one-on-one clarification" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleRouting("/admission-rate")}>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Admission rate evaluation" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleRouting("/programs")}>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Professional database" />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding onClick={() => handleRouting("/consult")}>
            <ListItemButton>
              <ListItemIcon>
                <ContactPageIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="导师库" />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding onClick={() => handleRouting("/ranking")}>
            <ListItemButton>
              <ListItemIcon>
                <TrendingUpIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Ranking database" />
            </ListItemButton>
          </ListItem>
          <ListItemButton onClick={() => handleRouting("/aboutUs")}>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="About EZO" />
          </ListItemButton>
          <ListItemButton
            href="https://jinshuju.net/f/Q1suVd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            {/* <ListItemText primary="成为导师" /> */}
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}

export default MobileNav;
