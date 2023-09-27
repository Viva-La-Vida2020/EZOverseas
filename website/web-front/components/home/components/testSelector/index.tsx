import FaceIcon from "@mui/icons-material/Face";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface Prop {
  isVisible: boolean;
  close: () => void;
}

const TestSelector: React.FC<Prop> = (props) => {
  const { isVisible, close } = props;
  const router = useRouter();

  return (
    <Dialog onClose={close} open={isVisible}>
      <DialogTitle>选择测试</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => router.push("/tests/dimension-test")}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "theme.primary", color: "primary" }}>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>MBTI性格测试</ListItemText>
        </ListItem>
        <ListItem button onClick={() => router.push("/tests/holland-test")}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary", color: "primary" }}>
              <PsychologyIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>霍兰德职业兴趣测试</ListItemText>
        </ListItem>
      </List>
    </Dialog>
  );
};
export default TestSelector;
