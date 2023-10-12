import { Box, Card, CardContent, Grid, Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from 'react';
import {
  divDefaultPadding,
  sectionPaddingLeft,
  sectionPaddingRight,
  sectionPaddingTop,
  sectionPaddingBottom,
} from "../../helper/constants";
import styles from "./oneOnOne.module.css";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: 'You', text: 'Hello' },
    { from: 'AI assistant', text: 'Hello!' }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    setMessages([...messages, { from: 'You', text: input }]);
    setInput('');
  };

  return (
    <Box
      className={styles.chatbot}
      sx={{
        pt: 5,
        pl: sectionPaddingLeft,
        pr: sectionPaddingRight,
        pb:5,
    }}>
      <Typography variant="h5" align="center" gutterBottom component="h5">
        Chat with the AI assistant.
      </Typography>
      <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
            {messages.map((msg, index) => (
              <Typography key={index} sx={{mb: 1}}>
                <b>{msg.from}:</b> {msg.text}
              </Typography>
            ))}
      </Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={10}>
          <TextField 
            fullWidth
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
              placeholder="Please enter your question"
              value={input}
              onChange={e => setInput(e.target.value)}
              sx={{ mt: 2, mb: 1 }}
            />
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={handleSend} size="large">
            submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ChatBot;
