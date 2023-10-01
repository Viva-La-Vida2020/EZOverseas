import { Box, Card, CardContent, Grid, Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from 'react';

import styles from "./serviceTable.module.css";
import {
  divDefaultPadding,
  sectionPaddingLeft,
  sectionPaddingRight,
  sectionPaddingTop,
} from "../../helper/constants";

const Section4: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: '你', text: '你好' },
    { from: 'AI 助手', text: 'Hello!' }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    setMessages([...messages, { from: '你', text: input }]);
    setInput('');
  };

  return (
    <Box
      className={styles.section3}
      sx={{
      pt: sectionPaddingTop,
      pl: sectionPaddingLeft,
      pr: sectionPaddingRight,
    }}>
      <Typography variant="h4" align="center" gutterBottom component="h4">
        和 AI 助手聊聊
      </Typography>
      <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {messages.map((msg, index) => (
              <Typography key={index} sx={{mb: 1}}>
                <b>{msg.from}:</b> {msg.text}
              </Typography>
            ))}
      </Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={9}>
          <TextField 
              fullWidth
              placeholder="请输入您的问题"
              value={input}
              onChange={e => setInput(e.target.value)}
              sx={{ mt: 2, mb: 1 }}
            />
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={handleSend}>
              提交
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Section4;
