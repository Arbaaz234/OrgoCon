import { useDispatch, useSelector } from "react-redux";
import { setOpenChat } from "state";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useEffect, useState } from "react";
import ChatContainer from "./ChatContainer";

function Chat() {
  const dispatch = useDispatch();
  const { open, id } = useSelector((state) => state.openChat);
  const token = useSelector((state) => state.token);

  const [other, setOther] = useState({});

  const getFriend = useCallback(async () => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setOther(data);
  }, [id, token]);

  useEffect(
    function () {
      getFriend();
      console.log("other");
    },
    [getFriend]
  );

  if (open)
    return (
      <div>
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            height: "100%",
            width: "40%",
            backgroundColor: "white",
            zIndex: "2",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(setOpenChat({ open: false, id: null }));
            }}
          >
            <CloseIcon sx={{ fontSize: "25px" }} />
          </button>
          {/* <UserImage image={userPicturePath} size="55px" /> */}
          {/* {other?.firstName} */}
          <ChatContainer currentChat={other} />
        </div>
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
          onClick={() => {
            dispatch(setOpenChat({ open: false, id: null }));
          }}
        ></div>
      </div>
    );
}

export default Chat;
