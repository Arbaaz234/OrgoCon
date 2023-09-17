import { Grid } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import UserImage from "./UserImage";
import ChatInput from "./ChatInput";
import { useCallback, useEffect, useRef, useState } from "react";

function ChatContainer({ currentChat = {} }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);

  const getMessages = useCallback(async () => {
    const response = await fetch(`http://localhost:3001/chat/getmsgs`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      body:{
        from:
      }
    });
    const data = await response.json();
    setOther(data);
  }, [id, token]);

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "stretch",
          height: "100%",
        }}
      >
        <Grid
          container
          // justifyContent="center"
          alignItems="center"
          sx={{ p: "16px", gap: "15px", backgroundColor: "#eee" }}
        >
          <Grid item xs={1}>
            <UserImage image={currentChat.picturePath} size="45px" />
          </Grid>

          <Grid item xs={8}>
            <div
              style={{ fontSize: "22px" }}
            >{`${currentChat.firstName} ${currentChat.lastName}`}</div>
          </Grid>
        </Grid>
        <div
          style={{
            flexGrow: "1",
            flexBasis: "100%",
            flex: "1",
          }}
        >
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={message.id}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className="content ">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatContainer;
