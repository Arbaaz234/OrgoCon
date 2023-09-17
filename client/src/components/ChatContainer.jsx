import { Grid } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import UserImage from "./UserImage";
import ChatInput from "./ChatInput";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
function ChatContainer({ currentChat, socket }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const { _id, picturePath } = useSelector((state) => state.user);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const token = useSelector((state) => state.token);
  const getMessages = useCallback(async () => {
    console.log(_id + ' ' + currentChat._id);
    // const databody = 
    // console.log(databody);
    const response = await fetch(`http://localhost:3001/chats/getmsgs`, {
      method: "POST",
      // headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        "from": _id,
        "to": currentChat._id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    setMessages(data);
  }, [_id, token, currentChat._id]);

  useEffect(() => {
    getMessages();
  }, [currentChat, getMessages]);


  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    console.log(socket.current);
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: _id,
      msg,
    });
    await axios.post("http://localhost:3001/chats/addmsg", {
      from: _id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <Container>
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
            {messages?.map((message) => {
              return (
                <div ref={scrollRef} key={message.id}>
                  <div
                    className={`message ${message.fromSelf ? "sended" : "recieved"
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
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer;
