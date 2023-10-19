import { Box, Card, CardContent, Grid, Typography, TextField, Button } from "@mui/material";
import React, { useState } from 'react';
import {
  sectionPaddingLeft,
  sectionPaddingRight,
} from "../../helper/constants";
import styles from "./oneOnOne.module.css";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const generateRandom = () =>{
  let num = Math.floor(Math.random() * 1000000) % 1000000;
  return String(num).padStart(6, '0');
}

const ChatBot: React.FC = () => {
  const userInfo = useSelector(
    (state: RootState) => state.user.userInfo,
  );
  const [messages, setMessages] = useState([
    { User: 'Hello', Bot: "Hello! I'm Bot" },
  ]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(userInfo?.id || generateRandom());
  const [sessionId, setSessionId] = useState(generateRandom());

  const handleSend = async () => {
    if (!input) {
      return;
    }
    const response = await requestOpenAIAPI(input);
    setMessages([...messages, { User: input, Bot: response?.['message'] }]);
    setInput('');
  };

  const requestOpenAIAPI = async (input: string) => {
    const data_request = {
      question: input,
      user_id: userId,
      session_id: sessionId,
    };
    try {
      console.error('start request',data_request);
      
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_request),
      });
      console.error('end request response', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.error('return request');
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  // const requestOpenAIAPI = async (input: string) => {
  //   const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  //   const openai = new OpenAIApi(configuration);
  //   // 创建对话
  //   const conversation = await openai.conversations.create({});

  //   // 保存对话ID以便后续使用
  //   const conversationId = conversation.id;

  //   try {
  //     // 使用对话ID发送消息并获取响应
  //     const response = await openai.createChatCompletion({
  //       conversationId,
  //       messages: input,
  //       model: "gpt-3.5-turbo",
  //     });
  
  //     const botMessage = response.data.choices[0].message;
  //     if (botMessage) {
  //       return botMessage.content
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };


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
        {messages.map((msg:any, index:any) => (
          <Box my={1} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary">
                  User: {msg.User}
                </Typography>
                <Typography>
                  Bot: {msg.Bot}
                </Typography>
              </CardContent>
            </Card>
          </Box>
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
            onChange={(e:any) => setInput(e.target.value)}
            onKeyPress={(e:any) => {
              if (e.key === 'Enter' && input.trim()) {
                handleSend();
                e.preventDefault();  // 防止页面意外地刷新
              }
            }}
            sx={{ mt: 2, mb: 1 }}
            />
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handleSend}
            size="large"
          >
            submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ChatBot;
